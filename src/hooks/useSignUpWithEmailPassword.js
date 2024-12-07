import { auth, firestore } from "../components/Firebase/firebase";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { setDoc, doc } from "firebase/firestore";

const useSignUpWithEmailPassword = () => {
    const [createUserWithEmailAndPassword, user, loading, error] =
        useCreateUserWithEmailAndPassword(auth);
    const signup = async (inputs) => {
        try {
            const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
            if (!newUser) {
                if (error.code === "auth/email-already-in-use") {
                    throw "userExists";
                }
                else {
                    throw "error";
                }
            }
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
            console.log("User added successfully");
            localStorage.setItem("userInfo", JSON.stringify(userDoc));
            return "success";
        } catch (err) {
            return err
        }
    };

    return { user, loading, error, signup };
};

export default useSignUpWithEmailPassword;
