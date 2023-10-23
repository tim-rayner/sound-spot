import { Schema, model } from "mongoose";

//define user schema
const songSchema = new Schema({
  name: String,
});

//define user model
export const Song = model<any>("Song", songSchema);

export default defineEventHandler(async (event) => {
  const songs = await Song.find();
  return songs;
});
