const validateEditInfo = (data, isPassword = false) => {
  if (isPassword) {
    const { currentPassword, newPassword, confirmPassword } = data;
    if (!currentPassword || !newPassword || !confirmPassword) {
      return { isValid: false, message: "All password fields must be filled." };
    }
    if (newPassword !== confirmPassword) {
      return { isValid: false, message: "New password and confirmation do not match." };
    }
    if (newPassword.length < 6) {
      return { isValid: false, message: "Password must be at least 6 characters long." };
    }
    return { isValid: true, message: "" };
  }

  // Validate general profile fields
  const { fullName, email, phoneNumber } = data;
  if (fullName && fullName.length < 3) {
    return { isValid: false, message: "Full name must be at least 3 characters long." };
  }
  if (email && !/\S+@\S+\.\S+/.test(email)) {
    return { isValid: false, message: "Invalid email format." };
  }
  if (phoneNumber && !/^\d{10}$/.test(phoneNumber)) {
    return { isValid: false, message: "Invalid phone number." };
  }

  return { isValid: true, message: "" };
};

export default validateEditInfo;