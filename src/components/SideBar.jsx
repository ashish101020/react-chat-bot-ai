import React from 'react'
import './SideBar.css'
import { useChatContext } from '../context/ChatContext'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'

const SideBar = () => {

  const navigate = useNavigate();

  const { handleCreateNewChat } = useChatContext();
  
  return (
    <div className="sidebar">

      {/* Header */}
      <div className="sidebar-header">
        <div className="sidebar-title">
          <img src={logo} alt="logo" className="logo" />
          <h3>New Query</h3>
        </div>
        <button className="new-chat-btn" onClick={handleCreateNewChat}>O</button>
      </div>

      {/* Content */}
      <div className="sidebar-content">
        <button className="sidebar-btn" onClick={() => navigate('/history')}>Past Questions</button>
        {/* <div >
        { isPastChatOpen && chatHistory.map((chat) => (
          <div key={chat.id} style={{ padding: "10px", borderBottom: "1px solid #ddd", cursor: "pointer" }}>
            <p onClick={() => {
              navigate('/history');
            }}>{chat.messages[0]?.text || "Untitled Chat"}</p>
          </div>
        ))}
      </div> */}
      </div>

      

    </div>
  )
}

export default SideBar
