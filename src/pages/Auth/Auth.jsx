import { Box, Container, Stack, Typography } from "@mui/material";
import React from "react";
import LoginForm from "../../components/AuthForm/LoginForm";
const Auth = () => {
  return (
    <>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          gap: "30px",
        }}
      >
        <Box
          sx={{
            height: "85%",
            display: {
              xs: "none",
              md: "block",
            },
          }}
        >
          <img
            src="src/assets/auth.png"
            alt="authimage"
            width="100%"
            height="100%"
          />
        </Box>
        <Box
          sx={{
            width: {
              xs: "100%",
              sm: "400px",
              md: "400px",
              lg: "400px",
            },
          }}
        >
        
          <LoginForm />
          <Stack
            spacing={2}
            sx={{
              display: {
                xs: "none",
                sm: "block",
                md: "block",
                lg: "block",
              },
            }}
          >
            <Typography variant="h3" align="center">
              Get the app.
            </Typography>
            <Stack
              direction="row"
              sx={{
                alignItems: "center",
                justifyContent: "space-around",
                padding: "0px 20px",
              }}
            >
              <Box>
                <img
                  src="src/assets/microsoft.png"
                  alt="microsoft"
                  height="45px"
                />
              </Box>
              <Box>
                <img
                  src="src/assets/playstore.png"
                  alt="playstore"
                  height="45px"
                />
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </>
  );
};

export default Auth;
