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

const getTopSongs = async () => {
  const { data: songs } = await useFetch("/api/items/tracks/top", {
    method: "get",
  });
  if (songs.value?.length! > 0 || songs.value) {
    topSongs.value = songs.value?.slice(0, 4)!;
    topSongsLoading.value = false;
  }
};

const getTopLists = async () => {
  const { data: lists } = await useFetch("/api/lists/top", {
    method: "get",
  });
  if (lists.value) {
    //@ts-ignore
    topLists.value = lists.value!;
    topListsLoading.value = false;
  }
};

getTopSongs();
getTopLists();
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
  <SpotifySearch />

  <h3 class="text-xl mx-6">Our Top Tracks</h3>
  <div class="flex flex-row flex-wrap gap-12 my-12 mt-6 mx-4">
    <div v-for="song in topSongs" :key="song.id" v-if="!topSongsLoading">
      <SongOverview :track="song" class="w-[20vw] h-auto" />
    </div>
    <LoaderTile
      v-else
      v-for="loader in loaderSkeletons"
      :key="loader"
      class="w-[20vw] h-auto"
    />
  </div>

  <h3 class="text-xl mx-6">Our Top Lists</h3>
  <div class="flex flex-row flex-wrap gap-12 my-12 mt-6 mx-4 auto-rows-fr">
    <div v-for="list in topLists" :key="list._id" v-if="!topListsLoading">
      <ListOverview :list="list" class="w-[30vw] h-[25vh]" />
    </div>
  </div>
</template>
<style></style>
