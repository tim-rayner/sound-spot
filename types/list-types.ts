import type { Item } from "./spotify-types";

export interface List {
  _id: string;
  name: string;
  owner: string;
  trackIds: string[];
  coverPhoto: string;
}

export interface ListWithTracks {
  _id: string;
  name: string;
  owner: string;
  trackIds: string[];
  tracks: Item[];
  coverPhoto: string;
}
