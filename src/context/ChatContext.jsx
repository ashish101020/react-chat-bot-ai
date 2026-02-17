import { createContext, useContext, useEffect, useRef, useState } from "react";

const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const [chatHistory, setChatHistory] = useState(() => {
    const saved = localStorage.getItem("chatHistory");
    return saved ? JSON.parse(saved) : [];
  });

  const [activeChat, setActiveChat] = useState(null);
  const [selectedChatHistory, setSelectedChatHistory] = useState(null)
  const [chatId, setChatId] = useState(null);
  const [isPastChatOpen, setIsPastChatOpen] = useState(false);

  const hasLoaded = useRef(false);

  const handleSaveChat = () => {
    if (!activeChat || activeChat.messages.length === 0) return;

    setChatHistory((prev) => {
      const exists = prev.find((chat) => chat.id === activeChat.id);
      if (exists) return prev;
      return [...prev, activeChat];
    });

    const newChatId = Date.now().toString();
    const newChat = { id: newChatId, messages: [] };

    setActiveChat(newChat);
    localStorage.setItem("activeChat", JSON.stringify(newChat));
  };

  // ✅ Load chat history
  useEffect(() => {
    const savedChatHistory = localStorage.getItem("chatHistory");
    if (savedChatHistory) {
      setChatHistory(JSON.parse(savedChatHistory));
    }
    hasLoaded.current = true;
  }, []);

  // ✅ Save ONLY after first load
  useEffect(() => {
    if (hasLoaded.current) {
      localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    }
  }, [chatHistory]);

  // Load activeChat
  useEffect(() => {
    const savedActiveChat = localStorage.getItem("activeChat");

    if (savedActiveChat) {
      const parsedChat = JSON.parse(savedActiveChat);
      setActiveChat(parsedChat);
      setChatId(parsedChat.id);
    } else {
      const newChatId = Date.now().toString();
      const newChat = { id: newChatId, messages: [] };

      setChatId(newChatId);
      setActiveChat(newChat);
      localStorage.setItem("activeChat", JSON.stringify(newChat));
    }
  }, []);

  useEffect(() => {
    if (activeChat) {
      localStorage.setItem("activeChat", JSON.stringify(activeChat));
    }
  }, [activeChat]);

  const handleCreateNewChat = () => {
    const newChatId = Date.now().toString();
    const newChat = { id: newChatId, messages: [] };

    setChatId(newChatId);
    setActiveChat(newChat);
  };


  return (
    <ChatContext.Provider
      value={{
        chatHistory,
        setChatHistory,
        chatId,
        setChatId,
        handleCreateNewChat,
        activeChat,
        setActiveChat,
        isPastChatOpen,
        setIsPastChatOpen,
        selectedChatHistory, setSelectedChatHistory,
        handleSaveChat
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  return useContext(ChatContext);
};
