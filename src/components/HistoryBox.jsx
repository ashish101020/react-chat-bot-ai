import './HistoryBox.css'
import { useChatContext } from '../context/ChatContext';
import ChatCard from './ChatCard';
import moment from 'moment';

const HistoryBox = () => {

    const getChatLabel = (date) => {
  const chatDate = moment(date);

  if (chatDate.isSame(moment(), "day")) {
    return "Today's";
  }

  if (chatDate.isSame(moment().subtract(1, "day"), "day")) {
    return "Yesterday's";
  }

  return chatDate.fromNow(); // 3 days ago, 5 days ago, etc.
}; 

    const { chatHistory } = useChatContext();
    console.log("Chat History in HistoryBox:", chatHistory);
  return (
    <div className="history-box-container">
        <div className="chatbox-body">
        {chatHistory && (
              chatHistory.map((chat, index) => (
                <div key={index}>
                    <h2>{getChatLabel(chat.createdAt)} chat</h2>

                 <div>
                     {
                    chat.messages.map((msg) => (
                      <div key={msg.id} className={msg.side}>
                        <ChatCard msg={msg} />
                      </div>
                    ))
                  }
                 </div>
                </div>
              ))
        )}
      </div>
    </div>
  )
}

export default HistoryBox;