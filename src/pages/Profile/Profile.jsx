import { Box, Container, Divider, Typography } from "@mui/material";
import React from "react";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import ProfileTabs from "../../components/Profile/ProfileTabs";
import { useParams } from "react-router-dom";
import useGetUserProfile from "../../hooks/useGetUserProfile";

const Profile = () => {
  const { username } = useParams();
  const { isLoading, userProfile, error } = useGetUserProfile(username);

  // if (isLoading) {
  //   return (
  //     // <Container>
  //     //   <Typography>Loading...</Typography>
  //     // </Container>
  //   );
  // }

  if (error) {
    return (
      <Container>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  if (!userProfile) {
    return (
      <Container>
        <Typography>User not found</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Box>
        <ProfileHeader username={username} />
        <Divider  />
        <ProfileTabs />
      </Box>
    </Container>
  );
};

export default Profile;
