import React from 'react';
import styled from 'styled-components';
import ChatInterface from './components/ChatInterface';
import FileSidebar from './components/FileSidebar';

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

function App() {
  return (
    <AppContainer>
      <FileSidebar />
      <MainContent>
        <ChatInterface />
      </MainContent>
    </AppContainer>
  );
}

export default App; 