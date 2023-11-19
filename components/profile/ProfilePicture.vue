<script setup lang="ts">
import { getProfilePicture } from "~/helpers/getProfilePicture";
type Props = {
  username: string;
  profilePicture: string;
};

const props = defineProps<Props>();
</script>

<template>
  <div class="">
    <img
      :src="getProfilePicture(profilePicture, username)"
      :alt="username"
      class="shadow-2 rounded-full"
    />
  </div>
</template>
