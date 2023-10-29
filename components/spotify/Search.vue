<script setup lang="ts">
import axios from "axios";
import type { Item } from "~/types/spotify-types.ts";

const props = defineProps<{
  spotlightSearch?: boolean;
}>();

const searchQuery = ref<string>("");
const searchResults = ref<Item[]>([]);
const searchLoading = ref<boolean>(false);
const show = ref<boolean>(false);
// interface SpotifyTrack {

const search = async () => {
  searchLoading.value = true;
  const { data: results } = await useFetch("/api/tracks/search", {
    method: "post",
    body: { query: searchQuery.value, type: "track" },
  });

  searchLoading.value = false;
  searchResults.value = results.value;
};

const fieldKeyPress = (event: any) => {
  if (event.key === "Enter") {
    search();
  }
};
</script>

<template>
  <div class="m-4 mt-12">
    <div
      class="flex flex-row w-fit"
      :class="{ 'mx-auto  align-middle': spotlightSearch }"
    >
      <span :class="{ 'p-float-label': !spotlightSearch }">
        <InputText
          id="search"
          v-model="searchQuery"
          :onKeypress="fieldKeyPress"
          :autofocus="true"
          class="rounded-r-none"
          :placeholder="spotlightSearch ? 'Search for a song' : ''"
        />
        <label for="search" v-if="!spotlightSearch">Search</label>
      </span>
      <Button @click="search" class="rounded-l-none" :loading="searchLoading"
        >Search</Button
      >
    </div>

    <Transition>
      <div class="" v-if="!spotlightSearch && searchLoading">
        <small> Results</small>
        <ul v-if="searchResults.length" class="flex flex-col justify-between">
          <li v-for="result in searchResults" :key="result.id">
            <SongSearchResult :searchResult="result" />
          </li>
        </ul>
      </div>
    </Transition>
    <Transition>
      <div class="my-12" v-if="spotlightSearch && !searchLoading">
        <ul v-if="searchResults.length" class="flex flex-row">
          <li
            v-for="result in searchResults"
            :key="result.id"
            class="w-[40vw] h-auto mx-2"
          >
            <SpotlightSearchResult :searchResult="result" />
          </li>
        </ul>
      </div>
    </Transition>
  </div>

  <p v-if="show">hello</p>
</template>
<style>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
