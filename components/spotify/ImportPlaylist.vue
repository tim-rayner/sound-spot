<script setup lang="ts">
import axios from "axios";

import { ref } from "vue";
import { useAuthStore } from "~/store/auth";
import type { Playlist } from "~/types/spotify-types";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const showImportModal = ref(false);
const playlists = ref([]);

const toggleImportModal = async () => {
  showImportModal.value = true;
  //load user's playlists
  //display them in a list

  const playlistsRes = await axios
    .get(`api/users/spotify/playlist/${user?.value?.id}`)
    .then((res) => res.data.items)
    .catch((err) => console.log(err));

  if (playlistsRes) {
    playlists.value = playlistsRes;
  }
};

const cancel = () => {
  closeDialog();
};

const closeDialog = () => {
  showImportModal.value = false;
};

const generateList = async (playlist: Playlist) => {
  const list = await axios
    .post(`api/spotify/playlist/playlistToList`, {
      playlist: playlist,
      userId: user?.value?._id,
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));

  showImportModal.value = false;
  if (list) {
    return list;
  }
  return null;
};
</script>

<template>
  <Button @click="toggleImportModal" label="Import list from Spotify" />

  <Dialog
    v-model:visible="showImportModal"
    modal
    :pt="{
      mask: {
        style: 'backdrop-filter: blur(2px)',
      },
    }"
  >
    <template #container>
      <div
        class="px-8 py-5 flex flex-col text-[#f0ffff] overflow-y-scroll"
        style="border-radius: 12px; background-color: #1d1d1d"
      >
        <h3 class="text-xl mb-4">Import playlist from Spotify</h3>
        <h4>{{ playlists?.length }} playlists found</h4>
        <div>
          <SpotifyPlaylistResult
            v-for="playlist in playlists"
            :playlists="playlist"
            @playlist-selected="generateList"
          />
        </div>

        <Button
          label="Cancel"
          @click="cancel"
          text
          class="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
        ></Button>
      </div>
    </template>
  </Dialog>
</template>
