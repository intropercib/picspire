import { useState } from "react";
import { auth, firestore } from "../components/Firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import validateEditInfo from "../utils/validateEditInfo";
import editProfileStore from "../components/store/editProfileStore";
import {
  useAuthState,
  useUpdateProfile as useFirebaseUpdateProfile,
  useUpdateEmail,
  useUpdatePassword,
} from "react-firebase-hooks/auth";
import useAuthStore from "../components/store/useAuthStore";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";

const useUpdateProfile = () => {
  const {
    profileData,
    passwordData,
    resetProfileData,
    resetPasswordData,
  } = editProfileStore();
  const [user] = useAuthState(auth);
  const setAuthUser = useAuthStore(state => state.setUser);
  const [updateProfile, updatingProfile, updateProfileError] = useFirebaseUpdateProfile(auth);
  const [updateEmail, updatingEmail, updateEmailError] = useUpdateEmail(auth);
  const [updatePassword, updatingPassword, updatePasswordError] = useUpdatePassword(auth);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleProfileUpdate = async () => {
    if (!user) return;

    try {
      const valid = validateEditInfo(profileData);
      if (!valid.isValid) {
        setSnackbarMessage(valid.message);
        return;
      }

      // Update Firebase Authentication profile
      if (profileData.fullName && profileData.fullName !== user.displayName) {
        await updateProfile({ displayName: profileData.fullName });
      }

      if (profileData.email && profileData.email !== user.email) {
        await updateEmail(profileData.email);
      }

      // Update Firestore user document
      const userDocRef = doc(firestore, "users", user.uid);
      await updateDoc(userDocRef, {
        fullName: profileData.fullName,
        email: profileData.email,
        phoneNumber: profileData.phoneNumber,
        bio: profileData.bio,
        gender: profileData.gender,
        city: profileData.city,
        work: profileData.work,
      });


      useAuthStore.getState().setUserProfile({
        fullName: profileData.fullName,
        email: profileData.email,
        phoneNumber: profileData.phoneNumber,
        bio: profileData.bio,
        gender: profileData.gender,
        city: profileData.city,
        work: profileData.work,
      });

      resetProfileData();
      setSnackbarMessage("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      setSnackbarMessage("Error updating profile.");
    }
  };

  const handlePasswordChange = async () => {
    if (!user) return;

    const validPassword = validateEditInfo(passwordData, true);
    if (!validPassword.isValid) {
      setPasswordError(validPassword.message);
      return;
    }

    try {
      // Re-authenticate the user before updating password
      const credential = EmailAuthProvider.credential(user.email, passwordData.currentPassword);
      await reauthenticateWithCredential(user, credential);

      await updatePassword(passwordData.newPassword);
      resetPasswordData();
      setSnackbarMessage("Password updated successfully!");
    } catch (err) {
      console.error("Error updating password:", err);
      setPasswordError("Incorrect current password.");
    }
  };

  const loadingUpdate = updatingProfile || updatingEmail || updatingPassword;

  return {
    handleProfileUpdate,
    handlePasswordChange,
    loadingUpdate,
    passwordError,
    setPasswordError,
    snackbarMessage,
    setSnackbarMessage,
  };
};

export default useUpdateProfile;