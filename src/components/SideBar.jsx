import React from 'react'
import './SideBar.css'
import { useChatContext } from '../context/ChatContext'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'

const SideBar = () => {

  // const navigate = useNavigate();

  const { handleCreateNewChat, handleSaveChat } = useChatContext();
  
  return (
    <div className="sidebar">

      {/* Header */}
      <div className="sidebar-header">
  <Link 
    to="/" 
    className="sidebar-title" 
    onClick={handleCreateNewChat}
  >
    <img src={logo} alt="logo" className="logo" />
    <button 
      type="button"
      className="new-chat-btn"
    >
      O
    </button>
    <h3>New Query?</h3>
  </Link>
</div>

      {/* Content */}
      <div className="sidebar-content">
        {/* <button className="sidebar-btn" onClick={() => navigate('/history')}>Past Questions</button> */}
        {/* <Link to="/history">Past Conversations</Link> */}
        <a href="/history"><button onClick={handleSaveChat}>Past Conversations</button></a>

      </div>     

    </div>
  )
}

export default SideBar
