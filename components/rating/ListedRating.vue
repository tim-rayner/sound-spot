<script setup lang="ts">
import type { iRating } from "~/types/rating-types";

const props = defineProps({
  rating: {
    type: Object as PropType<iRating>,
    required: true,
  },
});

const router = useRouter();
</script>

<template>
  <Fieldset>
    <template #legend>
      <div
        class="flex align-items-center gap-3 px-2 hover:cursor-pointer"
        @click="router.push(`/profile/${rating.userId}`)"
      >
        <Avatar :image="rating.userProfilePicture" shape="circle" />
        <span class="font-bold align-middle my-auto"
          >{{ rating.username }}
        </span>
        <FormsRating :rating="rating.rating" :size="'sm'" />
      </div>
    </template>
    <p class="m-0" v-if="rating.comment.length">
      {{ rating.comment }}
    </p>
  </Fieldset>
</template>
