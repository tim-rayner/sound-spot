import { Schema, model } from "mongoose";
import axios from "axios";
import { Rating } from "../ratings/index.get";
import { Album, Artist, Item } from "~/types/spotify-types";
import { defineEventHandler, parseCookies } from "h3";
import { SearchResponse } from "~/types/search-types";

//define user schema
const trackSchema = new Schema({
  name: String,
});

//define user model
export const Track = model<any>("Track", trackSchema);

export default defineEventHandler(async (event): Promise<SearchResponse> => {
  const { query } = await readBody(event);
  const { spotifyClientAccessToken } = parseCookies(event);
  if (query !== "") {
    //get  list from spotify
    const spotifyResponse = await axios
      .get("https://api.spotify.com/v1/search", {
        params: {
          q: query,
          type: "track,album,artist",
          limit: 4, //only return 4 results
        },
        headers: {
          Authorization: `Bearer ${spotifyClientAccessToken} `,
        },
      })
      .then((res) => {
        return res.data;
      });

    //merge with rating info from db
    const items = spotifyResponse.tracks.items;
    const albums = spotifyResponse.albums.items;
    const artists = spotifyResponse.artists.items;

    const ratings = await Rating.find();

    items.forEach((track: Item) => {
      const trackRatings = ratings.filter(
        (rating) => rating.itemId === track.id
      );
      const totalRating = trackRatings.reduce(
        (acc, curr) => acc + curr.rating,
        0
      );
      track.avgRating = totalRating / trackRatings.length;
      track.ratings = trackRatings;
    });

    //merge with rating info from db
    albums.forEach((album: Album) => {
      const albumRatings = ratings.filter(
        (rating) => rating.itemId === album.id
      );
      const totalRating = albumRatings.reduce(
        (acc, curr) => acc + curr.rating,
        0
      );
      album.avgRating = totalRating / albumRatings.length;
      album.ratings = albumRatings;
    });

    //merge with rating info from db
    artists.forEach((artist: Artist) => {
      const artistRatings = ratings.filter(
        (rating) => rating.itemId === artist.id
      );
      const totalRating = artistRatings.reduce(
        (acc, curr) => acc + curr.rating,
        0
      );
      artist.avgRating = totalRating / artistRatings.length;
      artist.ratings = artistRatings;
    });

    //TODO: return tracks, albums, and artists
    const searchResponse: SearchResponse = {
      //return items, albums, and artists
      items: [...items, ...albums, ...artists].splice(0, 4),
    };

    return searchResponse;
  }

  //return nothing if no query
  throw new Error("No query provided");
});
