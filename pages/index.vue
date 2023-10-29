<script lang="ts" setup></script>
<template>
  <div
    class="header text-center py-12 pb-32 bg-[#1e1e1e] text-[#f0ffff] dark:bg-white dark:text-[#1e1e1e]"
  >
    <h1 class="text-5xl font-bold my-4">SoundSpot</h1>
    <h3 class="text-xl">The worlds first social rating platform for music</h3>
    <Button class="mt-8" severity="secondary" raised
      >Get Started, Its Free</Button
    >
  </div>
  <SpotifySearch class="my-12" :spotlight-search="true" />
</template>
<style></style>
