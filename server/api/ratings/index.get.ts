import mongoose, { Schema, model } from "mongoose";

//define user schema
const ratingSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  rating: Number,
  comment: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  itemId: String, // this could be a track, artist, album, or playlist
  createdAt: String,
  itemType: String,
});

ratingSchema.pre("save", function (next) {
  if (!this._id) {
    this._id = new mongoose.Types.ObjectId();
  }
  // if (this.comment) {
  //   //TODO: sanitize comment
  // }
  next();
});

//define user model
export const Rating = model("Rating", ratingSchema);

export default defineEventHandler(async (event) => {
  const ratings = await Rating.find();
  return ratings;
});
