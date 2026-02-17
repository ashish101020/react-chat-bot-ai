import './HistoryBox.css'
import { useChatContext } from '../context/ChatContext';
import ChatCard from './ChatCard';

const HistoryBox = () => {
    const { selectedChatHistory, } = useChatContext();
    console.log("Selected Chat History in HistoryBox:", selectedChatHistory);
  return (
    <div className="history-box-container">
        <div className="chatbox-body">
        {selectedChatHistory && (
          selectedChatHistory.messages.map((message, index) => (
            <div key={index}>
                <ChatCard msg={message} />
            </div>
          ))        
        )}
      </div>
    </div>
  )
}

export default HistoryBox