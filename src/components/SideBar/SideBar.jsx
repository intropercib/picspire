import React, { useState } from "react";
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
  Search,
} from "@mui/icons-material";
import useAuthStore from "../store/useAuthStore";
import SearchBar from "./Search/SearchBar";
import Create from "./Create/Create";
import More from "./More/More";

const SideBarItem = ({ title, icon, navTo, onClick, isButton }) => {
  if (isButton) {
    return (
      <ListItem
        onClick={onClick}
        sx={{
          textDecoration: "none",
          borderRadius: "10px",
          "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
          padding: "10px 0",
          height: "50px",
          width: "100%",
          alignItems: "center",
          cursor: "pointer",
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
  }
  return (
    <ListItem
      component={NavLink}
      to={navTo}
      end={navTo === "/"}
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
};

const SideBar = () => {
  const authUser = useAuthStore((state) => state.user);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const userName = authUser?.username || "";
  const sideBarItems = [
    { title: "Home", icon: <HomeIcon />, navTo: "/" },
    {
      title: "Search",
      icon: <SearchIcon />,
      onClick: () => setIsSearchOpen(true),
      isButton: true,
    },
    // { title: "Explore", icon: <ExploreIcon />, navTo: "/explore" },
    { title: "Reels", icon: <MovieCreationOutlinedIcon />, navTo: "/reels" },
    { title: "Messages", icon: <MapsUgcRoundedIcon />, navTo: "/messages" },
    // {
    //   title: "Notifications",
    //   icon: <FavoriteBorderRoundedIcon />,
    //   navTo: "/notifications",
    // },
    {
      title: "Create",
      icon: <ControlPointRoundedIcon />,
      onClick: () => setIsCreateOpen(true),
      isButton: true,
    },
    {
      title: "Profile",
      icon: authUser?.profilePicURL ? (
        <img
          src={authUser.profilePicURL}
          alt="Profile"
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      ) : (
        <AccountCircleOutlinedIcon />
      ),
      navTo: `/${userName}`,
    },
  ];
  const isMessageRender = location.pathname.includes("/message");
  return (
    <>
      <Box>
        <Stack
          spacing={1}
          sx={{ overflowX: "hidden", width: "100%", height: "100%" }}
        >
          <Box
            sx={{
              display:isMessageRender?"flex": { xs: "flex", lg: "none" },
              justifyContent: "center",
              alignItems: "center",
              padding: "20px 0",
              height: "135px",
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
              display: isMessageRender ? "none" : { xs: "none", lg: "block" },
              padding: "10px 0",
            }}
          >
            <img src="src/assets/logo.png" alt="logo" width="150px" />
          </Box>

          {sideBarItems.map((item, index) => (
            <SideBarItem key={index} {...item} />
          ))}

          <Stack sx={{ paddingTop: "50px" }}>
            <ListItem
              onClick={() => setIsMoreOpen(true)} 
              sx={{
                textDecoration: "none",
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
                padding: "10px 0",
                alignItems: "center",
                position: "absolute",
                bottom: "25px",
                width: isMessageRender ?"60px": {
                  xs: "40px",
                  lg: "90%",
                },
                cursor: "pointer",
              }}
            >
              <ListItemIcon sx={{justifyContent: "center" }}>
                <MenuRoundedIcon sx={{ fontSize: "30px" }} />
              </ListItemIcon>
              <ListItemText
                primary="More"
                sx={{
                  display: isMessageRender? "none": { xs: "none", lg: "block" },
                  color: (theme) => theme.palette.text.primary,
                }}
              />
            </ListItem>
          </Stack>
        </Stack>
      </Box>
      <SearchBar open={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <Create open={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
      <More open={isMoreOpen} onClose={() => setIsMoreOpen(false)} />{" "}
    </>
  );
};

export default SideBar;
