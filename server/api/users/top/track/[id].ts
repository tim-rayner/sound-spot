import axios from "axios";
import { Rating } from "~/server/api/ratings/index.get";
import { Item } from "~/types/spotify-types";

export default defineEventHandler(async (event): Promise<Item[]> => {
  const userId = getRouterParam(event, "id");
  //TODO: IMPLEMENT THIS PROPERLY, FOR NOW WE WILL UST USE THE ONLY RATINGS WE HAVE IN THE DB

  const { spotifyClientAccessToken } = parseCookies(event);

  if (!spotifyClientAccessToken || !userId) {
    return [];
  }

  return await getUserTopTracks(userId, spotifyClientAccessToken);
});

export const getUserTopTracks = async (
  userId: string,
  spotifyClientAccessToken: string
) => {
  //TODO: GET TOP RATINGS FROM DB WHERE ITEM TYPE IS TRACK
  const ratings = await Rating.find({ itemType: "track", user: userId });

  if (ratings.length === 0) {
    return []; // return empty array if user has no rated ratings
  }

  //delcare a variable which is a comma separated list of track ids in a single string
  const trackIds: string[] = [];

  ratings.forEach((rating) => {
    if (!trackIds.includes(rating.itemId)) trackIds.push(rating.itemId);
  });

  //FOR EACH RATING, GET THE ITEM FROM SPOTIFY
  const spotifyResponse = await axios
    .get("https://api.spotify.com/v1/tracks", {
      params: {
        ids: trackIds.join(","),
      },
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
  const items: Item[] = spotifyResponse.tracks;

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
};
