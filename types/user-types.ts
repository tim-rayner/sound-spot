export interface iUser {
  _id: string;
  id: string;
  username: string;
  email: string;
  profilePicture: string;
  countryCode: string;
}

export interface publicUserProfile {
  username: string;
  profilePicture: string;
  countryCode: string;
}
