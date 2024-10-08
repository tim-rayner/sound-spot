<script setup lang="ts">
import axios from "axios";
import { useToast } from "primevue/usetoast";
import { ref } from "vue";
import { useAuthStore } from "~/store/auth";
import type { List } from "~/types/list-types";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const toast = useToast();

const props = defineProps<{
  trackId: string;
}>();

const showAddToListModal = ref(false);

enum views {
  addToList,
  createNewList,
}

const view = ref<views>(0);

const myLists = ref<List[]>([]);

const addToList = () => {
  showAddToListModal.value = true;
};

const cancel = () => {
  if (view.value === views.createNewList) {
    view.value = views.addToList;
    return;
  }
  closeDialog();
};
const closeDialog = () => {
  showAddToListModal.value = false;
};

const { data: listData } = await useFetch(`/api/lists/user/${user.value?._id}`);

if (listData.value) {
  myLists.value = listData.value;
}

const postNewList = async (newList: List) => {
  view.value = views.addToList;
  newList.owner = user.value?._id;
  newList.isPublic = true;
  newList.createdAt = new Date().toString();

  const response = await axios.post("/api/lists/new", newList);
};

const submitTrackToList = async (list: List) => {
  const response = await axios.post("/api/lists/add", {
    listId: list._id,
    trackId: props.trackId,
  });
  if (response.status === 200) {
    closeDialog();
    toast.add({
      severity: "success",
      detail: response.data.message,
      life: 3000,
    });
  }
};
</script>

<template>
  <Button @click="addToList" label="Add to list" />

  <Dialog
    v-model:visible="showAddToListModal"
    modal
    :pt="{
      mask: {
        style: 'backdrop-filter: blur(2px)',
      },
    }"
  >
    <template #container>
      <div
        class="px-8 py-5 flex flex-col text-[#f0ffff]"
        style="border-radius: 12px; background-color: #1d1d1d"
      >
        <div class="" v-if="view === views.addToList">
          <h1 class="text-2xl font-bold">Add to list</h1>
          <div class="text-gray-400" v-if="myLists.length > 0">
            <p>Select a list to add this track to</p>
            <div class="list-options py-4 my-2">
              <ListSmallListOption
                v-for="list in myLists"
                :key="list._id"
                :list="list"
                @add-to-list="submitTrackToList"
              />
            </div>
          </div>
          <div class="text-gray-400" v-else>
            <p>
              You don't have any lists yet. Create one to add this track to.
            </p>
          </div>
        </div>
        <div class="" v-else-if="view === views.createNewList">
          <h1 class="text-2xl font-bold">Create new list</h1>
          <p class="text-gray-400">Create a new list to add this track to.</p>
          <FormsCreateNewList @list-submitted="postNewList" />
        </div>
        <Button
          label="Add to new list"
          v-if="view === views.addToList"
          @click="view = views.createNewList"
        />
        <Button
          label="Cancel"
          @click="cancel"
          text
          class="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
        ></Button>
      </div>
    </template>
  </Dialog>
</template>
