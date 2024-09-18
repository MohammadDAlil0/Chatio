import React, {useState, useEffect} from 'react';
import ChatBar from './ChatBar.jsx';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';

const ChatPage = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    socket.on('typingResponse', (data) => setTyping(data));
  }, [socket, typing]);
  
  useEffect(() => {
    socket.on('messageResponse', (data) => setMessages([...messages, data]));
  }, [socket, messages]);


  return (
    <div className="chat">
      <ChatBar socket={socket}/>
      <div className="chat__main">
        <ChatBody messages={messages} typing={typing}/>
        <ChatFooter socket={socket}/>
      </div>
    </div>
  );
};

export default ChatPage;