<script setup lang="ts">
import type { List } from "~/server/api/lists/top.get";
const props = defineProps<{
  list: List;
}>();
</script>

<template>
  <div
    class="relative shadow-2xl hover:cursor-pointer rounded-lg overflow-hidden w-fit"
  >
    <div class="bg-image">
      <img :src="list.coverPhoto" class="z-10 w-fit h-fit" />
    </div>
    <div
      class="overlay absolute top-0 left-0 right-0 bottom-0 bg-black opacity-40 z-20"
    ></div>

    <div
      class="content absolute left-0 right-0 bottom-0 z-50 text-[#f0ffff] p-3"
    >
      <h3 class="text-2xl">{{ list.name }}</h3>
      <p>List owned by {{ list.owner }}</p>
    </div>
  </div>
</template>
