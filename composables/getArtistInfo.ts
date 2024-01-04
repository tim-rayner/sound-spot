import axios from "axios";

export const useGetArtistInfo = async (artistName: string) => {
  const config = useRuntimeConfig();

  const url = `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&api_key=${config.lastFmKey}&artist=${artistName}&format=json`;

  const { data: info } = await axios.get(url);

  return info;
};
