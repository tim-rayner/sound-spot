<script lang="ts" setup>
import Navbar from "~/components/layout/Navbar.vue";
</script>

<template>
  <div>
    <Navbar />
    <div class="mainContent mt-[64px] md:mt-[80px]">
      <slot />
    </div>
  </div>
</template>
