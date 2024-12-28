import React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import LoginForm from "../../components/AuthForm/LoginForm";
import microsoft from "../../assets/microsoft.png";
import playstore from "../../assets/playstore.png";
import psIcon from "../../assets/psIcon.png";
const Auth = () => {
  return (
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
          height: "50%",
          display: {
            xs: "none",
            md: "block",
          },
        }}
      >
        <img src={psIcon} alt="authImage" width="100%" height="100%" />
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
              <img src={microsoft} alt="microsoft" height="45px" />
            </Box>
            <Box>
              <img src={playstore} alt="playstore" height="45px" />
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
};

export default Auth;
