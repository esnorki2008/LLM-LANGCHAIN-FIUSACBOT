import React, { useState } from 'react';
import './ChatLayout.css';
import Button from '../Button/Button';
import ChatBubble from '../ChatBubble/ChatBubble';

const ChatLayout = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim() !== '') {
      setMessages([...messages, { text: input, sender: 'You' }]);
      setInput('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat App</h2>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <>
            <ChatBubble  key={index} isOwnMessage={false} message={message.text} time={"hoy"}/>
            <ChatBubble  key={index} isOwnMessage={true} message={message.text} time={"hoy"}/>
          </>

        ))}
      </div>
      <div className="chat-input">
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Type a message..." 
        />
        <Button onClick={handleSendMessage} title={"Send"}/>
      </div>
    </div>
  );
};

export default ChatLayout;
