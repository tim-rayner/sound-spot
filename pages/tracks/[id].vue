<!-- 
    File: /pages/tracks/[id].vue
    Url:  /tracks/123
 -->
<script setup lang="ts">
import type { Item } from "~/types/spotify-types";
import ExplicitIcon from "~/assets/svg/explicit.svg";
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";

import CustomLink from "~/components/router/CustomLink.vue";
import type { RatingListedRating } from "#build/components";
import type { iRating } from "~/types/rating-types";

const { authenticated, user } = storeToRefs(useAuthStore());
const router = useRouter();

definePageMeta({ auth: false });

const route = useRoute();
const track = ref<Item>();

const { data: trackData } = await useFetch(
  `/api/items/tracks/${route.params.id}`
);

if (trackData.value) {
  track.value = trackData.value;
}

const listenOnSpotify = () => {
  window.open(track.value?.external_urls.spotify, "_blank");
};

//
interface FeaturedArtist {
  name: string;
  url: string;
}

const featuredArtists = computed(() => {
  const artists: FeaturedArtist[] = [];
  track.value?.artists.forEach((artist) => {
    artists.push({
      name: artist.name,
      url: `/artists/${artist.id}`,
    });
  });
  return artists;
});

const ratingPosted = (rating: iRating) => {
  rating.username = user.value?.username!;
  rating.userProfilePicture = user.value?.profilePicture!;
  track?.value?.ratings.push(rating);
};
</script>

<template>
  <div
    class="content container w-[1070px] mx-auto min-h-screen my-12 shadow-2xl rounded-lg"
  >
    <div class="flex flex-row header border p-12 rounded-t-lg">
      <div class="img rounded-full pr-0">
        <div class="img">
          <img
            :src="track?.album.images[0].url"
            :alt="track?.album.name"
            class="w-96 rounded-2xl"
          />
        </div>
      </div>
      <div class="info mx-12 my-6">
        <h1 class="text-4xl font-bold i flex">
          {{ track?.name }}
          <span
            v-if="track?.explicit"
            class="text-lg align-middle m-auto mx-2"
            title="explicit content"
          >
            <img :src="ExplicitIcon" alt="" class="w-6 h-6 dark:bg-white" />
          </span>
        </h1>
        <p class="text-xl font-bold">
          <CustomLink :link="`/albums/${track?.album.id}`">{{
            track?.album.name
          }}</CustomLink>
        </p>
        <p class="font-bold">
          <span v-for="artist in featuredArtists">
            <CustomLink :link="artist.url" class="text-[#1ab26b]">
              {{ artist.name }}</CustomLink
            >
            <span v-if="artist !== featuredArtists[featuredArtists.length - 1]"
              >,
            </span>
          </span>
          -
          {{ track?.album.release_date.slice(0, 4) }}
        </p>
        <div v-if="track?.avgRating">
          <FormsRating :rating="track?.avgRating" class="mt-3" />
        </div>
        <p v-else>
          Not rated yet, be the first to
          <CustomLink link="#" highlight="#1ab26b"> leave a rating</CustomLink>
        </p>
        <Button class="mt-4 mr-4" @click="" v-if="authenticated">
          Leave a rating
        </Button>
        <FormsAddToList
          :trackId="track!.id"
          class="mr-4"
          v-if="authenticated"
        />
        <Button class="mt-4 mr-4" @click="listenOnSpotify">
          Listen on Spotify
        </Button>
      </div>
    </div>
    <div class="rating-area">
      <div class="ratings p-12">
        <RatingListedRating
          v-for="rating in track?.ratings"
          :rating="rating"
          class="mb-12"
        />
      </div>
      <div class="leave-rating-input p-12">
        <RatingInputBox
          :itemId="track?.id!"
          itemType="track"
          :previouslyRated="false"
          :previousRating="track?.avgRating"
          @ratingPosted="ratingPosted"
        />
      </div>
    </div>
  </div>
</template>
