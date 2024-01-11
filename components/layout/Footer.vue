<script setup lang="ts">
const router = useRouter();

const redirect = (to: string) => {
  router.push(to);
};
</script>

<template>
  <nav class="footer flex flex-row bg-[#1e1e1e] text-[#f0ffff]">
    <div class="logo align-middle m-auto">
      <h3 class="font-bold">SoundSpot</h3>
    </div>

    <div class="mx-auto py-3">
      <h3 class="font-semibold text-sm">LINKS</h3>
      <ul class="text-xs cursor-pointer">
        <li @click="redirect('/')">Home</li>
        <li @click="redirect('/lists')">Lists</li>
        <li @click="redirect('/tracks')">Tracks</li>
        <li @click="redirect('/artists')">Artists</li>
        <li @click="redirect('/albums')">Albums</li>
      </ul>
    </div>

    <div class="socials mx-auto py-3">
      <h3 class="font-semibold text-sm">SOCIALS</h3>
      <ul class="text-xs cursor-pointer">
        <li>Twitter</li>
        <li>Instagram</li>
        <li>Facebook</li>
      </ul>
    </div>

    <div class="contact mx-auto py-3">
      <h3 class="font-semibold text-sm">CONTACT</h3>
      <ul class="text-xs cursor-pointer">
        <li>
          <a href="mailto:tim.rayner2020@gmail.com"> Email us </a>
        </li>
      </ul>
    </div>

    <div class="legal mx-auto py-3">
      <h3 class="font-semibold text-sm">LEGAL</h3>
      <ul class="text-xs cursor-pointer">
        <li>Terms of Service</li>
        <li>Privacy Policy</li>
      </ul>
    </div>
  </nav>
</template>
