<script lang="ts" setup>
import { storeToRefs } from "pinia"; // import storeToRefs helper hook from pinia
import { useAuthStore } from "~/store/auth"; // import the auth store we just created

const router = useRouter();
const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const loginWithSpotify = () => {
  router.push("/login");
};
</script>
<template>
  <div
    class="header text-center py-12 pb-32 bg-[#1e1e1e] text-[#f0ffff] dark:bg-white dark:text-[#1e1e1e]"
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
  </div>
  <SpotifySearch class="my-12" :spotlight-search="true" />
</template>
<style></style>
