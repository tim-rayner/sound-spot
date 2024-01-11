<script setup lang="ts">
import type { List } from "~/types/list-types";
import type { Album, Artist, Item } from "~/types/spotify-types";

interface CarouselProps {
  items: Item[] | Album[] | Artist[] | List[];
  type: "album" | "artist" | "track" | "list";
}

const props = defineProps<CarouselProps>();
const responsiveOptions = ref([
  {
    breakpoint: "4000px",
    numVisible: 4,
    numScroll: 1,
  },
  {
    breakpoint: "1199px",
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: "500px",
    numVisible: 1,
    numScroll: 1,
  },
  {
    breakpoint: "100px",
    numVisible: 1,
    numScroll: 1,
  },
]);
</script>

<template>
  <Carousel
    :value="items"
    :responsiveOptions="responsiveOptions"
    class="w-full"
    circular
    :showIndicators="false"
  >
    <template #item="slotProps">
      <div class="w-fit h-full">
        <SongOverview
          v-if="props.type === 'track'"
          :track="slotProps.data"
          class="my-12"
        />
        <AlbumOverview
          v-if="props.type === 'album'"
          :album="slotProps.data"
          class="my-12"
        />
        <ListOverview
          v-if="props.type === 'list'"
          :list="slotProps.data"
          class="my-12 w-[30vw] h-[25vh]"
        />
        <!-- <ArtistOvervsiew
          v-if="props.type === 'artist'"
          :artist="slotProps.data.item"
          class="my-12"
        /> -->
      </div>
    </template>
  </Carousel>
</template>
