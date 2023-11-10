import axios from "axios";
import { Item } from "~/types/spotify-types";

export default defineEventHandler(async (event): Promise<Item> => {
  const { token } = parseCookies(event);

  const response: Item = await axios
    .get("https://api.spotify.com/v1/me/player/currently-playing", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw createError({
        statusCode: err.response.status,
        statusMessage: "Spotify error: " + err.response.statusText,
      });
    });

  return response;
});
