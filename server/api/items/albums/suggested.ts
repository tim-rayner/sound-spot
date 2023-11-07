import { Album, Artist, Item } from "~/types/spotify-types";
import axios from "axios";
import { Rating } from "../../ratings/index.get";

export default defineEventHandler(async (event): Promise<Album> => {
  const { album } = await readBody(event);
  const { spotifyClientAccessToken } = parseCookies(event);

  const artistIds = album.artists.map((artist: Artist) => artist.id).join(",");
  const tracks = album.tracks.items.map((track: Item) => track.id);
  const genres = album.genres.join(",");

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

  return recommendedAlbums;
});
