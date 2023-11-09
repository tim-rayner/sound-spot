<script setup lang="ts">
import type { List } from "~/types/list-types";

const router = useRouter();

const props = defineProps<{
  list: List;
}>();

const redirect = () => {
  router.push(`/lists/${props.list._id}`);
};
</script>

<template>
  <div
    class="relative shadow-2xl hover:cursor-pointer rounded-lg overflow-hidden w-fit"
    @click="redirect"
  >
    <div class="bg-image">
      <img :src="list.coverPhoto" class="z-10 w-full h-full" />
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
