import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Stack,
  Divider,
  Snackbar,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import useDeleteAccount from "../../hooks/useDeleteAccount";
import useAuthStore from "../../components/store/useAuthStore";

const Settings = () => {
  const user = useAuthStore((state) => state.user);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { deleteAccount, deletingAccount, snackbarMessage } =
    useDeleteAccount();

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    if (snackbarMessage) {
      setOpenSnackbar(true);
    }
  }, [snackbarMessage]);

  return (
    <>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Stack spacing={4}>
          <Typography variant="h6">Account Settings</Typography>

          <Divider
            sx={{
              margin: "40px 0px 20px 0px",
            }}
          />
          <Stack>
            <Typography variant="h6">Delete Account</Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              alignItems={{ xs: "center", sm: "flex-start" }}
            >
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{
                  paddingBlock: "10px",
                }}
              >
                Deleting your account will remove all your data permanently.
                This action cannot be undone.
              </Typography>
              <Button
                variant="contained"
                onClick={handleOpenDialog}
                disabled={deletingAccount}
                sx={{
                  backgroundColor: "red",
                  color: (theme) => theme.palette.text.primary,
                }}
              >
                Delete Account
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Container>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="delete-account-dialog"
        sx={{
          backgroundColor: "rgba(0,0,0,0.5)",
          "& .MuiPaper-root": {
            boxShadow: "0px 0px 8px 0px rgba(255,255,255,0.1)",
          },
        }}
      >
        <DialogContent
          sx={{
            backgroundColor: (theme) => theme.palette.background.default,
          }}
        >
          <DialogContentText>
            Are you sure you want to delete your account?
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            backgroundColor: (theme) => theme.palette.background.default,
          }}
        >
          <Button
            onClick={handleCloseDialog}
            sx={{
              backgroundColor: (theme) => theme.palette.background.primary,
              "&:hover": {
                backgroundColor: (theme) => theme.palette.primary.main,
                color: (theme) => theme.palette.primary.contrastText,
              },
            }}
            size="small"
          >
            Cancel
          </Button>
          <Button
            onClick={() => deleteAccount(user, handleCloseDialog)}
            variant="contained"
            disabled={deletingAccount}
            size="small"
            sx={{
              color: (theme) => theme.palette.text.primary,
              backgroundColor: "red",
            }}
          >
            {deletingAccount ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Delete"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </>
  );
};

export default Settings;
