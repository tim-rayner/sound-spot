import axios from "axios";
import type { ListWithTracks } from "~/types/list-types";

export default defineEventHandler(async (event) => {
  const { list, userId } = await readBody(event);

  const parsedList: ListWithTracks = list;

  const { token } = parseCookies(event);

  const newPlaylist = await axios
    .post(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        name: parsedList.name,
        description: parsedList.description,
        public: false,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw createError({
        statusCode: error.response.status,
        statusMessage: "Spotify error: " + error.response.message,
      });
    });

  //now get all the tracks and add them to the playlist
  const trackUris = parsedList.tracks.map((track) => {
    return track.uri;
  });

  const response = await axios
    .post(
      `https://api.spotify.com/v1/playlists/${newPlaylist.id}/tracks`,

      {
        uris: trackUris,
        position: 0,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw createError({
        statusCode: error.response.status,
        statusMessage: "Spotify error: " + error.response.message,
      });
    });

  return response;
});
