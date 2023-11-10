import type item from '~/server/api/ratings/item'; import type item from
'~/server/api/ratings/item'; import type { response } from 'express'; import
type log from '~/middleware/log';
<script setup lang="ts">
import type { Item } from "~/types/spotify-types";

import axios from "axios";

const spotifyStream = ref<Item>({});

//TODO: I want this to poll properly using best practices
async function updateStream() {
  const { data: resp } = await useFetch("/api/spotify/liveRate");
  if (resp) {
    spotifyStream.value = resp.value.item;
  }
}
updateStream();

import { onUnmounted } from "vue";

//on unmount stop setInterval
const intervalId = setInterval(updateStream, 5000);

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<template>
  <div class="items-center text-center m-auto">
    <p class="my-5">Currently Listing To:</p>
    <img
      class="rounded-lg h-[40vh] m-auto my-12"
      :src="spotifyStream?.album?.images[0].url"
    />
    {{ spotifyStream.name }}
  </div>
</template>
