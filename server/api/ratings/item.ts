import mongoose, { Schema, model } from "mongoose";
import { Rating } from "./index.get";
import { iRating } from "~/types/rating-types";

//get all ratings for an item
export default defineEventHandler(async (event): Promise<iRating[]> => {
  const id = getRouterParam(event, "id");

  const itemRatings: iRating[] = await Rating.find({ itemId: id });

  return itemRatings;
});
