import React from "react";
import {
  Dialog,
  DialogContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const More = ({ open, onClose }) => {
  const navigate = useNavigate();

  const handleOpenAbout = () => {
    navigate('/about');
    onClose();
  };

  const handleOpenSettings = () => {
    navigate('/settings');
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          position: "absolute",
          bottom: "8px",
          left: "25px",
          boxShadow: "0px 0px 10px 0px rgba(255,255,255,0.1)",
        },
      }}
    >
      <DialogContent
        sx={{
          margin: '0',
          padding: '0',
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <List
          sx={{
            backgroundColor: (theme) => theme.palette.background.default,
            borderRadius: '10px',
            fontSize: '12px',
            padding: '2px',
            width: "100%",
          }}
        >
          <ListItem button onClick={handleOpenSettings}>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem button onClick={handleOpenAbout}>
            <ListItemText primary="About" />
          </ListItem>
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default More;
