import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authenticated: false,
    loading: false,
    user: null,
  }),
  actions: {
    async authenticateUser(userToken?: string) {
      //set token cookie
      if (userToken) {
        const token = useCookie("token"); // useCookie new hook in nuxt 3
        token.value = userToken; // set token to cookie
        this.authenticated = true; // set authenticated  state value to true
      }
      const test = await axios
        .get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .catch((err) => {
          console.log(err);
        })
        .then((response) => {
          //@ts-ignore
          return response.data;
        });
      this.user = test;
    },
    logUserOut() {
      const token = useCookie("token"); // useCookie new hook in nuxt 3
      this.authenticated = false; // set authenticated  state value to false
      token.value = null; // clear the token cookie

      //clear the user object from state
      this.user = null;
    },
  },
});