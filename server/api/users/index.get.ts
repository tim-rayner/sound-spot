import { Schema, model } from "mongoose";

//define user schema
const userSchema = new Schema({
  name: String,
  email: String,
});

//define user model
export const User = model<any>("User", userSchema);

export default defineEventHandler(async (event) => {
  const users = await User.find();
  return users;
});
