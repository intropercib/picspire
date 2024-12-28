import { useState } from "react";
import {
  Box,
  Input,
  InputAdornment,
  Stack,
  Typography,
  Avatar,
  CircularProgress,
  Drawer,
  IconButton,
} from "@mui/material";
import { Search as SearchIcon, Close as CloseIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useSearchUsers from "../../../hooks/useSearchUser";

const SearchBar = ({ open, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { searchResults, loading } = useSearchUsers(searchQuery);
  const navigate = useNavigate();

  const handleUserClick = (username) => {
    navigate(`/${username}`);
    onClose();
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: "397px" },
          borderRight: "2px solid",
          borderLeft: "2px solid",
          borderColor: (theme) => theme.palette.divider,
          height: "100vh",
          left: { xs: "0", md: "72px", lg: "244px" },
          transition: "left 0.3s ease-in-out",
        },
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        p="8px 16px 20px"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h5" fontWeight={600}>
            Search
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box mb={2}>
          <Input
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} 
            disableUnderline
            fullWidth
            autoFocus
            sx={{
              backgroundColor: (theme) => theme.palette.background.default,
              borderRadius: "8px",
              padding: "8px 12px",
              "&::placeholder": {
                color: "#A8A8A8",
                opacity: 1,
              },
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
        </Box>

        <Box flex={1}>
          {searchQuery === "" ? (
            <Typography textAlign="center" mt={3} variant="body2">
              Recent searches
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
                onClick={() => handleUserClick(user.username)}
              >
                <Avatar
                  src={
                    user.profilePicURL ||
                    "/defaultAvatar.jpg"
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
      </Box>
    </Drawer>
  );
};

export default SearchBar;
