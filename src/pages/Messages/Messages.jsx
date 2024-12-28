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
  Skeleton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchMsgModal from "../../components/SideBar/Messages/SearchMsgModal";
import useAuthStore from "../../components/store/useAuthStore";
import useChatService from "../../hooks/useChatService";
import ChatWindow from "../../components/SideBar/Messages/ChatWindow";
import useChatStore from "../../components/store/useChatStore";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../components/Firebase/firebase";

const Messages = () => {
  const { chats, fetchChats, createOrGetChat } = useChatService();
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [selectedUsername, setSelectedUsername] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const {setChats} = useChatStore();

  useEffect(() => {
    const loadChats = async () => {
      if (authUser?.userId) {
        setIsLoading(true);
        try {
          const chatList = await fetchChats(authUser.userId);
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
          console.log("Error loading chats:", error);
        } finally {
          setIsLoading(false);
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
      setSelectedChatId(chatId);
      setSelectedUsername(user.username);
      setSelectedUser(user);
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
        <Typography
          variant="h5"
          fontWeight={600}
          mb={3}
          sx={{
            userSelect: "none",
          }}
        >
          Messages
        </Typography>

        <Box flex={1} overflow="auto">
          {isLoading ? (
            <List>
              {[...Array(3)].map((item,idx) => (
                <ListItem key={idx} sx={{ mb: 1 }}>
                  <ListItemAvatar>
                    <Skeleton variant="circular" width={40} height={40} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Skeleton width="80%" />}
                    secondary={<Skeleton width="60%" />}
                  />
                </ListItem>
              ))}
            </List>
          ) : chats.length > 0 ? (
            <List>
              {chats.map((chat) => (
                <ListItem
                  component="div"
                  key={chat.id}
                  onClick={() => handleChatSelect(chat)}
                  sx={{
                    backgroundColor:
                      chat.id === selectedChatId ? "background.paper" : "",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    borderRadius: "8px",
                    padding: "2px",
                    marginBlock: "4px",
                    userSelect: "none",
                    cursor: "pointer",
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      src={
                        chat.avatar ||
                        "/src/assets/defaultAvatar.jpg"
                      }
                      alt={chat.username}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={chat.username}
                    secondary={
                      <Typography
                        variant="body2"
                        noWrap
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "200px",
                        }}
                      >
                        {chat.lastMessage || "No messages yet"}
                      </Typography>
                    }
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
              sx={{
                userSelect: "none",
              }}
            >
              Select a chat to start messaging.
            </Typography>
            <Button
              variant="contained"
              onClick={handleDialogOpen}
              sx={{
                mt: 2,
                backgroundColor: (theme) => theme.palette.background.primary,
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.primary.main,
                  color: (theme) => theme.palette.primary.contrastText,
                },
              }}
            >
              Search Users
            </Button>
          </Box>
        )}
      </Box>

      <SearchMsgModal
        open={isDialogOpen}
        onClose={handleDialogClose}
        onUserSelect={handleUserClick}
      />
    </Box>
  );
};

export default Messages;
