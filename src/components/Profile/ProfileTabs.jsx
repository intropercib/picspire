import React, { useState } from "react";
import {
  Box,
  Stack,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ProfilePosts from "./ProfilePosts";
import GridOnIcon from "@mui/icons-material/GridOn";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useTheme } from "@mui/material/styles";
import SavedPosts from "./SavedPosts";


const ProfileTabs = () => {
  const [value, setValue] = useState(0);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const TabPanel = ({ children, index }) => {
    return (
      <Box role="tabpanel" hidden={value !== index} p={2}>
        {value === index && children}
      </Box>
    );
  };

  return (
    <Stack>
      <Stack alignItems={"center"}>
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{
            "& .MuiTabs-indicator": {
              height: "2px",
              top: 0,
            },
            "& .MuiTab-root": {
              minHeight: {
                xs: "30px",
                sm: "40px",
                md: "40px",
                lg: "40px",
              },
              height: "30px",
              padding: {
                xs: "0px",
                sm: "10px 20px",
                md: "10px 30px",
                lg: "10px 30px",
              },
            },
          }}
        >
          <Tab
            icon={<GridOnIcon fontSize="small" />}
            iconPosition="start"
            label={isSmallScreen ? "" : "POSTS"}
          />
          <Tab
            icon={<BookmarkBorderIcon fontSize="small" />}
            iconPosition="start"
            label={isSmallScreen ? "" : "SAVED"}
          />
        </Tabs>
      </Stack>

      <TabPanel index={0}>
        <ProfilePosts />
      </TabPanel>
      <TabPanel index={1}>
          <SavedPosts />
      </TabPanel>
    </Stack>
  );
};

export default ProfileTabs;
