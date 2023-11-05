<script setup lang="ts">
import type { List } from "~/types/list-types";

const emit = defineEmits(["listSubmitted"]);

const newList = ref<List>({
  _id: "",
  name: "",
  coverPhoto: "",
  description: "",
  isPublic: true,
  createdAt: "",
  saves: 0,
});

const onSubmit = () => {
  emit("listSubmitted", newList.value);
};
</script>

<template>
  Create new List Form
  <h3>Create new list</h3>
  <form @submit.prevent="onSubmit" class="mt-8">
    <span class="p-float-label pt-2">
      <InputText
        id="search"
        v-model="newList.name"
        :autofocus="true"
        class="rounded-r-none w-full"
        autocomplete="off"
      />
      <label for="search">Name</label>
    </span>

    <span class="p-float-label pb-2 mt-8">
      <Textarea
        id="description"
        v-model="newList.description"
        :autofocus="true"
        class="rounded-r-none w-full"
        autocomplete="off"
      />
      <label for="description">Description</label>
    </span>

    <span class="p-float-label pt-2 mt-8">
      <InputText
        id="image"
        v-model="newList.coverPhoto"
        :autofocus="true"
        class="rounded-r-none w-full"
        autocomplete="off"
      />
      <label for="image">Image url</label>
    </span>

    <div class="p-label pt-2 mt-8">
      <label for="public" class="align-middle m-auto"> public </label>
      <InputSwitch
        id="public"
        class="align-middle m-auto ml-4"
        v-model="newList.isPublic"
      />
    </div>
    <Button type="submit" label="Create" class="w-full mt-8" />
  </form>
</template>
