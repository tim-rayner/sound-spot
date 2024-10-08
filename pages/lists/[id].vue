<script setup lang="ts">
import type { ListWithTracks } from "~/types/list-types";
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";
import axios from "axios";
import { useToast } from "primevue/usetoast";

const { authenticated, user } = storeToRefs(useAuthStore());

definePageMeta({ auth: false });

const toast = useToast();
const route = useRoute();
const list = ref<ListWithTracks>();

const { data: listData } = await useFetch(`/api/lists/${route.params.id}`);

if (listData.value) {
  list.value = listData.value!;
}

const listenOnSpotify = () => {
  window.open(list.value?.external_urls.spotify, "_blank");
};

const generatePlaylistFromList = async () => {
  await axios
    .post(`/api/spotify/playlist/listToPlaylist`, {
      list: list.value,
      userId: user.value.id,
    })
    .then((r) => {
      toast.add({
        severity: "success",
        summary: "Success",
        detail: "Playlist created!",
        life: 3000,
      });
    })
    .catch((err) => {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: err.response.data.message,
        life: 3000,
      });
    });
};
</script>

<template>
  <div
    class="content container md:w-[1070px] mx-auto min-h-screen my-12 shadow-2xl rounded-lg"
  >
    <div class="flex flex-col md:flex-row header rounded-t-xl p-12">
      <div class="img">
        <img
          :src="list?.coverPhoto"
          :alt="list?.name"
          class="w-96 rounded-2xl"
        />
      </div>
      <div class="info flex flex-col md:mx-12 my-6">
        <h1 class="text-4xl font-bold i flex">
          {{ list?.name }}
        </h1>
        <h3 class="mt-3">by {{ list.owner }}</h3>
        <small class="mt-3"
          >{{ list?.followers?.length }} followers |
          {{ list?.saves }} saves</small
        >
        <Button
          v-if="authenticated"
          @click="generatePlaylistFromList"
          label="Build Spotify playlist"
          class="my-12"
        />
      </div>
    </div>
    <div
      class="flex flex-row flex-wrap gap-12 my-12 mt-6 mx-4 auto-rows-fr pb-12"
    >
      <div v-for="song in list?.tracks" :key="song.id">
        <SongOverview :track="song" />
      </div>
    </div>
  </div>
</template>
