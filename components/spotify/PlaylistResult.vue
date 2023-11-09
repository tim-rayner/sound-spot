<script setup lang="ts">
import type { Playlist } from "~/types/spotify-types";

const emit = defineEmits(["playlistSelected"]);
const props = defineProps<{
  playlists: Playlist;
}>();
</script>

<template>
  <div class="flex flex-row bg-slate-500 rounded-xl text-white mt-4">
    <div class="info float-left align-middle my-auto flex-wrap">
      <h4 class="p-2">{{ playlists?.name }}</h4>
    </div>
    <div class="float-right ml-auto">
      <Button label="Add" @click="emit('playlistSelected', playlists ?? {})" />
    </div>
  </div>
</template>
