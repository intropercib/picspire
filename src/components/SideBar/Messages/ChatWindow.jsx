import React, { useEffect, useRef } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import MessagingInput from "./MessagingInput";
import MessagingHeader from "./MessagingHeader";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../../Firebase/firebase";
import useChatStore from "../../store/useChatStore";
import useAuthStore from "../../store/useAuthStore";

const ChatWindow = ({ onBack, chatId, currentUserId, selectedUser }) => {
  const { messages, setMessages } = useChatStore();
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!chatId) return;


    const messagesRef = collection(firestore, `chats/${chatId}/messages`);
    const q = query(messagesRef, orderBy("timestamp"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messageData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messageData);
    });

    return () => unsubscribe();
  }, [chatId, setMessages]);

  const handleSendMessage = async ({ text, attachment }) => {
    if (!text.trim() && !attachment) return;

    try {
      const messagesRef = collection(firestore, `chats/${chatId}/messages`);
      await addDoc(messagesRef, {
        sender: currentUserId,
        text: text.trim(),
        attachment: attachment || null,
        timestamp: serverTimestamp(),
      });

      // Update last message in chat document
      const chatRef = doc(firestore, "chats", chatId);
      await updateDoc(chatRef, {
        lastMessage: attachment ? "Attachment" : text.trim(),
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
      }}
    >
      <MessagingHeader onBack={onBack} selectedUser={selectedUser} />

      <Box sx={{ flex: 1, overflowY: "auto", padding: 2 }}>
        {messages.length > 0 ? (
          messages.map((message) => (
            <Box
              key={message.id}
              sx={{
                display: "flex",
                justifyContent:
                  message.sender === currentUserId ? "flex-end" : "flex-start",
                mb: 2,
              }}
            >
              <Box>
                {message.attachment && (
                  <Box
                    sx={{
                      height: "200px",
                      width: "200px",
                      objectFit: "contain",
                      marginBottom: 1,
                    }}
                  >
                    <img
                      src={message.attachment}
                      alt="post"
                      height="100%"
                      width="100%"
                    />
                  </Box>
                )}
                <Typography>{message.text}</Typography>
              </Box>
            </Box>
          ))
        ) : (
          <Typography>No messages yet. Start the conversation!</Typography>
        )}
        <div ref={bottomRef}></div>
      </Box>

      <MessagingInput onSend={handleSendMessage} />
    </Box>
  );
};

export default ChatWindow;
