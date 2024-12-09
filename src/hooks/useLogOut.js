
import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '../components/Firebase/firebase';
import useAuthStore from '../components/store/authStore';
const useLogOut = () => {

    const [signOut, loading, error] = useSignOut(auth);
    const userLogOut= useAuthStore(state => state.logout)
    const handleLogOut = async () => {
        try {
            await signOut();
            userLogOut();
            console.log("User logged out successfully");
        } catch (e) {
            console.log(e);
        }
    }
    return { handleLogOut, loading, error }

}
export default useLogOut;