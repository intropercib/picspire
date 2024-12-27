import React, { useState } from "react";
import {
  Box,
  IconButton,
  TextField,
  Tooltip,
  CircularProgress,
  Badge,
} from "@mui/material";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const MessagingInput = ({ onSend }) => {
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [uploading, setUploading] = useState(false);
  const handleSend = async () => {
    if (!message.trim() && !attachment) return;

    let attachmentUrl = null;
    let messageText = message.trim();

    try {
      if (attachment) {
        setUploading(true);
        const storage = getStorage();
        const storageRef = ref(
          storage,
          `attachments/${Date.now()}-${attachment.name}`
        );
        const snapshot = await uploadBytes(storageRef, attachment);
        attachmentUrl = await getDownloadURL(snapshot.ref);
        setUploading(false);
        messageText = messageText || "";
      }

      onSend({
        text: messageText,
        attachment: attachmentUrl,
      });

      setMessage("");
      setAttachment(null);
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploading(false);
    }
  };

  const handleAttachmentChange = (e) => {
    const file = e.target.files[0];
    if (file) setAttachment(file);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: 1,
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Tooltip title="Attach File">
        <Badge
          badgeContent={attachment ? 1 : 0}
          color="primary"
          sx={{
            "& .MuiBadge-badge": {
              right: 3,
              top: 3,
            },
          }}
        >
          <IconButton size="small" component="label">
            <AttachFileOutlinedIcon />
            <input type="file" hidden onChange={handleAttachmentChange} />{" "}
            {/* File input */}
          </IconButton>
        </Badge>
      </Tooltip>

      <TextField
        variant="outlined"
        placeholder="Type a message"
        fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        sx={{ marginX: 1 }}
      />

      <Tooltip title="Send">
        <IconButton size="small" onClick={handleSend} disabled={uploading}>
          {uploading ? <CircularProgress size={20} /> : <SendOutlinedIcon />}
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default MessagingInput;
