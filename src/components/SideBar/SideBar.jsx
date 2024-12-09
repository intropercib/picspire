import React from "react";
import { NavLink } from "react-router-dom";
import {
  Box,
  Stack,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Instagram as InstagramIcon,
  Home as HomeIcon,
  Search as SearchIcon,
  Explore as ExploreIcon,
  MovieCreationOutlined as MovieCreationOutlinedIcon,
  MapsUgcRounded as MapsUgcRoundedIcon,
  FavoriteBorderRounded as FavoriteBorderRoundedIcon,
  ControlPointRounded as ControlPointRoundedIcon,
  AccountCircleOutlined as AccountCircleOutlinedIcon,
  MenuRounded as MenuRoundedIcon,
} from "@mui/icons-material";
import useAuthStore from "../store/authStore";

const SideBarItem = ({ title, icon, navTo }) => (
  <ListItem
    component={NavLink}
    to={navTo}
    sx={{
      textDecoration: "none",
      borderRadius: "10px",
      "&.active, &:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
      padding: "10px 0",
      height: "50px",
      width: "100%",
      alignItems: "center",
    }}
  >
    <ListItemIcon sx={{ minWidth: "55px", justifyContent: "center" }}>
      {React.cloneElement(icon, { sx: { fontSize: "30px" } })}
    </ListItemIcon>
    <ListItemText
      primary={title}
      sx={{
        display: { xs: "none", lg: "block" },
        color: (theme) => theme.palette.text.primary,
      }}
    />
  </ListItem>
);

const SideBar = () => {
  const authUser = useAuthStore((state) => state.user);
  const sideBarItems = [
    { title: "Home", icon: <HomeIcon />, navTo: "/" },
    { title: "Search", icon: <SearchIcon />, navTo: "/search" },
    { title: "Explore", icon: <ExploreIcon />, navTo: "/explore" },
    { title: "Reels", icon: <MovieCreationOutlinedIcon />, navTo: "/reels" },
    { title: "Messages", icon: <MapsUgcRoundedIcon />, navTo: "/messages" },
    { title: "Notifications", icon: <FavoriteBorderRoundedIcon />, navTo: "/notifications" },
    { title: "Create", icon: <ControlPointRoundedIcon />, navTo: "/create" },
    {
      title: "Profile",
      icon: authUser?.profilePicURL ? (
        <img
          src={authUser.profilePicURL}
          alt="Profile"
          style={{ width: "30px", height: "30px", borderRadius: "50%" }}
        />
      ) : (
        <AccountCircleOutlinedIcon />
      ),
      navTo: "/profile",
    },
  ];

  return (
    <Box>
      <Stack
        spacing={1}
        sx={{ overflowX: "hidden", width: "100%", height: "100%" }}
      >
        <Box
          sx={{
            display: { xs: "flex", lg: "none" },
            justifyContent: "center",
            alignItems: "center",
            padding: "20px 0",
            height: "135px",
          }}
        >
          <InstagramIcon
            sx={{ fontSize: "40px", color: (theme) => theme.palette.text.primary }}
          />
        </Box>

        <Box
          sx={{
            display: { xs: "none", lg: "block" },
            padding: "30px 0",
          }}
        >
          <img src="src/assets/logo.png" alt="logo" width="150px" />
        </Box>

        {sideBarItems.map((item, index) => (
          <SideBarItem key={index} {...item} />
        ))}

        <Stack sx={{ paddingTop: "50px" }}>
          <ListItem
            component={NavLink}
            to="/"
            sx={{
              textDecoration: "none",
              borderRadius: "10px",
              "&.active, &:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
              padding: "10px 0",
              alignItems: "center",
            }}
          >
            <ListItemIcon sx={{ minWidth: "45px", justifyContent: "center" }}>
              <MenuRoundedIcon sx={{ fontSize: "30px" }} />
            </ListItemIcon>
            <ListItemText
              primary="More"
              sx={{
                display: { xs: "none", lg: "block" },
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
