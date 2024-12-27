import { collection, getDocs, query, where, addDoc, serverTimestamp, getDoc, doc, deleteDoc } from "firebase/firestore";
import { firestore, storage } from "../components/Firebase/firebase";
import useChatStore from "../components/store/useChatStore";
import { deleteObject, ref } from "firebase/storage";

const useChatService = () => {
  const { setChats, chats } = useChatStore();

  const fetchChats = async (userId) => {
    const chatsRef = collection(firestore, "chats");
    const q = query(chatsRef, where("participants", "array-contains", userId));
    const querySnapshot = await getDocs(q);

    const chatData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setChats(chatData);
  };

  const createOrGetChat = async (userId1, userId2) => {
    const chatsRef = collection(firestore, "chats");
    const q = query(chatsRef, where("participants", "array-contains", userId1));
    const querySnapshot = await getDocs(q);

    const existingChat = querySnapshot.docs.find((doc) =>
      doc.data().participants.includes(userId2)
    );

    if (existingChat) {
      return existingChat.id;
    }

    const userDoc = await getDoc(doc(firestore, "users", userId2));
    const otherUserData = userDoc.data();

    const newChatRef = await addDoc(chatsRef, {
      participants: [userId1, userId2],
      lastMessage: "",
      timestamp: serverTimestamp(),
      username: otherUserData.username,
      avatar: otherUserData.profilePicURL || "",
    });

    return newChatRef.id;
  };


const deleteChat = async (chatId) => {
  try {
    // 1. Get all messages with attachments
    const messagesRef = collection(firestore, `chats/${chatId}/messages`);
    const messagesSnapshot = await getDocs(messagesRef);
    
    // 2. Delete attachments from storage
    const deleteAttachments = messagesSnapshot.docs.map(async (doc) => {
      const message = doc.data();
      if (message.attachment) {
        const imageRef = ref(storage, message.attachment);
        try {
          await deleteObject(imageRef);
        } catch (error) {
          console.error("Error deleting attachment:", error);
        }
      }
    });
    await Promise.all(deleteAttachments);

    // 3. Delete all messages
    const deleteMessages = messagesSnapshot.docs.map(doc => 
      deleteDoc(doc.ref)
    );
    await Promise.all(deleteMessages);

    // 4. Delete chat document
    const chatRef = doc(firestore, "chats", chatId);
    await deleteDoc(chatRef);

    // 5. Update local state
    setChats(chats.filter(chat => chat.id !== chatId));

    return true;
  } catch (error) {
    console.error("Error deleting chat:", error);
    throw error;
  }
};

return { chats, fetchChats, createOrGetChat, deleteChat };
};

export default useChatService;
