import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../components/Firebase/firebase";

const useGetUserProfile = (username) => {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const getUserProfile = async () => {
      try {
        setIsLoading(true);
        const q = query(
          collection(firestore, "users"),
          where("username", "==", username)
        );

        const querySnapshot = await getDocs(q);

        if (isMounted) {
          if (querySnapshot.empty) {
            setUserProfile(null);
          } else {
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();
            setUserProfile({ id: userDoc.id, ...userData }); 
          }
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to fetch user profile");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    getUserProfile();

    return () => {
      isMounted = false;
    };
  }, [username]); 

  return { isLoading, error, userProfile }; 
};

export default useGetUserProfile;