import axios from "axios";
import { defineEventHandler, H3Event, parseCookies, setCookie } from "h3";
import type { Item } from "~/types/spotify-types";
import { Rating } from "../../ratings/index.get";

export default defineEventHandler(async (event): Promise<Item> => {
  // Grab the parameter from the route

  const id = getRouterParam(event, "id");
  const { spotifyClientAccessToken } = parseCookies(event);

  //get all ratings from db for this track
  const ratings = await Rating.find({ itemId: id });

  const spotifyResponse: Item = await axios
    .get(`https://api.spotify.com/v1/tracks/${id}`, {
      headers: {
        Authorization: `Bearer ${spotifyClientAccessToken} `,
      },
    })
    .then((res) => {
      return res.data;
    });

  const trackRatings = ratings;
  const totalRating = trackRatings.reduce((acc, curr) => acc + curr.rating, 0);
  spotifyResponse.avgRating = totalRating / trackRatings.length;
  spotifyResponse.ratings = trackRatings;
  return spotifyResponse;
  //
});
