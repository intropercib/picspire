import { create } from "zustand";
import { auth, firestore } from "../../components/Firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, arrayUnion, arrayRemove, updateDoc} from "firebase/firestore";

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("authState");
    if (serializedState === null) {
      return { user: null, userProfile: null };
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn("Failed to load state from localStorage:", e);
    return { user: null, userProfile: null };
  }
};

const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("authState", serializedState);
  } catch (e) {
    console.warn("Failed to save state to localStorage:", e);
  }
};

const useAuthStore = create((set, get) => ({
  ...loadFromLocalStorage(),

  setUserProfile: (profile) => {
    set(state => {
      const newState = { ...state, userProfile: profile };
      saveToLocalStorage(newState);
      return newState;
    });
  },
  savedPosts: loadFromLocalStorage().savedPosts || [],

  savePost: async (postId) => {
    if (!get().user) return;
    const userRef = doc(firestore, "users", get().user.id);
    await updateDoc(userRef, {
      savedPosts: arrayUnion(postId),
    });
    set(state => {
      const updatedSavedPosts = [...state.savedPosts, postId];
      const newState = { ...state, savedPosts: updatedSavedPosts };
      saveToLocalStorage(newState);
      return newState
    });
  },

  removeSavedPost: async (postId) => {
    if (!get().user) return;
    const userRef = doc(firestore, "users", get().user.id);
    await updateDoc(userRef, {
      savedPosts: arrayRemove(postId),
    });
    set(state => {
      const updatedSavedPosts = state.savedPosts.filter(id => id !== postId);
      const newState = { ...state, savedPosts: updatedSavedPosts };
      saveToLocalStorage(newState);
      return newState; 
    });
  },

  initialize: () => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDocRef = doc(firestore, "users", firebaseUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const updatedUser = {
            id: userDoc.id,
            ...userData,
            following: userData.following || [],
            followers: userData.followers || [],
            savedPosts: userData.savedPosts || [],
          };


          set({
            user: updatedUser,
            userProfile: null,
            savedPosts: updatedUser.savedPosts,
          });

          saveToLocalStorage({
            user: updatedUser,
            userProfile: null,
            savedPosts: updatedUser.savedPosts,
          });
        } else {
          set({ user: null, userProfile: null, savedPosts: [] });
          localStorage.removeItem("authState");
        }
      } else {
        set({ user: null, userProfile: null, savedPosts: [] });
        localStorage.removeItem("authState");
      }
    });
  },

  updateFollowState: (targetUserId, isFollowing) => {
    set((state) => {
      if (!state.user) return state;

      // Update following for auth user
      const updatedFollowing = isFollowing
        ? [...new Set([...(state.user.following || []), targetUserId])]
        : (state.user.following || []).filter(id => id !== targetUserId);

      // Update user object
      const updatedUser = {
        ...state.user,
        following: updatedFollowing
      };

      // Update userProfile if it exists
      const updatedUserProfile = state.userProfile
        ? {
          ...state.userProfile,
          followers: state.userProfile.id === targetUserId
            ? (isFollowing
              ? [...new Set([...(state.userProfile.followers || []), state.user.id])]
              : (state.userProfile.followers || []).filter(id => id !== state.user.id))
            : state.userProfile.followers
        }
        : null;

      const newState = {
        user: updatedUser,
        userProfile: updatedUserProfile || state.userProfile
      };

      saveToLocalStorage(newState);
      return newState;
    });
  },

  login: (userData) => {
    set({ user: userData });
    localStorage.setItem('authState', JSON.stringify({ user: userData }));
  },

  logout: () => {
    set({ user: null, userProfile: null });
    localStorage.removeItem("authState");
  },
  
}));

export default useAuthStore;