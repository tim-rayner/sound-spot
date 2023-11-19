import type { TransitionGroup } from 'vue';
<script setup lang="ts">
import { storeToRefs } from "pinia"; // import storeToRefs helper hook from pinia
import ColorModeSwitch from "~/components/forms/ColorModeSwitch.vue";
import { useAuthStore } from "~/store/auth";

const router = useRouter();

const mobileMenuToggled = ref(false);

const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const loginWithSpotify = () => {
  mobileMenuToggled.value = false;
  router.push("/login");
};

const clearAllCookies = () => {
  ///function which should clear all cookies
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie =
      name +
      "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=localhost";
  }
  window.location.reload();
};

const redirect = (to: string) => {
  mobileMenuToggled.value = false;
  router.push(to);
};
</script>

<template>
  <nav class="z-[100] fixed top-0 w-full">
    <div class="main-nav bg-[#1e1e1e] p-3 text-[#f0ffff]">
      <ul class="flex justify-between p-2 px-5 align-middle items-center">
        <!-- LEFT-->
        <div class="justify-between flex gap-20">
          <li class="font-bold"><div @click="redirect('/')">SoundSpot</div></li>
          <li class="font-bold hidden md:flex">
            <nuxt-link to="/leaderboard">Leaderboard</nuxt-link>
          </li>
        </div>
        <!-- RIGHT -->
        <div class="justify-end gap-6 float-right flex md:hidden">
          <li class="align-middle m-auto">
            <font-awesome-icon
              icon="fa-bars"
              @click="mobileMenuToggled = !mobileMenuToggled"
            ></font-awesome-icon>
          </li>
        </div>
        <div class="justify-end gap-6 float-right hidden md:flex">
          <li class="align-middle m-auto">
            <Button
              @click="clearAllCookies"
              class="hover:cursor-pointer p-2"
              severity="secondary"
            >
              somthing wrong?
            </Button>
          </li>
          <!-- <li class="align-middle m-auto">
          <ColorModeSwitch />
        </li> -->
          <li v-if="!authenticated">
            <SpotifyLoginWithSpotifyButton @buttonClicked="loginWithSpotify" />
          </li>
          <li v-else>
            <SpotifyProfileButton />
          </li>
        </div>
      </ul>
    </div>
    <div
      class="md:hidden bg-[#1e1e1e] p-3 text-[#f0ffff] rounded-b-xl md:rounded-b-none"
      v-if="mobileMenuToggled"
    >
      <div class="flex flex-col gap-2 mx-[20px]">
        <div @click="redirect('/leaderboard')">Leaderboard</div>
        <div>
          <span v-if="!authenticated">
            <SpotifyLoginWithSpotifyButton @buttonClicked="loginWithSpotify" />
          </span>
          <span v-else>
            <SpotifyProfileButton />
          </span>
        </div>
      </div>
    </div>
  </nav>
</template>
