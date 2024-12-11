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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ProfileModal = ({ open, onClose }) => {
  const [expandedComment, setExpandedComment] = useState(null);

  const comments = [
    {
      id: 1,
      username: "User1",
      time: "12hr ago",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non turpis justo. Duis a fermentum lorem. Cras auctor tincidunt justo, a vulputate sapien malesuada nec.",
    },
    {
      id: 2,
      username: "User2",
      time: "10hr ago",
      text: "Short comment.",
    },
    {
      id: 3,
      username: "User3",
      time: "8hr ago",
      text: "Another long comment that needs truncation for better readability. Click to expand.",
    },
  ];

  const handleExpand = (id) => {
    setExpandedComment(expandedComment === id ? null : id);
  };

  return (
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
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            display: { xs: "block", md: "flex" },
            height: "100%",
          }}
        >
          <img
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt="Post"
            style={{
              width: "100%",
              maxWidth: "500px",
              objectFit: "contain",
            }}
          />
        </Box>

        <Box
          sx={{
            flex: 1,
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            backgroundColor: "background.default",
            height: "100%",
          }}
        >
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBlock: 1,
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Avatar src="https://www.w3schools.com/howto/img_avatar.png" />
              <Typography
                variant="body1"
                
                sx={{ fontSize: { xs: "14px", sm: "16px", md: "18px" }, color: "text.primary" }}    
              >
                Username
              </Typography>
            </Stack>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <Divider />

          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              padding: 2,
            }}
          >
            {comments.map((comment) => (
              <Stack
                key={comment.id}
                direction="row"
                alignItems="flex-start"
                spacing={2}
                sx={{ marginBottom: 2 }}
              >
                <Avatar src="https://www.w3schools.com/howto/img_avatar.png" />
                <Box>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="body1">{comment.username}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {comment.time}
                    </Typography>
                  </Stack>
                  <Typography
                    // variant="body2"
                    color="text.primary"
                    sx={{ marginTop: 0.5, fontSize: "13px" }}   
                  >
                    {expandedComment === comment.id
                      ? comment.text
                      : comment.text.length > 100
                      ? `${comment.text.substring(0, 100)}...`
                      : comment.text}
                  </Typography>
                  {comment.text.length > 100 && (
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
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              padding: 2,
            }}
          >
            <TextField
              placeholder="Add comments..."
              variant="standard"
              fullWidth
              sx={{
                "& .MuiInputBase-root": {
                  fontSize: "15px",
                  paddingBottom: "6px",
                },
              }}
            />
            <Button
              variant="text"
              sx={{
                backgroundColor: "transparent",
              }}
            >
              Post
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
