import { Box, Container, Divider, Skeleton, Stack, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect } from "react";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import ProfileTabs from "../../components/Profile/ProfileTabs";
import { useParams } from "react-router-dom";
import useGetUserProfile from "../../hooks/useGetUserProfile";
import SkeletonProfileHeader from "../../components/Profile/SkeletonProfileHeader";
import GridOnIcon from "@mui/icons-material/GridOn";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
const Profile = () => {
  const { username } = useParams();
  const { isLoading, userProfile, error } = useGetUserProfile(username);

  if (isLoading) {
    return (
      <Container>
        <SkeletonProfileHeader />
        <Divider />
        <Stack>
          {/* Tabs Section */}
          <Stack alignItems="center">
            <Tabs
              value={0} // Static value for skeleton layout
              sx={{
                "& .MuiTabs-indicator": {
                  height: "2px",
                  top: 0,
                },
                "& .MuiTab-root": {
                  minHeight: {
                    xs: "30px",
                    sm: "40px",
                    md: "40px",
                    lg: "40px",
                  },
                  height: "30px",
                  padding: {
                    xs: "0px",
                    sm: "10px 20px",
                    md: "10px 30px",
                    lg: "10px 30px",
                  },
                },
              }}
            >
              <Tab
                icon={<GridOnIcon fontSize="small" />}
                iconPosition="start"
                disabled
                label={<Skeleton variant="text" width={50} />}
              />
              <Tab 
                icon={<BookmarkBorderIcon fontSize="small" />}
                iconPosition="start"
                disabled
                label={<Skeleton variant="text" width={50} />}
              />
            </Tabs>
          </Stack>

          {/* Content Skeleton */}
          <Box p={2}>
            <Stack spacing={2} sx={{
              alignItems: "center",
            }}>
              <Skeleton variant="rectangular" height={250} width={250} />
            </Stack>
          </Box>
        </Stack>
      </Container>
    );
  }

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
        <Divider />
        <ProfileTabs />
      </Box>
    </Container>
  );
};

export default Profile;
