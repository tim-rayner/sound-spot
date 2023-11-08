<script setup lang="ts">
import { storeToRefs } from "pinia"; // import storeToRefs helper hook from pinia
import { useAuthStore } from "~/store/auth"; // import the auth store we just created
const { logUserOut } = useAuthStore();
const { user } = storeToRefs(useAuthStore());
const router = useRouter();

const toggleDropdown = () => {
  const dropdown = document.querySelector(".dropdown-content");
  dropdown?.classList.toggle("hidden");
};

const logout = () => {
  //clear local storage value for use
  localStorage.removeItem("ud01xy");
  logUserOut();
  router.push("/");
};
</script>

<template>
  <div class="relative">
    <div
      class="btn flex p-3 hover:cursor-pointer w-48 bg-[#5e5e5e] rounded-full relative"
      v-if="user"
      @click="toggleDropdown"
    >
      <span class="img">
        <img
          :src="user.profilePicture"
          alt="profile picture"
          class="w-6 rounded-full"
        />
      </span>
      <span class="name ml-2"> {{ user.username }}</span>

      <span class="arrow absolute right-5">
        <font-awesome-icon :icon="'chevron-down'" />
      </span>
    </div>
    <!-- DROPDOWN-->
    <div
      class="dropdown-content absolute top-16 hidden w-48 rounded-lg bg-[#c1c1c1] text-black"
    >
      <div
        class="dropdown-item p-2 hover:bg-slate-400 hover:cursor-pointer rounded-t-lg"
      >
        <nuxt-link to="/profile">Profile</nuxt-link>
      </div>
      <div
        class="dropdown-item p-2 border-t-2 border-slate-200 hover:cursor-pointer hover:bg-slate-400"
      >
        <nuxt-link to="/profile/settings">Settings</nuxt-link>
      </div>
      <div
        class="dropdown-item hover:cursor-pointer hover:bg-slate-400 p-2 border-t-2 border-slate-200 rounded-b-lg"
        @click="logout"
      >
        Logout
      </div>
    </div>
  </div>
</template>
