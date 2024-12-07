import {
  Avatar,
  Box,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CircleIcon from "@mui/icons-material/Circle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import MapsUgcSharpIcon from "@mui/icons-material/MapsUgcSharp";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import BookmarkBorderSharpIcon from "@mui/icons-material/BookmarkBorderSharp";
const FeedPost = () => {
  const [isliked, setIsliked] = useState(false);
  const [likeCount, setLikeCount] = useState(1000);
  const handleLike = () => {
    setIsliked(!isliked);
    if (isliked) {
      likeCount > 0 ? setLikeCount(likeCount - 1) : setLikeCount(0);
    } else {
      setLikeCount(likeCount + 1);
    }
  };
  return (
    <Paper
      sx={{
        background: (theme) => theme.palette.background.default,
        padding: 2,
        margin: "auto",
        maxWidth: "100%",
        boxShadow: 3,
        width: {
          xs: "100%",
          sm: "500px",
          md: "550px",
          lg: "500px",
        },
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar src="https://www.w3schools.com/howto/img_avatar.png" />
          <Typography
            variant="h5"
            component="p"
            sx={{
              fontSize: { xs: "14px", sm: "16px", md: "18px" },
            }}
          >
            Username
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              fontSize: { xs: "12px", sm: "14px" },
            }}
          >
            <CircleIcon sx={{ fontSize: 6 }} /> 2w
          </Typography>
        </Stack>
        <MoreHorizIcon />
      </Stack>

      <Box
        sx={{
          marginBlock: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid",
          borderColor: (theme) => theme.palette.divider,
          maxHeight: "600px",
          width: "100%",
          height: {
            xs: "400px",
            sm: "400px",
            md: "500px",
            lg: "600px",
          },
          borderRadius: "4px",
        }}
      >
        <Box
          sx={{
            maxHeight: "600px",
            height: {
              xs: "400px",
              sm: "400px",
              md: "500px",
              lg: "600px",
            },
            maxWidth: "600px",
            width: "100%",
            borderRadius: "4px",
            overflow: "clip",
          }}
        >
          <img
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt="post"
            style={{
              objectFit: "contain",
              width: "100%",
              height: "100%",
            }}
          />
        </Box>
      </Box>

      <Box>
        <Stack justifyContent="space-between" direction="row">
          <Stack direction="row" spacing={2}>
            <Box onClick={handleLike}>
              {isliked ? (
                <FavoriteSharpIcon
                  sx={{
                    fontSize: {
                      xs: "20px",
                      sm: "28px",
                      md: "28px",
                      lg: "30px",
                    },
                    color: "warning.main",
                  }}
                />
              ) : (
                <FavoriteBorderIcon
                  sx={{
                    fontSize: {
                      xs: "20px",
                      sm: "28px",
                      md: "28px",
                      lg: "30px",
                    },
                  }}
                />
              )}
            </Box>

            <MapsUgcSharpIcon
              sx={{
                fontSize: {
                  xs: "20px",
                  sm: "28px",
                  md: "28px",
                  lg: "30px",
                },
              }}
            />
            <SendOutlinedIcon
              sx={{
                fontSize: {
                  xs: "20px",
                  sm: "28px",
                  md: "28px",
                  lg: "30px",
                },
              }}
            />
          </Stack>
          <Stack>
            <BookmarkBorderSharpIcon
              sx={{
                fontSize: {
                  xs: "20px",
                  sm: "28px",
                  md: "28px",
                  lg: "30px",
                },
              }}
            />
          </Stack>
        </Stack>
        <Box>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "14px", sm: "14px", md: "16px" },
              lineHeight: 0.9,
            }}
          >
            {likeCount} likes
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "14px", sm: "14px", md: "16px" },
            }}
          >
            caption
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          See all comments
        </Typography>
        <TextField
          placeholder="Add comments..."
          variant="standard"
          sx={{
            "& .MuiInputBase-root": {
              fontSize: "15px",
              paddingBottom: "6px",
            },
          }}
          fullWidth
        />
      </Box>
    </Paper>
  );
};

export default FeedPost;
