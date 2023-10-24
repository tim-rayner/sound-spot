import { useGenerateRandomString } from "~/composables/generateRandomString";
import queryString from "query-string";
//https://developer.spotify.com/documentation/web-api/tutorials/code-flow#_=_
const config = useRuntimeConfig();

var client_id = config.spotifyClientId;
var redirect_uri = "http://localhost:3000/";

export default defineEventHandler(async (event) => {
  if (event.method === "GET") {
    var state = useGenerateRandomString(16);
    var scope =
      "user-read-private user-read-email user-library-read user-library-modify user-top-read user-read-recently-played playlist-read-private playlist-read-collaborative playlist-modify-private";
    const url =
      "https://accounts.spotify.com/authorize?" +
      queryString.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      });
    return {
      redirect: {
        url,
      },
    };
  }
});
