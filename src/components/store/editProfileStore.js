import { create } from "zustand";

const editProfileStore = create((set) => ({
  profileData: {
    fullName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    bio: "",
    city: "",
    work: "",
  },
  passwordData: {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  },
  setProfileData: (newData) =>
    set((state) => ({ profileData: { ...state.profileData, ...newData } })),
  setPasswordData: (newData) =>
    set((state) => ({ passwordData: { ...state.passwordData, ...newData } })),
  resetProfileData: () =>
    set({
      profileData: {
        fullName: "",
        email: "",
        phoneNumber: "",
        gender: "",
        bio: "",
        city: "",
        work: "",
      },
    }),
  resetPasswordData: () =>
    set({
      passwordData: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
    }),
}));

export default editProfileStore;