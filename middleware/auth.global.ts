import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware(async (to) => {
  //exclude index page from auth middleware
  const { authenticateUser } = useAuthStore();
  const { authenticated, user } = storeToRefs(useAuthStore()); // make authenticated state reactive

  const accessToken = useCookie("token");
  const refreshToken = useCookie("refresh_token");

  const { query } = useRoute();

  if (accessToken.value && !user.value) {
    authenticateUser(accessToken.value, refreshToken.value ?? undefined);
  }

  if (query.code && query.state && !user.value) {
    //get options (fetches string from server)
    const { data: optionsBody } = await useFetch("/api/auth/options", {
      method: "post",
      body: { code: query.code, state: query.state },
    });

    //get token (contacts spotify api)
    const { data: response } = await useFetch("/api/auth/token", {
      method: "post",
      body: optionsBody.value,
    }).catch((err) => {
      console.log(err);
    });

    if (response.value) {
      authenticateUser(
        response.value.body.accessToken,
        response.value.body.refreshToken
      );
    } else {
      authenticateUser(
        useCookie("token").value ?? "",
        useCookie("refresh_token").value ?? ""
      );
    }
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
