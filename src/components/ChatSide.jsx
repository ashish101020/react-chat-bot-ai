import React from 'react'
import ChatbotNav from './ChatbotNav'
import ChatBox from './ChatBox'
import './ChatSide.css'
import { Route, Routes } from 'react-router-dom'
import HistoryBox from './HistoryBox'

const ChatSide = () => {
  return (
    <div className="chat-side-container">
    <ChatbotNav/>
    <Routes>
        <Route path='/' element={<ChatBox/>} />
        <Route path='/history' element={<HistoryBox/>} />
    </Routes>
    </div>
  )
}

export default ChatSide