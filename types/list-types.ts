import type { Item } from "./spotify-types";

export interface List {
  _id: string;
  name: string;
  owner?: string;
  trackIds?: string[];
  coverPhoto: string;
  description: String;
  isPublic: Boolean;
  createdAt?: String;
  saves?: Number;
  followers?: [String];
}

export interface ListWithTracks {
  _id: string;
  name: string;
  owner: string;
  trackIds: string[];
  tracks: Item[];
  coverPhoto: string;
  description: String;
  isPublic: Boolean;
  createdAt: String;
  saves: Number;
  followers: [String];
}
