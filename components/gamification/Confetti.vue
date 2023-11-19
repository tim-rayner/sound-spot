<script setup lang="ts"></script>

<template>
  <client-only>
    <Teleport to="#celebrate">
      <Vue3Lottie
        animationLink="https://lottie.host/a2a1fd92-c4f8-4f4a-95d8-f2500a365e79/DCy5nbxenV.json"
        :height="700"
        :width="1000"
        :loop="false"
        class="absolute left-0 right-0 !z-50"
      />
    </Teleport>
  </client-only>
</template>
