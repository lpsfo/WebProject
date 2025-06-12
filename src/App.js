import React, { useState } from 'react';
import styled from 'styled-components';
import ChatInterface from './components/ChatInterface';
import QuizInterface from './components/QuizInterface';
import FileSidebar from './components/FileSidebar';

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f8f9fa;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const TabContainer = styled.div`
  width: 90%;
  max-width: 800px;
  display: flex;
  margin-bottom: 20px;
`;

const Tab = styled.button`
  padding: 10px 20px;
  background-color: ${props => props.active ? '#007bff' : '#e9ecef'};
  color: ${props => props.active ? 'white' : 'black'};
  border: none;
  border-radius: 5px 5px 0 0;
  cursor: pointer;
  margin-right: 5px;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.active ? '#0056b3' : '#dee2e6'};
  }
`;

function App() {
  const [files, setFiles] = useState([]);
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <AppContainer>
      <FileSidebar files={files} setFiles={setFiles} />
      <MainContent>
        <TabContainer>
          <Tab 
            active={activeTab === 'chat'} 
            onClick={() => setActiveTab('chat')}
          >
            대화
          </Tab>
          <Tab 
            active={activeTab === 'quiz'} 
            onClick={() => setActiveTab('quiz')}
          >
            퀴즈
          </Tab>
        </TabContainer>
        {activeTab === 'chat' ? (
          <ChatInterface files={files} />
        ) : (
          <QuizInterface />
        )}
      </MainContent>
    </AppContainer>
  );
}

export default App; 