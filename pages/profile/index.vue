<script setup lang="ts">
import axios from "axios";
import type { iUser } from "~/types/user-types";

const userFS = localStorage.getItem("ud01xy");
const user = ref<iUser>();

if (userFS) {
  user.value = JSON.parse(userFS);
}

const topLists = await axios
  .get(`/api/users/top/list/${user?.value?._id}`)
  .then((res) => res.data);

const topTracks = await axios
  .get(`/api/users/top/track/${user?.value?._id}`)
  .then((res) => res.data);

const topAlbums = await axios
  .get(`/api/users/top/album/${user?.value?._id}`)
  .then((res) => res.data);
</script>

<template>
  <ProfileHeader :user="user" />
  <div class="flex flex-row">
    <h3 class="text-xl mx-6 align-middle my-auto">Your Top Tracks</h3>
  </div>
  <div class="flex flex-row flex-wrap gap-12 my-12 mt-6 mx-4 auto-rows-fr">
    <div v-for="track in topTracks" :key="track._id">
      <SongOverview :track="track" class="w-[20vw] h-auto" />
    </div>
  </div>
  <div class="flex flex-row">
    <h3 class="text-xl mx-6 align-middle my-auto">Your Top Albums</h3>
  </div>
  <div class="flex flex-row my-12 mt-6 mx-4">
    <div v-for="album in topAlbums" :key="album._id">
      <AlbumOverview :album="album" class="w-[20vw] h-auto" />
    </div>
  </div>
  <div class="flex flex-row">
    <h3 class="text-xl mx-6 align-middle my-auto">Your Top Lists</h3>
    <SpotifyImportPlaylist />
  </div>
  <div class="flex flex-row flex-wrap my-12 mt-6 mx-4 auto-rows-fr">
    <div v-for="list in topLists" :key="list._id" class="h-auto mx-4">
      <ListOverview :list="list" class="w-[30vw] h-[25vh]" />
    </div>
  </div>
</template>
