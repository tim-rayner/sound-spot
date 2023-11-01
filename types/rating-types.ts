import type mongoose from "mongoose";

/**
 * @description Rating is used as a database object. Use iRating for the response object.
 */
export interface Rating {
  rating: number;
  comment: string;
  user: mongoose.Types.ObjectId; // this is the user who made the rating as spotify user id
  itemId: string; // this could be a track, artist, album, or playlist
  createdAt: string;
  itemType: string;
  username?: string;
  userProfilePicture?: string;
}

/**
 * @description iRating is used as a response object. Use Rating for the database object.
 */
export interface iRating {
  rating: number;
  comment: string;
  user: mongoose.Types.ObjectId; // this is the user who made the rating as spotify user id
  itemId: string; // this could be a track, artist, album, or playlist
  createdAt: string;
  itemType: string;
  username: string;
  userProfilePicture: string;
}
