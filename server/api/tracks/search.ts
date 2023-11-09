import { Schema, model } from "mongoose";
import axios from "axios";
import { Rating } from "../ratings/index.get";
import { Item } from "~/types/spotify-types";
import { defineEventHandler, H3Event, parseCookies, setCookie } from "h3";

//define user schema
const trackSchema = new Schema({
  name: String,
});

//define user model
export const Track = model<any>("Track", trackSchema);

export default defineEventHandler(async (event) => {
  const { query, type } = await readBody(event);
  const { spotifyClientAccessToken } = parseCookies(event);
  if (query !== "") {
    //get  list from spotify
    const spotifyResponse = await axios
      .get("https://api.spotify.com/v1/search", {
        params: {
          q: query,
          type: type,
          limit: 4, //only return 5 results
        },
        headers: {
          Authorization: `Bearer ${spotifyClientAccessToken} `,
        },
      })
      .then((res) => {
        return res.data;
      });

    //merge with rating info from db
    const items = spotifyResponse.tracks.items;
    const ratings = await Rating.find();

    items.forEach((track: Item) => {
      const trackRatings = ratings.filter(
        (rating) => rating.itemId === track.id
      );
      const totalRating = trackRatings.reduce(
        (acc, curr) => acc + curr.rating,
        0
      );
      track.avgRating = totalRating / trackRatings.length;
      track.ratings = trackRatings;
    });

    return items;
  }

  //return nothing if no query
  return {
    statusCode: 200,
    body: {
      tracks: [],
    },
  };
});
