<script setup lang="ts">
const route = useRoute();

const { data: profileData } = await useFetch(`/api/users/${route.params.id}`);
</script>

<template>
  <div>
    <ProfilePublicHeader v-if="profileData" :user="profileData" />
  </div>
</template>
