import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '../components/Firebase/firebase';
import useAuthStore from '../components/store/useAuthStore';

const useLogOut = () => {
    const [signOut, loading, error] = useSignOut(auth);
    const userLogOut = useAuthStore(state => state.logout);
    
    const handleLogOut = async () => {

        try {
            await signOut();
            userLogOut();
            console.log("User logged out successfully");
        } catch (error) {
            console.error("Logout error:", error.message || error);
        }
    };

    return { handleLogOut, loading, error };
};

export default useLogOut;
