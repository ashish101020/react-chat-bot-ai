import React from 'react'
import './ChatbotNav.css'
import { useChatContext } from '../context/ChatContext';
const ChatbotNav = () => {
    const { theme } = useChatContext();
    const handleThemeToggle = () => {
        theme.current = theme.current === "light" ? "dark" : "light";
        document.body.className = theme.current; // Apply theme to body

    }
  return (
    <>
    <div className="chatbox-header">
        <div className="chatbox-header-content">
        <h2>Customer Support AI</h2>
        <button onClick={handleThemeToggle}>Toggle {theme.currect === "light" ? "Dark" : "Light"} Mode</button>
        </div>
      </div>
      </>
  )
}

export default ChatbotNav