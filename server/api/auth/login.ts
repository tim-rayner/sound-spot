import { useGenerateRandomString } from "~/composables/generateRandomString";
import queryString from "query-string";
import { User } from "~/server/api/users/index.get";

const config = useRuntimeConfig();

var client_id = config.spotifyClientId;
var redirect_uri = config.spotifyRedirectUri;

export default defineEventHandler(async (event) => {
  if (event.method === "GET") {
    var state = useGenerateRandomString(16);
    var scope =
      "user-read-private user-read-email user-library-read user-library-modify user-top-read user-read-recently-played playlist-read-private playlist-read-collaborative playlist-modify-private user-read-currently-playing";
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
    try {
      const user = await User.findOne({ id: spotifyUser.id });
      console.log(user);
      //if user found, return user
      if (!user) {
        console.log("no user found");
        const newUser = new User({
          username: spotifyUser.display_name,
          profilePicture: spotifyUser?.images[1]?.url ?? null,
          email: spotifyUser?.email,
          countryCode: spotifyUser?.country,
          id: spotifyUser.id,
          parentralControls: false,
          favouriteGenres: [],
        });

        try {
          await newUser.save();
          return newUser;
        } catch (err) {
          return {
            status: 500,
            body: `Server error: ${err}`,
          };
        }
      } else {
        user.username = spotifyUser.display_name;
        user.profilePicture = spotifyUser.images[1]?.url ?? null;
        user.email = spotifyUser.email;
        await user.save();
      }

      return user;
    } catch (err) {
      return {
        status: 500,
        body: `Server error: ${err}`,
      };
    }
    //if no user found, add user to db
  }
});
