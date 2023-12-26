<script setup lang="ts">
import { getProfilePicture } from "~/helpers/getProfilePicture";
import type { iDiscussion } from "~/types/discussion-types";

const props = defineProps({
  discussion: {
    type: Object as PropType<iDiscussion>,
    required: true,
  },
});

const router = useRouter();
</script>

<template>
  <div class="my-2 w-full">
    <Fieldset>
      <template #legend>
        <div
          class="flex align-items-center gap-3 px-2 hover:cursor-pointer"
          @click="router.push(`/profile/${discussion.ownerId}`)"
        >
          <Avatar
            :image="
              getProfilePicture(discussion?.ownerImage, discussion?.ownerImage)
            "
            shape="circle"
          />
          <span class="font-bold align-middle my-auto"
            >{{ discussion.ownerName }}
          </span>
        </div>
      </template>
      <p class="m-0" v-if="discussion.comments?.length">
        {{ discussion.comments![0] }}
      </p>
    </Fieldset>
  </div>
</template>
