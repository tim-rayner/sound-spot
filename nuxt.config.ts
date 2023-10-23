// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    // Keys within runtimeConfig are exposed client-side
    apiBase: "/api",
    mongodbUri: process.env.MONGODB_URI,
  },
  nitro: {
    plugins: ["~/server/index.ts"],
  },
});
