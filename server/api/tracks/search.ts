import { Schema, model } from "mongoose";
import axios from "axios";
import { Rating } from "../ratings/index.get";
import { Item } from "~/types/spotify-types";
const config = useRuntimeConfig();

//define user schema
const trackSchema = new Schema({
  name: String,
});

//define user model
export const Track = model<any>("Track", trackSchema);

export default defineEventHandler(async (event) => {
  const { query, type } = await readBody(event);

  if (query !== "") {
    const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        grant_type: "client_credentials",
      },
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          //@ts-ignore
          new Buffer.from(
            config.spotifyClientId + ":" + config.spotifyClientSecret
          ).toString("base64"),
      },
      json: true,
    };

    //get token
    const resposne = await axios.post(
      authOptions.url,
      new URLSearchParams(authOptions.form).toString(),
      {
        headers: authOptions.headers,
      }
    );

    const accessToken = resposne.data.access_token;

    //TODO: SEGREGATE AND MAKE THIS A MORE EFFICIENT, LESS EXPENSIVE CALL

    //get  list from spotify
    const spotifyResponse = await axios
      .get("https://api.spotify.com/v1/search", {
        params: {
          q: query,
          type: type,
          limit: 5, //only return 5 results
        },
        headers: {
          Authorization: `Bearer ${accessToken} `,
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
