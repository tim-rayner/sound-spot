<script setup lang="ts">
import type { publicProfileData } from "~/types/user-types";

const props = defineProps({
  user: {
    type: Object as PropType<publicProfileData>,
    required: true,
  },
});
</script>

<template>
  <div class="flex flex-col items-center justify-center m-12" v-if="user">
    <div class="flex flex-col items-center justify-center">
      <img
        class="w-48 h-auto rounded-full"
        :src="user?.userProfile?.profilePicture"
        :alt="user?.userProfile?.username"
      />
      <h1 class="mt-4 text-2xl font-bold text-gray-800">
        {{ user?.userProfile?.username }}
      </h1>
      <!-- <p class="text-sm text-gray-500 mt-1">{{ user.bio }}</p> -->
      <div class="flex flex-row mt-4">
        <div class="flex flex-col items-center justify-center mx-4">
          <h1 class="text-2xl font-bold text-gray-800">
            {{ user?.followers ?? 10000 }}
          </h1>
          <p class="text-sm text-gray-500 mt-1">Followers</p>
        </div>
        <div class="flex flex-col items-center justify-center mx-4">
          <h1 class="text-2xl font-bold text-gray-800">
            {{ user?.following ?? 1 }}
          </h1>
          <p class="text-sm text-gray-500 mt-1">Following</p>
        </div>
      </div>
    </div>
  </div>
</template>
