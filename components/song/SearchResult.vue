import type { FormsRating } from '#build/components';

<script setup lang="ts">
const props = defineProps<{
  searchResult: Item;
}>();
</script>

<!-- TODO: Long Names cause responsiveness bug -->
<template>
  <div
    class="border hover:cursor-pointer my-3 w-full overflow-hidden flex justify-between"
  >
    <div class="justify-between flex">
      <div class="content float-left p-3">
        <h3 class="text-2xl">{{ searchResult.name }}</h3>
        <p>{{ searchResult.artists[0].name }}</p>
      </div>
    </div>

    <div class="justify-end flex gap-6 float-right">
      <li class="align-middle m-auto">
        <FormsRating :rating="searchResult.rating" class="mt-1" />
      </li>
      <div>
        <img :src="searchResult.album.images[0].url" class="w-24" />
      </div>
    </div>
  </div>
</template>
