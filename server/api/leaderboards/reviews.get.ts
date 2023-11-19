import { RatingUserAggr } from "~/types/user-types";
import { Rating } from "../ratings/index.get";

//TODO type a response object

export default defineEventHandler(async (event): Promise<RatingUserAggr[]> => {
  // aggregate data using mongoose to get the 10 users with the most reviews, this must return username, profile picture
  const aggregate: RatingUserAggr[] = await Rating.aggregate([
    {
      $group: {
        _id: "$user",
        count: { $sum: 1 },
        //avg rating needs to be all ratings with the same user divided by the count
        avg: { $avg: "$rating" },
      },
    },
    { $sort: { count: -1 } },
    { $limit: 10 },
  ])
    .lookup({
      from: "users",
      localField: "_id",
      foreignField: "_id",
      as: "user",
      //only take first
    })
    .project({
      _id: 1,
      count: 1,
      avg: 1,
      user: { $arrayElemAt: ["$user", 0] },
    });

  return aggregate;
});
