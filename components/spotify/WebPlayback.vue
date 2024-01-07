<template>
  <div class="absolute border right-0 bottom-0 p-5" v-if="store.is_active">
    <div class="flex flex-col items-center text-center">
      <div id="media-player-album-art">
        <img
          :src="store.current_track.album.images[0].url"
          class="now-playing__cover h-32"
          alt=""
        />
      </div>
      <div id="media-player-track-info">
        <div class="now-playing__name">{{ store.current_track.name }}</div>
        <div class="now-playing__artist">
          {{ store.current_track.artists[0].name }}
        </div>
      </div>
      <div id="media-player-playback"></div>
      <div id="media-player-controls">
        <div class="track-controls">
          <Button
            class="btn-spotify"
            @click="store.player.previousTrack()"
            label="<"
            size="small"
          />

          <Button
            class="btn-spotify"
            @click="store.player.togglePlay()"
            :label="store.is_paused ? 'PLAY' : 'PAUSE'"
            size="small"
          />

          <Button
            class="btn-spotify"
            @click="store.player.nextTrack()"
            label=">"
            size="small"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSpotifyStore } from "~/store/spotify";

const store = useSpotifyStore();
</script>
