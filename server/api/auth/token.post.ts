import axios from "axios";

export default defineEventHandler(async (event) => {
  const { url, form, headers } = await readBody(event);
  //make post request to spotify api using url as the endpoint
  console.log("fetching token from Spotify");

  const response = await axios.post(url, new URLSearchParams(form).toString(), {
    headers: headers,
  });

  const accessToken = response.data.access_token;

  return accessToken;
});
