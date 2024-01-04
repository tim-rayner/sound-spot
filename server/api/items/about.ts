import { useGetTrackInfo } from "~/composables/getTrackInfo";
import { useGetArtistInfo } from "~/composables/getArtistInfo";
import type {
  LastFmWikiTrack,
  LastFmWikiArtist,
  LastFmWikiAlbum,
} from "~/types/last-fm-types";
import { useGetAlbumInfo } from "../../../composables/getAlbumInfo";

export default defineEventHandler(
  async (
    event
  ): Promise<LastFmWikiTrack | LastFmWikiArtist | LastFmWikiAlbum | null> => {
    const { id, name, type, artists } = await readBody(event);

    if (type == "track") {
      return await useGetTrackInfo(name, artists[0].name).then((res) => {
        return res?.track?.wiki ?? null;
      });
    } else if (type === "artist") {
      return await useGetArtistInfo(name).then((res) => {
        return res.artist?.bio ?? null;
      });
    } else if (type === "album") {
      return await useGetAlbumInfo(name, artists[0].name).then((res) => {
        return res.album?.wiki ?? null;
      });
    }
    return null;
  }
);
