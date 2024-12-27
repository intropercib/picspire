import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Typography,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { ArrowBack, MoreVert } from "@mui/icons-material";
import useChatService from "../../../hooks/useChatService";
import { useNavigate } from "react-router-dom";

const MessagingHeader = ({ onBack, selectedUser }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const { deleteChat } = useChatService();

  const navigate = useNavigate();

  // Open menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Open delete confirmation dialog
  const handleDialogOpen = () => {
    setOpenDialog(true);
    handleMenuClose();
  };

  // Close delete confirmation dialog
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  // Confirm delete conversation
  const handleConfirmDelete = () => {
    deleteChat(selectedUser.id);
    setOpenDialog(false);
    onBack();
  };

  return (
    <AppBar position="sticky" color="default">
      <Toolbar
        sx={{
          borderBottom: "1px solid",
          borderColor: (theme) => theme.palette.divider,
          backgroundColor: (theme) => theme.palette.background.paper,
        }}
      >
        {/* Back Button */}
        <IconButton edge="start" color="inherit" onClick={onBack}>
          <ArrowBack />
        </IconButton>

        {/* Avatar */}
        <Avatar
          src={
            selectedUser.avatar ||
            "https://www.w3schools.com/howto/img_avatar.png"
          }
          alt={selectedUser.username}
          onClick={() => navigate(`/${selectedUser.username}`)}
        />

        {/* Username */}
        <Typography
          variant="h4"
          sx={{
            flexGrow: 1,
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
          onClick={() => navigate(`/${selectedUser.username}`)}
        >
          {selectedUser.username}
        </Typography>

        {/* More Options */}
        <IconButton color="inherit" onClick={handleMenuOpen}>
          <MoreVert />
        </IconButton>

        {/* Options Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{
            "& .MuiMenu-paper": {
              background: (theme) => theme.palette.background.default,
              boxShadow: "0px 0px 10px 0px rgba(255,255,255,0.1)",
            },
          }}
        >
          <MenuItem onClick={handleDialogOpen}>Delete Conversation</MenuItem>
        </Menu>
      </Toolbar>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        PaperProps={{
          sx: {
            boxShadow: "0px 0px 8px 0px rgba(255,255,255,0.1)",
            background: (theme) => theme.palette.background.default,
            userSelect: "none",
          },
        }}
      >
        <DialogTitle>Delete Conversation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the entire conversation with{" "}
            <strong>{selectedUser.username}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDialogClose}
            sx={{
              backgroundColor: (theme) => theme.palette.background.primary,
              "&:hover": {
                backgroundColor: (theme) => theme.palette.primary.main,
                color: (theme) => theme.palette.primary.contrastText,
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            sx={{
              backgroundColor: "red",
              color: (theme) => theme.palette.text.primary,
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};

export default MessagingHeader;
