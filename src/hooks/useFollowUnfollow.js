import { useEffect, useState } from "react";
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore";
import { firestore } from "../components/Firebase/firebase";
import useAuthStore from "../components/store/useAuthStore";

const useFollowUnfollow = (targetUserId) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const updateFollowState = useAuthStore((state) => state.updateFollowState);

  const handleFollowUnfollow = async () => {
    if (!authUser?.id || !targetUserId) {
      console.error("Missing user ID or target ID");
      return;
    }

    setIsUpdating(true);

    try {
      const authUserRef = doc(firestore, "users", authUser.id);
      const targetUserRef = doc(firestore, "users", targetUserId);

      const [authUserDoc, targetUserDoc] = await Promise.all([
        getDoc(authUserRef),
        getDoc(targetUserRef)
      ]);

      if (!authUserDoc.exists() || !targetUserDoc.exists()) {
        throw new Error("One or both users not found");
      }

      const authUserData = authUserDoc.data();
      const currentlyFollowing = authUserData.following?.includes(targetUserId);

      const newFollowState = !currentlyFollowing;

      const authUserUpdate = {
        following: newFollowState
          ? arrayUnion(targetUserId)
          : arrayRemove(targetUserId)
      };

      const targetUserUpdate = {
        followers: newFollowState
          ? arrayUnion(authUser.id)
          : arrayRemove(authUser.id)
      };

      await Promise.all([
        updateDoc(authUserRef, authUserUpdate),
        updateDoc(targetUserRef, targetUserUpdate)
      ]);

      const [updatedAuthUserDoc, updatedTargetUserDoc] = await Promise.all([
        getDoc(authUserRef),
        getDoc(targetUserRef)
      ]);

      updateFollowState(targetUserId, newFollowState);

      setIsFollowing(newFollowState);

    } catch (error) {
      console.error("Follow/Unfollow error:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    if (authUser?.following && targetUserId) {
      const followingStatus = authUser.following.includes(targetUserId);
      setIsFollowing(followingStatus);
    }
  }, [authUser, targetUserId]);

  return {
    isUpdating,
    isFollowing,
    handleFollowUnfollow
  };
};

export default useFollowUnfollow;