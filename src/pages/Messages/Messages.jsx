import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  ListItem,
  List,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchMsgModal from "../../components/SideBar/Messages/SearchMsgModal";
import useAuthStore from "../../components/store/useAuthStore";
import useChatService from "../../hooks/useChatService";
import ChatWindow from "../../components/SideBar/Messages/ChatWindow";

const Messages = () => {
  const { chats, fetchChats, createOrGetChat } = useChatService();
  const [selectedChatId, setSelectedChatId] = useState(null); // Track selected chat ID
  const [selectedUsername, setSelectedUsername] = useState(""); // Track selected chat username
  const [selectedUser, setSelectedUser] = useState(null); // Track selected user
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const authUser = useAuthStore((state) => state.user);

  useEffect(() => {
    const loadChats = async () => {
      if (authUser?.userId) {
        try {
          const chatList = await fetchChats(authUser.userId);
          // For each chat, get the other participant's info
          const chatsWithUserInfo = await Promise.all(
            chatList.map(async (chat) => {
              const otherUserId = chat.participants.find(
                (id) => id !== authUser.userId
              );
              const userDoc = await getDoc(
                doc(firestore, "users", otherUserId)
              );
              const userData = userDoc.data();
              return {
                ...chat,
                username: userData.username,
                avatar: userData.profilePicURL,
              };
            })
          );
          setChats(chatsWithUserInfo);
        } catch (error) {
          console.error("Error loading chats:", error);
        }
      }
    };

    loadChats();
  }, [authUser?.userId]);

  const handleChatSelect = (chat) => {
    setSelectedUser(chat);
    setSelectedChatId(chat.id);
    setSelectedUsername(chat.username);
    navigate(`/messages/${chat.id}`);
  };

  const handleUserClick = async (user) => {
    try {
      const chatId = await createOrGetChat(authUser.userId, user.id);
      console.log("Chat ID:", chatId);
      setSelectedChatId(chatId);
      setSelectedUsername(user.username);
      setSelectedUser(user);
      console.log("Selected User:", user);
      navigate(`/messages/${chatId}`);
    } catch (error) {
      console.error("Error selecting user for chat:", error);
    } finally {
      setIsDialogOpen(false);
    }
  };
  const navigate = useNavigate();
  const handleDialogOpen = () => setIsDialogOpen(true);
  const handleDialogClose = () => setIsDialogOpen(false);
  const onBack = () => {
    setSelectedChatId(null);
    setSelectedUsername("");
    navigate("/messages");
  };
  return (
    <Box display="flex" width="100%" height="100vh">
      {/* Left Section: Chat List */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "25%",
          borderRight: "1px solid",
          borderColor: (theme) => theme.palette.divider,
          padding: "8px",
        }}
      >
        <Typography variant="h5" fontWeight={600} mb={3}>
          Messages
        </Typography>

        <Box flex={1} overflow="auto">
          {chats.length > 0 ? (
            <List>
              {chats.map((chat) => (
                // console.log("chat>", chat),
                <ListItem
                  button
                  key={chat.id}
                  onClick={() => handleChatSelect(chat)}
                >
                  <ListItemAvatar>
                    <Avatar
                      src={
                        chat.avatar ||
                        "https://www.w3schools.com/howto/img_avatar.png"
                      }
                      alt={chat.username}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={chat.username}
                    secondary={chat.lastMessage || "No messages yet"}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography
              variant="body2"
              color="textSecondary"
              textAlign="center"
            >
              No conversations yet.
            </Typography>
          )}
        </Box>
      </Box>

      {/* Right Section: Chat Window */}
      <Box sx={{ flex: 1 }}>
        {selectedChatId ? (
          <ChatWindow
            chatId={selectedChatId}
            currentUserId={authUser.userId}
            selectedUser={selectedUser}
            onBack={onBack}
          />
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="body2"
              color="textSecondary"
              textAlign="center"
              mt={2}
            >
              Select a chat to start messaging.
            </Typography>
            <Button
              variant="contained"
              onClick={handleDialogOpen}
              sx={{ mt: 2 }}
            >
              Search Users
            </Button>
          </Box>
        )}
      </Box>

      {/* Search Modal */}
      <SearchMsgModal
        open={isDialogOpen}
        onClose={handleDialogClose}
        onUserSelect={handleUserClick}
      />
    </Box>
  );
};

export default Messages;
