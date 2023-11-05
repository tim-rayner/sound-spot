import { useGenerateRandomString } from "~/composables/generateRandomString";
import queryString from "query-string";
import { User } from "~/server/api/users/index.get";
import mongoose from "mongoose";

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
  if (event.method === "POST") {
    const spotifyUser = await readBody(event);
    const user = await User.findOne({ uri: spotifyUser.uri });

    //if user found, return user
    if (!user) {
      const newUser = new User({
        username: spotifyUser.display_name,
        profilePicture: spotifyUser.images[1].url,
        email: spotifyUser.email,
        countryCode: spotifyUser.country,
        uri: spotifyUser.uri,
      });

      try {
        await newUser.save();
        return newUser;
      } catch (err) {
        return {
          status: 500,
          body: "Error saving user, please try again later",
        };
      }
    }

    return user;
    //if no user found, add user to db
  }
});
