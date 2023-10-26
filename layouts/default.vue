<script lang="ts" setup>
import { storeToRefs } from "pinia"; // import storeToRefs helper hook from pinia
import { useAuthStore } from "~/store/auth"; // import the auth store we just created

const router = useRouter();

const { logUserOut } = useAuthStore(); // use authenticateUser action from  auth store
const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const logout = () => {
  logUserOut();
  router.push("/");
};
</script>

<template>
  <div>
    <nav class="bg-slate-600 p-3 text-white">
      <ul class="flex justify-between p-2 px-5">
        <li class="mr-3 font-bold"><nuxt-link to="/">SoundSpot</nuxt-link></li>
        <li class="mr-3 font-bold"><nuxt-link to="/about">About</nuxt-link></li>

        <li class="float-right" v-if="!authenticated">
          <nuxt-link to="/login">Login</nuxt-link>
        </li>
        <li class="float-right" v-else>
          <Button @click="logout">Logout</Button>
        </li>
      </ul>
    </nav>
    <div class="mainContent">
      <slot />
    </div>
  </div>
</template>
