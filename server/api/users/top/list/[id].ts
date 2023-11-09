import { useRoute } from "vue-router";
import { List } from "../../../lists/top.get";
import { User } from "../../index.get";
import type { List as iList } from "~/types/list-types";

export default defineEventHandler(async (event): Promise<iList[]> => {
  const userId = getRouterParam(event, "id");

  //this will eventually be owned lists, and liked lists (and maybe more)
  const { spotifyClientAccessToken } = parseCookies(event);

  if (!spotifyClientAccessToken) {
    // handle error
    return [];
  }
  {
    owner: userId;
  }
  const lists = await List.find({ owner: userId });

  // map lists to replace owner id with owners name from Users collection in each list
  const newLists = await Promise.all(
    lists.map(async (list) => {
      const owner = await User.findById(list.owner);
      const listWithOwnerName = {
        ...list.toObject(),
        owner: owner?.username,
      };
      return listWithOwnerName;
    })
  );

  return newLists;
});
