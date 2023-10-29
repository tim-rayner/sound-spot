import axios from "axios";
import mongoose, { Schema, model } from "mongoose";
import { List as iList, ListWithTracks } from "~/types/list-types";
import { Item, Tracks } from "~/types/spotify-types";
import { User } from "../users/index.get";

//define user schema
const listSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  trackIds: [String],
  coverPhoto: String,
  description: String,
  isPublic: Boolean,
  createdAt: String,
  saves: Number,
  followers: [String],
});

listSchema.pre("save", function (next) {
  if (!this._id) {
    this._id = new mongoose.Types.ObjectId();
  }
  next();
});

//define user model
export const List = model<iList>("List", listSchema);

export default defineEventHandler(async (event) => {
  const { spotifyClientAccessToken } = parseCookies(event);

  if (!spotifyClientAccessToken) {
    // handle error
    return;
  }

  const lists = await List.find();

  // map lists to replace owner id with owners name from Users collection in each list
  const newLists = await Promise.all(
    lists.map(async (list) => {
      const owner = await User.findById(list.owner);
      const listWithOwnerName = {
        ...list.toObject(),
        owner: owner?.username,
      };
      return listWithOwnerName;
    })
  );

  return newLists;
});
