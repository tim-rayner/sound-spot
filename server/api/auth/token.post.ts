import axios from "axios";

export default defineEventHandler(async (event) => {
  const { url, form, headers } = await readBody(event);
  const { refresh_token } = parseCookies(event);
  const config = useAppConfig();

  //make post request to spotify api using url as the endpoint
  console.log("fetching token from Spotify");

  let requestForm = {
    ...form,
    client_id: config.spotifyClientId,
    client_secret: config.spotifyClientSecret,
    redirect_uri: form.redirect_uri,
    grant_type: "authorization_code",
  };

  if (refresh_token) {
    requestForm = {
      ...form,
      client_id: config.spotifyClientId,
      client_secret: config.spotifyClientSecret,
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    };
  }

  const response = await axios.post(
    url,
    new URLSearchParams(requestForm).toString(),
    {
      headers: headers,
    }
  );

  const accessToken = response.data.access_token;
  const refreshToken = response.data.refresh_token;

  return {
    status: 200,
    body: {
      accessToken,
      refreshToken,
    },
  };
});
