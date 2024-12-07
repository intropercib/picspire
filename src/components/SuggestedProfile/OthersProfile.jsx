import { Avatar, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const OthersProfile = () => {
  const [isFollow, setIsFollow] = useState(false);
  const handleFollow = () => {
    setIsFollow(!isFollow);
  };
  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
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
          to="/login"
          sx={{
            fontSize: "14px",
            color: isFollow
              ? (theme) => theme.palette.secondary.main
              : (theme) => theme.palette.text.primary,
            "&:hover": {
              color: isFollow
                ? (theme) => theme.palette.text.primary
                : (theme) => theme.palette.secondary.main,
            },
          }}
          onClick={handleFollow}
        >
          {isFollow ? "Unfollow" : "Follow"}
        </Typography>
      </Stack>
    </>
  );
};

export default OthersProfile;
