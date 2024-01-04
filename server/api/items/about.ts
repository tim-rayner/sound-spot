import { useGetTrackInfo } from "~/composables/getTrackInfo";
import { useGetArtistInfo } from "~/composables/getArtistInfo";
import type { LastFmWikiTrack, LastFmWikiArtist } from "~/types/last-fm-types";

export default defineEventHandler(
  async (event): Promise<LastFmWikiTrack | LastFmWikiArtist> => {
    const { id, name, type, artists } = await readBody(event);

    if (type == "track") {
      return await useGetTrackInfo(name, artists[0].name).then((res) => {
        return res?.track?.wiki ?? null;
      });
    } else if (type === "artist") {
      return await useGetArtistInfo(name).then((res) => {
        return res.artist?.bio ?? null;
      });
    }
  }
);
