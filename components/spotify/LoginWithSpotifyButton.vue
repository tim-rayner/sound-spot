<script setup lang="ts">
import SpotifyLogo from "./assets/images/Spotify_Icon_RGB_White.png";
const emit = defineEmits("buttonClicked");
</script>
<template>
  <button
    class="button3 p-2 px-4 text-normal font-semibold"
    @click.prevent="emit('buttonClicked')"
  >
    <img :src="SpotifyLogo" alt="Spotify Logo" class="w-6 inline-block mr-2" />

    Log in
  </button>
</template>
<style scoped lang="scss">
.button3 {
  border-radius: 5px;
  border: none;
  outline: none;
  transition: 0.4s ease-in-out;
  background-color: #1ab26b;
  color: white;
}

.button3:hover {
  background-color: #30885f;
  color: white;
}
</style>
