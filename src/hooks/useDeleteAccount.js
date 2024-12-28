import { useState } from "react";
import { collection, getDocs, query, where, doc, deleteDoc, writeBatch, arrayRemove } from "firebase/firestore";
import { deleteUser } from "firebase/auth";
import { firestore } from "../components/Firebase/firebase";

const useDeleteAccount = () => {
  const [deletingAccount, setDeletingAccount] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const deleteAccount = async (user, handleCloseDialog) => {
    if (!user) return;

    setDeletingAccount(true);
    try {
      const usersSnapshot = await getDocs(collection(firestore, "users"));
      const batch = writeBatch(firestore);
      usersSnapshot.forEach((userDoc) => {
        const userData = userDoc.data();
        if ((userData.followers || []).includes(user.uid)) {
          batch.update(userDoc.ref, {
            followers: arrayRemove(user.uid),
          });
        }
        if ((userData.following || []).includes(user.uid)) {
          batch.update(userDoc.ref, {
            following: arrayRemove(user.uid),
          });
        }
      });

      const allPostsSnap = await getDocs(collection(firestore, "posts"));
      allPostsSnap.forEach((postDoc) => {
        const postData = postDoc.data();

        if ((postData.likes || []).includes(user.uid)) {
          batch.update(postDoc.ref, {
            likes: arrayRemove(user.uid),
          });
        }

        if (postData.comments && postData.comments.length > 0) {
          const filteredComments = postData.comments.filter(
            (c) => c.userId !== user.uid
          );
          if (filteredComments.length !== postData.comments.length) {
            batch.update(postDoc.ref, { comments: filteredComments });
          }
        }
      });

      const postsQuery = query(
        collection(firestore, "posts"),
        where("authorId", "==", user.uid)
      );
      const postsSnapshot = await getDocs(postsQuery);
      postsSnapshot.forEach((postDoc) => {
        batch.delete(postDoc.ref);
      });

      await batch.commit();

      const userDocRef = doc(firestore, "users", user.uid);
      await deleteDoc(userDocRef);
      await deleteUser(user);

      setSnackbarMessage("Account and all associated data deleted successfully!");
    } catch (error) {
      console.error("Error deleting account and associated data:", error);
    } finally {
      setDeletingAccount(false);
      handleCloseDialog();
    }
  };

  return { deleteAccount, deletingAccount, snackbarMessage };
};

export default useDeleteAccount;