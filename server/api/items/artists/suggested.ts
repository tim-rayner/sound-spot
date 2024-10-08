import { Artist, Item } from "~/types/spotify-types";
import axios from "axios";
import { defineEventHandler } from "h3";
import { Rating } from "../../ratings/index.get";

export default defineEventHandler(async (event): Promise<Artist[]> => {
  const { artist } = await readBody(event);
  const { spotifyClientAccessToken } = parseCookies(event);

  const recommendations: Artist[] = await axios
    .get(`https://api.spotify.com/v1/artists/${artist.id}/related-artists`, {
      headers: {
        Authorization: `Bearer ${spotifyClientAccessToken}`,
      },
    })
    .then((res) => {
      return res.data.artists;
    })
    .catch((err) => {
      throw createError({
        statusCode: err.response.status,
        statusMessage: "Spotify error: " + err.response.statusText,
      });
    });

  recommendations.splice(5, recommendations.length).map(async (artist) => {
    //get all ratings for an item
    const itemRatings = await Rating.find({ itemId: artist.id });
    //get avg rating

    const totalRating = itemRatings.reduce((acc, curr) => acc + curr.rating, 0);

    artist.avgRating = totalRating / itemRatings.length;
    return artist;
  });

  return recommendations;
});
