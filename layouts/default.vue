<script lang="ts" setup>
import { storeToRefs } from "pinia"; // import storeToRefs helper hook from pinia
import ColorModeSwitch from "~/components/forms/ColorModeSwitch.vue";
import { useAuthStore } from "~/store/auth"; // import the auth store we just created

const router = useRouter();

const { logUserOut } = useAuthStore(); // use authenticateUser action from  auth store
const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const logout = () => {
  logUserOut();
  router.push("/");
};

const loginWithSpotify = () => {
  router.push("/login");
};
</script>

<template>
  <div>
    <nav
      class="dark:bg-slate-200 bg-[#1e1e1e] p-3 text-[#f0ffff] dark:text-slate-500 w-full"
    >
      <ul class="flex justify-between p-2 px-5 align-middle items-center">
        <!-- LEFT-->
        <div class="justify-between flex gap-20">
          <li class="font-bold"><nuxt-link to="/">SoundSpot</nuxt-link></li>
          <li class="font-bold"><nuxt-link to="/about">About</nuxt-link></li>
        </div>
        <!-- RIGHT -->
        <div class="justify-end flex gap-6 float-right">
          <li class="align-middle m-auto">
            <ColorModeSwitch />
          </li>
          <li v-if="!authenticated">
            <SpotifyLoginWithSpotifyButton @buttonClicked="loginWithSpotify" />
          </li>
          <li v-else>
            <SpotifyProfileButton />
          </li>
        </div>
      </ul>
    </nav>
    <div class="mainContent">
      <slot />
    </div>
  </div>
</template>
