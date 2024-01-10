<script setup lang="ts">
import type { Item } from "~/types/spotify-types";

const router = useRouter();

const props = defineProps<{
  track: Item;
}>();

const redirect = () => {
  router.push(`/tracks/${props.track?.id}`);
};
</script>

<template>
  <div
    class="relative hover:cursor-pointer rounded-lg overflow-hidden w-[65vw] md:w-[20vw] mx-auto"
    @click="redirect"
  >
    <div class="bg-image">
      <img :src="track?.album.images[0].url" class="z-10 w-fit h-fit" />
    </div>
    <div
      class="overlay absolute top-0 left-0 right-0 bottom-0 bg-black opacity-70 z-20"
    ></div>

    <div
      class="content absolute top-0 left-0 right-0 bottom-0 z-50 text-[#f0ffff] p-3"
    >
      <h3 class="text-2xl">{{ track?.name }}</h3>
      <p>{{ track?.artists[0].name }}</p>
      <FormsRating :rating="track?.avgRating!" class="mt-1" />
    </div>
  </div>
</template>
