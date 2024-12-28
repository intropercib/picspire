import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  Avatar,
  Stack,
  Divider,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import editProfileStore from "../../components/store/editProfileStore";
import useUpdateProfile from "../../hooks/useUpdateProfile";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore, storage } from "../../components/Firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import useAuthStore from "../../components/store/useAuthStore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { PhotoCamera } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";

import {
  collection,
  query,
  where,
  getDocs,
  writeBatch,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [user] = useAuthState(auth);
  const { profileData, setProfileData, passwordData, setPasswordData } =
    editProfileStore();
  const {
    handleProfileUpdate,
    handlePasswordChange,
    loadingUpdate,
    passwordError,
    setPasswordError,
    snackbarMessage,
    setSnackbarMessage,
  } = useUpdateProfile();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [uploadingPic, setUploadingPic] = useState(false);
  const [picError, setPicError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userDocRef = doc(firestore, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        const userData = userDoc.exists() ? userDoc.data() : {};

        setProfileData({
          fullName: userData.fullName || user.displayName || "",
          email: userData.email || user.email || "",
          phoneNumber: userData.phoneNumber || "",
          gender: userData.gender || "",
          bio: userData.bio || "",
          city: userData.city || "",
          work: userData.work || "",
        });
      }
    };

    fetchUserData();
  }, [user, setProfileData]);

  useEffect(() => {
    if (snackbarMessage) {
      setOpenSnackbar(true);
    }
  }, [snackbarMessage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ [name]: value });
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ [name]: value });
    if (passwordError) {
      setPasswordError("");
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setSnackbarMessage("");
    setPasswordError("");
  };

  const authUser = useAuthStore((state) => state.user);

  const updateAllUserPosts = async (userId, newPicURL) => {
    const q = query(
      collection(firestore, "posts"),
      where("authorId", "==", userId)
    );
    const snapshot = await getDocs(q);
    const batch = writeBatch(firestore);
    snapshot.forEach((postDoc) => {
      batch.update(postDoc.ref, { authorProfilePicURL: newPicURL });
    });
    await batch.commit();
  };

  const handleChangeProfilePic = async () => {
    try {
      setPicError("");
      setUploadingPic(true);

      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "image/*";
      fileInput.onchange = async (e) => {
        const file = e.target.files[0];
        if (!file) {
          setUploadingPic(false);
          return;
        }
        const storageRef = ref(
          storage,
          `users/${user.uid}/profilePic_${Date.now()}`
        );
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);

        const userDocRef = doc(firestore, "users", user.uid);

        await updateDoc(userDocRef, { profilePicURL: downloadURL });
        await updateAllUserPosts(user.uid, downloadURL);
        useAuthStore
          .getState()
          .setUserProfile({ ...authUser, profilePicURL: downloadURL });

        setUploadingPic(false);
      };
      fileInput.click();
    } catch (error) {
      setUploadingPic(false);
      setPicError(error.message || "Error updating profile picture.");
    }
  };
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
      <Container
        maxWidth="md"
        sx={{ bgcolor: "divider", p: 2, borderRadius: 2 }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          spacing={3}
          sx={{
            width: "100%",
            borderBottom: 1,
            borderColor: "text.disabled",
            pb: 2,
            position: "relative",
          }}
        >
          <Avatar
            src={
              authUser.profilePicURL ||
              "../../assets/defaultAvatar.jpg"
            }
            alt={`${authUser.username}'s profile`}
            sx={{
              height: { xs: 100, sm: 160 },
              width: { xs: 100, sm: 160 },
              border: "2px solid",
            }}
          />

          <Box
            textAlign={{ xs: "center", sm: "left" }}
            sx={{
              userSelect: "none",
            }}
          >
            <Typography variant="body1">{authUser.fullName}</Typography>
            <Typography variant="body2">{authUser.username}</Typography>
            <Button
              size="small"
              sx={{
                mt: 1,
                fontSize: "small",
                px: 2,
                backgroundColor: (theme) => theme.palette.primary.main,
                color: (theme) => theme.palette.primary.contrastText,
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.background.primary,
                  color: (theme) => theme.palette.text.primary,
                },
              }}
              onClick={handleChangeProfilePic}
              startIcon={<PhotoCamera />}
            >
              {uploadingPic ? <CircularProgress size="14px" /> : "Change Photo"}
            </Button>
          </Box>
          <Stack
            sx={{
              position: "absolute",
              right: "10px",
              top: "10px",
              cursor: "pointer",
              padding: 1,
              borderRadius: "50%",
              backgroundColor: "rgba(0,0,0,0.3)",
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.9)",
              },
            }}
          >
            <CloseIcon onClick={() => navigate(`/${authUser.username}`)} />
          </Stack>
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ width: "100%", mt: 2 }}
        >
          <Stack
            spacing={2}
            sx={{
              p: 2,
              width: { xs: "100%", sm: "50%" },
              borderRight: { sm: 1 },
              borderColor: "divider",
            }}
          >
            <Stack direction="row" alignItems="center" mb={2}>
              <Typography variant="body2">Profile Settings</Typography>
              <Divider sx={{ flexGrow: 1, ml: 1 }} />
            </Stack>
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              variant="outlined"
              autoComplete="off"
              value={profileData.fullName}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              variant="outlined"
              autoComplete="off"
              value={profileData.email}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              variant="outlined"
              autoComplete="off"
              value={profileData.phoneNumber}
              onChange={handleInputChange}
            />
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                  label="Gender"
                  name="gender"
                  value={profileData.gender}
                  onChange={handleInputChange}
                >
                  <MenuItem value="">Select Gender</MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            <TextField
              fullWidth
              multiline
              rows={2}
              label="Bio"
              name="bio"
              variant="outlined"
              autoComplete="off"
              value={profileData.bio}
              onChange={handleInputChange}
            />
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                fullWidth
                label="City"
                name="city"
                variant="outlined"
                autoComplete="off"
                value={profileData.city}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                label="Work"
                name="work"
                variant="outlined"
                autoComplete="off"
                value={profileData.work}
                onChange={handleInputChange}
              />
            </Stack>
            <Button
              variant="contained"
              color="primary"
              onClick={handleProfileUpdate}
              disabled={loadingUpdate}
              sx={{
                backgroundColor: (theme) => theme.palette.primary.main,
                color: (theme) => theme.palette.primary.contrastText,
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.background.primary,
                  color: (theme) => theme.palette.text.primary,
                },
              }}
            >
              {loadingUpdate ? "Saving..." : "Save Profile"}
            </Button>
          </Stack>

          <Stack spacing={2} sx={{ p: 2, width: { xs: "100%", sm: "50%" } }}>
            <Stack direction="row" alignItems="center" mb={2}>
              <Typography variant="body2">Password Settings</Typography>
              <Divider sx={{ flexGrow: 1, ml: 1 }} />
            </Stack>
            <TextField
              fullWidth
              label="Current Password"
              name="currentPassword"
              type="password"
              variant="outlined"
              autoComplete="off"
              value={passwordData.currentPassword}
              onChange={handlePasswordInputChange}
              error={!!passwordError}
              helperText={passwordError || ""}
            />
            <TextField
              fullWidth
              label="New Password"
              name="newPassword"
              type="password"
              variant="outlined"
              autoComplete="off"
              value={passwordData.newPassword}
              onChange={handlePasswordInputChange}
              error={!!passwordError}
            />
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              variant="outlined"
              autoComplete="off"
              value={passwordData.confirmPassword}
              onChange={handlePasswordInputChange}
              error={!!passwordError}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handlePasswordChange}
              disabled={loadingUpdate}
              sx={{
                backgroundColor: (theme) => theme.palette.primary.main,
                color: (theme) => theme.palette.primary.contrastText,
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.background.primary,
                  color: (theme) => theme.palette.text.primary,
                },
              }}
              
            >
              {loadingUpdate ? "Saving..." : "Change Password"}
            </Button>
          </Stack>
        </Stack>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={snackbarMessage || passwordError}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </Container>
    </Box>
  );
};

export default EditProfile;
