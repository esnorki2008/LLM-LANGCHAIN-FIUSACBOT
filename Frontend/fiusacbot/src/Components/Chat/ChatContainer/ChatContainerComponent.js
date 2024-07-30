import { useRef, React, useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  MessageSeparator,
  ConversationHeader,
  Avatar,
} from '@chatscope/chat-ui-kit-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import axios from 'axios';

const ChatContainerComponent = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const handleChatClick = () => {
    navigate('/'); // Navigate to /Login/Login when the button is clicked
  };
  const today = new Date();
  const [messages, setMessages] = useState([]);
  const formattedDate = format(today, "EEEE, d 'de' MMMM 'de' yyyy", {
    locale: es,
  });
  const inputRef = useRef(null);
  const handleSend = async (message) => {
    if (message.trim() !== '') {
      setMessages([
        ...messages,
        {
          mensaje: message,
          remitente: 'FIUSACBOT',
          dirección: 'outgoing',
          posición: 'single',
        },
      ]);

      try {
        const response = await axios.post('http://3.94.196.38:5000/chat', {
          input: message,
        });
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            mensaje: response.data.output,
            remitente: 'FIUSACBOT',
            dirección: 'incoming',
            posición: 'single',
          },
        ]);
      } catch (error) {
        console.error('Error al enviar el mensaje:', error);
      }
    }
  };

  return (
    <ChatContainer>
      <ConversationHeader>
        <Avatar src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png" />
        <ConversationHeader.Content userName="Usuario" />
        <ConversationHeader.Actions>
          <a
            className="btn btn-custom btn-lg page-scroll btn-back"
            onClick={handleChatClick}
          >
            Regresar
          </a>
        </ConversationHeader.Actions>
      </ConversationHeader>
      <MessageList
        typingIndicator={
          <TypingIndicator content="Inge-bot está escribiendo" />
        }
      >
        <MessageSeparator content={formattedDate} as="h2" />
        {messages.map((msg, index) => (
          <Message
            key={index}
            model={{
              message: msg.mensaje,
              sender: msg.remitente,
              direction: msg.dirección,
              position: msg.posición,
            }}
          >
            <Message.Footer sender={msg.remitente} sentTime={msg.horaEnvío} />
          </Message>
        ))}
      </MessageList>
      <MessageInput
        placeholder="Escribe un mensaje aquí"
        ref={inputRef}
        attachButton={false}
        onSend={handleSend}
      />
    </ChatContainer>
  );
};

export default ChatContainerComponent;
