import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import FeedPost from "../../components/FeedPost/FeedPost";
import SuggestedProfile from "../../components/SuggestedProfile/SuggestedProfile";
import usePostStore from "../../components/store/usePostStore";
import useAuthStore from "../../components/store/useAuthStore";

const Home = () => {
  const { posts, loadingPosts, error, fetchPosts, clearPosts } = usePostStore();
  const authUser = useAuthStore((state) => state.user);

  useEffect(() => {
    fetchPosts();

    return () => {
      clearPosts();
    };
  }, [fetchPosts, clearPosts]);

  return (
    <Container maxWidth={"xl"}>
      <Stack direction={"row"} spacing={4} sx={{
        width:"100%",
        justifyContent:"center",
      }}>
        <Box
          sx={{
            
           width:{
              lg:"70%",
              md:"80%",
              sm:"100%",
              xs:"100%"
           }
          }}
          mx={2}
        >
          <Box
            sx={{
              width: "100%",
              height: "100px",
              border:"1px solid red"
            }}
          >
            STORIES
          </Box>
          <Box sx={{
          }}>
            {loadingPosts ? (
              <Typography variant="h6">Loading...</Typography>
            ) : error ? (
              <Typography variant="h6" color="error">
                Error loading posts.
              </Typography>
            ) : posts.length === 0 ? (
              <Typography variant="h6">No posts to display.</Typography>
            ) : (
              posts.map((post) => <FeedPost key={post.id} post={post} />)
            )}
          </Box>
        </Box>
       <Divider orientation="vertical" flexItem />
        <Box
          sx={{
            width: {
              lg: "350px",
            },
            display: {
              xs: "none",
              sm: "none",
              md: "none",
              lg: "block",
            },
          }}
          mx={2}
        >
          <SuggestedProfile />
        </Box>
      </Stack>
    </Container>
  );
};

export default Home;
