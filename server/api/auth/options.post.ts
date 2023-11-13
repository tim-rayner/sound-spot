const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const { code, state } = await readBody(event);
  if (!state) {
    return {
      status: 400,
      body: "State not found",
    };
  }
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri: config.spotifyRedirectUri,
      grant_type: "authorization_code",
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
  return authOptions;
});
