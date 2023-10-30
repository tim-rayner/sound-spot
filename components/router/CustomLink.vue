<script setup lang="ts">
const props = defineProps<{
  link: string;
}>();

const router = useRouter();
</script>

<template>
  <a @click="router.push(link)" class="hover:cursor-pointer"><slot></slot></a>
</template>
