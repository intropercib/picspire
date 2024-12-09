import React, { useState } from "react";
import {
  Avatar,
  Box,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  MoreHoriz as MoreHorizIcon,
  Circle as CircleIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteSharpIcon,
  MapsUgc as MapsUgcSharpIcon,
  SendOutlined as SendOutlinedIcon,
  BookmarkBorder as BookmarkBorderSharpIcon,
} from "@mui/icons-material";

const FeedPost = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(1000);

  const handleLike = () => {
    setIsLiked((prev) => !prev);
    setLikeCount((prev) => (isLiked ? Math.max(prev - 1, 0) : prev + 1));
  };

  return (
    <Paper
      sx={{
        backgroundColor: (theme) => theme.palette.background.default,
        padding: 2,
        margin: "auto",
        marginBlock: 2,
        boxShadow: 3,
        maxWidth: "100%",
        width: { xs: "100%", sm: "500px", md: "550px", lg: "500px" },
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar src="https://www.w3schools.com/howto/img_avatar.png" />
          <Typography
            variant="h5"
            sx={{ fontSize: { xs: "14px", sm: "16px", md: "18px" } }}
          >
            Username
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", fontSize: { xs: "12px", sm: "14px" } }}
          >
            <CircleIcon sx={{ fontSize: 6 }} /> 2w
          </Typography>
        </Stack>
        <MoreHorizIcon />
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
          height: { xs: "400px", sm: "400px", md: "500px", lg: "600px" },
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
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt="post"
            style={{ objectFit: "contain", width: "100%", height: "100%" }}
          />
        </Box>
      </Box>

      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={2}>
            <Box onClick={handleLike} sx={{ cursor: "pointer" }}>
              {isLiked ? (
                <FavoriteSharpIcon
                  sx={{ fontSize: { xs: "20px", lg: "30px" }, color: "warning.main" }}
                />
              ) : (
                <FavoriteBorderIcon sx={{ fontSize: { xs: "20px", lg: "30px" } }} />
              )}
            </Box>
            <MapsUgcSharpIcon sx={{ fontSize: { xs: "20px", lg: "30px" } }} />
            <SendOutlinedIcon sx={{ fontSize: { xs: "20px", lg: "30px" } }} />
          </Stack>
          <BookmarkBorderSharpIcon sx={{ fontSize: { xs: "20px", lg: "30px" } }} />
        </Stack>

        <Box mt={1}>
          <Typography
            variant="body1"
            sx={{ fontSize: { xs: "14px", md: "16px" }, lineHeight: 1.2 }}
          >
            {likeCount} likes
          </Typography>
          <Typography variant="body1" sx={{ fontSize: { xs: "14px", md: "16px" } }}>
            Caption
          </Typography>
        </Box>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          See all comments
        </Typography>
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
      </Box>
    </Paper>
  );
};

export default FeedPost;
