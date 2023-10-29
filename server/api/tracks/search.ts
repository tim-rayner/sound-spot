import { Schema, model } from "mongoose";
import axios from "axios";
const config = useRuntimeConfig();

//define user schema
const trackSchema = new Schema({
  name: String,
});

//define user model
export const Track = model<any>("Track", trackSchema);

export default defineEventHandler(async (event) => {
  const { query, type } = await readBody(event);

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

  const response = await axios
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
      console.log(res.data);
      return res.data;
    });

  // const songs = await Track.find();
  return response;
});
