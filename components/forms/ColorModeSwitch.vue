<script setup lang="ts">
const colorMode = useColorMode();

const darkModeActive = ref(false);

darkModeActive.value = colorMode.value === "dark";

const toggleDarkMode = () => {
  darkModeActive.value = !darkModeActive.value;
  colorMode.value = darkModeActive.value ? "dark" : "light";
};
</script>

<template>
  <div class="flex align-middle items-center">
    <InputSwitch @change="toggleDarkMode" :model-value="darkModeActive" />
    <span>
      <font-awesome-icon
        :icon="darkModeActive ? ' fa-moon' : ' fa-sun'"
        class="ml-2 text-lg"
      />
    </span>
  </div>
</template>
