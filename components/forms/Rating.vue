<script setup lang="ts">
import { computed, ref } from "vue";
import { StarIcon } from "@heroicons/vue/24/solid";

const emit = defineEmits(["updateRating"]);

const props = defineProps({
  rating: {
    type: Number,
    required: true,
  },
  functional: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const hoverActive = ref<Boolean>(false);
const hoverRating = ref<number | null>(null);

const stars = computed(() => {
  const ratings = [1, 2, 3, 4, 5];
  return ratings.map((star) => {
    const starvalue = star;
    return { value: starvalue, active: starActive(starvalue) };
  });
});

const submitRating = (rating: number) => {
  emit("updateRating", rating);
};

//there will always be 5 stars, its just an array of which stars are active
const starActive = (starNumber: number) => {
  if (!hoverActive.value) {
    return starNumber <= props.rating;
  } else {
    return starNumber <= hoverRating.value!;
  }
};

const toggleHoverState = (value: boolean) => {
  if (props.functional) {
    hoverActive.value = value;
  }
};
</script>

<template>
  <div
    class="flex flex-row"
    @mouseover="toggleHoverState(true)"
    @mouseleave="toggleHoverState(false)"
  >
    <div class="" v-for="star in stars">
      <button
        :disabled="star.value === rating"
        @click="submitRating(star.value)"
        class="btn-invisible"
      >
        <StarIcon
          class="h-6 w-6 mr-1"
          :class="{
            'text-[#1ab26b]': star.active,
            'text-gray-500': !star.active,
          }"
          :key="star.value"
          @mouseover="hoverRating = star.value"
        />
      </button>
    </div>
  </div>
</template>
