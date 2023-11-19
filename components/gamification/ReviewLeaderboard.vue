<script setup lang="ts">
import axios from "axios";
import type { RatingUserAggr } from "~/types/user-types";

const router = useRouter();

const tableData = ref<RatingUserAggr[]>([]);

const { data: response } = await axios
  .get("http://localhost:3000/api/leaderboards/reviews")
  .catch((err) => {
    console.log(err);
  });
if (response) {
  tableData.value = response;
}
</script>

<template>
  <div>
    <DataTable :value="tableData" class="card !z-0">
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
