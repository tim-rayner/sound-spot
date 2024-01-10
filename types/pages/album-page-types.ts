import type { iDiscussion } from "../discussion-types";
import type { LastFmWikiAlbum } from "../last-fm-types";
import type { Album as iAlbum } from "../spotify-types";

export interface Album {
  AlbumData: iAlbum;
  recommendations: iAlbum[];
  AlbumInfo: LastFmWikiAlbum;
  comments?: iDiscussion[];
}
