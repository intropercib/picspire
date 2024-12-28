import { Box, Skeleton, Stack } from "@mui/material";
import React from "react";

const SkeletonSuggested = () => {
  return (
    <>
      <Box sx={{ padding: "50px 10px" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Skeleton variant="circular" width={50} height={50} />

            <Stack spacing={0.5}>
              <Skeleton variant="text" width={120} height={30} />
              <Skeleton variant="text" width={100} height={15} />
            </Stack>
          </Stack>

          <Skeleton variant="text" width={50} height={20} />
        </Stack>
        <Skeleton
          variant="text"
          width={120}
          height={40}
          sx={{
            margin: "4px 0",
          }}
        />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Skeleton variant="circular" width={50} height={50} />

            <Stack spacing={0.5}>
              <Skeleton variant="text" width={120} height={20} />
              <Skeleton variant="text" width={100} height={15} />
            </Stack>
          </Stack>

          <Skeleton variant="text" width={50} height={20} />
        </Stack>
      </Box>
    </>
  );
};

export default SkeletonSuggested;
