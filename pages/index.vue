<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();

const blogs = ref<object[]>([]);

const getBlogs = async () => {
  const res = await fetch(`/api/blogs`);
  const blogs = await res.json();
  return blogs;
};

onMounted(async () => {
  blogs.value = await getBlogs();
  console.log(blogs);
});
</script>

<template>
  <div v-for="blog in blogs">
    <h1>{{ blog.name }}</h1>
  </div>
</template>
