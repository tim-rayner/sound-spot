import mongoose, { Schema, model } from "mongoose";

//define user schema
const userSchema = new Schema({
  username: String,
  email: String,
  profilePicture: String,
  countryCode: String,
  id: String,
  _id: mongoose.Schema.Types.ObjectId,
  parentalControls: Boolean, //if true, user can't access explicit content
  favouriteGenres: [String],
});

userSchema.pre("save", function (next) {
  if (!this._id) {
    this._id = new mongoose.Types.ObjectId();
  }
  if (this.parentalControls === undefined) {
    this.parentalControls = false;
  }
  next();
});

//define user model
export const User = model<any>("User", userSchema);

export default defineEventHandler(async (event) => {
  const users = await User.find();
  return users;
});
