import useUiStore from "~/store/ui";

export default defineNuxtRouteMiddleware(async (to, from) => {
  useUiStore().setPageLoader(true);
});
