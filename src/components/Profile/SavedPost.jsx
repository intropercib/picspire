import React, { useState } from "react";
import { Box, Grid2 as Grid, Stack,IconButton, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded";
import ProfileModal from "./ProfileModal";
import BookmarkBorderSharpIcon from "@mui/icons-material/BookmarkBorderSharp";
import BookmarkSharpIcon from "@mui/icons-material/BookmarkSharp";
import useAuthStore from "../store/useAuthStore";
import usePostStore from "../store/usePostStore";
import { useParams } from "react-router-dom";


const SavedPost = ({ post }) => {

  const authUser = useAuthStore((state) => state.user);
  const toggleLikePost = usePostStore((state) => state.toggleLikePost);
  const savePost = useAuthStore((state) => state.savePost);
  const removeSavedPost = useAuthStore((state) => state.removeSavedPost);

  const isLiked = post.likes.includes(authUser?.userId);
  const isSaved = authUser?.savedPosts.includes(post.id);
  const likeCount = post.likes.length;

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);


  const handleLike = () => {
    if (authUser) {
      toggleLikePost(post.id, authUser.userId);
    }
  };

  const handleSavePost = () => {
    if (isSaved) {
      removeSavedPost(post.id);
    } else {
      savePost(post.id);
    }
  };

  const currentUsername = useParams().username;

  if(currentUsername !== authUser.username) {
    return (
      <>
        <Typography>
          You are not authorized to view this post.
        </Typography>
      </>
    );
  }
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
          border: "1px solid",
          height: "250px",
          borderColor: "divider",
        }}
        onClick={() => setIsProfileModalOpen(true)}
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
      <Box
        mt={1}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack direction="row" spacing={2}>
          <IconButton onClick={handleLike}>
            {isLiked ? (
              <FavoriteIcon color="error" />
            ) : (
              <FavoriteIcon color="action" />
            )}
          </IconButton>

          <IconButton onClick={handleSavePost}>
            {isSaved ? <BookmarkSharpIcon /> : <BookmarkBorderSharpIcon />}
          </IconButton>
        </Stack>
      </Box>
      <ProfileModal
        open={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        comments={post.comments}
        postImage={post.imageUrl}
        username={post.authorUsername}
        profilePicURL={post.authorProfilePicURL}
        post={post}
      />
    </>
  );
};

export default SavedPost;
