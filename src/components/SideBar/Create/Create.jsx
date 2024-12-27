import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
  Divider,
  CircularProgress,
} from "@mui/material";
import {
  Close as CloseIcon,
  AddPhotoAlternate as AddPhotoAlternateIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import useCreatePost from "../../../hooks/useCreatePost";

const Create = ({ open, onClose }) => {
  const {
    selectedImage,
    caption,
    setCaption,
    step,
    goToPreviousStep,
    handleClose,
    handleImageSelect,
    handleShare,
    uploading,
  } = useCreatePost(onClose);

  return (
   
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxWidth: "500px",
          boxShadow: "0px 0px 8px 0px rgba(255,255,255,0.1)",
        },
      }}
      >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 2,
          borderBottom: 1,
          borderColor: "divider",
          backgroundColor: "background.default",
        }}
        >
        {step === 2 && (
          <IconButton onClick={goToPreviousStep} size="small">
            <ArrowBackIcon />
          </IconButton>
        )}
        <Typography
          variant="body1"
          sx={{ fontWeight: "bold", flex: 1, textAlign: "center" }}
          >
          {step === 1 ? "Create new post" : "Edit post"}
        </Typography>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0, display: "flex", flexDirection: "row" }}>
        {step === 1 ? (
          <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "500px",
            bgcolor: "background.default",
            
          }}
          >
            <AddPhotoAlternateIcon sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Drag photos and videos here
            </Typography>
            <Button
              variant="contained"
              component="label"
              sx={{
                mt: 2,
                backgroundColor: (theme) => theme.palette.background.primary,
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.primary.main,
                  color: (theme) => theme.palette.primary.contrastText,
                },
              }}
              >
              Select from computer
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageSelect}
                />
            </Button>
          </Box>
        ) : (
          <Stack direction="row" sx={{ width: "100%" }}>
            <Box
              sx={{
                height: "400px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "background.default",
              }}
              >
              {selectedImage && (
                <img
                src={selectedImage}
                alt="Selected"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
                />
              )}
            </Box>
            <Divider orientation="vertical" flexItem />
            <Stack
              spacing={2}
              sx={{
                width: "60%",
                padding: "5px",
              }}
              >
              <TextField
                multiline
                rows={4}
                placeholder="Write a caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "background.default",
                    padding: "5px",
                    fontSize: "14px",
                  },
                }}
                />
              <Button
                variant="contained"
                fullWidth
                onClick={handleShare}
                disabled={!selectedImage || uploading}
                sx={{
                  color: "text.primary",
                }}
                >
                {uploading ? <CircularProgress size={24} /> : "Post"}
              </Button>
            </Stack>
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Create;
