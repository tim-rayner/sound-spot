<script setup lang="ts">
import { storeToRefs } from "pinia"; // import storeToRefs helper hook from pinia
import { useGlobalStore } from "~/store/global"; // import the auth store we just created
const { toggleDarkMode } = useGlobalStore(); // use authenticateUser action from  auth store
const { darkModeActive } = storeToRefs(useGlobalStore());
const colorMode = useColorMode();

const darkMode = ref(darkModeActive);

darkMode.value = colorMode.value === "dark";

const toggleColorMode = () => {
  toggleDarkMode();
  colorMode.value = darkMode.value ? "dark" : "light";
};
</script>

<template>
  <div class="flex align-middle items-center">
    <InputSwitch @change="toggleColorMode" :model-value="darkMode" />
    <span>
      <font-awesome-icon
        :icon="darkMode ? ' fa-moon' : ' fa-sun'"
        class="ml-2 text-lg"
      />
    </span>
  </div>
</template>
