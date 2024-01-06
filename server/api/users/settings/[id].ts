import { User } from "../index.get";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const { userSettings } = await readBody(event);

  //get user from database
  const user = await User.findOne({ _id: id }).catch((err) => {
    throw createError({
      message: err.message,
      statusCode: 404,
    });
  });

  //update user settings
  user.parentalControls = userSettings.parentalControls;
  user.favouriteGenres = userSettings.favouriteGenres;
  await user.save();

  return user;
});
