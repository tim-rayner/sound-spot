import axios from "axios";
import { defineEventHandler, H3Event, parseCookies, setCookie } from "h3";
import type { Item } from "~/types/spotify-types";
import { Rating } from "../../ratings/index.get";
import { User } from "../../users/index.get";
import { iRating } from "~/types/rating-types";

export default defineEventHandler(async (event) => {
  // Grab the parameter from the route

  const id = getRouterParam(event, "id");
  const { spotifyClientAccessToken } = parseCookies(event);

  //get all ratings from db for this track
  const ratings: iRating[] = await Rating.find({ itemId: id });

  const spotifyResponse = await axios
    .get(`https://api.spotify.com/v1/tracks/${id}`, {
      headers: {
        Authorization: `Bearer ${spotifyClientAccessToken} `,
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
  spotifyResponse.avgRating = Number(
    (totalRating / ratings.length).toFixed(1)
  ).toString();

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
  //
});
