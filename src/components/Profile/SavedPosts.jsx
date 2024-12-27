import React, { useEffect, useState } from "react";
import { Container, Typography, Grid2 as Grid, Box } from "@mui/material";
import useAuthStore from "../store/useAuthStore";
import usePostStore from "../store/usePostStore";
import SavedPost from "./SavedPost";

const SavedPosts = () => {
  const savedPostIds = useAuthStore((state) => state.savedPosts);
  const { posts, fetchPosts, loadingPosts, error } = usePostStore();
  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    if (posts.length === 0) {
      fetchPosts();
    } else {
      const filtered = posts.filter((post) => savedPostIds.includes(post.id));
      setSavedPosts(filtered);
    }
  }, [posts, savedPostIds, fetchPosts]);

  if (loadingPosts) {
    return (
      <Container>
        <Typography>Loading Saved Posts...</Typography>
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

  return (
    <Container>
      {savedPosts.length === 0 ? (
        <Typography>No saved posts to display.</Typography>
      ) : (
        <Grid
          container
          spacing={2}
          sx={{
            margin: "auto",
            width: {
              xs: "100%",
              sm: "90%",
              md: "80%",
              lg: "70%",
            },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {Object.values(savedPosts).map((post) => (
            <Grid item key={post.id} xs={12} sm={6} md={4} lg={3}>
              <SavedPost post={post} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default SavedPosts;
