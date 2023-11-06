import { Rating } from "./index.get";

export default defineEventHandler(async (event) => {
  const rating = await readBody(event);

  const newRating = new Rating(rating);

  try {
    await newRating.save();
    return newRating;
  } catch (err) {
    //  return throw error
    console.log(err);
    return err;
  }
});
