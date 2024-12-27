import { collection, getDocs, query, where } from "firebase/firestore";
import { useState, useEffect, useRef } from "react";
import { firestore } from "../components/Firebase/firebase";
import useAuthStore from "../components/store/useAuthStore";

const useSearchUsers = (searchQuery) => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef(null);
  const authUser = useAuthStore((state) => state.user);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        return;
      }

      setLoading(true);
      try {
        const q = query(
          collection(firestore, "users"),
          where("username", ">=", searchQuery.toLowerCase()),
          where("username", "<=", searchQuery.toLowerCase() + "\uf8ff")
        );

        const querySnapshot = await getDocs(q);
        const users = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        if (authUser) {
          setSearchResults(users.filter((user) => user.id !== authUser.userId));
        }
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timerRef.current);
  }, [searchQuery]);

  return { searchResults, loading };
};

export default useSearchUsers;
