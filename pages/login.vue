<script lang="ts" setup>
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
  <div>
    <div class="title">
      <h2>Login</h2>
    </div>
    <div class="container form">
      <Button @click.prevent="loginWithSpotify" class="button">
        Login with Spotify
      </Button>
    </div>
  </div>
</template>
