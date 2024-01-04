import { useGetTrackInfo } from "~/composables/getTrackInfo";
import { LastFmWiki } from "~/types/last-fm-types";

export default defineEventHandler(async (event): Promise<LastFmWiki> => {
  const { id, name, type, artists } = await readBody(event);

  return await useGetTrackInfo(name, artists[0].name).then((res) => {
    return res?.track?.wiki ?? null;
  });
});
