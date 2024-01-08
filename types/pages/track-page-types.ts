import type { iDiscussion } from "../discussion-types";
import type { LastFmWikiTrack } from "../last-fm-types";
import type { Item } from "../spotify-types";

export interface Track {
  trackData: Item;
  recommendations: Item[];
  trackInfo: LastFmWikiTrack;
  comments: iDiscussion[];
}
