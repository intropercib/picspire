import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });
  const handleAuth = (e) => {
    e.preventDefault();
    let hasError = false;
    const newErrors = { email: false, password: false };

    if (!input.email.trim()) {
      newErrors.email = true;
      hasError = true;
    }

    if (!input.password.trim()) {
      newErrors.password = true;
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      navigate("/");
    }
  };
  return (
    <>
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
              label="Phone no, usename, email"
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
              onChange={(e) => {
                setInput({ ...input, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: false });
              }}
              helperText={errors.email && "Email is required"}
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
              onChange={(e) => {
                setInput({ ...input, password: e.target.value });
                if (errors.password) setErrors({ ...errors, password: false });
              }}
              helperText={errors.password && "Password is required"}
            />
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={(e) => handleAuth(e)}
              type="submit"
            >
              Login
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
