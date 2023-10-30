export interface iArtist {
  name: string;
  image: string;
  genres: [string];
  popularity: Number;
  followers: Number;
  type: string;
  images: [iImage];
  uri: string;
}

export interface iImage {
  height: Number;
  width: Number;
  url: string;
}

export interface iFollowes {
  href: string;
  total: Number;
}
