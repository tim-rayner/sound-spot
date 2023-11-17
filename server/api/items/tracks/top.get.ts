import axios from "axios";
import { Rating } from "~/server/api/ratings/index.get";
import { Item } from "~/types/spotify-types";

export default defineEventHandler(async (event) => {
  //TODO: IMPLEMENT THIS PROPERLY, FOR NOW WE WILL UST USE THE ONLY RATINGS WE HAVE IN THE DB

  const { spotifyClientAccessToken } = parseCookies(event);

  if (!spotifyClientAccessToken) {
    return [];
  }

  //TODO: GET TOP RATINGS FROM DB WHERE ITEM TYPE IS TRACK
  const ratings = await Rating.find({ itemType: "track" });

  if (ratings.length === 0) return [];
  //FOR EACH RATING, GET THE ITEM FROM SPOTIFY
  const spotifyResponse = await axios
    .get("https://api.spotify.com/v1/playlists/37i9dQZF1DX0XUsuxWHRQd", {
      headers: {
        Authorization: `Bearer ${spotifyClientAccessToken} `,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw createError({
        statusCode: err.response.status,
        statusMessage: "Spotify error: " + err.response.statusText,
      });
    });

  //TODO: MERGE WITH RATING INFO FROM DB
  const items: Item[] = spotifyResponse.tracks.items.map(
    (item: any) => item.track
  );

  items.forEach((track: Item) => {
    const trackRatings = ratings.filter((rating) => rating.itemId === track.id);
    const totalRating = trackRatings.reduce(
      (acc, curr) => acc + curr.rating,
      0
    );
    track.avgRating = totalRating / trackRatings.length;
    track.ratings = trackRatings;
  });

  return items;
});
