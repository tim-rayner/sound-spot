<script setup lang="ts">
import type { iRating } from "~/types/rating-types";

const props = defineProps({
  rating: {
    type: Object as PropType<iRating>,
    required: true,
  },
});
</script>

<template>
  <Fieldset>
    <template #legend>
      <div class="flex align-items-center gap-2 px-2">
        <Avatar :image="rating.userProfilePicture" shape="circle" />
        <span class="font-bold">{{ rating.username }}</span>
      </div>
    </template>
    <p class="m-0">
      {{ rating.comment }}
    </p>
  </Fieldset>
</template>
