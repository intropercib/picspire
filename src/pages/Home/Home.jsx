import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import FeedPost from "../../components/FeedPost/FeedPost";
import SuggestedProfile from "../../components/SuggestedProfile/SuggestedProfile";
import usePostStore from "../../components/store/usePostStore";
import useFetchAllUsers from "../../hooks/useFetchAllUsers";
import SkeletonSuggested from "../../components/SuggestedProfile/SkeletonSuggested";
import SkeletonFeedPost from "../../components/FeedPost/SkeletonFeedPost";

const Home = () => {
  const { posts, loadingPosts, error, fetchPosts, clearPosts } = usePostStore();
  const { loading } = useFetchAllUsers();

  useEffect(() => {
    fetchPosts();
    return () => {
      clearPosts();
    };
  }, [fetchPosts, clearPosts]);

  return (
    <Container maxWidth={"xl"}>
      <Stack
        direction={"row"}
        spacing={4}
        sx={{
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: {
              lg: "70%",
              md: "80%",
              sm: "100%",
              xs: "100%",
            },
          }}
          mx={2}
        >
          <Box
            sx={{
              width: "100%",
            }}
          >
            <Typography
              variant="h3"
              textAlign="center"
              sx={{
                m: 2,
                color: "text.secondary",
                fontSize: "0.875rem",
                fontWeight: "normal",
                letterSpacing: "0.5px",
                borderBottom: "1px solid",
                borderTop: "1px solid",
                borderColor: "divider",
                p: 1,
                userSelect: "none",
              }}
            >
              PicSpire - Where Your Moments Inspire
            </Typography>
          </Box>
          <Box sx={{}}>
            {loading || loadingPosts ? (
              [...Array(5)].map((_, index) => <SkeletonFeedPost key={index} />)
            ) : error ? (
              <Typography variant="h6" color="error">
                Error loading posts.
              </Typography>
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
          {loading ? <SkeletonSuggested /> : <SuggestedProfile />}
        </Box>
      </Stack>
    </Container>
  );
};

export default Home;
