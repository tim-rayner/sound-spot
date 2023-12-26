import { User } from "../users/index.get";
import { Discussion } from "./item.post";

export default defineEventHandler(async (event) => {
  // Grab the parameter from the route
  const id = getRouterParam(event, "id");

  let comments = await Discussion.find({ itemId: id });

  //for each comment, get the user who made the comment and map to iDiscussion
  comments = await Promise.all(
    comments.map(async (comment) => {
      const owner = await User.findById(comment.owner);
      return {
        _id: comment._id,
        itemId: comment.itemId,
        owner: comment.owner,
        createdAt: comment.createdAt,
        comments: comment.comments,
        ownerName: owner.username,
        ownerImage: owner.profilePicture,
        ownerId: owner._id,
      };
    })
  );
  return comments;
});
