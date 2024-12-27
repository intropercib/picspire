import { useState } from "react";
import useAuthStore from "../components/store/useAuthStore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import usePostStore from "../components/store/usePostStore";
import { storage } from "../components/Firebase/firebase";
import { serverTimestamp } from "firebase/firestore";


const useCreatePost = (onClose) => {

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [step, setStep] = useState(1);
  const [uploading, setUploading] = useState(false)
  const [caption, setCaption] = useState("");

  const authUser = useAuthStore(state => state.user)
  const createPost = usePostStore(state => state.createPost)
  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setSelectedFile(file);
      setStep(2)
    }
  }

  const handleCloseModal = () => {
    setSelectedImage(null);
    setSelectedFile(null);
    setStep(1);
    if (onClose) {
      onClose();
    }
  }

  const handleShare = async () => {
    if (!selectedFile || !authUser) return;
    setUploading(true);
    try {
      const storageRef = ref(storage, `users/${authUser.userId}/posts/${Date.now()}_${selectedFile.name}`);
      await uploadBytes(storageRef, selectedFile);

      const downloadURL = await getDownloadURL(storageRef);

      const postData = {
        imageUrl: downloadURL,
        caption: caption,
        createdAt: serverTimestamp(),
        likes: [],
        comments: [],
        authorId: authUser.userId,
        authorUsername: authUser.username,
        authorProfilePicURL: authUser.profilePicURL || '',
      };

      await createPost(postData);

      handleCloseModal();
    } catch (error) {
      console.error('Error sharing post:', error);
    } finally {
      setUploading(false);
    }
  }

  const goToPreviousStep = () => {
    setStep(1);
    setSelectedImage(null);
    setSelectedFile(null);
  }

  return {
    selectedImage,
    caption,
    setCaption,
    step,
    goToPreviousStep,
    handleClose: handleCloseModal,
    handleImageSelect,
    handleShare,
    uploading,
  }

}
export default useCreatePost;