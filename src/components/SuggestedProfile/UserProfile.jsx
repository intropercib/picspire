import React from "react";
import { Avatar, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import useLogOut from "../../hooks/useLogOut";
import useAuthStore from "../store/authStore";

const UserProfile = () => {
  const { handleLogOut } = useLogOut();
  const authUser = useAuthStore((state) => state.user);

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Stack direction="row" spacing={2} alignItems="center">
        <Link to={`/${authUser.username}`}>
          <Avatar
            src={
              authUser.profilePicURL ||
              "https://www.w3schools.com/howto/img_avatar.png"
            }
            alt={`${authUser.username}'s profile`}
            sx={{ height: 50, width: 50 }}
          />
        </Link>

        <Stack
          component={Link}
          to={`/${authUser.username}`}
          sx={{
            textDecoration: "none",
            color: (theme) => theme.palette.text.primary,
          }}
        >
          <Typography variant="body1" sx={{ lineHeight: 0.8 }}>
            {authUser.fullName}
          </Typography>
          <Typography variant="body2">{authUser.username}</Typography>
        </Stack>
      </Stack>

      <Typography
        onClick={handleLogOut}
        sx={{
          cursor: "pointer",
          fontSize: "14px",
          color: (theme) => theme.palette.secondary.main,
          "&:hover": {
            color: (theme) => theme.palette.text.primary,
          },
        }}
      >
        Logout
      </Typography>
    </Stack>
  );
};

export default UserProfile;
