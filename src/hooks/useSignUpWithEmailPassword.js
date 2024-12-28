import { collection, getDocs, query, where, setDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { firestore, auth } from "../components/Firebase/firebase";
import useAuthStore from "../components/store/useAuthStore";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

const useSignUpWithEmailPassword = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    fullName: "",
    username: "",
  });

  const [errors, setErrors] = useState({});
  const [alertInfo, setAlertInfo] = useState({ message: "", severity: "" });
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
  const loginUser = useAuthStore((state) => state.login);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    let hasError = false;

    if (!inputs.email.trim()) {
      newErrors.email = "Email is required";
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
      newErrors.email = "Invalid email format";
      hasError = true;
    }

    if (!inputs.password.trim()) {
      newErrors.password = "Password is required";
      hasError = true;
    } else if (inputs.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      hasError = true;
    }

    if (!inputs.fullName.trim()) {
      newErrors.fullName = "Full name is required";
      hasError = true;
    }

    if (!inputs.username.trim()) {
      newErrors.username = "Username is required";
      hasError = true;
    }

    setErrors(newErrors);
    return !hasError;
  };

  const validateUserNameAndEmail = async (username, email) => {
    const usernameQuery = query(collection(firestore, "users"), where("username", "==", username));
    const emailQuery = query(collection(firestore, "users"), where("email", "==", email));

    const [usernameSnapshot, emailSnapshot] = await Promise.all([getDocs(usernameQuery), getDocs(emailQuery)]);

    return {
      isUsernameTaken: !usernameSnapshot.empty,
      isEmailTaken: !emailSnapshot.empty,
    };
  };

  const signup = async (inputs) => {
    try {
      const { isUsernameTaken, isEmailTaken } = await validateUserNameAndEmail(inputs.username, inputs.email);
      if (isUsernameTaken) {
        setAlertInfo({ message: "Username already exists", severity: "warning" });
        return "usernameExists";
      }
      if (isEmailTaken) {
        setAlertInfo({ message: "Email already exists", severity: "warning" });
        return "emailExists";
      }

      const userCredential = await createUserWithEmailAndPassword(inputs.email, inputs.password);
      if (!userCredential) throw new Error("Signup failed");

      const userDoc = {
        userId: userCredential.user.uid,
        email: userCredential.user.email,
        fullName: inputs.fullName,
        username: inputs.username,
        bio: "",
        phoneNumber: "",
        profilePicURL: "",
        following: [],
        followers: [],
        posts: [],
        chat:[],
        createdAt: Date.now(),
      };

      await setDoc(doc(firestore, "users", userCredential.user.uid), userDoc);
      loginUser(userDoc);

      return "success";
    } catch (err) {
      console.error("Signup error:", err.message || err);
      return "error";
    }
  };

  return {
    user,
    loading,
    error,
    signup,
    validateUserNameAndEmail,
    handleInputChange,
    inputs,
    errors,
    alertInfo,
    setAlertInfo,
    validate,
  };
};

export default useSignUpWithEmailPassword;