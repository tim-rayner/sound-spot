import { useGetTrackInfo } from "~/composables/getTrackInfo";
import { useGetArtistInfo } from "~/composables/getArtistInfo";
import { useGetAlbumInfo } from "~/composables/getAlbumInfo";

export default async function getAbout(
  id: string,
  name: string,
  type: string,
  artists: any[]
) {
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
