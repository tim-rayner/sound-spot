<script lang="ts" setup>
import type { ListOverview } from "#build/components";
import { storeToRefs } from "pinia"; // import storeToRefs helper hook from pinia

import { useAuthStore } from "~/store/auth"; // import the auth store we just created
import type { List } from "~/types/list-types";

import type { Item } from "~/types/spotify-types";

const router = useRouter();
const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const loginWithSpotify = () => {
  router.push("/login");
};

const topSongs = ref<Item[]>([]);
const topLists = ref<List[]>([]);
const loaderSkeletons = ref(["1", "2", "3", "4"]);
const topSongsLoading = ref(true);
const topListsLoading = ref(true);

//GET HOME DATA
const { data: pageData } = await useFetch("/api/pages/home", {
  method: "get",
});

if (pageData.value) {
  topLists.value = pageData.value.topLists;
  topListsLoading.value = false;
  //
  topSongs.value = pageData.value.topTracks;
  topSongsLoading.value = false;
}
</script>
<template>
  <div
    class="header text-center -mt-[40px] py-12 pb-32 bg-[#1e1e1e] text-[#f0ffff] dark:bg-white dark:text-[#1e1e1e]"
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
  <SpotifySearch />

  <h3 class="text-xl mx-6">Our Top Tracks</h3>
  <div class="md:flex md:flex-row md:flex-wrap md:gap-12 my-12 mt-6 mx-6">
    <ItemCarousel v-if="!topSongsLoading" :items="topSongs" type="track" />
    <LoaderTile
      v-else
      v-for="loader in loaderSkeletons"
      :key="loader"
      class="my-12"
    />
  </div>

  <h3 class="text-xl mx-6">Our Top Lists</h3>
  <div
    class="md:flex md:flex-row md:flex-wrap md:gap-12 my-12 mt-6 mx-6 auto-rows-fr"
  >
    <ItemCarousel v-if="!topListsLoading" :items="topLists" type="list" />
    <LoaderTile
      v-else
      v-for="loader in loaderSkeletons"
      :key="loader"
      class="my-12"
    />
  </div>
</template>
<style></style>
