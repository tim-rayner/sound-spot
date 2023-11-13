import { publicUserProfile } from "~/types/user-types";
import { User } from "./index.get";

export default defineEventHandler(async (event): Promise<publicUserProfile> => {
  const id = getRouterParam(event, "id");

  const user = await User.findOne({ _id: id }).catch((err) => {
    throw createError({
      message: err.message,
      statusCode: 404,
    });
  });

  const userProfile: publicUserProfile = {
    username: user.username,
    profilePicture: user.profilePicture,
    countryCode: user.countryCode,
  };

  return userProfile;
});
