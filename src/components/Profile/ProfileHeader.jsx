import React from "react";
import { Avatar, Button, Stack, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import useAuthStore from "../../components/store/authStore";

const ProfileHeader = () => {
  const authUser = useAuthStore((state) => state.user);

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 3, sm: 8 }}
      alignItems={{ xs: "center", sm: "flex-start" }}
      sx={{ margin: { xs: "20px", sm: "40px" } }}
    >
      <Avatar
        src={
          authUser.profilePicURL ||
          "https://www.w3schools.com/howto/img_avatar.png"
        }
        alt={`${authUser.username}'s profile`}
        sx={{
          height: { xs: 100, sm: 160 },
          width: { xs: 100, sm: 160 },
          border: "2px solid",
        }}
      />
      <Stack spacing={2} alignItems={{ xs: "center", sm: "flex-start" }}>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          flexWrap="wrap"
          justifyContent={{ xs: "center", sm: "flex-start" }}
        >
          <Typography
            sx={{
              fontSize: { xs: "h6", sm: "h5" },
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            {authUser.fullName}
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            justifyContent={{ xs: "center", sm: "flex-start" }}
          >
            <Button
              size="small"
              sx={{
                fontSize: "small",
                padding: "6px 12px",
                backgroundColor: "divider",
                color: "text.primary",
                textWrap: "nowrap",
              }}
            >
              Edit Profile
            </Button>
            <Button
              size="small"
              sx={{
                fontSize: "small",
                padding: "6px 12px",
                backgroundColor: "divider",
                color: "text.primary",
                textWrap: "nowrap",
              }}
            >
              View Archive
            </Button>
            <SettingsIcon fontSize="small" />
          </Stack>
        </Stack>
        <Stack
          direction="row"
          spacing={{ xs: 1, sm: 2 }}
          justifyContent={{ xs: "center", sm: "flex-start" }}
          flexWrap="wrap"
        >
          <Typography
            sx={{
              fontSize: { xs: "body1", sm: "h6" },
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            <Typography component="span" fontWeight="bold">
              100
            </Typography>{" "}
            posts
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "body1", sm: "h6" },
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            <Typography component="span" fontWeight="bold">
              100
            </Typography>{" "}
            followers
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "body1", sm: "h6" },
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            <Typography component="span" fontWeight="bold">
              100
            </Typography>{" "}
            following
          </Typography>
        </Stack>
        {/* Bio */}
        <Stack textAlign={{ xs: "center", sm: "left" }}>
          <Typography variant="body1">{authUser.username}</Typography>
          <Typography variant="body2" color="text.secondary">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam,
            optio.
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ProfileHeader;
