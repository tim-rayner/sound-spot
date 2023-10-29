import axios from "axios";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const { spotifyClientAccessToken } = parseCookies(event);

  if (!spotifyClientAccessToken) {
    const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        grant_type: "client_credentials",
      },
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          //@ts-ignore
          new Buffer.from(
            config.spotifyClientId + ":" + config.spotifyClientSecret
          ).toString("base64"),
      },
      json: true,
    };

    //get token
    const resposne = await axios.post(
      authOptions.url,
      new URLSearchParams(authOptions.form).toString(),
      {
        headers: authOptions.headers,
      }
    );

    const accessToken = resposne.data.access_token;
    //set cookie for future requests
    //TODO: implement refresh token
    setCookie(event, "spotifyClientAccessToken", accessToken);
  }
});
