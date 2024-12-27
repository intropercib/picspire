import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../components/Firebase/firebase';
import useAuthStore from '../components/store/useAuthStore';
import { doc, getDoc } from 'firebase/firestore';

const useLogin = () => {
  const [signInWithEmailAndPassword, loading, error] = useSignInWithEmailAndPassword(auth);
  const loginUser = useAuthStore((state) => state.login);

  const login = async (inputs) => {
    try {
      const userCredential = await signInWithEmailAndPassword(inputs.email, inputs.password);
      if (userCredential) {
        const docRef = doc(firestore, 'users', userCredential.user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          loginUser(userData);
          return true;
        } else {
          throw new Error("User document not found.");
        }
      }
    } catch (error) {
      console.error("Login error:", error.message || error);
      return false
    }
  };

  return { login, loading, error };
};

export default useLogin;