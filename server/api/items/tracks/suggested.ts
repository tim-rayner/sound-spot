import { Item } from "~/types/spotify-types";
import axios from "axios";
import { Rating } from "../../ratings/index.get";

export default defineEventHandler(async (event): Promise<Item[]> => {
  const { track } = await readBody(event);
  const { spotifyClientAccessToken } = parseCookies(event);
  //const albumId = track.album.id;
  const artistIds = track.album.artists.map((artist) => artist.id);
  const trackId = track.id;

  // const artistGenres: String[] = await axios
  //   .get(`https://api.spotify.com/v1/artists/${artistIds[0]}`, {
  //     headers: {
  //       Authorization: `Bearer ${spotifyClientAccessToken}`,
  //     },
  //   })
  //   .then((res) => {
  //     return res.data.genres;
  //   });

  //get recommendations based on artist genres
  const recommendations: Item[] = await axios
    .get("https://api.spotify.com/v1/recommendations", {
      params: {
        seed_artists: artistIds,
        seed_tracks: trackId,
        limit: 4,
      },
      headers: {
        Authorization: `Bearer ${spotifyClientAccessToken}`,
      },
    })
    .then((res) => {
      return res.data.tracks;
    })
    .catch((err) => {
      throw createError({
        statusCode: err.response.status,
        statusMessage: "Spotify Error: " + err.response.statusText,
      });
    });

  await Promise.all(
    recommendations.map(async (track) => {
      //get all ratings for an item
      const itemRatings = await Rating.find({ itemId: track.id });
      //get avg rating

      const totalRating = itemRatings.reduce(
        (acc, curr) => acc + curr.rating,
        0
      );

      track.avgRating = totalRating / itemRatings.length;
      return track;
    })
  );

  return recommendations;
});
