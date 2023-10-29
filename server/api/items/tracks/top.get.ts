import type { Item, Rating as iRating } from "~/types/spotify-types";
import { Rating } from "../../ratings/index.get";
import axios from "axios";
const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  //TODO: IMPLEMENT THIS PROPERLY, FOR NOW WE WILL UST USE THE ONLY RATINGS WE HAVE IN THE DB

  const { spotifyClientAccessToken } = parseCookies(event);
  let token = spotifyClientAccessToken;

  //GET TOP RATINGS FROM DB
  const ratings = await Rating.find({ itemType: "track" });

  //delcare a variable which is a comma separated list of track ids in a single string
  const trackIds = ratings.map((rating) => rating.itemId).join(",");

  if (ratings.length === 0) return [];
  //FOR EACH RATING, GET THE ITEM FROM SPOTIFY
  const spotifyResponse = await axios
    .get("https://api.spotify.com/v1/tracks", {
      params: {
        ids: trackIds,
      },
      headers: {
        Authorization: `Bearer ${token} `,
      },
    })
    .then((res) => {
      return res.data;
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
});
