import React, { useState } from "react";
import "./ChatBox.css";
import { useChatContext } from "../context/ChatContext";
import { faqData } from "../data/faqData";
import ChatCard from "./ChatCard";

const ChatBox = () => {
  const { setChatHistory, activeChat, setActiveChat } = useChatContext();

  const [query, setQuery] = useState("");

  const handleAddMessage = (e) => {
    e.preventDefault();

    if (!query.trim() || !activeChat) return;

    const newMessage = {
      id: Date.now(),
      text: query,
      timestamp: new Date().toISOString(),
      side: "user",
      liked: false,
    };

    // Add user message
    setActiveChat((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }));

    const userQuery = query;
    setQuery("");

    // Bot reply
    setTimeout(() => {
      const found = faqData.find(
        (item) =>
          item.question.toLowerCase() === userQuery.toLowerCase()
      );

      const botMessage = {
        id: Date.now() + 1,
        text: found
          ? found.answer
          : "Sorry, I don't have an answer for that.",
        timestamp: new Date().toISOString(),
        side: "bot",
        liked: false,
      };

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

    const newChatId = Date.now().toString();
    const newChat = { id: newChatId, messages: [] };

    setActiveChat(newChat);
    localStorage.setItem("activeChat", JSON.stringify(newChat));
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox-body">
        {activeChat?.messages?.map((msg) => (
          <div key={msg.id} className={msg.side}>
            <ChatCard msg={msg} />
          </div>
        ))}
        {activeChat?.messages?.length === 0 && (
          <p className="no-messages">Hello! How can I assist you today?</p>
        )}
      </div>

      <form
        className="chatbox-input-section"
        onSubmit={handleAddMessage}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Please tell me about your query!"
          className="chatbox-input"
        />
        <button type="submit">Ask</button>
        <button type="button" onClick={handleSaveChat}>
          Save
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
