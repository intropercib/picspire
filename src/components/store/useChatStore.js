import {create} from "zustand";

const useChatStore = create((set) => ({
  chats: [], 
  messages: [], 
  currentChatId: null, 
  setChats: (chats) => set({ chats }),
  setMessages: (messages) => set({ messages }),
  setCurrentChatId: (chatId) => set({ currentChatId: chatId }),
}));

export default useChatStore;
