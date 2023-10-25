import axios from "axios";

export default defineEventHandler(async (event) => {
  const { url, form, headers } = await readBody(event);
  //make post request to spotify api using url as the endpoint
  console.log("fetching token from Spotify");

  const response = await axios.post(url, new URLSearchParams(form).toString(), {
    headers: headers,
  });

  const accessToken = response.data.access_token;

  //make an axios get request to 'https://api.spotify.com/v1/me' and include the access token as a bearer token in the header

  // const test = await axios
  //   .get("https://api.spotify.com/v1/me", {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   })
  //   .then((response) => {
  //     //@ts-ignore
  //     return response.data;
  //   });

  return accessToken;
});
