import React, { useState } from "react";
import {
  Avatar,
  Box,
  Paper,
  Stack,
  TextField,
  Typography,
  IconButton,
  Link,
} from "@mui/material";
import {
  MoreHoriz as MoreHorizIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteSharpIcon,
} from "@mui/icons-material";
import useAuthStore from "../store/useAuthStore";
import usePostStore from "../store/usePostStore";
import ProfileModal from "../Profile/ProfileModal";
import useComments from "../../hooks/useComments";
import BookmarkBorderSharpIcon from "@mui/icons-material/BookmarkBorderSharp";
import BookmarkSharpIcon from "@mui/icons-material/BookmarkSharp";
import MapsUgcSharpIcon from "@mui/icons-material/MapsUgcSharp";
import formatTime from "../../utils/formatTime";
import { useNavigate } from "react-router-dom";

const FeedPost = ({ post }) => {
  const authUser = useAuthStore((state) => state.user);
  const savedPosts = useAuthStore((state) => state.savedPosts);
  const toggleLikePost = usePostStore((state) => state.toggleLikePost);
  const savePost = useAuthStore((state) => state.savePost);
  const removeSavedPost = useAuthStore((state) => state.removeSavedPost);

  const isLiked = post.likes.includes(authUser?.userId);
  const isSaved = savedPosts.includes(post.id);
  const likeCount = post.likes.length;

  const handleLike = () => {
    if (authUser) {
      toggleLikePost(post.id, authUser.userId);
    }
  };
  const handleSavePost = async () => {
    if (isSaved) {
      await removeSavedPost(post.id);
    } else {
      await savePost(post.id);
    }
  };

  const { comments, newComment, setNewComment, addComment } = useComments(post);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const navigate = useNavigate();
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
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar
              src={
                post.authorProfilePicURL ||
                "/defaultAvatar.jpg"
              }
              onClick={() => navigate(`/${post.authorUsername}`)}
            />
            <Typography
              variant="h5"
              sx={{ fontSize: { xs: "14px", sm: "16px", md: "18px" } }}
            >
              {post.authorUsername}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                fontSize: { xs: "12px", sm: "14px" },
              }}
            >
              {post.createdAt?.toDate
                ? formatTime(post.createdAt.toDate())
                : ""}
            </Typography>
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
            maxHeight: "100%",
            height: { xs: "400px", sm: "400px", md: "500px", lg: "500px" },
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <img
              src={post.imageUrl}
              alt="post"
              style={{ objectFit: "contain", width: "100%", height: "100%" }}
            />
          </Box>
        </Box>

        <Box>
          <Box
            sx={{
              margin: "0px",
              padding: "0px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Stack direction="row">
              <IconButton onClick={handleLike}>
                {isLiked ? (
                  <FavoriteSharpIcon
                    sx={{
                      fontSize: { xs: "20px", lg: "30px" },
                      color: "error.main",
                    }}
                  />
                ) : (
                  <FavoriteBorderIcon
                    sx={{ fontSize: { xs: "20px", lg: "30px" } }}
                  />
                )}
              </IconButton>
              <IconButton onClick={() => setIsProfileModalOpen(true)}>
                <MapsUgcSharpIcon
                  sx={{ fontSize: { xs: "20px", lg: "28px" } }}
                />
              </IconButton>
            </Stack>
            <IconButton onClick={handleSavePost}>
              {isSaved ? (
                <BookmarkSharpIcon
                  sx={{ fontSize: { xs: "20px", lg: "30px" } }}
                />
              ) : (
                <BookmarkBorderSharpIcon
                  sx={{ fontSize: { xs: "20px", lg: "30px" } }}
                />
              )}
            </IconButton>
          </Box>

          <Box>
            <Typography
              variant="body1"
              sx={{ fontSize: { xs: "14px", md: "16px" } }}
            >
              {likeCount} {likeCount <= 1 ? "like" : "likes"}
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: { xs: "14px", md: "16px" } }}
            >
              {post.caption}
            </Typography>
          </Box>

          {comments.length > 0 && (
            <Link
              href="#"
              onClick={() => setIsProfileModalOpen(true)}
              underline="hover"
              sx={{ cursor: "pointer", display: "block", fontSize: 14 }}
            >
              See all {comments.length} comment{comments.length > 1 ? "s" : ""}
            </Link>
          )}

          <form onSubmit={addComment}>
            <TextField
              placeholder="Add a comment..."
              variant="standard"
              fullWidth
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              autoComplete="off"
              sx={{
                "& .MuiInputBase-root": {
                  fontSize: "15px",
                  paddingBottom: "6px",
                },
              }}
            />
          </form>
        </Box>
      </Paper>

      <ProfileModal
        open={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        comments={comments}
        postImage={post.imageUrl}
        username={post.authorUsername}
        profilePicURL={post.authorProfilePicURL}
        post={post}
      />
    </>
  );
};

export default FeedPost;
