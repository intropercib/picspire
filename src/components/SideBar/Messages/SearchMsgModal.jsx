import React, { useState } from "react";
import {
  Box,
  Input,
  InputAdornment,
  Stack,
  Typography,
  Avatar,
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
} from "@mui/material";
import { Search as SearchIcon, Close as CloseIcon } from "@mui/icons-material";
import useSearchUsers from "../../../hooks/useSearchUser";

const SearchMsgModal = ({ open, onClose, onUserSelect }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { searchResults, loading } = useSearchUsers(searchQuery);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          boxShadow: "0px 0px 8px 0px rgba(255,255,255,0.1)",
          background: (theme) => theme.palette.background.default,
        },
      }}
    >
      <DialogTitle>Search Users</DialogTitle>
      <DialogContent>
        <Input
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          disableUnderline
          fullWidth
          autoFocus
          sx={{
            backgroundColor: (theme) => theme.palette.background.default,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: "8px",
            padding: "8px 12px",
            "&::placeholder": {
              color: "#A8A8A8",
              opacity: 1,
            },
            marginBottom: "16px",
          }}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          endAdornment={
            searchQuery && (
              <InputAdornment position="end">
                {loading ? (
                  <CircularProgress size={16} />
                ) : (
                  <IconButton onClick={() => setSearchQuery("")} size="small">
                    <CloseIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                )}
              </InputAdornment>
            )
          }
        />
        <Box flex={1} overflow="auto">
          {searchQuery === "" ? (
            <Typography textAlign="center" mt={3} variant="body2">
              Enter a search query
            </Typography>
          ) : loading ? (
            <Typography textAlign="center" mt={3} variant="body2">
              Searching...
            </Typography>
          ) : searchResults.length > 0 ? (
            searchResults.map((user) => (
              <Stack
                key={user.id}
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{
                  padding: "8px",
                  cursor: "pointer",
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: (theme) =>
                      theme.palette.background.primary,
                  },
                  borderBottom: "1px solid",
                  borderColor: "divider",
                }}
                onClick={() => onUserSelect(user)}
              >
                <Avatar
                  src={
                    user.profilePicURL ||
                    "https://www.w3schools.com/howto/img_avatar.png"
                  }
                  sx={{ width: 44, height: 44 }}
                />
                <Box>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    {user.username}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "14px",
                    }}
                  >
                    {user.fullName}
                  </Typography>
                </Box>
              </Stack>
            ))
          ) : (
            <Typography textAlign="center" mt={3} variant="body2">
              Result not found
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          sx={{
            backgroundColor: (theme) => theme.palette.background.primary,
            "&:hover": {
              backgroundColor: (theme) => theme.palette.primary.main,
              color: (theme) => theme.palette.primary.contrastText,
            },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SearchMsgModal;
