import React from "react";
import { Box, Paper, Stack, Skeleton } from "@mui/material";

const SkeletonFeedPost = () => {
  return (
    <>
      <Paper
        sx={{
          backgroundColor: (theme) => theme.palette.background.default,
          padding: 2,
          margin: "auto",
          marginBlock: 2,
          boxShadow: 3,
          maxWidth: "100%",
          width: { xs: "100%", sm: "500px", md: "550px", lg: "450px" },
          border: "2px solid transparent",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Skeleton variant="circular" width={40} height={40} />
            <Stack spacing={0.5}>
              <Skeleton
                variant="text"
                sx={{
                  fontSize: { xs: "14px", sm: "16px", md: "18px" },
                  width: "120px",
                }}
              />
            </Stack>
          </Stack>
        </Stack>

        <Box
          sx={{
            marginY: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: 1,
            borderColor: (theme) => theme.palette.divider,
            borderRadius: 2,
            width: "100%",
            height: { xs: "400px", sm: "400px", md: "500px", lg: "500px" },
            overflow: "hidden",
          }}
        >
          <Skeleton variant="rectangular" width="100%" height="100%" />
        </Box>

        <Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row" spacing={2}>
              <Skeleton variant="circular" width={30} height={30} />
              <Skeleton variant="circular" width={30} height={30} />
            </Stack>
            <Skeleton variant="circular" width={30} height={30} />
          </Stack>

          <Box mt={1}>
            <Skeleton
              variant="text"
              sx={{ fontSize: { xs: "14px", md: "16px" }, width: "100px" }}
            />
            <Skeleton
              variant="text"
              sx={{ fontSize: { xs: "14px", md: "16px" }, width: "80%" }}
            />
          </Box>

          <Box mt={1}>
            <Skeleton variant="text" sx={{ width: "50%" }} />
          </Box>

          <Skeleton
            variant="rectangular"
            sx={{
              height: "36px",
              width: "100%",
              marginTop: 1,
              borderRadius: 1,
            }}
          />
        </Box>
      </Paper>
    </>
  );
};

export default SkeletonFeedPost;
