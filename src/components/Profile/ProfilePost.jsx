import React, { useState } from "react";
import { Box, Grid2 as Grid, Stack } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded";
import ProfileModal from "./ProfileModal";

const ProfilePost = ({ post }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Grid
        item="true"
        xs={12}
        sm={6}
        md={4}
        lg={4}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "2px",
          position: "relative",
          border:"1px solid",
          height: "250px",
          borderColor:"divider"
        }}
        onClick={handleOpen}
      >
        <img
          src={post.imageUrl}
          style={{
            width: "100%",
            height: "100%",
            maxWidth: "250px",
            objectFit: "contain",
          }}
          alt={`${post.authorUsername}'s post`}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0,
            transition: "opacity 0.3s ease-in-out",
            "&:hover": {
              opacity: 1,
            },
          }}
        >
          <Stack
            direction={{ sm: "row", xs: "column" }}
            alignItems="center"
            spacing={1}
          >
            <Stack
              direction={{ sm: "row", xs: "column" }}
              alignItems="center"
              spacing={0.1}
            >
              <FavoriteIcon /> <span>{post.likes.length}</span>
            </Stack>
            <Stack
              direction={{ sm: "row", xs: "column" }}
              alignItems="center"
              spacing={0.1}
            >
              <ChatBubbleRoundedIcon /> <span> {post.comments.length} </span>
            </Stack>
          </Stack>
        </Box>
      </Grid>
      <ProfileModal
        open={open}
        onClose={handleClose}
        comments={post.comments}
        postImage={post.imageUrl}
        username={post.authorUsername}
        profilePicURL={post.authorProfilePicURL}
        post={post}
      />
    </>
  );
};

export default ProfilePost;
