import mongoose, { Schema, model } from "mongoose";

//define user schema
const artistSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  image: String,
  genres: [String],
  popularity: Number,
  followers: Number,
});

artistSchema.pre("save", function (next) {
  if (!this._id) {
    this._id = new mongoose.Types.ObjectId();
  }
  next();
});

//define user model
export const Artist = model("Artist", artistSchema);

export default defineEventHandler(async (event) => {
  const ratings = await Artist.find();
  return ratings;
});
