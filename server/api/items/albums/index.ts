import mongoose, { Schema, model } from "mongoose";

//define user schema
const albumSchema = new Schema({
  album_type: String,
  artists: [String],
  available_markets: [String],
  external_urls: [String],
  href: String,
  id: String,
  images: [String],
  name: String,
  release_date: String,
  release_date_precision: String,
  total_tracks: Number,
  type: String,
  uri: String,
});

albumSchema.pre("save", function (next) {
  if (!this._id) {
    this._id = new mongoose.Types.ObjectId();
  }
  next();
});

//define user model
export const Album = model("Album", albumSchema);

export default defineEventHandler(async (event) => {
  const albums = await Album.find();
  return albums;
});
