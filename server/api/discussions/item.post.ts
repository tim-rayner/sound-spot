import mongoose, { Schema, model } from "mongoose";
import type { Discussion as iDiscussion } from "~/types/discussion-types";

const discussionSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  itemId: String,
  createdAt: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comments: [Object],
});

discussionSchema.pre("save", function (next) {
  if (!this._id) {
    this._id = new mongoose.Types.ObjectId();
  }
  next();
});

export const Discussion = model<any>("Discussion", discussionSchema);

export default defineEventHandler(async (event) => {
  const { discussion } = await readBody(event);
  Discussion.create(discussion);
});
