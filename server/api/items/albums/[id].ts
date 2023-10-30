import axios from "axios";
import { Album } from "~/types/spotify-types";

export default defineEventHandler(async (event) => {
  // Grab the parameter from the route

  const id = getRouterParam(event, "id");
  const { spotifyClientAccessToken } = parseCookies(event);

  const spotifyResponse: Album = await axios
    .get(`https://api.spotify.com/v1/albums/${id}`, {
      headers: {
        Authorization: `Bearer ${spotifyClientAccessToken}`,
      },
    })
    .then((res) => {
      return res.data;
    });

  return spotifyResponse;
});
