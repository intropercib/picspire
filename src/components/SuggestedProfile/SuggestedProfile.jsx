import React from "react";
import UserProfile from "./UserProfile";
import OthersProfile from "./OthersProfile";
import { Box, Stack, Typography } from "@mui/material";

const SuggestedProfile = () => {
  return (
    <Box sx={{ padding: "50px 10px" }}>
      <UserProfile />

      <Typography variant="body2" sx={{ marginTop: 2, marginBottom: 2 }}>
        Suggested for you
      </Typography>

      <Stack spacing={1}>
        {/* test */}
        <OthersProfile />
        <OthersProfile />
        <OthersProfile />
        <OthersProfile />
      </Stack>
    </Box>
  );
};

export default SuggestedProfile;
