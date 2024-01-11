<script lang="ts" setup>
import Navbar from "~/components/layout/Navbar.vue";
</script>

<template>
  <div class="relative">
    <Navbar />
    <div class="mainContent mt-[64px] md:mt-[20px] mb-0 pb-0 min-h-screen">
      <slot />
    </div>
    <SpotifyWebPlayback />
    <LayoutFooter />
  </div>
</template>
