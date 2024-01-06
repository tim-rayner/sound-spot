import { UserSettings } from "~/types/user-types";
import { User } from "../index.get";

export default defineEventHandler(async (event) => {
  const { userId } = await readBody(event);

  //get user from database
  const user = await User.findOne({ _id: userId }).catch((err) => {
    throw createError({
      message: err.message,
      statusCode: 404,
    });
  });

  const userSettings: UserSettings = {
    userId: user._id,
    username: user.username,
    email: user.email,
    parentalControls: user.parentalControls ?? false,
    favouriteGenres: user.favouriteGenres,
  };
  return userSettings;
});
