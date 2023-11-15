<script setup lang="ts">
import type { iUser } from "~/types/user-types";

const props = defineProps({
  user: {
    type: Object as PropType<iUser>,
    required: true,
  },
});

const router = useRouter();
</script>

<template>
  <div class="flex flex-col items-center justify-center m-12">
    <div class="flex flex-col items-center justify-center">
      <img
        class="w-48 h-auto rounded-full"
        :src="user.profilePicture"
        :alt="user.name"
      />
      <h1 class="mt-4 text-2xl font-bold text-gray-800">
        {{ user.username }}
        <font-awesome-icon
          title="edit profile"
          icon="fa-edit"
          class="ml-2 text-lg cursor-pointer"
          @click="router.push('/profile/settings')"
        />
      </h1>
      <p class="text-sm text-gray-500 mt-1">{{ user.email }}</p>
      <!-- <p class="text-sm text-gray-500 mt-1">{{ user.bio }}</p> -->
      <div class="flex flex-row mt-4">
        <div class="flex flex-col items-center justify-center mx-4">
          <h1 class="text-2xl font-bold text-gray-800">
            {{ user?.followers?.length ?? 10000 }}
          </h1>
          <p class="text-sm text-gray-500 mt-1">Followers</p>
        </div>
        <div class="flex flex-col items-center justify-center mx-4">
          <h1 class="text-2xl font-bold text-gray-800">
            {{ user?.following?.length ?? 1 }}
          </h1>
          <p class="text-sm text-gray-500 mt-1">Following</p>
        </div>
      </div>
    </div>
  </div>
</template>
