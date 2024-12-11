import React from "react";
import { Grid } from "@mui/material";
import ProfilePost from "./ProfilePost";
const ProfilePosts = () => {
  return (
    <Grid
      container
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
        <ProfilePost />
        <ProfilePost />
        <ProfilePost />
        <ProfilePost />
        <ProfilePost />
        <ProfilePost />
        <ProfilePost />
    </Grid>
  );
};

export default ProfilePosts;
