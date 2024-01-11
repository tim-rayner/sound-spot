<script lang="ts" setup>
import type { List } from "~/types/list-types";
import type { Item } from "~/types/spotify-types";

const topSongs = ref<Item[]>([]);
const topLists = ref<List[]>([]);

//GET HOME DATA
const { data: pageData } = await useFetch("/api/pages/home", {
  method: "get",
});

if (pageData.value) {
  topLists.value = pageData.value.topLists;
  topSongs.value = pageData.value.topTracks;
}
</script>
<template>
  <HomePageHero />
  <HomePageTopTracks :tracks="topSongs" />
  <HomePageTopLists :lists="topLists" />
</template>
<style></style>
