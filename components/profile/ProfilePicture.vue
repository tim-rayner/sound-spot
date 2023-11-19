<script setup lang="ts">
import { getProfilePicture } from "~/helpers/getProfilePicture";
type Props = {
  username: string;
  profilePicture: string;
  size: string;
};

const props = defineProps<Props>();

const imageSize = computed(() => {
  return `w-${props.size}`;
});
</script>

<template>
  <img
    :src="getProfilePicture(profilePicture, username)"
    :alt="username"
    class="shadow-2 rounded-full"
    :class="imageSize"
  />
</template>
