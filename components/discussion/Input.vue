<script setup lang="ts">
const newComment = ref("");

const emit = defineEmits(["submitComment"]);

const submitComment = () => {
  emit("submitComment", newComment.value);
  console.log(newComment.value);
  newComment.value = "";
};
</script>

<template>
  <div class="flex flex-col">
    <Textarea
      v-model="newComment"
      auto-resize
      rows="5"
      class="w-full"
      placeholder="leave comment"
    />
    <Button @click="submitComment" label="Submit" class="w-fit my-2" />
  </div>
</template>
