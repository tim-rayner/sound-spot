<script setup lang="ts">
import type { List } from "~/types/list-types";

const emit = defineEmits(["addToList"]);
const props = defineProps<{
  list: List;
}>();
</script>

<template>
  <div class="flex flex-row bg-slate-500 rounded-xl text-white">
    <div class="info float-left align-middle m-auto">
      <h4>{{ list.name }}</h4>
    </div>
    <div class="float-right ml-auto">
      <Button label="Add" @click="emit('addToList', list)" />
    </div>
  </div>
</template>
