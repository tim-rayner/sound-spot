<script setup lang="ts">
import type RatingVue from "~/components/liveRate/views/Rating.vue";

const activeTab = ref(1);
</script>

<template>
  <div class="flex h-screen -mt-[5.500rem]">
    <LiveRateViewsIntroduction v-if="activeTab === 0" />
    <LiveRateViewsRating v-if="activeTab === 1" />
  </div>
</template>
