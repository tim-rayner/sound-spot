<script setup lang="ts">
import type { iUser } from "~/types/user-types";

const userFS = localStorage.getItem("ud01xy");
const user = ref<iUser>();

if (userFS) {
  user.value = JSON.parse(userFS);
}
</script>

<template>
  <ProfileHeader :user="user" />
</template>
