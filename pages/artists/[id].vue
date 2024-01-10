<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";
import type { Artist } from "~/types/spotify-types";
import type { iRating } from "~/types/rating-types";

import axios from "axios";
import type { LastFmWikiArtist } from "~/types/last-fm-types";

const { authenticated, user } = storeToRefs(useAuthStore());
const router = useRouter();

definePageMeta({ auth: false });

const route = useRoute();
const artist = ref<Artist>();
const suggestedArtists = ref<Artist[]>();
const artistInfo: Ref<LastFmWikiArtist | null> = ref(null);

//GET ARTIST DATA
const { data: artistData } = await useFetch(
  `/api/items/artists/${route.params.id}`
);

if (artistData.value) {
  artist.value = artistData.value.artistData;
  suggestedArtists.value = artistData.value.recommendations;
  artistInfo.value = artistData.value.artistInfo;
}

const ratingPosted = (rating: iRating) => {
  rating.username = user.value?.username!;
  rating.userProfilePicture = user.value?.profilePicture!;
  artist.value?.ratings?.push(rating);
};
</script>

<template>
  <div
    class="content container md:w-[1070px] mx-auto min-h-screen my-12 shadow-2xl rounded-lg"
  >
    <div class="flex flex-col md:flex-row header rounded-t-xl border">
      <div class="img rounded-full md:p-12 md:pr-0">
        <img
          :src="artist?.images[0].url"
          :alt="artist?.image"
          class="w-48 h-48 rounded-full md:float-right mx-auto md:m-0"
        />
      </div>
      <div class="info md:mx-12 my-6 p-12 md:pl-6">
        <h1 class="text-4xl font-bold i flex">
          {{ artist?.name }}
        </h1>
        <h3 class="my-2">{{ artist?.genres.join(",") }}</h3>
        <div>
          <small class="mt-3">{{ artist?.followers.total }} followers </small>
        </div>
        <div v-if="artist?.avgRating">
          <FormsRating :rating="artist?.avgRating" class="mt-3" />
        </div>
      </div>
    </div>

    <!-- TODO: GET TOP SONGS FROM ARTIST -->
    <!-- <div class="flex flex-row my-12 mt-6 mx-4">
      <div
        v-for="song in artist.tracks"
        :key="song.id"
        class="w-[40vw] h-auto mx-2"
      >
        <SpotlightSearchResult :searchResult="song" />
      </div>
    </div> -->

    <!-- TAB AREA-->
    <TabView class="mx-4">
      <TabPanel header="Reviews">
        <div class="rating-area">
          <div class="ratings md:px-12 py-4">
            <RatingListedRating
              v-for="rating in artist?.ratings"
              :rating="rating"
              class="mb-12"
            />
          </div>
          <div class="leave-rating-input md:px-12 py-4">
            <RatingInputBox
              :itemId="artist?.id!"
              itemType="artist"
              :previouslyRated="false"
              :previousRating="artist?.avgRating"
              @ratingPosted="ratingPosted"
            />
          </div>
        </div>
      </TabPanel>
      <TabPanel header="Related">
        <div class="related-tracks">
          <div class="flex flex-wrap">
            <!-- TODO: CREATE ARTIST LIST CARD COMPONENT -->
            <div
              v-for="artist in suggestedArtists"
              :key="artist.id"
              class="h-auto md:mx-2 flex w-full hover:cursor-pointer"
              @click="router.push(`/artists/${artist.id}`)"
            >
              <img
                :src="artist?.images[0].url"
                :alt="artist?.image"
                class="w-32 h-32 md:w-48 md:h-48 rounded-full align-middle my-auto mx-1"
              />
              <div class="info md:mx-12 my-6 p-12 pl-6">
                <h1 class="text-4xl font-bold i flex">
                  {{ artist?.name }}
                </h1>
                <h3 class="my-2">{{ artist?.genres.join(",") }}</h3>
                <div>
                  <small class="mt-3"
                    >{{ artist?.followers.total }} followers
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TabPanel>
      <TabPanel header="Artist Info">
        <p
          class="m-0"
          v-html="
            artistInfo?.summary ??
            'No data found for this Artist yet, check back later!'
          "
        ></p>
      </TabPanel>
    </TabView>
  </div>
</template>
