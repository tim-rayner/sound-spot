import type { List } from "../list-types";
import type { Album, Artist, Item } from "../spotify-types";

export interface Profile {
  topTracks?: Item[];
  topArtists?: Artist[];
  topAlbums?: Album[];
  topLists?: List[];
}
