import React, { useEffect, useState } from "react";
import OthersProfile from "./OthersProfile";
import { Box, Stack, Typography } from "@mui/material";
import useAuthStore from "../store/useAuthStore";
import useGetUserProfile from "../../hooks/useGetUserProfile";
import useFetchAllUsers from "../../hooks/useFetchAllUsers";
import UserProfile from "./UserProfile";
import SkeletonSuggested from "./SkeletonSuggested";

const SuggestedProfile = () => {
  const authUser = useAuthStore((state) => state.user);
  const { userLoading, userProfile } = useGetUserProfile(authUser.username);
  const { usersList, fetchLoading, error } = useFetchAllUsers();
  const userLength = usersList.length;

  if (userLoading || fetchLoading) {
    return <SkeletonSuggested />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ padding: "50px 10px" }}>
      {userProfile && <UserProfile userdata={userProfile} />}
      <Typography variant="body2" sx={{ marginTop: 2, marginBottom: 2 }}>
        Suggested for you
      </Typography>
      {usersList.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No new users to suggest
        </Typography>
      ) : (
        <Stack spacing={1}>
          {usersList.map((user) => (
            <OthersProfile key={user.id} user={user} />
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default SuggestedProfile;
