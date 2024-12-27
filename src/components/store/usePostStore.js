import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  serverTimestamp,
  deleteDoc
} from "firebase/firestore";
import { create } from "zustand"
import { firestore } from "../Firebase/firebase";

const usePostStore = create((set, get) => ({
  posts: [],
  loadingPosts: false,
  error: null,
  unSubscribe: null,

  fetchPosts: async () => {
    set({ loadingPosts: true });
    const postsQuery = query(collection(firestore, 'posts'),orderBy('createdAt', 'desc'));
    const unSubscribe = onSnapshot(
      postsQuery,
      (snapshot) => {
        const postsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        set({ posts: postsData, loadingPosts: false });
      },
      (error) => {
        set({ error: error.message, loadingPosts: false });
      }
    );
    set({ unSubscribe });
    return unSubscribe;
  },

  createPost: async (postData) => {
    try {
      const postsCollectionRef = collection(firestore, 'posts'); 
      const newPostRef = await addDoc(postsCollectionRef, {
        ...postData,
        createdAt: serverTimestamp(),
        likes: [],
        comments: []
      });
      return newPostRef.id;
    } catch (error) {
      console.log('Error creating post:', error);
      set({ error: error.message });
    }
  },

  toggleLikePost: async (postId, userId) => {
    const postRef = doc(firestore, 'posts', postId);
    try {
      const postSnap = await getDoc(postRef);
      if (postSnap.exists()) {
        const post = postSnap.data();
        let likes = post.likes || [];
        if (likes.includes(userId)) {
          likes = likes.filter(id => id !== userId);
        } else {
          likes.push(userId);
        }
        await updateDoc(postRef, { likes });
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      set({ error: error.message });
    }
  },

  addComment: async (postId, commentData) => {
    const postRef = doc(firestore, 'posts', postId);
    try {
      await updateDoc(postRef, {
        comments: arrayUnion(commentData)
      });
    } catch (error) {
      console.error('Error adding comment:', error);
      set({ error: error.message });
    }
  },

  fetchPostById: async (userId) => {
    const postRef = doc(firestore, 'posts', userId);
    try {
      const postSnap = await getDoc(postRef);
      if (postSnap.exists()) {
        return { id: postSnap.id, ...postSnap.data() };
      }
    } catch (error) {
      console.error('Error fetching post by ID:', error);
      set({ error: error.message });
    }
  },

  clearPosts: () => {
    const unSubscribe = get().unSubscribe;
    if (unSubscribe) {
      unSubscribe();
    }
    set({ posts: [], unSubscribe: null });
  },

  deletePost: async (postId) => {
    const postRef = doc(firestore, 'posts', postId);
    try {
      await deleteDoc(postRef);
      set(state => ({
        posts: state.posts.filter(post => post.id !== postId)
      }));
    } catch (error) {
      console.error('Error deleting post:', error);
      set({ error: error.message });
    }
  }
}));

export default usePostStore;