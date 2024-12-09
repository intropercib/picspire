import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../components/Firebase/firebase';
import useAuthStore from '../components/store/authStore';
import { doc, getDoc } from 'firebase/firestore';

const useLogin = () => {
    const [signInWithEmailAndPassword, loading, error] = useSignInWithEmailAndPassword(auth);
    const loginUser = useAuthStore(state => state.login);
    const login = async (inputs) => {
        try {
            const userCredential = await signInWithEmailAndPassword(inputs.email, inputs.password);
            if (userCredential) {
                console.log('User logged in successfully');
                const docRef = doc(firestore, 'users', userCredential.user.uid);
                const docSnap = await getDoc(docRef);
                localStorage.setItem('userInfo', JSON.stringify(docSnap.data()));
                return true;
            }
        } catch (error) {
            console.log(error);
            throw error;

        }
    }
    return { login, loading, error };

}

export default useLogin;