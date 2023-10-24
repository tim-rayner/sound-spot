<script setup lang="ts">
import { ref } from "vue";

const { query } = useRoute();
const info = ref(null);

if (query.code && query.state) {
  const { data: api } = await useFetch("/api/auth/options", {
    method: "post",
    body: { code: query.code, state: query.code },
  });

  info.value = api;

  const { data: response } = await useFetch("/api/auth/token", {
    method: "post",
    body: api.value,
  });

  info.value = response.value;
}
</script>

<template>
  <div>
    index
    <h1 class="">Welcome to SoundSpot</h1>
    <h2 v-if="info">Logged in as {{ info.display_name }}</h2>
    <NuxtLink to="/SignUp">Sign Up</NuxtLink>
  </div>
</template>
