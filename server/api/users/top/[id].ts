import axios from "axios";
import { Rating } from "~/server/api/ratings/index.get";
import { Album, Item } from "~/types/spotify-types";
import { List } from "../../lists/top.get";
import { User } from "../index.get";
import { Profile } from "~/types/pages/profile-page-types";

export default defineEventHandler(async (event): Promise<Profile | null> => {
  const userId = getRouterParam(event, "id");
  //TODO: IMPLEMENT THIS PROPERLY, FOR NOW WE WILL UST USE THE ONLY RATINGS WE HAVE IN THE DB

  const { spotifyClientAccessToken } = parseCookies(event);

  if (!spotifyClientAccessToken || !userId) {
    return null;
  }

  const topTracks = await getUserTopTracks(userId, spotifyClientAccessToken);
  const topAlbums = await getUserTopAlbums(userId, spotifyClientAccessToken);
  const topLists = await getUserTopLists(userId);

  return { topTracks, topAlbums, topLists };
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

export const getUserTopLists = async (userId: string) => {
  const lists = await List.find({ owner: userId });

  if (lists.length === 0) {
    return []; // return empty array if user has no lists
  }
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

  return newLists;
};

export const getUserTopAlbums = async (
  userId: string,
  spotifyClientAccessToken: string
) => {
  if (!spotifyClientAccessToken) {
    // handle error
    return [];
  }

  //TODO: eventually this data will be pulled from users Liked list where type is album
  const usersRatedAlbums = await Rating.find({
    itemType: "album",
    user: userId,
  });

  if (usersRatedAlbums.length === 0) {
    return []; // return empty array if user has no rated albums
  }

  const albumIds = usersRatedAlbums.map((rating) => rating.itemId);

  const spotifyAlbums: Album[] = await axios
    .get("https://api.spotify.com/v1/albums", {
      params: {
        ids: albumIds.join(","),
      },
      headers: {
        Authorization: `Bearer ${spotifyClientAccessToken} `,
      },
    })
    .then((res) => {
      return res.data.albums;
    })
    .catch((err) => {
      throw createError({
        statusCode: err.response.status,
        statusMessage: "Spotify error: " + err.response.statusText,
      });
    });

  //apply ratings to albums

  await Promise.all(
    spotifyAlbums.map(async (album: Album) => {
      //get all ratings for an item
      const itemRatings = await Rating.find({ itemId: album.id });
      //get avg rating

      const totalRating = itemRatings.reduce(
        (acc, curr) => acc + curr.rating,
        0
      );

      album.avgRating = totalRating / itemRatings.length;
      return album;
    })
  );

  return spotifyAlbums;
};
