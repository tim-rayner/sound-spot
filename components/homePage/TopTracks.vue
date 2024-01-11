import type log from '~/middleware/log';
<script setup lang="ts">
import type { Item } from "~/types/spotify-types";

const loaderSkeletons = ref(["1", "2", "3", "4"]);
const topSongsLoading = ref(true);

interface Props {
  tracks: Item[];
}

const props = defineProps<Props>();

if (props.tracks?.length > 0) {
  topSongsLoading.value = false;
}
</script>

<template>
  <h3 class="text-xl mx-6">Our Top Tracks</h3>
  <div class="md:flex md:flex-row md:flex-wrap md:gap-12 my-12 mt-6 mx-6">
    <ItemCarousel v-if="!topSongsLoading" :items="tracks" type="track" />
    <LoaderTile
      v-else
      v-for="loader in loaderSkeletons"
      :key="loader"
      class="my-12"
    />
  </div>
</template>
