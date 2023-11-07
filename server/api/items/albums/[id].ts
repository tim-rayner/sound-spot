import axios from "axios";
import { Album } from "~/types/spotify-types";
import { Rating } from "../../ratings/index.get";
import type { iRating } from "~/types/rating-types";
import { User } from "../../users/index.get";

export default defineEventHandler(async (event) => {
  // Grab the parameter from the route

  const id = getRouterParam(event, "id");
  const { spotifyClientAccessToken } = parseCookies(event);

  const ratings: iRating[] = await Rating.find({ itemId: id });

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

  return spotifyResponse;
});
