import axios from "axios";
import { iRating } from "~/types/rating-types";
import { Artist } from "~/types/pages/artist-page-types";
import { Rating } from "../../ratings/index.get";
import { User } from "../../users/index.get";
import getAbout from "~/helpers/getAboutInfo";
import { iArtist } from "~/types/artist-types";

export default defineEventHandler(async (event): Promise<Artist> => {
  // Grab the parameter from the route

  const id = getRouterParam(event, "id");
  const { spotifyClientAccessToken } = parseCookies(event);

  const ratings: iRating[] = await Rating.find({ itemId: id });

  //GET ARTIST DATA
  const spotifyResponse = await axios
    .get(`https://api.spotify.com/v1/artists/${id}`, {
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

  //GET ARTIST INFO
  const artistInfoResponse = await getAbout(
    id!,
    spotifyResponse.name,
    "artist",
    spotifyResponse.artists
  );

  //GET SUGGESTED ARTISTS
  const recommendations: iArtist[] = await axios
    .get(`https://api.spotify.com/v1/artists/${id}/related-artists`, {
      headers: {
        Authorization: `Bearer ${spotifyClientAccessToken}`,
      },
    })
    .then((res) => {
      return res.data.artists;
    })
    .catch((err) => {
      throw createError({
        statusCode: err.response.status,
        statusMessage: "Spotify error: " + err.response.statusText,
      });
    });

  recommendations.splice(5, recommendations.length).map(async (artist) => {
    //get all ratings for an item
    const itemRatings = await Rating.find({ itemId: artist.id });
    //get avg rating

    const totalRating = itemRatings.reduce((acc, curr) => acc + curr.rating, 0);

    artist.avgRating = totalRating / itemRatings.length;
    return artist;
  });

  return {
    artistData: spotifyResponse,
    artistInfo: artistInfoResponse,
    recommendations,
  };
});
