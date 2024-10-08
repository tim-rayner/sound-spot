<script setup lang="ts">
import { ref } from "vue";
import AlbumListItem, {
  type AlbumTrack,
} from "~/components/song/AlbumListItem.vue";
import { useAuthStore } from "~/store/auth";
import type { LastFmWikiAlbum } from "~/types/last-fm-types";
import type { iRating } from "~/types/rating-types";
import type { Album } from "~/types/spotify-types";

const route = useRoute();
const router = useRouter();

const { user } = storeToRefs(useAuthStore());

const album = ref<Album>();
const suggestedAlbums = ref<Album[]>();
const albumInfo = ref<LastFmWikiAlbum | null>(null);
const albumTracks = ref<AlbumTrack[]>();

//GET ALBUM DATA
const { data: albumData } = await useFetch(
  `/api/items/albums/${route.params.id}`
);

if (albumData.value) {
  album.value = albumData.value.AlbumData;
  albumInfo.value = albumData.value.AlbumInfo?.summary ?? null;
  suggestedAlbums.value = albumData.value.recommendations;

  albumTracks.value = album.value?.tracks?.items.map((track) => {
    return {
      name: track.name,
      artists: track.artists,
      duration_ms: track.duration_ms,
      track_number: track.track_number,
      id: track.id,
    };
  });
}

const ratingPosted = (rating: iRating) => {
  rating.username = user.value?.username!;
  rating.userProfilePicture = user.value?.profilePicture!;

  album.value?.ratings?.push(rating);
};
</script>

<template>
  <div
    class="content container md:w-[1070px] mx-auto min-h-screen my-12 shadow-2xl rounded-lg"
  >
    <div class="flex flex-col md:flex-row header rounded-t-xl border p-12">
      <div class="img rounded-full md:pr-0">
        <img
          :src="album?.images[0].url"
          :alt="album?.name"
          class="w-96 rounded-2xl mx-auto"
        />
      </div>

      <div class="info md:mx-12 my-6 md:p-12 md:px-12">
        <h1 class="text-4xl font-bold i flex">
          {{ album?.name }}
        </h1>
        <h2>{{ album?.artists.map((artist) => artist.name).join(",") }}</h2>
        <div>
          <small class="mt-3">{{ album?.release_date }} </small>
        </div>
        <div v-if="album?.avgRating">
          <FormsRating :rating="album?.avgRating" class="mt-3" />
        </div>
      </div>
    </div>

    <!-- TODO: GET  SONGS FROM ALBUM -->

    <!-- TAB AREA-->
    <TabView class="mx-4">
      <TabPanel header="Songs">
        <div class="album-tracks">
          <div
            class="flex flex-col flex-wrap gap-3 my-12 mt-6 auto-rows-fr mx-4"
          >
            <AlbumListItem
              v-if="albumTracks"
              v-for="track in albumTracks"
              :name="track.name"
              :artists="track.artists"
              :duration_ms="track.duration_ms"
              :id="track.id"
              :track_number="track.track_number"
            />
          </div>
        </div>
      </TabPanel>
      <TabPanel header="Reviews">
        <div class="rating-area">
          <div class="ratings md:px-12 py-4">
            <RatingListedRating
              v-for="rating in album?.ratings"
              :rating="rating"
              class="mb-12"
            />
          </div>
          <div class="leave-rating-input md:px-12 py-4">
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
        <div class="related-albums">
          <!-- TODO: BUILD RELATED ALBUM COMPONENT -->
          <div
            v-for="album in suggestedAlbums"
            :key="album.id"
            class="h-auto mx-2 my-12 w-full flex hover:cursor-pointer"
            @click="router.push(`/albums/${album.id}`)"
          >
            <div class="media">
              <img :src="album.images[0].url" class="w-48 h-48 rounded-full" />
            </div>
            <div class="info align-middle my-auto mx-12">
              <h3 class="text-2xl">{{ album.name }}</h3>
              <p>{{ album.artists[0].name }}</p>
              <FormsRating :rating="album.avgRating!" class="mt-1" />
            </div>
          </div>
        </div>
      </TabPanel>
      <TabPanel header="Album Info">
        <p
          class="m-0"
          v-html="
            albumInfo ??
            'This album does not have any information available, sorry!'
          "
        ></p>
      </TabPanel>
    </TabView>
  </div>
</template>
