import axios from "axios";
import { Rating } from "../../ratings/index.get";
import type { iRating } from "~/types/rating-types";
import { User } from "../../users/index.get";
import { Artist, Item } from "~/types/spotify-types";
import getAbout from "~/helpers/getAboutInfo";
import { Album } from "~/types/pages/album-page-types";

export default defineEventHandler(async (event): Promise<Album> => {
  // Grab the parameter from the route

  const id = getRouterParam(event, "id");
  const { spotifyClientAccessToken } = parseCookies(event);

  const ratings: iRating[] = await Rating.find({ itemId: id });

  //GET ALBUM DATA
  const spotifyResponse = await axios
    .get(`https://api.spotify.com/v1/albums/${id}`, {
      headers: {
        Authorization: `Bearer ${spotifyClientAccessToken}`,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw createError({
        statusCode: err.response.status,
        statusMessage: "Spotify error: " + err.response.statusText,
      });
    });

  const totalRating = ratings.reduce((acc, curr) => acc + curr.rating, 0);
  spotifyResponse.avgRating = totalRating / ratings.length;

  spotifyResponse.ratings = await Promise.all(
    ratings.map(async (itemRating: iRating) => {
      const user = await User.findById(itemRating.user._id);
      return {
        comment: itemRating.comment,
        rating: itemRating.rating,
        createdAt: itemRating.createdAt,
        itemType: itemRating.itemType,
        //
        username: user.username,
        userProfilePicture: user.profilePicture,
      };
    })
  );

  //GET SUGGESTED ALBUMS
  const artistIds = spotifyResponse.artists
    .map((artist: Artist) => artist.id)
    .join(",");
  const tracks = spotifyResponse.tracks.items.map((track: Item) => track.id);
  const genres = spotifyResponse.genres.join(",");

  //get track recommendations based on artists and tracks from album
  const recommendedTracks = await axios
    .get("https://api.spotify.com/v1/recommendations", {
      params: {
        seed_artists: artistIds,
        seed_genres: genres,
        seed_tracks: tracks,
        limit: 5,
      },
      headers: {
        Authorization: `Bearer ${spotifyClientAccessToken}`,
      },
    })
    .then((res) => {
      return res.data.tracks;
    })
    .catch((err) => {
      throw createError({
        statusCode: err.response.status,
        statusMessage: "Spotify error: " + err.response.statusText,
      });
    });

  //get album tracks are from, excluding any dupilcates and the current album
  const recommendedAlbums = recommendedTracks.map((track: Item) => {
    return track.album;
  });

  await Promise.all(
    recommendedAlbums.map(async (album: Album) => {
      //get all ratings for an item
      const itemRatings = await Rating.find({ itemId: album.id });
      //get avg rating

      const totalRating = itemRatings.reduce(
        (acc, curr) => acc + curr.rating,
        0
      );

      album.avgRating = totalRating / itemRatings.length;
      return album;
    })
  );

  //GET ALBUM INFO
  const albumInfoResp = await getAbout(
    id!,
    spotifyResponse.name,
    "album",
    spotifyResponse.artists
  );

  return {
    AlbumData: spotifyResponse,
    recommendations: recommendedAlbums,
    AlbumInfo: albumInfoResp,
  };
});
