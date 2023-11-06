import mongoose, { Schema, model } from "mongoose";
import { Rating } from "./index.get";
import { iRating } from "~/types/rating-types";
import { User } from "../users/index.get";

//get all ratings for an item
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const test = {};
  const itemRatings: iRating[] = await Rating.find({ itemId: id });

  //for each itemRating, get the user who made the rating and map to iRating
  itemRatings.map(async (itemRating) => {
    const user = await User.findById({ user: { _id: itemRating.userId } });

    // itemRating.username = user.username;
    // itemRating.userProfilePicture = user.profilePicture;
  });

  return test;
});
