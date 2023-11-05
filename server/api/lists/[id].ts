import axios from "axios";
import { defineEventHandler, parseCookies } from "h3";
import type { Item } from "~/types/spotify-types";
import { List } from "./top.get";
import { User } from "../users/index.get";
import { ListWithTracks } from "~/types/list-types";

export default defineEventHandler(async (event) => {
  // Grab the parameter from the route

  const id = getRouterParam(event, "id");

  const { spotifyClientAccessToken } = parseCookies(event);

  //get list by id
  const list = await List.findById(id);

  const owner = await User.findById(list?.owner);

  const tracksString = list?.trackIds.join(",");
  const tracks: Item[] = [];

  if (tracksString!.length > 0) {
    const response = await axios.get("https://api.spotify.com/v1/tracks", {
      params: {
        ids: tracksString,
      },
      headers: {
        Authorization: `Bearer ${spotifyClientAccessToken}`,
      },
    });
    response.data.tracks.forEach((track: Item) => {
      tracks.push(track);
    });
  }

  if (owner && list) {
    const listWithOwnerName: ListWithTracks = {
      ...list.toObject(),
      owner: owner?.username,
      tracks: tracks,
    };
    return listWithOwnerName;
  }

  return list;

  //
});
