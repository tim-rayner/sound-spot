<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "~/store/auth";
import type { iRating } from "~/types/rating-types";
import type { Album } from "~/types/spotify-types";

const route = useRoute();
const { user } = storeToRefs(useAuthStore());

const album = ref<Album>();

const { data: trackData } = await useFetch(
  `/api/items/albums/${route.params.id}`
);

if (trackData.value) {
  album.value = trackData.value;
}

const ratingPosted = (rating: iRating) => {
  rating.username = user.value?.username!;
  rating.userProfilePicture = user.value?.profilePicture!;

  album.value?.ratings?.push(rating);
};
</script>

<template>
  <div
    class="content container w-[1070px] mx-auto min-h-screen my-12 shadow-2xl rounded-lg"
  >
    <div class="flex flex-row header rounded-t-xl border">
      <div class="img rounded-full p-12 pr-0">
        <img
          :src="album?.images[0].url"
          :alt="album?.name"
          class="w-96 rounded-2xl"
        />
      </div>
      <div class="info mx-12 my-6 p-12 pl-6">
        <h1 class="text-4xl font-bold i flex">
          {{ album?.name }}
        </h1>
        <div>
          <small class="mt-3">{{ album?.release_date }} </small>
        </div>
        <div v-if="album?.avgRating">
          <FormsRating :rating="album?.avgRating" class="mt-3" />
        </div>
      </div>
    </div>

    <!-- TODO: GET  SONGS FROM ALBUM -->
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
          <div class="ratings px-12 py-4">
            <RatingListedRating
              v-for="rating in album?.ratings"
              :rating="rating"
              class="mb-12"
            />
          </div>
          <div class="leave-rating-input px-12 py-4">
            <RatingInputBox
              :itemId="album?.id!"
              itemType="album"
              :previouslyRated="false"
              :previousRating="album?.avgRating"
              @ratingPosted="ratingPosted"
            />
          </div>
        </div>
      </TabPanel>
      <TabPanel header="Related">
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
      <TabPanel header="Album Info">
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
