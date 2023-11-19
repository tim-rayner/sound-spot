<script setup lang="ts"></script>

<template>
  <ColorScheme placeholder="..." tag="span">
    <div id="celebrate" class="absolute left-0 right-0"></div>
    <div class="dark:bg-[#1e1e1e] dark:text-[#f0ffff] min-h-screen">
      <NuxtLayout>
        <LoaderIndicator />
        <NuxtPage />
      </NuxtLayout>
    </div>
  </ColorScheme>
  <!-- TODO: change positioning and color -->
  <Toast />
</template>
