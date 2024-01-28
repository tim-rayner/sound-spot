<script setup lang="ts">
import { defineProps } from "vue";
import type { Artist } from "~/types/spotify-types";

const router = useRouter();

export type AlbumTrack = {
  name: string;
  artists: Artist[];
  duration_ms: number;
  track_number: number;
  id: string;
};

const props = defineProps<AlbumTrack>();

const formatDuration = (duration: number): string => {
  const minutes = Math.floor(duration / 60000);
  const seconds = Math.floor((duration % 60000) / 1000);
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

const artists = computed(() => {
  return props.artists.map((artist) => artist.name).join(", ");
});
</script>

<template>
  <div
    class="flex cursor-pointer hover:bg-[rgba(0,0,0,0.25)] transition-all duration-300 ease-in-out px-5 py-5 rounded-md border border-gray-500 border-opacity-10"
    @click="router.push(`/tracks/${props.id}`)"
  >
    <div class="flex items-center">
      <span class="text-gray-500">{{ props.track_number }}</span>
      <svg
        class="w-6 h-6 text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- SVG icon for track number -->
      </svg>
    </div>
    <div class="flex-grow ml-4">
      <h3 class="text-gray-900">{{ props.name }}</h3>
      <p class="text-gray-500">{{ artists }}</p>
    </div>
    <div class="text-gray-500">
      {{ formatDuration(props.duration_ms) }}
    </div>
  </div>
</template>
