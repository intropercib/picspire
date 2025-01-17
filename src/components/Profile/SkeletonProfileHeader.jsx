import React from "react";
import {  Skeleton, Stack } from "@mui/material";

const SkeletonProfileHeader = () => {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 4, sm: 8 }}
      alignItems={{ xs: "center", sm: "flex-start" }}
      sx={{
        width: {
          lg: "70%",
          md: "90%",
          sm: "95%",
          xs: "100%",
        },
        margin: "auto",
        marginTop: {
          lg: 10,
          md: 8,
          sm: 4,
          xs: 2,
        },
        marginBottom: "20px",
        padding: 2,
      }}
    >
      <Skeleton
        variant="circular"
        width={160}
        height={160}
        sx={{
          height: { xs: 100, sm: 160 },
          width: { xs: 100, sm: 160 },
        }}
      />

      <Stack  alignItems={{ xs: "center", sm: "flex-start" }}>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          flexWrap="wrap"
          justifyContent={{ xs: "center", sm: "flex-start" }}
        >
          <Skeleton variant="text" width={120} height={50} />
          <Skeleton
            variant="rectangular"
            width={80}
            height={30}
            sx={{
              display: { xs: "none", sm: "block" },
            }}
          />
        </Stack>

        <Stack
          direction="row"
          spacing={{ xs: 1, sm: 2 }}
          justifyContent={{ xs: "center", sm: "flex-start" }}
          flexWrap="wrap"
        >
          <Skeleton variant="text" width={60} height={40} />
          <Skeleton variant="text" width={60} height={40} />
          <Skeleton variant="text" width={60} height={40} />
        </Stack>

        <Stack textAlign={{ xs: "center", sm: "left" }}>
          <Skeleton variant="text" width={100} height={20} />
          <Skeleton variant="text" width={200} height={20} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SkeletonProfileHeader;
