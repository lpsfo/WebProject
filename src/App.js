import React, { useState, useCallback } from 'react';
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
  flex-direction: column;
  padding: 20px;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  width: 90%;
  max-width: 800px;
  margin: 0 auto 20px auto;
  justify-content: center;
`;

const Tab = styled(({ active, ...rest }) => <button {...rest} />)`
  flex: 3;
  max-width: calc(45%);
  padding: 10px 100px;
  background-color: ${props => props.active ? '#007bff' : '#e9ecef'};
  color: ${props => props.active ? 'white' : '#333'};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background-color: ${props => props.active ? '#0056b3' : '#dee2e6'};
  }
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 90%;
  max-width: 800px;
  margin: 0 auto;
`;

function App() {
  const [files, setFiles] = useState([]);
  const [activeTab, setActiveTab] = useState('chat');
  const [chatMessages, setChatMessages] = useState([]);
  const [quizMessages, setQuizMessages] = useState([]);

  const handleFilesUpdate = useCallback((updatedFiles) => {
    setFiles(updatedFiles);
  }, []);

  return (
    <AppContainer>
      <FileSidebar onFilesUpdate={handleFilesUpdate} />
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
        <ContentContainer>
          {activeTab === 'chat' ? (
            <ChatInterface
              files={files}
              messages={chatMessages}
              setMessages={setChatMessages}
            />
          ) : (
            <ChatInterface
              files={files}
              messages={quizMessages}
              setMessages={setQuizMessages}
              isQuizMode={true}
            />
          )}
        </ContentContainer>
      </MainContent>
    </AppContainer>
  );
}

export default App; 