export interface iRating {
  rating: number;
  comment: string;
  userId: string; // this is the user who made the rating as spotify user id
  itemId: string; // this could be a track, artist, album, or playlist
  createdAt: string;
  itemType: string;
}
