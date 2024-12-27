import {create} from "zustand";

const useChatStore = create((set) => ({
  chats: [], // List of chat metadata
  messages: [], // Messages for the current chat
  currentChatId: null, // Currently selected chat ID
  setChats: (chats) => set({ chats }),
  setMessages: (messages) => set({ messages }),
  setCurrentChatId: (chatId) => set({ currentChatId: chatId }),
}));

export default useChatStore;
