<script setup lang="ts">
import { useToast } from "primevue/usetoast";
import { useForm } from "vee-validate";
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";
import type { Rating } from "~/types/rating-types";

const authStore = useAuthStore();
const { user, authenticated } = storeToRefs(authStore);

const { handleSubmit } = useForm();

const emit = defineEmits(["ratingPosted"]);
const props = defineProps({
  itemId: {
    type: String,
    required: true,
  },
  //todo: make this an enum
  itemType: {
    type: String,
    required: true,
  },
  previouslyRated: {
    type: Boolean,
    required: false,
    default: false,
  },
  previousRating: {
    type: Number,
    required: false,
    default: 0,
  },
});

const toast = useToast();

const starRating = ref(0);
const starRatingMsg = ref("");
const comment = ref("");

const rated = ref(false);

const ratingUpdated = (rating) => {
  starRating.value = rating;
};

const validateRating = () => starRating.value !== 0;

const onSubmit = handleSubmit((values) => {
  if (validateRating() && user.value) {
    postRating();
    return;
  }

  starRatingMsg.value = "A star rating is required.";
  return;
});

const postRating = async () => {
  const rating: Rating = {
    rating: starRating.value,
    comment: comment.value,
    itemType: props.itemType,
    itemId: props.itemId,
    user: user?.value?._id,
    createdAt: new Date().toString(),
  };

  const { data: response } = await useFetch("/api/ratings", {
    method: "post",
    body: rating,
  });

  //TODO: Properly handle response
  if (response) {
    emit("ratingPosted", rating);
    toast.add({
      severity: "success",
      summary: "Rating submitted",
      detail: "Thanks for your rating!",
      life: 3000,
    });
    rated.value = true;
    emit;
  } else {
    toast.add({
      severity: "error",
      summary: "Rating failed",
      detail: "Please try again later.",
      life: 3000,
    });
  }
};
</script>

<template>
  <div class="card flex flex-col justify-content-center" v-if="authenticated">
    <div class="rating-form" v-if="!previouslyRated && !rated">
      <form @submit.prevent class="flex flex-col">
        <div class="star-rating">
          <FormsRating
            :rating="starRating"
            class="my-1"
            :functional="true"
            @update-rating="ratingUpdated"
          />
          <small id="text-error" class="p-error mb-2" v-if="starRatingMsg">{{
            starRatingMsg || "&nbsp;"
          }}</small>
        </div>

        <Textarea
          v-model="comment"
          class="w-full my-4"
          rows="4"
          cols="80"
          aria-describedby="text-error"
          placeholder="Leave a review"
          :class="{ 'p-invalid': false }"
          id="rating-input"
        />

        <small id="text-error" class="p-error mb-2" v-if="false">{{
          false || "&nbsp;"
        }}</small>
      </form>
      <Button
        type="button"
        label="Submit"
        class="my-1 md:w-1/4"
        @click="onSubmit"
      />
    </div>
  </div>
  <div class="card flex flex-col justify-content-center" v-if="rated">
    <p class="text-2xl font-bold">Thanks for your rating!</p>
    <p class="text-xl">You rated this {{ itemType }} {{ starRating }} stars.</p>
  </div>

  <div class="card flex flex-col justify-content-center" v-if="previouslyRated">
    <p class="text-2xl font-bold">You've already rated this {{ itemType }}.</p>
    <p class="text-xl">
      You rated this {{ itemType }} {{ previousRating }} stars.
    </p>
  </div>
</template>
