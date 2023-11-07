<script setup lang="ts">
import type { Album, Item } from "~/types/spotify-types";

const props = defineProps<{
  searchResult: Item;
}>();

const router = useRouter();
</script>

<template>
  <div
    class="relative shadow-2xl hover:cursor-pointer rounded-lg overflow-hidden"
    @click="router.push(`/tracks/${searchResult.id}`)"
  >
    <div class="bg-image">
      <img :src="searchResult.album.images[0].url" class="z-10 w-fit h-fit" />
    </div>
    <div
      class="overlay absolute top-0 left-0 right-0 bottom-0 bg-black opacity-70 z-20"
    ></div>

    <div
      class="content absolute top-0 left-0 right-0 bottom-0 z-50 text-[#f0ffff] p-3"
    >
      <h3 class="text-2xl">{{ searchResult.name }}</h3>
      <p>{{ searchResult.artists[0].name }}</p>
      <FormsRating :rating="searchResult.avgRating" class="mt-1" />
    </div>
  </div>
</template>
