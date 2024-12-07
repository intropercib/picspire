import React from "react";
import UserProfile from "./UserProfile";
import OthersProfile from "./OthersProfile";
import { Box, Stack, Typography } from "@mui/material";

const SuggestedProfile = () => {
  return (
    <>
      <Box
        sx={{
          padding: "50px 10px",
        }}
      >
        <UserProfile />
        <Typography variant="body2" mt={2} mb={2}>
          Suggested for you
        </Typography>
        <Stack spacing={1}>
          <OthersProfile />
          <OthersProfile />
          <OthersProfile />
        </Stack>
      </Box>
    </>
  );
};

export default SuggestedProfile;
