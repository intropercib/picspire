import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../components/Firebase/firebase";
import useAuthStore from "../components/store/useAuthStore";

const useFetchAllUsers = () => {
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const authUser = useAuthStore((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!authUser) {
        setError("No authenticated user found.");
        setLoading(false);
        return;
      }

      try {
        const usersCollection = collection(firestore, "users");
        const usersSnapshot = await getDocs(usersCollection);
        const users = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsersList(users.filter((user) => user.id !== authUser.id));
      } catch (err) {
        setError("Failed to fetch users.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [authUser]); 

  return { usersList, loading, error };
};

export default useFetchAllUsers;