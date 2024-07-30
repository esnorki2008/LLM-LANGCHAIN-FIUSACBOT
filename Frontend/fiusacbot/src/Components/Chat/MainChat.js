import React from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer } from '@chatscope/chat-ui-kit-react';
import ChatContainerComponent from './ChatContainer/ChatContainerComponent';

const MainChat = () => {
  return (
    <MainContainer responsive style={{ height: '100vh', display: 'flex' }}>
      <ChatContainerComponent />
    </MainContainer>
  );
};

export default MainChat;
