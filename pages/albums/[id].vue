<script setup lang="ts">
import { ref } from "vue";
import type { Album } from "~/types/spotify-types";

const route = useRoute();

const album = ref<Album>();

const { data: trackData } = await useFetch(
  `/api/items/albums/${route.params.id}`
);

if (trackData.value) {
  album.value = trackData.value;
}
</script>

<template>
  <div
    class="content container w-[1070px] mx-auto min-h-screen my-12 shadow-2xl rounded-lg"
  >
    <div class="flex flex-row header rounded-t-xl border">
      <div class="img rounded-full p-12 pr-0">
        <img
          :src="album?.images[0].url"
          :alt="album?.name"
          class="w-96 rounded-2xl"
        />
      </div>
      <div class="info mx-12 my-6 p-12 pl-6">
        <h1 class="text-4xl font-bold i flex">
          {{ album?.name }}
        </h1>

        <div>
          <small class="mt-3">{{ album?.release_date }} followers </small>
        </div>
      </div>
    </div>

    <!-- TODO: GET  SONGS FROM ALBUM -->
    <!-- <div class="flex flex-row my-12 mt-6 mx-4">
        <div
          v-for="song in artist.tracks"
          :key="song.id"
          class="w-[40vw] h-auto mx-2"
        >
          <SpotlightSearchResult :searchResult="song" />
        </div>
      </div> -->
  </div>
</template>
