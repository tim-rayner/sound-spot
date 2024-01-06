<script setup lang="ts">
import axios from "axios";
import type { UserSettings } from "~/types/user-types";
import type { iUser } from "~/types/user-types";

const genreOptions = [
  "Pop",
  "Rap",
  "Jazz",
  "Hip Hop",
  "country",
  "Rock",
  "Metal",
  "Classical",
  "Blues",
  "Electronic",
  "Folk",
  "Reggae",
  "Soul",
  "R&B",
  "Punk",
  "Disco",
  "Funk",
  "Techno",
  "House",
  "Dance",
  "Indie",
  "Alternative",
  "Gospel",
  "Latin",
  "K-Pop",
  "Instrumental",
  "Ambient",
  "Dubstep",
  "Trap",
  "Drum and Bass",
  "Ska",
  "Trance",
  "Garage",
  "Grime",
  "Hardcore",
  "Hardstyle",
  "Jungle",
  "Opera",
  "Ska",
  "Swing",
  "Synthpop",
  "Tango",
  "World",
  "Other",
];

const userFS = localStorage.getItem("ud01xy");
const user = ref<iUser>();

if (userFS) {
  user.value = JSON.parse(userFS);
}

const userSettings: Ref<UserSettings | null> = ref(null);

const response = await axios.post("/api/users/settings", {
  userId: user?.value?._id,
});

if (response.data) {
  userSettings.value = response.data;
  userSettings.value?.favouriteGenres === null
    ? []
    : userSettings.value?.favouriteGenres;
}

const saveSettings = async () => {
  const response = await axios.post(`/api/users/settings/${user?.value?._id}`, {
    userSettings: userSettings.value,
  });
  if (response.data) {
    userSettings.value = response.data;
  }
};
</script>

<template>
  <div class="pt-12">
    <div class="flex flex-col">
      SETTINGS PAGE
      <div class="loading" v-if="!userSettings">Loading...</div>
      <div class="settings" v-else>
        <div class="mb-4">
          <label> Username </label>
          <InputText
            type="text"
            id="username"
            name="username"
            v-model="userSettings.username"
            class="ml-2"
            disabled
          />
        </div>
        <div class="mb-4">
          <label> Account Email </label>
          <InputText
            type="text"
            id="email"
            name="email"
            v-model="userSettings.email"
            class="ml-2"
            disabled
          />
        </div>
        <div class="mb-4">
          <label> Parental Controls </label>
          <InputSwitch
            type="checkbox"
            id="parentalControls"
            name="parentalControls"
            class="ml-2"
            v-model="userSettings.parentalControls"
          />
        </div>
        <div class="mb-4">
          <label> Favourite Genres </label>
          <MultiSelect
            type="text"
            id="genres"
            name="genres"
            placeholder="Select Genres"
            v-model="userSettings.favouriteGenres"
            :options="genreOptions"
            class="w-full md:w-20rem"
          />
        </div>
        <Button label="Save" @click="saveSettings" />
      </div>
    </div>
  </div>
</template>
