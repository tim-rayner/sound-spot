//TODO type a response object
import axios from "axios";
import { Rating } from "~/server/api/ratings/index.get";
import { Item } from "~/types/spotify-types";
import { List } from "../lists/top.get";
import { User } from "../users/index.get";

export default defineEventHandler(async (event) => {
  //TODO: IMPLEMENT THIS PROPERLY, FOR NOW WE WILL UST USE THE ONLY RATINGS WE HAVE IN THE DB
  const { spotifyClientAccessToken } = parseCookies(event);

  if (!spotifyClientAccessToken) {
    return [];
  }

  //GET TOP TRACKS
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
  const items: Item[] = spotifyResponse.tracks.items
    .slice(0, 5)
    .map((item: any) => item.track);

  items.forEach((track: Item) => {
    const trackRatings = ratings.filter((rating) => rating.itemId === track.id);
    const totalRating = trackRatings.reduce(
      (acc, curr) => acc + curr.rating,
      0
    );
    track.avgRating = totalRating / trackRatings.length;
    track.ratings = trackRatings;
  });

  //GET TOP LISTS
  const lists = await List.find();

  // map lists to replace owner id with owners name from Users collection in each list
  const newLists = await Promise.all(
    lists.map(async (list) => {
      const owner = await User.findById(list.owner);
      const listWithOwnerName = {
        ...list.toObject(),
        owner: owner?.username,
      };
      return listWithOwnerName;
    })
  );

  return { topTracks: items, topLists: newLists };
});
