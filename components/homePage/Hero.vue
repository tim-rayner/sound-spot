<script setup lang="ts">
import { useAuthStore } from "~/store/auth";
import { storeToRefs } from "pinia";

const { authenticated } = storeToRefs(useAuthStore());

const router = useRouter();

const loginWithSpotify = () => {
  router.push("/login");
};
</script>

<template>
  <div
    class="header text-center -mt-[40px] py-24 pb-0 bg-[#1e1e1e] text-[#f0ffff] dark:bg-white dark:text-[#1e1e1e]"
  >
    <h1 class="text-5xl font-bold my-4">SoundSpot</h1>
    <h3 class="text-xl">The worlds first social rating platform for music</h3>
    <Button
      v-if="!authenticated"
      class="mt-8"
      severity="secondary"
      raised
      @click="loginWithSpotify"
      >Get Started, Its Free</Button
    >
    <SpotifySearch />
  </div>
</template>
