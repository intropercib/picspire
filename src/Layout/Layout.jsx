import { Box, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SideBar from "../components/SideBar/SideBar";
import useAuthStore from "../components/store/useAuthStore";

const Layout = ({ children }) => {
  const { pathname } = useLocation();
  const [user, loading, error] = [useAuthStore((state) => state.user), false, null];
  const [isInitialized, setIsInitialized] = useState(false);
  const sideBarRender = pathname !== "/login" && pathname !== "/signup" && user;

  useEffect(() => {
    const initialize = async () => {
      await useAuthStore.getState().initialize();
      setIsInitialized(true);
    };
    initialize();
  }, []);

  const isMessageRender = location.pathname.includes("/message")

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
              width: isMessageRender ? "85px" : {
                xs: "85px",
                sm: "85px",
                md: "85px",
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

              marginLeft: isMessageRender? "90px" : {
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