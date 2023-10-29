<!-- 
    File: /pages/tracks/[id].vue
    Url:  /tracks/123
 -->
<script setup lang="ts">
import type { Item } from "~/types/spotify-types";
import ExplicitIcon from "~/assets/svg/explicit.svg";
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";

const { authenticated } = storeToRefs(useAuthStore());
const router = useRouter();

definePageMeta({ auth: false });

const route = useRoute();
const track = ref<Item>();

const { data: trackData } = await useFetch(
  `/api/items/tracks/${route.params.id}`
);

if (trackData.value) {
  track.value = trackData.value;
}

const listenOnSpotify = () => {
  window.open(track.value?.external_urls.spotify, "_blank");
};
</script>

<template>
  <div
    class="content container w-[1070px] mx-auto min-h-screen my-12 shadow-2xl rounded-lg"
  >
    <div class="flex flex-row">
      <div class="img">
        <img
          :src="track?.album.images[0].url"
          :alt="track?.album.name"
          class="w-96 rounded-tl-2xl"
        />
      </div>
      <div class="info mx-12 my-6">
        <h1 class="text-4xl font-bold i flex">
          {{ track?.name }}
          <span
            v-if="track?.explicit"
            class="text-lg align-middle m-auto mx-2"
            title="explicit content"
          >
            <img :src="ExplicitIcon" alt="" class="w-6 h-6 dark:bg-white" />
          </span>
        </h1>
        <p class="text-xl font-bold">{{ track?.album.name }}</p>
        <p class="font-bold">
          {{ track?.artists[0].name }} -
          {{ track?.album.release_date.slice(0, 4) }}
        </p>
        <div v-if="track?.avgRating">
          <FormsRating :rating="track?.avgRating" class="mt-3" />
        </div>
        <p v-else>
          Not rated yet, be the first to
          <a href="#" class="text-[#1ab26b]"> leave a rating</a>
        </p>
        <Button class="mt-4" @click="" v-if="authenticated">
          Leave a rating
        </Button>
        <Button class="mt-4 ml-4" @click="" v-if="authenticated">
          Add to list
        </Button>
        <Button class="mt-4 ml-4" @click="listenOnSpotify">
          Listen on Spotify
        </Button>
      </div>
    </div>
  </div>
</template>
