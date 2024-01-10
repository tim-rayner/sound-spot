import type { iArtist } from "../artist-types";
import type { iDiscussion } from "../discussion-types";
import type { LastFmWikiArtist } from "../last-fm-types";

export interface Artist {
  artistData: iArtist;
  recommendations: iArtist[];
  artistInfo: LastFmWikiArtist;
  comments?: iDiscussion[];
}
