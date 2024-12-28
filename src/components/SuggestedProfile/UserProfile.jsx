import React from "react";
import { Avatar, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import useLogOut from "../../hooks/useLogOut";

const UserProfile = ({userdata}) => {
  const { handleLogOut } = useLogOut();
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Stack direction="row" spacing={2} alignItems="center">
        <Link to={`/${userdata.username}`}>
          <Avatar
            src={
              userdata.profilePicURL ||
             "/src/assets/defaultAvatar.jpg"
            }
            alt={`${userdata.username}'s profile`}
            sx={{ height: 50, width: 50 }}
          />
        </Link>

        <Stack
          component={Link}
          to={`/${userdata.username}`}
          sx={{
            textDecoration: "none",
            color: (theme) => theme.palette.text.primary,
          }}
        >
          <Typography variant="body1" sx={{ lineHeight: 0.8 }}>
            {userdata.fullName}
          </Typography>
          <Typography variant="body2">{userdata.username}</Typography>
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
