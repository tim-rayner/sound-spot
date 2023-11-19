<script setup lang="ts">
import axios from "axios";
import type { RatingUserAggr } from "~/types/user-types";
import { useAuthStore } from "~/store/auth";

import { useToast } from "primevue/usetoast";

const { user } = storeToRefs(useAuthStore());
const router = useRouter();
const toast = useToast();

const tableData = ref<RatingUserAggr[]>([]);
const userPlace = ref<number>(0);

await axios
  .get("http://localhost:3000/api/leaderboards/reviews")
  .catch((err) => {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Could not load leaderboard",
      life: 3000,
    });
  })
  .then((resp) => {
    //first is the current user ID in top 10?
    if (user) {
      userPlace.value =
        resp.data.findIndex(
          (listedUser) => listedUser._id === user.value?._id
        ) + 1;
    }
    tableData.value = resp.data;
  });

const stlyeUserCell = (data: any) => {
  if (data._id === user.value?._id) {
    return "bg-green-100 border-green-200 border-2 rounded-md";
  }
};

//if user is first place begin a 5 second countdown to then kill the confetti component
//this is done to prevent the confetti from playing on every page load
if (userPlace.value === 1) {
  setTimeout(() => {
    userPlace.value = 0;
  }, 3000);
}
</script>

<template>
  <GamificationConfetti v-if="userPlace === 1" />
  <div>
    <DataTable :value="tableData" class="card !z-0" :rowClass="stlyeUserCell">
      <Column header="Rank" :style="`width: 5rem`">
        <template #body="slotProps">
          <div class="flex">
            <span
              class="font-bold"
              :class="{ 'mx-auto': slotProps.index + 1 > 3 }"
              >{{ slotProps.index + 1 }}</span
            >
            <div v-if="slotProps.index === 0" class="my-auto">
              <span class="font-bold">
                <font-awesome-icon
                  icon="fa-crown"
                  class="text-lg ml-2 text-yellow-600"
              /></span>
            </div>
            <div
              v-if="slotProps.index + 1 > 1 && slotProps.index + 1 <= 3"
              class="my-auto"
            >
              <span class="font-bold">
                <font-awesome-icon
                  icon="fa-fire"
                  class="text-lg ml-2 text-orange-600"
              /></span>
            </div>
          </div>
        </template>
      </Column>
      <Column field="user.username" header="User">
        <template #body="slotProps">
          <div
            class="flex gap-1 cursor-pointer"
            @click="router.push(`/profile/${slotProps.data._id}`)"
          >
            <ProfilePicture
              :username="slotProps.data.user.username"
              :profilePicture="slotProps.data.user.profilePicture"
              size="16"
            />
            <p class="my-auto font-bold mx-2">
              {{ slotProps.data.user.username }}
            </p>
          </div>
        </template>
      </Column>
      <Column field="count" header="Reviews" />
      <Column field="avg" header="Average Rating">
        <template #body="slotProps">
          <FormsRating :rating="Math.round(slotProps.data.avg)" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
