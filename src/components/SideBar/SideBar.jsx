import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Stack,
  Button,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import MovieCreationOutlinedIcon from "@mui/icons-material/MovieCreationOutlined";
import MapsUgcRoundedIcon from "@mui/icons-material/MapsUgcRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
const sideBarItems = [
  { title: "Home", icon: <HomeIcon />, navTo: "/" },
  { title: "Search", icon: <SearchIcon />, navTo: "/search" },
  { title: "Explore", icon: <ExploreIcon />, navTo: "/explore" },
  { title: "Reels", icon: <MovieCreationOutlinedIcon />, navTo: "/reels" },
  { title: "Messages", icon: <MapsUgcRoundedIcon />, navTo: "/messages" },
  {
    title: "Notifications",
    icon: <FavoriteBorderRoundedIcon />,
    navTo: "/notifications",
  },
  { title: "Create", icon: <ControlPointRoundedIcon />, navTo: "/create" },
  { title: "Profile", icon: <AccountCircleOutlinedIcon />, navTo: "/profile" },
];

const SideBarItem = ({ title, icon, navTo }) => (
  <ListItem
    component={NavLink}
    to={navTo}
    sx={{
      textDecoration: "none",
      borderRadius: "10px",
      "&.active": {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
      },
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
      },
      alignItems: "center",
      justifyContent: "center",
      padding: "10px 0",
      height: "50px",
      width: "100%",
    }}
  >
    <ListItemIcon
      sx={{
        minWidth: "55px",
        justifyContent: "center",
      }}
    >
      {React.cloneElement(icon, {
        sx: { fontSize: "30px" },
      })}
    </ListItemIcon>

    <ListItemText
      primary={title}
      sx={{
        display: {
          xs: "none",
          sm: "none",
          md: "none",
          lg: "block",
        },
        color: (theme) => theme.palette.text.primary,
      }}
    />
  </ListItem>
);

const SideBar = () => {
  return (
    <Box>
      <Stack
        spacing={1}
        sx={{
          overflowX: "hidden",
          width: "100%",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: { xs: "flex", sm: "flex", md: "flex", lg: "none" },
            justifyContent: "center",
            alignItems: "center",
            padding: "20px 0",
            height: "135px",
            width: "100%",
          }}
        >
          <InstagramIcon
            sx={{
              fontSize: "40px",
              color: (theme) => theme.palette.text.primary,
            }}
          />
        </Box>

        <Box
          sx={{
            display: { xs: "none", sm: "none", md: "none", lg: "block" },
            padding: "30px 0px",
          }}
        >
          <img src="src/assets/logo.png" alt="logo" width="150px" />
        </Box>

        {sideBarItems.map((item, index) => (
          <SideBarItem
            key={index}
            title={item.title}
            icon={item.icon}
            navTo={item.navTo}
          />
        ))}
        <Stack
          sx={{
            paddingTop: "50px",
          }}
        >
          <ListItem
            component={NavLink}
            to="/"
            sx={{
              textDecoration: "none",
              borderRadius: "10px",
              "&.active": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
              alignItems: "center",
              justifyContent: "center",
              padding: "10px 0",
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: "45px",
                justifyContent: "center",
              }}
            >
              <MenuRoundedIcon sx={{ fontSize: "30px" }} />
            </ListItemIcon>

            <ListItemText
              primary="More"
              sx={{
                display: {
                  xs: "none",
                  sm: "none",
                  md: "none",
                  lg: "block",
                },
                color: (theme) => theme.palette.text.primary,
              }}
            />
          </ListItem>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SideBar;
