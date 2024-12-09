import {
  Alert,
  Box,
  Button,
  Collapse,
  Container,
  Divider,
  Grow,
  Slide,
  Snackbar,
  SnackbarContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import { Link, useNavigate } from "react-router-dom";
import useLoginFormHandler from "../../hooks/useLoginFormHandler";
import useLogin from "../../hooks/useLogin";

const LoginForm = () => {
  const { inputs, errors, validate, handleInputChange } = useLoginFormHandler();
  const { login, loading, error } = useLogin();
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const result = await login(inputs);
      if (result) {
        setShowAlert(true);
      }else{
        navigate("/");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleClose = () => {
    setShowAlert(false);
  };

  const TransitionUp = (props) => {
    return <Slide {...props} direction="up" />;
  };

  return (
    <>
      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        TransitionComponent={TransitionUp}
        message="Invalid email or password"
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Invalid email or password
        </Alert>
      </Snackbar>
      <Box
        sx={{
          width: {
            xs: "100%",
            sm: "400px",
            md: "350px",
            lg: "350px",
          },
        }}
      >
        <Stack
          direction={"column"}
          spacing={1.2}
          sx={{
            border: "1px solid #B3B3B3",
            padding: "40px 30px 10px 30px",
            width: "100%",
            alignItems: "center",
          }}
        >
          <img src="src/assets/logo.png" alt="logo" width="200px" />
          <Stack
            sx={{
              width: "100%",
              gap: "10px",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Phone no, username, email"
              variant="outlined"
              size="small"
              slotProps={{
                inputLabel: {
                  style: {
                    fontSize: "0.7rem",
                  },
                },
              }}
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: "0.9rem",
                },
                "& .MuiFormHelperText-root": {
                  fontSize: "0.6rem",
                  color: (theme) => theme.palette.warning.main,
                },
              }}
              onChange={handleInputChange}
              helperText={errors.email}
              error={!!errors.email}
              value={inputs.email}
              name="email"
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              size="small"
              slotProps={{
                inputLabel: {
                  style: {
                    fontSize: "0.7rem",
                  },
                },
              }}
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: "0.9rem",
                },
                "& .MuiFormHelperText-root": {
                  fontSize: "0.6rem",
                  color: (theme) => theme.palette.warning.main,
                },
              }}
              onChange={handleInputChange}
              helperText={errors.password}
              error={!!errors.password}
              value={inputs.password}
              name="password"
            />
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={handleAuth}
              type="submit"
              disabled={Boolean(loading)}
            >
              {loading ? "logging in..." : "Log in"}
            </Button>
          </Stack>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingBlock: "10px 20px",
              width: "100%",
            }}
          >
            <Divider
              sx={{
                flex: 1,
                backgroundColor: (theme) => theme.palette.primary.main,
                height: "1px",
              }}
            />
            <Typography
              variant="h6"
              sx={{
                padding: "0 10px",
              }}
            >
              OR
            </Typography>
            <Divider
              sx={{
                flex: 1,
                backgroundColor: (theme) => theme.palette.primary.main,
                height: "1px",
              }}
            />
          </Box>
          <Stack spacing={2}>
            <Stack
              direction={"row"}
              alignItems="center"
              justifyContent="center"
              spacing={1}
            >
              <FacebookRoundedIcon
                sx={{
                  color: (theme) => theme.palette.secondary.main,
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: (theme) => theme.palette.secondary.main,
                  ":hover": {
                    color: (theme) => theme.palette.text.primary,
                    cursor: "pointer",
                  },
                }}
              >
                Continue with Facebook
              </Typography>
            </Stack>
            <Typography variant="body2" align="center">
              Forgot Password?
            </Typography>
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
            Don't have an account?
            <Link
              style={{
                color: "#0095f6",
                cursor: "pointer",
              }}
              to="/signup"
            >
              {" "}
              Sign up
            </Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default LoginForm;
