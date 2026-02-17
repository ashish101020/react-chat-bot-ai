import React from 'react'
import './ChatbotNav.css'
import { useChatContext } from '../context/ChatContext';
const ChatbotNav = () => {
    const { theme, setTheme } = useChatContext();
    const handleThemeToggle = () => {
        setTheme(prevTheme => prevTheme === "light" ? "dark" : "light");
    }
  return (
    <>
    <div className="chatbox-header">
        <div className="chatbox-header-content">
        <h2>Customer Support AI</h2>
        <button onClick={handleThemeToggle}>Toggle {theme === "light" ? "Dark" : "Light"} Mode</button>
        </div>
      </div>
      </>
  )
}

export default ChatbotNav