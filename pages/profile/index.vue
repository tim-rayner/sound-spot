<script setup lang="ts">
import type { List } from "~/types/list-types";
import type { Album, Item } from "~/types/spotify-types";
import type { iUser } from "~/types/user-types";

const userFS = localStorage.getItem("ud01xy");
const user = ref<iUser>();
const topLists = ref<List[]>([]);
const topTracks = ref<Item[]>([]);
const topAlbums = ref<Album[]>([]);

if (userFS) {
  user.value = JSON.parse(userFS);
}

//GET PROFILE DATA
const { data: profileData } = await useFetch(
  `/api/users/top/${user?.value?._id}`
);

if (profileData.value) {
  topLists.value = profileData.value.topLists!;
  topTracks.value = profileData.value.topTracks!;
  topAlbums.value = profileData.value.topAlbums!;
}
</script>

<template>
  <ProfileHeader :user="user!" />

  <div v-if="topTracks.length">
    <div class="flex flex-row">
      <h3 class="text-xl mx-6 align-middle my-auto">Your Top Tracks</h3>
    </div>
    <div class="flex flex-row flex-wrap gap-12 my-12 mt-6 mx-4 auto-rows-fr">
      <div v-for="track in topTracks" :key="track._id">
        <SongOverview :track="track" />
      </div>
    </div>
  </div>

  <div v-if="topAlbums.length">
    <div class="flex flex-row">
      <h3 class="text-xl mx-6 align-middle my-auto">Your Top Albums</h3>
    </div>
    <div class="flex flex-row my-12 mt-6 mx-4">
      <div v-for="album in topAlbums" :key="album._id">
        <AlbumOverview :album="album" class="w-[20vw] h-auto" />
      </div>
    </div>
  </div>

  <div v-if="topLists.length">
    <div class="flex flex-row">
      <h3 class="text-xl mx-6 align-middle my-auto">Your Top Lists</h3>
      <SpotifyImportPlaylist />
    </div>
    <div class="flex flex-row flex-wrap my-12 mt-6 mx-4 auto-rows-fr">
      <div v-for="list in topLists" :key="list._id" class="h-auto mx-4">
        <ListOverview :list="list" class="w-[30vw] h-[25vh]" />
      </div>
    </div>
  </div>
</template>
