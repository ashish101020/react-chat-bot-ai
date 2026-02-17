import React from 'react'
import './ChatbotNav.css'
import { useChatContext } from '../context/ChatContext';
const ChatbotNav = () => {
    const { themeRef } = useChatContext();
    const Button = themeRef.current === "light" ? "Dark" : "Light";
    const handlethemeRefToggle = () => {
        themeRef.current = themeRef.current === "light" ? "dark" : "light";
        document.body.className = themeRef.current; // Apply themeRef to body
    }
  return (
    <>
    <div className="chatbox-header">
        <div className="chatbox-header-content">
        <h2>Customer Support AI</h2>
        <button onClick={handlethemeRefToggle}>{Button}</button>
        </div>
      </div>
      </>
  )
}

export default ChatbotNav