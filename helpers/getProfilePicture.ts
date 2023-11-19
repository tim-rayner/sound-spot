export const getProfilePicture = (
  profilePicture?: string,
  username?: string
) => {
  if (!profilePicture) {
    return `https://ui-avatars.com/api/?name=${username}&background=random&rounded=true`;
  }
  return profilePicture;
};
