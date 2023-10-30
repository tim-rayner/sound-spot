import axios from "axios";
import { iArtist } from "~/types/artist-types";

export default defineEventHandler(async (event): Promise<iArtist> => {
  // Grab the parameter from the route

  const id = getRouterParam(event, "id");
  const { spotifyClientAccessToken } = parseCookies(event);

  const spotifyResponse: iArtist = await axios
    .get(`https://api.spotify.com/v1/artists/${id}`, {
      headers: {
        Authorization: `Bearer ${spotifyClientAccessToken}`,
      },
    })
    .then((res) => {
      return res.data;
    });

  return spotifyResponse;
});
