import { publicProfileData } from "~/types/user-types";

import { getUserTopTracks } from "../top/track/[id]";
import { getUserTopLists } from "../top/list/[id]";
import { User } from "../index.get";

export default defineEventHandler(async (event): Promise<publicProfileData> => {
  const { spotifyClientAccessToken } = parseCookies(event);
  const id = getRouterParam(event, "id");
  if (!id) return [];

  const user = await User.findOne({ _id: id }).catch((err) => {
    throw createError({
      message: err.message,
      statusCode: 404,
    });
  });

  const userTopTracks = await getUserTopTracks(id, spotifyClientAccessToken);
  const userTopLists = await getUserTopLists(id);

  const userProfile: publicProfileData = {
    userProfile: {
      username: user.username,
      profilePicture: user.profilePicture,
      countryCode: user.countryCode,
    },
    topTracks: userTopTracks,
    topArtists: [], //TODO
    topLists: userTopLists,
    followers: user.followers ?? 0,
    following: user.following ?? 0,
  };

  return userProfile;
});
