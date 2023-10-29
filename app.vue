<script setup lang="ts">
import { storeToRefs } from "pinia"; // import storeToRefs helper hook from pinia
import { useAuthStore } from "~/store/auth"; // import the auth store we just created

const { authenticateUser } = useAuthStore(); // use authenticateUser action from  auth store
const { user } = storeToRefs(useAuthStore());

const { query } = useRoute();

//TODO: TAKE OUT OF INDEX PAGE AND SEGREGATE
if (query.code && query.state) {
  //get options
  const { data: optionsBody } = await useFetch("/api/auth/options", {
    method: "post",
    body: { code: query.code, state: query.state },
  });

  //get token
  const { data: response } = await useFetch("/api/auth/token", {
    method: "post",
    body: optionsBody.value,
  });

  if (response.value) {
    authenticateUser(response.value);
  }
}
</script>

<template>
  <ColorScheme placeholder="..." tag="span">
    <div class="dark:bg-[#1e1e1e] dark:text-[#f0ffff] min-h-screen">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </ColorScheme>
</template>
