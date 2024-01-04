import axios from "axios";

export const useGetTrackInfo = async (
  trackName: string,
  artistName: string
) => {
  const config = useRuntimeConfig();

  const url = `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${config.lastFmKey}&artist=${artistName}&track=${trackName}&format=json`;

  const { data: info } = await axios.get(url);

  return info;
};
