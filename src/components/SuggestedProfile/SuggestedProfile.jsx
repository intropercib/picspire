import React, { useEffect, useState } from "react";
import OthersProfile from "./OthersProfile";
import { Box, Stack, Typography } from "@mui/material";
import useAuthStore from "../store/useAuthStore";
import useGetUserProfile from "../../hooks/useGetUserProfile";
import useFetchAllUsers from "../../hooks/useFetchAllUsers";
import UserProfile from "./UserProfile";

const SuggestedProfile = () => {
  const authUser = useAuthStore((state) => state.user);
  const { userLoading, userProfile } = useGetUserProfile(authUser?.username);
  const { usersList, fetchLoading, error } = useFetchAllUsers();
  const [isDataReady, setIsDataReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    if (mounted && userProfile && !userLoading) {
      setIsDataReady(true);
    }

    return () => {
      mounted = false;
      setIsDataReady(false);
    };
  }, [userProfile, userLoading]);

  if (!authUser?.username || userLoading || fetchLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  usersList.filter((user) => user.id !== authUser.id);

  return (
    <Box sx={{ padding: "50px 10px" }}>
      {isDataReady && userProfile && <UserProfile userdata={userProfile} />}
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
