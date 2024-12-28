import React, { useState } from "react";
import { Stack, Typography, Avatar } from "@mui/material";
import useAuthStore from "../store/useAuthStore";
import useFollowUnfollow from "../../hooks/useFollowUnfollow";

const OthersProfile = ({ user }) => {
  const authUser = useAuthStore((state) => state.user);
  const { isUpdating, isFollowing, handleFollowUnfollow } = useFollowUnfollow(
    user.id
  );
  const [isLocalFollowing, setIsLocalFollowing] = useState(isFollowing);

  if (
    !user?.id ||
    user.id === authUser?.id ||
    authUser?.following?.includes(user.id)
  ) {
    return null;
  }

  if (isLocalFollowing !== isFollowing) {
    setIsLocalFollowing(isFollowing);
  }

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center"  sx={{
          borderBottom: "1px solid",
          borderColor: (theme) => theme.palette.divider,
          borderRadius: "8px",
          padding: 1,
        }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar
          src={
            user.profilePicURL ||
           "/src/assets/defaultAvatar.jpg"
          }
          alt={`${user.username} Avatar`}
          sx={{ height: 50, width: 50, cursor: "pointer" }}
        />
        <Stack sx={{ cursor: "pointer" }}>
          <Typography variant="body1" sx={{ lineHeight: 0.8 }}>
            {user.fullName}
          </Typography>
          <Typography variant="body2">{user.username}</Typography>
        </Stack>
      </Stack>

      <Typography
        component="span"
        sx={{
          fontSize: "14px",
          cursor: isUpdating ? "default" : "pointer",
          color: (theme) =>
            isFollowing
              ? theme.palette.secondary.main
              : theme.palette.text.primary,
          "&:hover": {
            color: (theme) =>
              isFollowing
                ? theme.palette.text.primary
                : theme.palette.secondary.main,
          },
          opacity: isUpdating ? 0.7 : 1,
        }}
        onClick={isUpdating ? undefined : handleFollowUnfollow}
      >
        {isUpdating ? "Updating..." : isLocalFollowing ? "Unfollow" : "Follow"}
      </Typography>
    </Stack>
  );
};

export default OthersProfile;
