import { collection, getDocs, query, where, addDoc, serverTimestamp, getDoc, doc, deleteDoc } from "firebase/firestore";
import { firestore, storage } from "../components/Firebase/firebase";
import useChatStore from "../components/store/useChatStore";
import { deleteObject, ref } from "firebase/storage";

const useChatService = () => {
  const { setChats, chats } = useChatStore();

  const fetchChats = async (userId) => {
    try {

      const chatsRef = collection(firestore, "chats");
      const q = query(chatsRef, where("participants", "array-contains", userId));
      const querySnapshot = await getDocs(q);

      const chatData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChats(chatData);
      return chatData;
    } catch (err) {
      console.error("Error fetching chats:", err);
      return [];
    }
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
      const messagesRef = collection(firestore, `chats/${chatId}/messages`);
      const messagesSnapshot = await getDocs(messagesRef);

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

      const deleteMessages = messagesSnapshot.docs.map(doc =>
        deleteDoc(doc.ref)
      );
      await Promise.all(deleteMessages);

      const chatRef = doc(firestore, "chats", chatId);
      await deleteDoc(chatRef);

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
