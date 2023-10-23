<script setup lang="ts">
/**
 * @TODO Use Spotiy's auth code flow to signup and login users
 * https://developer.spotify.com/documentation/web-api/tutorials/code-flow
 */
definePageMeta({
  layout: false,
});

//route to spotify auth
const loginWithSpotify = async () => {
  const response = await fetch(`/api/auth/login`);
  const { redirect } = await response.json();
  window.location.href = redirect.url;
};
</script>

<template>
  <h1>Sign Up</h1>
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/1200px-Spotify_logo_without_text.svg.png"
    alt="Spotify Logo"
    style="width: 50px"
  />
  <br />
  <button @click="loginWithSpotify">Sign up with Spotify</button>
</template>
