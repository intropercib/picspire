import React, { useState } from "react";
import {
  Box,
  Stack,
  Button,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import useSignUpFormHandler from "../../hooks/useSignUpFormHandler";
import useSignUpWithEmailPassword from "../../hooks/useSignUpWithEmailPassword";
import FormSnackbar from "./FormSnackBar";
import { FormTextField } from "./FormTextField";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { inputs, handleInputChange, validate, errors, alertInfo, showAlert } =
    useSignUpFormHandler();
  const { signup, loading, validateUserNameAndEmail } =
    useSignUpWithEmailPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!validate()) return;

    try {
      // Check if username or email already exists
      const { isUsernameTaken, isEmailTaken } = await validateUserNameAndEmail(
        inputs.username,
        inputs.email
      );
      if (isUsernameTaken) {
        showAlert("Username already exists", "warning");
        return;
      }
      if (isEmailTaken) {
        showAlert("Email already exists", "warning");
        return;
      }

      // Proceed with sign-up
      const result = await signup(inputs);
      if (result === "success") {
        showAlert("User added successfully", "success");
      } else if (result === "emailExists") {
        showAlert("Email already exists", "error");
      } else {
        showAlert("An unexpected error occurred.", "error");
      }
    } catch (error) {
      console.error("Sign-up error:", error.message || error);
      showAlert("An unexpected error occurred. Please try again.", "error");
    }
  };

  // Reset the snackbar
  const handleSnackbarClose = () => showAlert("", "");

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        p: 2,
      }}
    >
      <FormSnackbar
        open={!!alertInfo.message}
        message={alertInfo.message}
        severity={alertInfo.severity}
        onClose={handleSnackbarClose}
      />
      <Box sx={{ width: { xs: "100%", sm: "400px" }, p: 3 }}>
        <Stack
          spacing={2}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            p: 3,
            borderRadius: 1,
          }}
        >
          <Typography variant="h6" align="center">
            Sign up to see photos and videos from your friends.
          </Typography>
          <Button
            startIcon={<FacebookRoundedIcon />}
            variant="contained"
            color="primary"
            size="small"
          >
            Login with Facebook
          </Button>
          <Divider>OR</Divider>
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
            label="Full Name"
            name="fullName"
            value={inputs.fullName}
            onChange={handleInputChange}
            error={!!errors.fullName}
            helperText={errors.fullName}
            autoComplete="off"
          />
          <FormTextField
            label="Username"
            name="username"
            value={inputs.username}
            onChange={handleInputChange}
            error={!!errors.username}
            helperText={errors.username}
            autoComplete="off"
          />
          <FormTextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={inputs.password}
            onChange={handleInputChange}
            error={!!errors.password}
            helperText={errors.password}
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
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            fullWidth
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
        </Stack>
        <Box sx={{ border: "1px solid", borderColor: "divider", mt: 2, p: 2 }}>
          <Typography variant="body2" align="center">
            Have an account?{" "}
            <Typography component={Link} to="/login" sx={{
              textDecoration: "none",
              color: (theme) => theme.palette.secondary.main,
            }}>
              Login
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUpForm;
