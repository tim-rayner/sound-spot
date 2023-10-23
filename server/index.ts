import { Nitro } from "nitropack";
import mongoose from "mongoose";

//synchronous function to excecute every time the web application is started; to ensure MongoDB is connected
export default async (_nitroApp: Nitro) => {
  const config = useRuntimeConfig();
  try {
    //create mongodb connectionx
    await mongoose.connect(config.mongodbUri);
    console.log("MongoDB Connected");
  } catch (err) {
    console.log(err);
  }
};
