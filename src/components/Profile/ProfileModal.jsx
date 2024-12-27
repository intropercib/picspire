import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Divider,
  Stack,
  Avatar,
  CircularProgress,
  Alert,
  Snackbar,
  DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useComments from "../../hooks/useComments";
import formatTime from "../../utils/formatTime";
import { NavLink } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import usePostStore from "../store/usePostStore";
import useAuthStore from "../store/useAuthStore";

const ProfileModal = ({
  open,
  onClose,
  comments: initialComments,
  postImage,
  username,
  profilePicURL,
  post,
}) => {
  const { comments, newComment, setNewComment, addComment, isLoading, error } =
    useComments(post);
  const authUser = useAuthStore((state) => state.user);
  const [expandedComment, setExpandedComment] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const deletePost = usePostStore((state) => state.deletePost);

  const handleExpand = (id) => {
    setExpandedComment(expandedComment === id ? null : id);
  };

  const handleDelete = async (postId) => {
    if (!postId) {
      setErrorMsg("Post ID is undefined.");
      return;
    }
    try {
      await deletePost(postId);
      setSuccessMsg("Post deleted successfully.");
      onClose();
    } catch (error) {
      console.error("Failed to delete post:", error);
      setErrorMsg("Failed to delete post. Please try again.");
    }
  };

  const handleDeleteClick = () => {
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    handleDelete(post.id);
    setIsConfirmOpen(false);
  };

  const cancelDelete = () => {
    setIsConfirmOpen(false);
  };

  return (
    <>
      <Snackbar
        open={!!successMsg}
        autoHideDuration={6000}
        onClose={() => setSuccessMsg("")}
      >
        <Alert
          onClose={() => setSuccessMsg("")}
          severity="success"
          sx={{ width: "100%" }}
        >
          {successMsg}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!errorMsg}
        autoHideDuration={6000}
        onClose={() => setErrorMsg("")}
      >
        <Alert
          onClose={() => setErrorMsg("")}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMsg}
        </Alert>
      </Snackbar>

      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="md"
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          "& .MuiDialog-paper": {
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            height: { xs: "auto", md: "600px" },
          },
        }}
      >
        <DialogTitle
          sx={{
            display: { xs: "flex", md: "none" },
            backgroundColor: (theme) => theme.palette.background.default,
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent
          sx={{
            padding: 0,
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              flex: 1,
              backgroundColor: (theme) => theme.palette.background.default,
              alignItems: "center",
              justifyContent: "center",
              display: { xs: "block", md: "flex" },
              height: "100%",
              position: "relative",
            }}
          >
            <img
              src={
                postImage || "https://www.w3schools.com/howto/img_avatar.png"
              }
              alt="Post"
              style={{
                width: "100%",
                maxWidth: "500px",
                objectFit: "contain",
              }}
            />
            {authUser?.id === post.authorId && (
              <IconButton
                sx={{
                  border: "2px solid red",
                  position: "absolute",
                  bottom: 0,
                  color: "red",
                }}
                onClick={handleDeleteClick}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Box>

          {/* Comments Section */}
          <Box
            sx={{
              flex: 1,
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              backgroundColor: (theme) => theme.palette.background.default,
              height: "100%",
            }}
          >
            {/* Header */}
            <DialogTitle
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBlock: 1,
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                component={NavLink}
                to={`/${username}`}
                sx={{
                  textDecoration: "none",
                }}
              >
                <Avatar
                  src={
                    profilePicURL ||
                    "https://www.w3schools.com/howto/img_avatar.png"
                  }
                />
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: "14px", sm: "16px", md: "18px" },
                    color: "text.primary",
                  }}
                >
                  {username}
                </Typography>
              </Stack>
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <Divider />

            <Box
              sx={{
                marginBlock: 1,
              }}
            >
              <Typography variant="body2">{post.caption}</Typography>
            </Box>
            <Divider />

            {/* Comments List */}
            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                padding: 2,
              }}
            >
              {comments.map((comment, index) => (
                <Stack
                  key={index}
                  direction="row"
                  alignItems="flex-start"
                  spacing={2}
                  sx={{ marginBottom: 2 }}
                >
                  <Avatar
                    src={
                      comment.profilePicURL ||
                      "https://www.w3schools.com/howto/img_avatar.png"
                    }
                    component={NavLink}
                    to={`/${comment.username}`}
                    sx={{
                      textDecoration: "none",
                    }}
                  />
                  <Box>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography variant="body1">
                        {comment.username}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatTime(
                          comment.createdAt.toDate
                            ? comment.createdAt.toDate()
                            : new Date(comment.createdAt)
                        )}
                      </Typography>
                    </Stack>
                    <Typography
                      color="text.primary"
                      sx={{ marginTop: 0.5, fontSize: "13px" }}
                    >
                      {expandedComment === comment.id
                        ? comment.comment
                        : comment.comment.length > 100
                        ? `${comment.comment.substring(0, 100)}...`
                        : comment.comment}
                    </Typography>
                    {comment.comment.length > 100 && (
                      <Typography
                        variant="caption"
                        color="primary"
                        sx={{ cursor: "pointer" }}
                        onClick={() => handleExpand(comment.id)}
                      >
                        {expandedComment === comment.id
                          ? "Show less"
                          : "Read more"}
                      </Typography>
                    )}
                  </Box>
                </Stack>
              ))}
            </Box>

            <Divider />

            <Box
              component="form"
              onSubmit={addComment}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                padding: 2,
              }}
            >
              <TextField
                placeholder="Add a comment..."
                variant="standard"
                fullWidth
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                sx={{
                  "& .MuiInputBase-root": {
                    fontSize: "15px",
                    paddingBottom: "6px",
                  },
                }}
              />
              <Button
                type="submit"
                variant="text"
                sx={{
                  backgroundColor: "transparent",
                }}
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={24} /> : "Post"}
              </Button>
              {error && (
                <Alert severity="error" sx={{ mt: 1 }}>
                  {error}
                </Alert>
              )}
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog
        open={isConfirmOpen}
        onClose={cancelDelete}
        PaperProps={{
          sx: {
            backgroundColor: "rgba(0,0,0,0.7)",
          },
        }}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this post? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={cancelDelete}
            size="small"
            sx={{
              color: (theme) => theme.palette.text.primary,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmDelete}
            size="small"
            sx={{
              backgroundColor: "red",
              color: (theme) => theme.palette.text.primary,
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProfileModal;
