import React, { useState } from 'react';

const ChatFooter = ({socket}) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem('username')) {
      socket.emit('message', {
        text: message,
        name: localStorage.getItem('username'),
        id: `${socket.id}${Math.random}`,
        socketID: socket.id
      });
      socket.emit('type', false);
    }
    setMessage('');
  };
  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => {
            socket.emit('type', (e.target.value !== ''));
            setMessage(e.target.value)
          }}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;