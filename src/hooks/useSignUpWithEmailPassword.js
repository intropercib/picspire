import { auth, firestore } from "../components/Firebase/firebase";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { setDoc, doc, where, getDocs, query, collection } from "firebase/firestore";
import useAuthStore from "../components/store/authStore";

const useSignUpWithEmailPassword = () => {
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
  const loginUser = useAuthStore((state) => state.login);

  // Validate if username and email are already taken
  const validateUserNameAndEmail = async (username, email) => {
    const usernameQuery = query(collection(firestore, "users"), where("username", "==", username));
    const emailQuery = query(collection(firestore, "users"), where("email", "==", email));

    const [usernameSnapshot, emailSnapshot] = await Promise.all([getDocs(usernameQuery), getDocs(emailQuery)]);

    return {
      isUsernameTaken: !usernameSnapshot.empty,
      isEmailTaken: !emailSnapshot.empty,
    };
  };

  // Sign up function
  const signup = async (inputs) => {
    try {
      const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
      if (!newUser) throw new Error("Signup failed");

      const userDoc = {
        userId: newUser.user.uid,
        email: newUser.user.email,
        fullName: inputs.fullName,
        username: inputs.username,
        bio: "",
        phoneNumber: "",
        profilePicURL: "",
        following: [],
        followers: [],
        posts: [],
        createdAt: Date.now(),
      };

      await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
      loginUser(userDoc);

      return "success";
    } catch (err) {
      console.error("Signup error:", err.message || err);
      if (err.code === "auth/email-already-in-use") {
        return "emailExists";
      }
      return "error";
    }
  };

  return { user, loading, error, signup, validateUserNameAndEmail };
};

export default useSignUpWithEmailPassword;
