import type { List } from "./list-types";
import type { Artist, Item } from "./spotify-types";

export interface iUser {
  _id: string;
  id: string;
  username: string;
  email: string;
  profilePicture: string;
  countryCode: string;
}

export interface publicUserProfile {
  username: string;
  profilePicture: string;
  countryCode: string;
}

export interface publicProfileData {
  userProfile: publicUserProfile;
  topTracks: Array<Item>;
  topArtists: Array<Artist>;
  topLists: Array<List>;
  followers: number;
  following: number;
  //isFollowing: boolean;
}

export interface RatingUserAggr {
  _id: string;
  count: number;
  avg: number;
  user: iUser[];
}

export interface UserSettings {
  userId: string;
  username: string;
  email: string;
  parentalControls: boolean;
  favouriteGenres: string[];
}
