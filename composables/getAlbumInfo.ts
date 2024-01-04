import axios from "axios";

export const useGetAlbumInfo = async (
  albumName: string,
  artistName: string
) => {
  const config = useRuntimeConfig();

  const url = `https://ws.audioscrobbler.com/2.0/?method=album.getInfo&api_key=${config.lastFmKey}&artist=${artistName}&album=${albumName}&format=json`;

  const { data: info } = await axios.get(url);

  return info;
};
