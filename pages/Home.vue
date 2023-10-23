<script setup lang="ts">
definePageMeta({
  middleware: "auth",
  layout: "authorized",
});
</script>

<template>
  <h1>Home</h1>
  <h2>Only Auth users should see this</h2>
</template>
