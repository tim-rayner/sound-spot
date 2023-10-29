<script setup lang="ts">
import axios from "axios";
import type { Tracks, Item } from "~/types/spotify-types.ts";

const props = defineProps<{
  spotlightSearch?: boolean;
}>();

const searchQuery = ref<string>("");
const searchResults = ref<Item[]>([]);
const searchLoading = ref<boolean>(false);
// interface SpotifyTrack {

const search = async () => {
  searchLoading.value = true;
  const { data: results } = await useFetch("/api/tracks/search", {
    method: "post",
    body: { query: searchQuery.value, type: "track" },
  });

  searchLoading.value = false;
  searchResults.value = results.value.tracks.items;
};

const fieldKeyPress = (event: any) => {
  if (event.key === "Enter") {
    search();
  }
};
</script>

<template>
  <div class="m-4">
    <div class="flex flex-row">
      <span class="p-float-label">
        <InputText
          id="search"
          v-model="searchQuery"
          :onKeypress="fieldKeyPress"
          :autofocus="true"
          class="rounded-r-none"
        />
        <label for="search">Search</label>
      </span>
      <Button @click="search" class="rounded-l-none" :loading="searchLoading"
        >Search</Button
      >
    </div>

    <div class="" v-if="!spotlightSearch">
      <ul v-if="searchResults.length" class="flex flex-col justify-between">
        <li v-for="result in searchResults" :key="result.id">
          <SongSearchResult :searchResult="result" />
        </li>
      </ul>
    </div>

    <div class="" v-else>
      <ul v-if="searchResults.length" class="flex flex-row my-12">
        <li
          v-for="result in searchResults"
          :key="result.id"
          class="w-[40vw] h-auto mx-2"
        >
          <SpotlightSearchResult :searchResult="result" />
        </li>
      </ul>
    </div>
  </div>
</template>
