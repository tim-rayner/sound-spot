import axios from "axios";

export default defineEventHandler(async (event) => {
  const { trackuri, action } = await readBody(event);
  const { token } = parseCookies(event);

  const response = await axios
    .put(
      "https://api.spotify.com/v1/me/player/play",
      {
        uris: [`${trackuri}`],
        offset: {
          position: 0,
        },
        position_ms: 0,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
    .catch((error) => {
      throw createError({
        statusCode: error.response.status,
        statusMessage: "Spotify error: " + error.response.message,
      });
    });

  return { trackId, action };
});
