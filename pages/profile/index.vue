<script setup lang="ts">
import { useAuthStore } from "~/store/auth";

const { user } = storeToRefs(useAuthStore());
</script>

<template>
  <ProfileHeader :user="user" />
</template>
