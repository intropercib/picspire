import { Box, Stack } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import SideBar from "../components/SideBar/SideBar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../components/Firebase/firebase";

const Layout = ({ children }) => {
  const { pathname } = useLocation();
  const [user, loading, error] = useAuthState(auth);
  const sideBarRender = pathname !== "/login" && pathname !== "/signup" && user;

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {sideBarRender ? (
        <Stack direction={"row"} sx={{ width: "100%", height: "100%" }}>
          <Box
            sx={{
              position: "fixed",
              left: 0,
              top: 0,
              height: "100vh",
              width: {
                xs: "90px",
                sm: "90px",
                md: "90px",
                lg: "250px",
              },
              borderRight: "1px solid",
              borderColor: (theme) => theme.palette.divider,
              padding: "0px 15px",
              backgroundColor: (theme) => theme.palette.background.default,
            }}
          >
            <SideBar />
          </Box>

          <Box
            sx={{
              marginLeft: {
                xs: "90px",
                sm: "90px",
                md: "90px",
                lg: "250px",
              },
              width: "100%",
              height: "100vh",
              overflowY: "auto",
              scrollbarWidth: "none",
            }}
          >
            {children}
          </Box>
        </Stack>
      ) : (
        <>{children}</>
      )}
    </Box>
  );
};

export default Layout;
