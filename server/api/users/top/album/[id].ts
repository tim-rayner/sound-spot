import { Album } from "~/types/spotify-types";
import { Rating } from "~/server/api/ratings/index.get";
import axios from "axios";

export default defineEventHandler(async (event): Promise<Album[] | any> => {
  const userId = getRouterParam(event, "id");

  //this will eventually be owned lists, and liked lists (and maybe more)
  const { spotifyClientAccessToken } = parseCookies(event);

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
});
