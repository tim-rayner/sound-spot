<script setup lang="ts">
const props = defineProps<{
  searchResult: Item;
}>();
</script>

<template>
  <div class="border hover:cursor-pointer">
    <div class="flex flex-row">
      <div class="flex flex-row">
        <div>
          <span>{{ searchResult.name }} - </span>
          <img :src="searchResult.album.images[0].url" class="w-24" />
        </div>
        <span> {{ searchResult.artists[0].name }} - </span>
        <span> {{ searchResult.album.name }}</span>
      </div>
    </div>
  </div>
</template>
