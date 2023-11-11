<script setup>
import useUiStore from "~/store/ui";

const nuxtApp = useNuxtApp();

nuxtApp.hook("page:finish", () => {
  if (useUiStore().$state.pageLoader == true) {
    useUiStore().setPageLoader(false);
  }
});
</script>
<script>
export default {
  watch: {
    showLoader(newVal, oldVal) {
      if (newVal == true) {
        this.$refs.progressBar.style.opacity = "1";
        this.$refs.progressBar.style.transitionDuration = "1000ms";
        this.$refs.progressBar.style.width = "40%";
      } else if (newVal == false) {
        this.$refs.progressBar.style.transitionDuration = "1000ms";
        this.$refs.progressBar.style.width = "100%";
        setTimeout(() => {
          this.$refs.progressBar.style.opacity = "0";
          this.$refs.progressBar.style.transitionDuration = "0ms";
          this.$refs.progressBar.style.width = "0%";
        }, 1000);
      }
    },
  },
  computed: {
    showLoader() {
      return useUiStore().$state.pageLoader;
    },
  },
};
</script>
<template>
  <div
    ref="progressBar"
    class="fixed left-0 top-0 z-50 transition-all bg-orange h-[3px] LoadingBar shadow-[0_0_10px] shadow-orange"
    :style="{ width: '0%' }"
  ></div>
</template>
