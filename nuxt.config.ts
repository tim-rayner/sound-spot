// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    "~/assets/css/main.css",
    "primevue/resources/primevue.css",
    "primevue/resources/themes/lara-light-teal/theme.css",
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ["@pinia/nuxt"],
  runtimeConfig: {
    // Keys within runtimeConfig are exposed client-side
    apiBase: "/api",
    mongodbUri: process.env.MONGODB_URI,
    spotifyClientId: process.env.SPOTIFY_CLIENT_ID,
    spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  },
  nitro: {
    plugins: ["~/server/index.ts"],
  },
  plugins: [{ src: "~/plugins/primevue.ts", mode: "client" }],
});
