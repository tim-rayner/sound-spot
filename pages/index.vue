<script lang="ts" setup>
import { storeToRefs } from "pinia"; // import storeToRefs helper hook from pinia
import { useAuthStore } from "~/store/auth"; // import the auth store we just created
import type { Item } from "~/types/spotify-types";

const router = useRouter();
const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const loginWithSpotify = () => {
  router.push("/login");
};

const topSongs = ref<Item[]>([]);

const getTopSongs = async () => {
  const { data: songs } = await useFetch("/api/items/tracks/top", {
    method: "get",
  });
  if (songs.value?.length! > 0 || songs.value) {
    topSongs.value = songs.value!;
  }
};

getTopSongs();
</script>
<template>
  <div
    class="header text-center py-12 pb-32 bg-[#1e1e1e] text-[#f0ffff] dark:bg-white dark:text-[#1e1e1e]"
  >
    <h1 class="text-5xl font-bold my-4">SoundSpot</h1>
    <h3 class="text-xl">The worlds first social rating platform for music</h3>
    <Button
      v-if="!authenticated"
      class="mt-8"
      severity="secondary"
      raised
      @click="loginWithSpotify"
      >Get Started, Its Free</Button
    >
  </div>
  <SpotifySearch :spotlight-search="true" />

  <h3 class="text-xl mx-6">Our Top Tracks</h3>
  <div class="flex flex-row my-12 mt-6 mx-4">
    <div v-for="song in topSongs" :key="song.id" class="w-[40vw] h-auto mx-2">
      <SpotlightSearchResult :searchResult="song" />
    </div>
  </div>
</template>
<style></style>
