<script setup lang="ts">
import ExplicitIcon from "~/assets/svg/explicit.svg";
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";
import type { iArtist } from "~/types/artist-types";

const { authenticated } = storeToRefs(useAuthStore());
const router = useRouter();

definePageMeta({ auth: false });

const route = useRoute();
const artist = ref<iArtist>();

const { data: artistData } = await useFetch(
  `/api/items/artists/${route.params.id}`
);

if (artistData.value) {
  artist.value = artistData.value;
}
</script>

<template>
  <div
    class="content container w-[1070px] mx-auto min-h-screen my-12 shadow-2xl rounded-lg"
  >
    <div class="flex flex-row header rounded-t-xl border">
      <div class="img rounded-full p-12 pr-0">
        <img
          :src="artist?.images[0].url"
          :alt="artist?.image"
          class="w-48 h-48 rounded-full float-right"
        />
      </div>
      <div class="info mx-12 my-6 p-12 pl-6">
        <h1 class="text-4xl font-bold i flex">
          {{ artist?.name }}
        </h1>
        <h3 class="my-2">{{ artist?.genres.join(",") }}</h3>
        <div>
          <small class="mt-3">{{ artist?.followers.total }} followers </small>
        </div>
      </div>
    </div>

    <!-- TODO: GET TOP SONGS FROM ARTIST -->
    <!-- <div class="flex flex-row my-12 mt-6 mx-4">
      <div
        v-for="song in artist.tracks"
        :key="song.id"
        class="w-[40vw] h-auto mx-2"
      >
        <SpotlightSearchResult :searchResult="song" />
      </div>
    </div> -->
  </div>
</template>
