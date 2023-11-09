import type { Album } from '~/server/api/items/albums';
<script setup lang="ts">
import type { List } from "~/types/list-types";
import type { Item, Album } from "~/types/spotify-types";

const router = useRouter();

const props = defineProps<{
  album: Album;
}>();

const redirect = () => {
  router.push(`/albums/${props.album?.id}`);
};
</script>

<template>
  <div
    class="relative shadow-2xl hover:cursor-pointer rounded-lg overflow-hidden"
    @click="redirect"
  >
    <div class="bg-image">
      <img :src="album?.images[0].url" class="z-10 w-fit h-fit" />
    </div>
    <div
      class="overlay absolute top-0 left-0 right-0 bottom-0 bg-black opacity-70 z-20"
    ></div>

    <div
      class="content absolute top-0 left-0 right-0 bottom-0 z-50 text-[#f0ffff] p-3"
    >
      <h3 class="text-2xl">{{ album?.name }}</h3>
      <p>{{ album?.artists[0].name }}</p>
      <FormsRating :rating="album?.avgRating" class="mt-1" />
    </div>
  </div>
</template>
