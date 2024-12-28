import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Stack,
  Typography,
  Skeleton,
  Box,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import useAuthStore from "../../components/store/useAuthStore";
import useGetUserProfile from "../../hooks/useGetUserProfile";
import { useNavigate, useParams } from "react-router-dom";
import useFollowUnfollow from "../../hooks/useFollowUnfollow";
import SkeletonProfileHeader from "./SkeletonProfileHeader";

const ProfileHeader = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const {
    userProfile,
    isLoading: profileLoading,
    error: profileError,
  } = useGetUserProfile(username);

  const authUser = useAuthStore((state) => state.user);

  const visitingOwnProfile =
    authUser && authUser.username === userProfile?.username;

  const { isUpdating, isFollowing, handleFollowUnfollow } = useFollowUnfollow(
    userProfile?.id
  );

  const handleNavigateToEditProfile = () => {
    navigate("/editprofile");
  };

  const handleFollowAction = async () => {
    try {
      await handleFollowUnfollow();
    } catch (error) {
      console.error("Failed to update follow status:", error);
    }
  };
  const handleNavigateSettings = () => {
    navigate("/settings");
  };

  if (profileLoading) {
    return <SkeletonProfileHeader />;
  }

  if (profileError) {
    return (
      <Stack
        direction="column"
        spacing={2}
        alignItems="center"
        sx={{
          width: {
            lg: "70%",
            md: "90%",
            sm: "95%",
            xs: "100%",
          },
          margin: "auto",
          marginTop: {
            lg: 10,
            md: 8,
            sm: 4,
            xs: 2,
          },
          marginBottom: "20px",
          padding: 2,
        }}
      >
        <Typography color="error" variant="h6">
          {profileError}
        </Typography>
        <Button variant="contained" onClick={() => navigate(0)}>
          Retry
        </Button>
      </Stack>
    );
  }

  if (!userProfile) {
    return (
      <Stack
        direction="column"
        spacing={2}
        alignItems="center"
        sx={{
          width: {
            lg: "70%",
            md: "90%",
            sm: "95%",
            xs: "100%",
          },
          margin: "auto",
          marginTop: {
            lg: 10,
            md: 8,
            sm: 4,
            xs: 2,
          },
          marginBottom: "20px",
          padding: 2,
        }}
      >
        <Typography color="error" variant="h6">
          User not found
        </Typography>
        <Button variant="contained" onClick={() => navigate("/")}>
          Go to Home
        </Button>
      </Stack>
    );
  }

  return (
    <>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 4, sm: 8 }}
        alignItems={{ xs: "center", sm: "flex-start" }}
        sx={{
          width: {
            lg: "70%",
            md: "90%",
            sm: "95%",
            xs: "100%",
          },
          margin: "auto",
          marginTop: {
            lg: 10,
            md: 8,
            sm: 4,
            xs: 2,
          },
          marginBottom: "20px",
          padding: 2,
        }}
      >
        <Avatar
          src={
            userProfile.profilePicURL ||
            "../../assets/defaultAvatar.jpg"
          }
          alt={`${userProfile?.username}'s profile`}
          sx={{
            height: { xs: 100, sm: 160 },
            width: { xs: 100, sm: 160 },
            border:"1px solid",
            boxShadow: "0px 0px 6px 0px rgba(255,255,255,0.9)" ,
          }}
        />

        <Stack
          spacing={2}
          alignItems={{ xs: "center", sm: "flex-start" }}
          
        >
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            flexWrap="wrap"
            justifyContent={{ xs: "center", sm: "flex-start" }}
          >
            <Typography
              variant="h5"
              sx={{
                textAlign: { xs: "center", sm: "left" },
              }}
            >
              {userProfile?.fullName}
            </Typography>

            {!visitingOwnProfile && userProfile?.id !== authUser?.id && (
              <Button
                size="small"
                sx={{
                  fontSize: "small",
                  padding: "6px 12px",
                  color: "text.primary",
                  textWrap: "nowrap",
                  "&:hover": {
                    backgroundColor: "rgba(0,0,0,0.1)",
                  },
                }}
                onClick={handleFollowAction}
                disabled={isUpdating}
                variant={isFollowing ? "outlined" : "contained"}
              >
                {isUpdating
                  ? "Updating..."
                  : isFollowing
                  ? "Unfollow"
                  : "Follow"}
              </Button>
            )}

            {visitingOwnProfile && (
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
                    color: "text.primary",
                    textWrap: "nowrap",
                    backgroundColor: (theme) =>
                      theme.palette.background.primary,
                    "&:hover": {
                      backgroundColor: (theme) => theme.palette.primary.main,
                      color: (theme) => theme.palette.primary.contrastText,
                    },
                  }}
                  onClick={handleNavigateToEditProfile}
                  variant="contained"
                >
                  Edit Profile
                </Button>
                <SettingsIcon
                  fontSize="small"
                  onClick={handleNavigateSettings}
                />
              </Stack>
            )}
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
                {userProfile?.posts?.length || 0}
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
                {userProfile?.followers?.length || 0}
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
                {userProfile?.following?.length || 0}
              </Typography>{" "}
              following
            </Typography>
          </Stack>

          <Stack textAlign={{ xs: "center", sm: "left" }}>
            <Typography variant="body1">{userProfile?.username}</Typography>
            <Typography variant="body2" color="text.secondary">
              {userProfile?.bio || "No bio available."}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default ProfileHeader;
