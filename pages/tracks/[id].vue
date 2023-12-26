<script setup lang="ts">
import type { Item } from "~/types/spotify-types";
import ExplicitIcon from "~/assets/svg/explicit.svg";
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";

import CustomLink from "~/components/router/CustomLink.vue";
import type { RatingListedRating } from "#build/components";
import type { iRating } from "~/types/rating-types";
import axios from "axios";

const { authenticated, user } = storeToRefs(useAuthStore());

definePageMeta({ auth: false });

const route = useRoute();
const track = ref<Item>();
const tabActiveIndex = ref(0);
const suggestedTracks = ref<Item[]>();
const discussions = ref([]);

//GET TRACK DATA
const { data: trackData } = await useFetch(
  `/api/items/tracks/${route.params.id}`
);

if (trackData.value) {
  track.value = trackData.value;
}

//GET SUGGESTED TRACKS
const { data: suggestedTracksData } = await axios.post(
  "/api/items/tracks/suggested",
  {
    track: track.value,
  }
);

if (suggestedTracksData) {
  suggestedTracks.value = suggestedTracksData;
}

//GET DISCUSSIONS
const { data: relatedDiscussions } = await axios.get(
  `/api/discussions/${track.value?.id}`
);

if (relatedDiscussions) {
  discussions.value = relatedDiscussions;
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

const focusRatingInput = async () => {
  await setTab(0);
  const ratingInput = document.getElementById("rating-input");
  ratingInput?.scrollIntoView({ behavior: "smooth" });
  ratingInput?.focus();
};

const setTab = async (tab: number) => {
  tabActiveIndex.value = tab;
};

const submitComment = async (comment: string) => {
  //locally add comment to discussions array
  discussions.value.push(comment);

  // construct payload for discussion comment post request
  const discussionPayload = {
    itemId: track.value?.id,
    owner: user.value?._id,
    createdAt: new Date(),
    comments: [comment],
  };
  console.log(user.value);
  console.log(discussionPayload);

  const { data: response } = await axios.post("/api/discussions/item", {
    discussion: discussionPayload,
  });
};
</script>

<template>
  <div
    class="content container md:w-[1070px] mx-auto min-h-screen my-12 shadow-2xl rounded-lg"
  >
    <div class="flex flex-col md:flex-row header border p-12 rounded-t-lg">
      <div class="img rounded-full pr-0">
        <div class="img">
          <img
            :src="track?.album.images[0].url"
            :alt="track?.album.name"
            class="w-96 rounded-2xl"
          />
        </div>
      </div>
      <!-- Info -->
      <div class="info md:mx-12 my-6">
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
          <Button @click="focusRatingInput"> leave a rating </Button>
        </p>
        <Button
          class="mt-4 mr-4"
          @click="focusRatingInput"
          v-if="authenticated"
        >
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

    <!-- TAB AREA-->
    <TabView class="mx-4" v-model:activeIndex="tabActiveIndex">
      <!-- REVIEWS -->
      <TabPanel header="Reviews">
        <div class="rating-area">
          <div class="mx-12" v-if="track?.ratings?.length > 3">
            <h3 v-if="track?.avgRating > 0">
              Rated {{ track?.avgRating }} stars by
            </h3>
            <AvatarGroup v-if="track?.ratings" :ratings="track?.ratings" />
          </div>

          <div class="ratings md:px-12 py-4">
            <RatingListedRating
              v-for="rating in track?.ratings"
              :rating="rating"
              class="mb-12"
            />
          </div>
          <div class="leave-rating-input md:px-12 py-2">
            <RatingInputBox
              :itemId="track?.id!"
              itemType="track"
              :previouslyRated="false"
              :previousRating="track?.avgRating"
              @ratingPosted="ratingPosted"
            />
          </div>
        </div>
      </TabPanel>
      <!-- RELATED -->
      <TabPanel header="Related">
        <div class="related-tracks">
          <div
            class="flex flex-row flex-wrap gap-12 my-12 mt-6 mx-4 auto-rows-fr"
          >
            <SongOverview v-for="track in suggestedTracks" :track="track" />
          </div>
        </div>
      </TabPanel>
      <!-- DISCUSSIONS -->
      <TabPanel header="Discussions">
        <div class="" v-if="authenticated">
          <div
            class="mx-auto text-center items-center"
            v-if="!discussions.length"
          >
            <p class="text-center">No discussions yet</p>
          </div>

          <div v-else>
            <DiscussionList :discussions="discussions" />
          </div>
          <DiscussionInput @submit-comment="submitComment" />
        </div>
        <div v-else>
          <p class="text-center">
            <CustomLink link="/login">Login</CustomLink> to join the discussion!
          </p>
        </div>
      </TabPanel>
      <TabPanel header="Track Info">
        <p class="m-0">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit,
          sed quia non numquam eius modi.
        </p>
      </TabPanel>
    </TabView>
  </div>
</template>
