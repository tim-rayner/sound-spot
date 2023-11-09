import axios from "axios";
import { List } from "../../lists/top.get";
import mongoose from "mongoose";

//TODO: get playlist tracks from spotify, then build into a ListWithTracks object
export default defineEventHandler(async (event) => {
  const { playlist, userId } = await readBody(event);

  const { token } = parseCookies(event);

  //TODO: get playlist tracks from spotify
  const tracksUri = playlist?.tracks?.href;

  const trackList: string[] = await axios
    .get(tracksUri, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data.items.map((item) => item.track.id))
    .catch((error) => {
      throw createError({
        statusCode: error.response.status,
        statusMessage: "Spotify error: " + error.response.message,
      });
    });

  //create a List object
  const list = new List({
    name: playlist.name,
    owner: new mongoose.Types.ObjectId(userId),
    trackIds: trackList,
    coverPhoto: playlist.images[0].url,
    description: playlist.description,
    isPublic: true,
    createdAt: new Date().toISOString(),
  });

  try {
    await list.save();
    return list;
  } catch (err) {
    return {
      status: 500,
      body: "Error saving list, please try again later",
    };
  }
});
