<script setup lang="ts">
import SpotifyLogo from "./assets/images/Spotify_Icon_CMYK_Green.png";

const loginWithSpotify = async () => {
  const response = await fetch(`/api/auth/login`);
  const { redirect } = await response.json();
  window.location.href = redirect.url;
};
</script>

<template>
  <!-- <Button @click.prevent="loginWithSpotify" class="button">
    Login with Spotify
  </Button> -->
  <div
    class="relative form flex flex-col gap-5 p-8 px-20 pb-4 bg-black rounded-xl transition duration-400 ease-in-out h-full mx-auto shadow-2xl"
  >
    <div class="w-fit mx-auto">
      <img :src="SpotifyLogo" alt="" class="w-24 p-2 mx-auto" />
    </div>

    <div class="heading text-center m-2 text-white text-lg mb-5 mt-0">
      <h2 class="text-xl font-bold m-2">SoundSpot</h2>
      <h3 class="text-lg font-light">Sign in with Spotify</h3>
    </div>

    <button class="button3" @click.prevent="loginWithSpotify">Continue</button>
    <a
      href="#"
      class="absolute bottom-2 left-0 right-0 text-white text-xs font-extralight italic text-center hover:underline hover:cursor-pointer"
    >
      how SoundSpot uses your data
    </a>
  </div>
</template>

<style scoped lang="scss">
.button3 {
  margin-bottom: 3em;
  padding: 0.5em;
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
