<script setup lang="ts">
const route = useRoute();

const { data: profileData } = await useFetch(
  `/api/users/public/${route.params.id}`
);

//takes first name from username and displays it with a 's
const firstName = computed(() => {
  if (profileData.value?.userProfile?.username) {
    const name = profileData.value?.userProfile?.username.split(" ")[0];
    return `${name}'s`;
  }
});
</script>

<template>
  <div v-if="profileData">
    <ProfilePublicHeader :user="profileData" />
    <div v-if="profileData.topTracks.length">
      <div class="flex flex-row">
        <h3 class="text-xl mx-6 align-middle my-auto">
          {{ firstName }} Top Tracks
        </h3>
      </div>
      <div class="flex flex-row flex-wrap gap-12 my-12 mt-6 mx-4 auto-rows-fr">
        <div v-for="track in profileData.topTracks" :key="track._id">
          <SongOverview :track="track" />
        </div>
      </div>
    </div>
    <div v-if="profileData.topLists.length">
      <div class="flex flex-row">
        <h3 class="text-xl mx-6 align-middle my-auto">
          {{ firstName }} Top Lists
        </h3>
      </div>
      <div class="flex flex-row flex-wrap gap-12 my-12 mt-6 mx-4 auto-rows-fr">
        <div v-for="list in profileData.topLists" :key="list._id">
          <ListOverview :list="list" class="w-[20vw] h-auto" />
        </div>
      </div>
    </div>
  </div>
</template>
