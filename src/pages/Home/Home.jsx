import { Box, Container, Stack } from "@mui/material";
import React from "react";
import FeedPost from "../../components/FeedPost/FeedPost";
import SuggestedProfile from "../../components/SuggestedProfile/SuggestedProfile";

const Home = () => {
  return (
    <Container maxWidth={"xl"}>
      <Stack direction={"row"} spacing={4}>
        <Box
          sx={{
            width: {
              xs: "100%",
              sm: "100%",
              md: "100%",
              lg: "calc(100% - 350px)",
            },
          }}
          mx={2}
        >
          <Box
            sx={{
              border: "1px solid red",
              width: "100%",
              height: "100px",
            }}
          >
            STORIES
          </Box>
          {/* for test */}
          <FeedPost />
          <FeedPost />
          <FeedPost />
          <FeedPost />
          <FeedPost />
        </Box>
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
