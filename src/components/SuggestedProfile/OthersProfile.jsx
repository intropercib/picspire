import React, { useState } from "react";
import { Avatar, Stack, Typography } from "@mui/material";

const OthersProfile = () => {
  const [isFollow, setIsFollow] = useState(false);

  const handleFollow = () => setIsFollow((prev) => !prev);

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar
          src="https://www.w3schools.com/howto/img_avatar.png"
          alt="User Avatar"
          sx={{ height: 50, width: 50, cursor: "pointer" }}
        />
        <Stack
          sx={{
            cursor: "pointer",
          }}
        >
          <Typography variant="body1" sx={{ lineHeight: 0.8 }}>
            Username
          </Typography>
          <Typography variant="body2">Username</Typography>
        </Stack>
      </Stack>

      <Typography
        component="span"
        sx={{
          fontSize: "14px",
          cursor: "pointer",
          color: (theme) =>
            isFollow
              ? theme.palette.secondary.main
              : theme.palette.text.primary,
          "&:hover": {
            color: (theme) =>
              isFollow
                ? theme.palette.text.primary
                : theme.palette.secondary.main,
          },
        }}
        onClick={handleFollow}
      >
        {isFollow ? "Unfollow" : "Follow"}
      </Typography>
    </Stack>
  );
};

export default OthersProfile;
