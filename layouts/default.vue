<script lang="ts" setup>
import Navbar from "~/components/layout/Navbar.vue";
</script>

<template>
  <div class="relative h-[92vh]">
    <Navbar />
    <div class="mainContent mt-[64px] md:mt-[80px]">
      <slot />
    </div>
    <SpotifyWebPlayback />
  </div>
</template>
