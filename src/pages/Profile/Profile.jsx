import { Box, Container, Divider } from "@mui/material";
import React from "react";
import useAuthStore from "../../components/store/authStore";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import ProfileTabs from "../../components/Profile/ProfileTabs";

const Profile = () => {
  const authUser = useAuthStore((state) => state.user);
  const handleLogOut = useAuthStore((state) => state.logout);
  return (
    <>
      <Container>
        <Box>
          <ProfileHeader />
        </Box>
        <Divider />
        <ProfileTabs />
      </Container>
    </>
  );
};

export default Profile;
