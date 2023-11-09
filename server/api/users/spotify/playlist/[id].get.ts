import axios from "axios";
import type { Playlist } from "~/types/spotify-types";

export default defineEventHandler(async (event): Promise<Playlist> => {
  const userId = getRouterParam(event, "id");

  const { token } = parseCookies(event);

  const spotifyPlaylists = await axios
    .get(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      params: {
        limit: 50,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      throw createError({
        statusCode: error.response.status,
        statusMessage: "Spotify error: " + error.response.message,
      });
    });

  return spotifyPlaylists;
});
