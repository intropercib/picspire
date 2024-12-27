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

      // Fetch current documents to check existing state
      const [authUserDoc, targetUserDoc] = await Promise.all([
        getDoc(authUserRef),
        getDoc(targetUserRef)
      ]);

      if (!authUserDoc.exists() || !targetUserDoc.exists()) {
        throw new Error("One or both users not found");
      }

      const authUserData = authUserDoc.data();
      const currentlyFollowing = authUserData.following?.includes(targetUserId);

      // Determine the new follow state
      const newFollowState = !currentlyFollowing;

      // Prepare update operations
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

      // Update Firestore documents
      await Promise.all([
        updateDoc(authUserRef, authUserUpdate),
        updateDoc(targetUserRef, targetUserUpdate)
      ]);

      // Fetch updated documents to confirm
      const [updatedAuthUserDoc, updatedTargetUserDoc] = await Promise.all([
        getDoc(authUserRef),
        getDoc(targetUserRef)
      ]);

      // Update local state
      updateFollowState(targetUserId, newFollowState);

      // Ensure local following state is updated
      setIsFollowing(newFollowState);

    } catch (error) {
      console.error("Follow/Unfollow error:", error);
      // Optionally, handle error state or show user feedback
    } finally {
      setIsUpdating(false);
    }
  };

  // Check and sync initial follow status
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