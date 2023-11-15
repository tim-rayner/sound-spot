import { defineStore } from "pinia";
import axios from "axios";
import { useLocalStorage } from "@vueuse/core";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authenticated: false,
    loading: false,
    user: null,
    isUserSignup: false, //this is for when a use has been signed in for the first time, so the app knows to take user through onboarding process
  }),
  actions: {
    async authenticateUser(userToken: string, refreshToken?: string) {
      if (!userToken) return this.logUserOut();
      //set token cookie
      if (refreshToken) {
        const refresh = useCookie("refresh_token"); // useCookie new hook in nuxt 3
        refresh.value = refreshToken; // set token to cookie
      }
      if (userToken) {
        const token = useCookie("token"); // useCookie new hook in nuxt 3
        token.value = userToken; // set token to cookie
        this.authenticated = true; // set authenticated  state value to true
      }

      const spotifyUser = await axios
        .get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .catch((err) => {
          this.logUserOut();
        })
        .then((response) => {
          //@ts-ignore
          return response.data;
        });

      await axios
        .post("/api/auth/login", spotifyUser)
        .then((response) => {
          this.user = response.data;
          useLocalStorage("ud01xy", JSON.stringify(this.user)); //TODO: not sure if this is the best way to do this
        })
        .catch((err) => {
          console.log(err);
        });
    },
    logUserOut() {
      const token = useCookie("token"); // useCookie new hook in nuxt 3
      const refreshToken = useCookie("refresh_token"); // useCookie new hook in nuxt 3

      this.authenticated = false; // set authenticated  state value to false
      token.value = null; // clear the token cookie
      refreshToken.value = null; // clear the refresh token cookie
      //clear the user object from state
      this.user = null;
    },
  },
});
