import { useSpotifyStore } from "~/store/spotify";

export default defineNuxtPlugin((nuxtApp) => {
  const store = useSpotifyStore();

  const token = useCookie("token");

  const script = document.createElement("script");
  script.src = "https://sdk.scdn.co/spotify-player.js";
  script.async = true;

  document.body.appendChild(script);

  console.log("got token", token.value);

  window.onSpotifyWebPlaybackSDKReady = () => {
    const player = new window.Spotify.Player({
      name: "Web Playback SDK",
      getOAuthToken: (cb) => {
        cb(token.value);
      },
      volume: 0.5,
    });

    store.setPlayer(player);

    store.player.setName("SoundSpot Web Player");
    store.player.addListener("ready", ({ device_id }) => {
      //   console.log("Ready with Device ID", device_id);
    });

    store.player.addListener("not_ready", ({ device_id }) => {
      console.log("Device ID has gone offline", device_id);
    });

    store.player.addListener("player_state_changed", (state) => {
      if (!state) {
        return;
      }

      store.setTrack(state.track_window.current_track);
      store.setPaused(state.paused);

      store.player.getCurrentState().then((state) => {
        !state ? store.setActive(false) : store.setActive(true);
      });
    });

    store.player.connect();
  };
});
