<script setup lang="ts">
const props = defineProps<{
  link: string;
  highlight: string;
}>();

const router = useRouter();
</script>

<template>
  <a
    @click="router.push(link)"
    class="hover:cursor-pointer"
    :class="`text-[${highlight}]`"
    ><slot></slot
  ></a>
</template>
