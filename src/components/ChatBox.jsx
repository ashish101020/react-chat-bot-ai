import React, { useState } from "react";
import "./ChatBox.css";
import { useChatContext } from "../context/ChatContext";
import { faqData } from "../data/faqData";
import ChatCard from "./ChatCard";

const ChatBox = () => {
  const { setChatHistory, activeChat, setActiveChat, theme } = useChatContext();
  document.body.className = theme.current;

  const [query, setQuery] = useState("");

  const handleAddMessage = () => {
    console.log("Adding message:", query);
    if (!query.trim() || !activeChat) return;

    const newMessage = {
      id: Date.now(),
      text: query,
      timestamp: new Date().toISOString(),
      side: "user",
      liked: false,
    };
    console.log("New message object:", newMessage);

    // Add user message
    setActiveChat((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }));

    const userQuery = query; // store before clearing
    setQuery("");

    // Bot reply
    setTimeout(() => {
      const found = faqData.find(
        (item) => item.question.toLowerCase() === userQuery.toLowerCase(),
      );

      const botMessage = {
        id: Date.now() + 1,
        text: found ? found.answer : "Sorry, I don't have an answer for that.",
        timestamp: new Date().toISOString(),
        side: "bot",
        liked: false,
      };

      console.log("Bot message object:", botMessage);

      setActiveChat((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    }, 1000);
  };

  const handleSaveChat = () => {
    if (!activeChat || activeChat.messages.length === 0) return;

    setChatHistory((prev) => {
      const exists = prev.find((chat) => chat.id === activeChat.id);
      if (exists) return prev;
      return [...prev, activeChat];
    });

    // ✅ Create new chat after saving
    const newChatId = Date.now().toString();
    const newChat = { id: newChatId, messages: [] };

    setActiveChat(newChat);
    localStorage.setItem("activeChat", JSON.stringify(newChat));
  };

  return (
  <div className={`chatbox-container`}>
    <div className="chatbox-body">
      {activeChat?.messages?.map((msg) => (
        <div key={msg.id} className={msg.side}>
          <ChatCard msg={msg} />
        </div>
      ))}
    </div>

    <div className="chatbox-input-section">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Please tell me about your query!"
        className="chatbox-input"
      />
      <button onClick={handleAddMessage}>Add</button>
      <button onClick={handleSaveChat}>Save</button>
    </div>
  </div>
);

};

export default ChatBox;
