import axios from "axios";
import { defineEventHandler, parseCookies } from "h3";
import type { Item } from "~/types/spotify-types";
import { List } from "./top.get";
import { User } from "../users/index.get";
import { ListWithTracks } from "~/types/list-types";
import { Rating } from "../ratings/index.get";

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

    //for all items
    await Promise.all(
      listWithOwnerName.tracks.map(async (track) => {
        //get all ratings for an item
        const itemRatings = await Rating.find({ itemId: track.id });
        //get avg rating

        const totalRating = itemRatings.reduce(
          (acc, curr) => acc + curr.rating,
          0
        );
        track.avgRating = totalRating / itemRatings.length;
        return track;
      })
    );
    return listWithOwnerName;
  }

  return list;

  //
});
