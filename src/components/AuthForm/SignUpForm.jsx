import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import useLoginFormHandler from "../../hooks/useLoginFormHandler";
import useSignUpWithEmailPassword from "../../hooks/useSignUpWithEmailPassword";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { inputs, handleInputChange, validate, errors, alertInfo, showAlert } =
    useLoginFormHandler();
  const { signup, loading } = useSignUpWithEmailPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const result = await signup(inputs);
      if (result === "success") {
        e.target.reset();
        showAlert("User added successfully", "success");
      } else if (result === "userExists") {
        showAlert("User already exists", "warning");
      } else if (result === "error") {
        showAlert("Error on creating account.", "warning");
      }
    } catch (err) {
      console.log("FROM SIGNUPFORM:: ", err);
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {alertInfo.message && (
        <Alert
          severity={alertInfo.severity}
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            margin: "10px",
            width: "40%",
          }}
        >
          {alertInfo.message}
        </Alert>
      )}

      <Box
        sx={{
          width: { xs: "100%", sm: "100%", md: "40%", lg: "40%" },
        }}
      >
        <Stack
          direction="column"
          spacing={1.2}
          sx={{
            border: "1px solid #B3B3B3",
            padding: "40px 30px 10px 30px",
            alignItems: "center",
          }}
        >
          <img src="src/assets/logo.png" alt="logo" width="200px" />
          <Stack sx={{ width: "100%", gap: "10px" }}>
            <Typography align="center" variant="body2">
              Sign up to see photos and videos from your friends.
            </Typography>
            <Button
              startIcon={<FacebookRoundedIcon />}
              variant="contained"
              size="small"
              sx={{
                color: (theme) => theme.palette.text.primary,
              }}
            >
              Login with Facebook
            </Button>
            <Divider>OR</Divider>
            {["email", "fullName", "username"].map((field) => (
              <TextField
                key={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                name={field}
                value={inputs[field]}
                onChange={handleInputChange}
                error={!!errors[field]}
                helperText={errors[field]}
                size="small"
                sx={{
                  "& .MuiFormHelperText-root": {
                    fontSize: "0.6rem",
                    margin: "0px",
                  },
                }}
              />
            ))}
            <TextField
              label="Password"
              name="password"
              size="small"
              type={showPassword ? "text" : "password"}
              value={inputs.password}
              onChange={handleInputChange}
              error={!!errors.password}
              helperText={errors.password}
              sx={{
                "& .MuiFormHelperText-root": {
                  fontSize: "0.6rem",
                  margin: "0px",
                },
              }}
              slotProps={{
                input: {
                  endAdornment: (
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOff
                          sx={{
                            color: (theme) => theme.palette.text.primary,
                            fontSize: "18px",
                          }}
                        />
                      ) : (
                        <Visibility
                          sx={{
                            color: (theme) => theme.palette.text.primary,
                            fontSize: "18px",
                          }}
                        />
                      )}
                    </IconButton>
                  ),
                },
              }}
            />
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
              sx={{
                color: (theme) => theme.palette.text.primary,
              }}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>
          </Stack>
        </Stack>
        <Box
          sx={{
            border: "1px solid #B3B3B3",
            padding: "15px",
            marginTop: "15px",
          }}
        >
          <Typography variant="h3" align="center">
            Have an account?{" "}
            <Link to="/login" style={{ color: "#0095f6" }}>
              Login
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUpForm;
