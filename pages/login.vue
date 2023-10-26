<script lang="ts" setup>
import LoginWithSpotify from "~/components/spotify/LoginWithSpotify.vue";
definePageMeta({
  layout: false,
});
</script>

<template>
  <div class="flex h-screen">
    <div class="spotify-signin m-auto">
      <LoginWithSpotify />
    </div>
  </div>
</template>
