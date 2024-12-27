import React, { useEffect, useState } from "react";
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

const MessagingHeader = ({ onBack, selectedUser}) => {
  console.log("he",selectedUser);
  const [anchorEl, setAnchorEl] = useState(null); // For the menu
  const [openDialog, setOpenDialog] = useState(false); // For the delete confirmation dialog

  const { deleteChat } = useChatService();

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
        >
          <MenuItem onClick={handleDialogOpen}>Delete Conversation</MenuItem>
        </Menu>
      </Toolbar>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Delete Conversation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the entire conversation with{" "}
            <strong>{selectedUser.username}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};

export default MessagingHeader;
