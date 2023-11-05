import mongoose from "mongoose";
import { List } from "./top.get";

export default defineEventHandler(async (event) => {
  const newList = await readBody(event);

  const list = new List({
    name: newList.name,
    owner: new mongoose.Types.ObjectId(newList.owner),
    trackIds: newList.trackIds,
    coverPhoto: newList.coverPhoto,
    description: newList.description,
    isPublic: newList.isPublic,
    createdAt: newList.createdAt,
  });

  try {
    await list.save();
    return list;
  } catch (err) {
    return {
      status: 500,
      body: "Error saving list, please try again later",
    };
  }
});
