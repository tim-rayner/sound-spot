<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();

const blogs = ref<object[]>([]);

const getBlogs = async () => {
  const res = await fetch(`/api/blogs`);
  const blogs = await res.json();
  return blogs;
};

function enableCustomLayout() {
  setPageLayout("authorized");
}
</script>

<template>
  <div>
    <h1>Welcome to SoundSpot</h1>
    <NuxtLink to="/SignUp">Sign Up</NuxtLink>
    <button @click="enableCustomLayout">Enable Authorised Layout</button>
  </div>
</template>
