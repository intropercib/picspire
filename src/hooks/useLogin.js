import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../components/Firebase/firebase';
import useAuthStore from '../components/store/authStore';
import { doc, getDoc } from 'firebase/firestore';

const useLogin = () => {

    const [signInWithEmailAndPassword, loading, error] = useSignInWithEmailAndPassword(auth);
    const loginUser = useAuthStore(state => state.login);
    
    // Login function
    const login = async (inputs) => {
        try {
            const userCredential = await signInWithEmailAndPassword(inputs.email, inputs.password);
            if (userCredential) {
                console.log('User logged in successfully');
                const docRef = doc(firestore, 'users', userCredential.user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    localStorage.setItem('userInfo', JSON.stringify(userData));
                    loginUser(userData);
                    return true;
                } else {
                    throw new Error("User document not found.");
                }
            }
        } catch (error) {
            console.error("Login error:", error.message || error);
            throw error;
        }
    };

    return { login, loading, error };
};

export default useLogin;
