import React, { useState } from "react";
import {
  Box,
  Stack,
  Button,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import useLoginFormHandler from "../../hooks/useLoginFormHandler";
import useLogin from "../../hooks/useLogin";
import FormSnackbar from "./FormSnackBar";
import { FormTextField } from "./FormTextField";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import GoogleIcon from "@mui/icons-material/Google";
import useAuthStore from "../store/useAuthStore";
const LoginForm = () => {
  const { inputs, errors, validate, handleInputChange } = useLoginFormHandler();
  const { login, loading } = useLogin();
  const [showAlert, setShowAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const result = await login(inputs);
    if (!result) {
      setShowAlert(true);
    } else {
      navigate("/");
    }
  };

  const handleClose = () => setShowAlert(false);
  const loginWithGoogle = useAuthStore((state) => state.loginWithGoogle);

  const handleGoogleLogin = async () => {
    try {
      const success = await loginWithGoogle();
      if (success) {
        navigate("/");
      } else {
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setShowAlert(true);
    }
  };

  return (
    <Box sx={{ width: "100%", p: 3 }}>
      <FormSnackbar
        open={showAlert}
        message="Invalid email or password"
        severity="error"
        onClose={handleClose}
      />
      <Stack spacing={2}>
        <Stack
          spacing={3}
          sx={{
            border: "1px solid ",
            borderColor: "divider",
            padding: "20px 10px",
          }}
        >
          <Stack alignItems="center" justifyContent="center">
            {/* <img src="src/assets/logo.png" alt="logo" width="150px" /> */}
            <img src="../../assets/logo.png" alt="logo" width="150px" />
          </Stack>

          <Stack spacing={2}>
            <FormTextField
              label="Email"
              name="email"
              value={inputs.email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email}
              autoComplete="off"
            />
            <FormTextField
              label="Password"
              name="password"
              value={inputs.password}
              onChange={handleInputChange}
              error={!!errors.password}
              helperText={errors.password}
              type={showPassword ? "text" : "password"}
              autoComplete="off"
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
          </Stack>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAuth}
            disabled={Boolean(loading)}
            sx={{
              backgroundColor: (theme) => theme.palette.primary.main,
              color: (theme) => theme.palette.primary.contrastText,
              "&:hover": {
                color: (theme) => theme.palette.text.primary,
                backgroundColor: (theme) => theme.palette.background.primary,
              },
            }}
          >
            {loading ? "Logging in..." : "Log in"}
          </Button>
          <Divider>OR</Divider>

          <Typography
            sx={{
              textDecoration: "none",
              color: (theme) => theme.palette.secondary.main,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
              "&:hover": {
                opacity: 0.8,
              },
            }}
            onClick={handleGoogleLogin}
          >
            <GoogleIcon />
            {loading ? "Logging in..." : "Login with Google"}
          </Typography>
        </Stack>

        <Typography
          sx={{
            border: "1px solid",
            borderColor: "divider",
            width: "100%",
            padding: "10px",
            textAlign: "center",
          }}
        >
          Don't have an account?{" "}
          <Typography
            component={Link}
            to="/signup"
            sx={{
              textDecoration: "none",
              color: (theme) => theme.palette.secondary.main,
            }}
          >
            Sign Up
          </Typography>
        </Typography>
      </Stack>
    </Box>
  );
};

export default LoginForm;
