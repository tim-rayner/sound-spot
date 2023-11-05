import mongoose, { Schema, model } from "mongoose";

//define user schema
const userSchema = new Schema({
  username: String,
  email: String,
  profilePicture: String,
  countryCode: String,
  uri: String,
  _id: mongoose.Schema.Types.ObjectId,
});

userSchema.pre("save", function (next) {
  if (!this._id) {
    this._id = new mongoose.Types.ObjectId();
  }
  next();
});

//define user model
export const User = model<any>("User", userSchema);

export default defineEventHandler(async (event) => {
  const users = await User.find();
  return users;
});
