<script setup lang="ts">
import { storeToRefs } from "pinia"; // import storeToRefs helper hook from pinia
import { useAuthStore } from "~/store/auth"; // import the auth store we just created
const { logUserOut } = useAuthStore();
const { user } = storeToRefs(useAuthStore());

const toggleDropdown = () => {
  const dropdown = document.querySelector(".dropdown-content");
  dropdown?.classList.toggle("hidden");
};
</script>

<template>
  <div class="relative">
    <div
      class="btn flex m-auto items-center align-middle p-4 hover:cursor-pointer w-48 bg-[#5e5e5e] rounded-full"
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
      <span class="arrow ml-2">
        <font-awesome-icon :icon="'chevron-down'" />
      </span>
    </div>
    <div
      class="dropdown-content absolute top-16 hidden w-48 rounded-lg bg-[#c1c1c1] text-black"
    >
      <div class="dropdown-item">
        <nuxt-link to="/profile">Profile</nuxt-link>
      </div>
      <div class="dropdown-item">
        <nuxt-link to="/settings">Settings</nuxt-link>
      </div>
      <div class="dropdown-item hover:cursor-pointer" @click="logUserOut">
        Logout
      </div>
    </div>
  </div>
</template>
