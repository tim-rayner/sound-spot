<script setup lang="ts">
import type { Item } from "~/types/spotify-types.ts";

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
  <div class="mt-12">
    <div class="flex flex-row w-fit mx-auto align-middle">
      <span>
        <InputText
          id="search"
          v-model="searchQuery"
          :onKeypress="fieldKeyPress"
          :autofocus="true"
          class="rounded-r-none"
          placeholder="Search for a song"
          autocomplete="off"
        />
      </span>
      <Button @click="search" class="rounded-l-none" :loading="searchLoading"
        >Search</Button
      >
    </div>

    <Transition>
      <div class="my-12" v-if="!searchLoading">
        <ul
          v-if="searchResults.length"
          class="flex flex-row flex-wrap gap-12 my-12 mt-6 mx-4"
        >
          <li v-for="result in searchResults" :key="result.id" class="">
            <SongOverview :track="result" class="w-[20vw] h-auto" />
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
