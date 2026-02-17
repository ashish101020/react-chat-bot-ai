import React from 'react'
import './SideBar.css'
import { useChatContext } from '../context/ChatContext'
import logo from '../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'

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
        {/* <button className="sidebar-btn" onClick={() => navigate('/history')}>Past Questions</button> */}
        {/* <Link to="/history">Past Conversations</Link> */}
        <a href="/history">Past Conversations</a>

      </div>     

    </div>
  )
}

export default SideBar
