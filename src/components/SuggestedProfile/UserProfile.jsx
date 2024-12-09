import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import useLogOut from "../../hooks/useLogOut";

const UserProfile = () => {
  const { handleLogOut } = useLogOut();
  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            src="https://www.w3schools.com/howto/img_avatar.png"
            sx={{
              height: "50px",
              width: "50px",
            }}
          />
          <Stack>
            <Typography variant="body1" sx={{ lineHeight: 0.8 }}>
              Username
            </Typography>
            <Typography variant="body2">Username</Typography>
          </Stack>
        </Stack>
        <Typography
          onClick={handleLogOut}
          sx={{
            textDecoration: "none",
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
    </>
  );
};

export default UserProfile;
