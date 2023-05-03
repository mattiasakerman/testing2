export const Avatar = ({ avatarUrl = "/image-avatar.jpg" }) => {
  return (
    <img
      src={avatarUrl}
      className="rounded-full w-12 aspect-square"
      alt="User avatar"
    />
  );
};
