<script setup lang="ts">
import type { iDiscussion } from "~/types/discussion-types";

const props = defineProps<{
  discussions: iDiscussion[];
}>();

const { discussions } = toRefs(props);
</script>
<template>
  <div
    v-if="discussions.length"
    v-for="discussion in discussions"
    :key="discussion._id"
  >
    <div class="flex flex-col">
      <div class="flex">
        <DiscussionComment :discussion="discussion" />
      </div>
    </div>
  </div>
  <div v-else>
    <p>No discussions yet</p>
  </div>
</template>
