import { Nitro } from "nitropack";
import mongoose from "mongoose";
import axios from "axios";
import createError from "http-errors";

//synchronous function to excecute every time the web application is started; to ensure MongoDB is connected

export default async (_nitroApp: Nitro) => {
  const config = useRuntimeConfig();
  try {
    //create mongodb connectionx
    await mongoose.connect(config.mongodbUri);
    console.log("MongoDB Connected");
    // const response = await axios
    //   .get("https://status.spotify.dev/api/v2/status.json")
    //   .then((res) => res.data.status.indicator);

    // if (response === "major") {
    //   throw createError({
    //     statusCode: 503,
    //     statusMessage: "Spotify error: Spotify API is down",
    //   });
    // } else {
    //   console.log("Spotify API is up");
    // }
  } catch (err) {
    console.log(err);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
};
