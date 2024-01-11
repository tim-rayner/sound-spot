import type log from '~/middleware/log';
<script setup lang="ts">
import type { List } from "~/types/list-types";

const loaderSkeletons = ref(["1", "2", "3", "4"]);
const topListsLoading = ref(true);

interface Props {
  lists: List[];
}

const props = defineProps<Props>();

if (props.lists?.length > 0) {
  topListsLoading.value = false;
}
</script>

<template>
  <h3 class="text-xl mx-6">Our Top Lists</h3>
  <div
    class="md:flex md:flex-row md:flex-wrap md:gap-12 my-12 mt-6 mx-6 auto-rows-fr"
  >
    <ItemCarousel v-if="!topListsLoading" :items="lists" type="list" />
    <LoaderTile
      v-else
      v-for="loader in loaderSkeletons"
      :key="loader"
      class="my-12"
    />
  </div>
</template>
