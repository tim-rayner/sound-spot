import { defineStore } from "pinia";

export const useGlobalStore = defineStore("global", {
  state: () => ({
    darkModeActive: false,
  }),
  actions: {
    toggleDarkMode() {
      this.darkModeActive = !this.darkModeActive;
    },
  },
});
