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
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

function App() {
  const [files, setFiles] = useState([]);

  const handleFilesUpdate = useCallback((updatedFiles) => {
    setFiles(updatedFiles);
  }, []);

  return (
    <AppContainer>
      <FileSidebar onFilesUpdate={handleFilesUpdate} />
      <MainContent>
        <ChatInterface files={files} />
      </MainContent>
    </AppContainer>
  );
}

export default App; 