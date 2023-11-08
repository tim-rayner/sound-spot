<script setup lang="ts">
import axios from "axios";
import type { iUser } from "~/types/user-types";

const userFS = localStorage.getItem("ud01xy");
const user = ref<iUser>();

if (userFS) {
  user.value = JSON.parse(userFS);
}

const topLists = await axios
  .get(`/api/users/top/list/${user?.value?._id}`)
  .then((res) => res.data);
</script>

<template>
  <ProfileHeader :user="user" />
  <h3 class="text-xl mx-6">Your Top Lists</h3>
  <div class="flex flex-row my-12 mt-6 mx-4">
    <div v-for="list in topLists" :key="list._id" class="h-auto mx-2 w-[40vw]">
      <ListOverview :list="list" />
    </div>
  </div>
</template>
