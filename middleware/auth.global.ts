import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware((to) => {
  //exclude index page from auth middleware
  const { authenticateUser } = useAuthStore();
  const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive

  const accessToken = useCookie("token");
  const refreshToken = useCookie("refresh_token");

  if (accessToken.value) {
    authenticateUser(accessToken.value, refreshToken.value ?? undefined);
  }

  //@ts-ignore
  if (
    ["index", "tracks-id", "lists-id", "albums-id", "artists-id"].includes(
      to.name
    )
  ) {
    return;
  }

  const token = useCookie("token"); // get token from cookies

  if (token.value) {
    // check if value exists
    authenticated.value = true; // update the state to authenticated
  }

  // if token exists and url is /login redirect to homepage
  if (token.value && to?.name === "login") {
    return navigateTo("/");
  }

  // if token doesn't exist redirect to log in
  if (!token.value && to?.name !== "login") {
    abortNavigation();
    return navigateTo("/login");
  }
});
