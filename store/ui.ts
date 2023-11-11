import { defineStore, acceptHMRUpdate } from "pinia";

const useUiStore = defineStore("uiStore", {
  state: () => {
    return {
      pageLoader: false,
    };
  },
  actions: {
    setPageLoader(value: boolean) {
      this.pageLoader = value;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUiStore, import.meta.hot));
}

export default useUiStore;
