<script setup lang="ts">
import type { SearchResponse } from "~/types/search-types";

const searchQuery = ref<string>("");
const searchResults = ref<SearchResponse | null>();
const searchLoading = ref<boolean>(false);
const show = ref<boolean>(false);

const loaderSkeletons = ref([1, 2, 3, 4]);

const search = async () => {
  searchLoading.value = true;

  const { data: results } = await useFetch("/api/spotify/search", {
    method: "post",
    body: { query: searchQuery.value },
  });

  searchLoading.value = false;
  searchResults.value = results.value;
};

watch(searchQuery, () => {
  if (searchQuery.value.length > 1) {
    search();
  } else searchResults.value = null;
});
</script>

<template>
  <div class="my-12">
    <div class="flex flex-row w-fit mx-auto align-middle">
      <span>
        <InputText
          id="search"
          v-model="searchQuery"
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
      <div class="my-12 py-6" v-if="!searchLoading">
        <ul
          v-if="searchResults?.items?.length"
          class="flex flex-row flex-wrap gap-12 my-12 mt-6 mx-4"
        >
          <li v-for="result in searchResults.items" :key="result.id">
            <SongOverview v-if="result.type === 'track'" :track="result" />
            <AlbumOverview
              v-if="result.type === 'album'"
              :album="result"
              class="w-[20vw] h-auto"
            />
            <div v-else></div>
          </li>
        </ul>
      </div>
    </Transition>
    <Transition>
      <div class="my-12" v-if="searchLoading">
        <div class="flex flex-row flex-wrap gap-12 my-12 mt-6 mx-4">
          <div v-for="skeleton in loaderSkeletons" :key="skeleton">
            <LoaderTile />
          </div>
        </div>
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
