import React from "react";
import { TextField } from "@mui/material";

export const FormTextField = ({
  label,
  name,
  value,
  onChange,
  error,
  helperText,
  ...props
}) => (
  <TextField
    label={label}
    name={name}
    value={value}
    onChange={onChange}
    error={error}
    helperText={helperText}
    size="small"
    fullWidth
    sx={{
      "& .MuiFormHelperText-root": {
        fontSize: "0.7rem",
      },
    }}
    {...props}
  />
);
