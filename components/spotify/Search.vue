<script setup lang="ts">
import axios from "axios";
import type { Tracks, Item } from "~/types/spotify-types.ts";

const searchQuery = ref<string>("");
const searchResults = ref<Item[]>([]);
// interface SpotifyTrack {

const search = async () => {
  const { data: results } = await useFetch("/api/tracks/search", {
    method: "post",
    body: { query: searchQuery.value, type: "track" },
  });

  searchResults.value = results.value.tracks.items;
  console.log(searchResults.value);
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
      <Button @click="search" class="rounded-l-none">Search</Button>
    </div>

    <pre> Result: </pre>

    <div class="">
      <ul v-if="searchResults.length">
        <li v-for="result in searchResults" :key="result.id">
          <SongSearchResult :searchResult="result" />
        </li>
      </ul>
    </div>
  </div>
</template>
