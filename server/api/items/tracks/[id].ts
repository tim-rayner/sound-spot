import axios from "axios";
import { defineEventHandler, H3Event, parseCookies, setCookie } from "h3";
import type { Item } from "~/types/spotify-types";
import { Rating } from "../../ratings/index.get";
import { User } from "../../users/index.get";
import { iRating } from "~/types/rating-types";
import getAbout from "~/helpers/getAboutInfo";
import { Discussion } from "../../discussions/item.post";
import { Track } from "~/types/pages/track-page-types";

export default defineEventHandler(async (event): Promise<Track> => {
  // Grab the parameter from the route

  const id = getRouterParam(event, "id");
  const { spotifyClientAccessToken } = parseCookies(event);

  //GET TRACK DATA
  //get all ratings from db for this track
  const ratings: iRating[] = await Rating.find({ itemId: id });

  const spotifyResponse = await axios
    .get(`https://api.spotify.com/v1/tracks/${id}`, {
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

  const totalRating = ratings.reduce((acc, curr) => acc + curr.rating, 0);
  spotifyResponse.avgRating = Number(
    (totalRating / ratings.length).toFixed(1)
  ).toString();

  spotifyResponse.ratings = await Promise.all(
    ratings.map(async (itemRating: iRating) => {
      const user = await User.findById(itemRating.user._id);
      return {
        comment: itemRating.comment,
        rating: itemRating.rating,
        createdAt: itemRating.createdAt,
        itemType: itemRating.itemType,
        //
        userId: user._id,
        username: user.username,
        userProfilePicture: user.profilePicture,
      };
    })
  );

  // return spotifyResponse;

  //GET SUGGESTED TRACKS
  const artistIds = spotifyResponse.album.artists.map((artist) => artist.id);
  const trackId = spotifyResponse.id;

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

  //GET TRACK INFO
  const trackInfoResp = await getAbout(
    trackId,
    spotifyResponse.name,
    "track",
    spotifyResponse.artists
  );

  //GET DISCUSSIONS
  let comments = await Discussion.find({ itemId: id });

  //for each comment, get the user who made the comment and map to iDiscussion
  comments = await Promise.all(
    comments.map(async (comment) => {
      const owner = await User.findById(comment.owner);
      return {
        _id: comment._id,
        itemId: comment.itemId,
        owner: comment.owner,
        createdAt: comment.createdAt,
        comments: comment.comments,
        ownerName: owner.username,
        ownerImage: owner.profilePicture,
        ownerId: owner._id,
      };
    })
  );

  return {
    trackData: spotifyResponse,
    recommendations,
    trackInfo: trackInfoResp,
    comments,
  };
});
