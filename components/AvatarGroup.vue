<script setup lang="ts">
import type { iRating } from "~/types/rating-types";
import { getProfilePicture } from "~/helpers/getProfilePicture";
const props = defineProps({
  ratings: {
    type: Array as PropType<iRating[]>,
    required: true,
  },
});

const remainingRatingCount = computed(() => {
  return props.ratings.length - 3;
});
</script>

<template>
  <PrimeAvatarGroup>
    <div v-for="rating in ratings.slice(0, 3)">
      <Avatar
        :image="getProfilePicture(rating.userProfilePicture, rating.username)"
        size="large"
        shape="circle"
      />
    </div>
    <Avatar
      v-if="remainingRatingCount > 0"
      :label="`+${remainingRatingCount}`"
      shape="circle"
      size="large"
    />
  </PrimeAvatarGroup>
</template>
