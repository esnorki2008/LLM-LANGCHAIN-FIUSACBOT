// ChatBubble.js
import React from 'react';
import './ChatBubble.css'; // Asegúrate de crear y personalizar el CSS

const ChatBubble = ({ message, time,isOwnMessage }) => {
    return (
        <div className={`chat-bubble ${isOwnMessage ? 'own' : 'other'}`}>
            <div className="message">{message}</div>
            <div className="time">{time}</div>
        </div>
    );
};

export default ChatBubble;
