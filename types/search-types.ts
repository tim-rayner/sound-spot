import type { Album, Artist, Item } from "./spotify-types";

export interface SearchResponse {
  items: Item[] | Album[] | Artist[];
}
