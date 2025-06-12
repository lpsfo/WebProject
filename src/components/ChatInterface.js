import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import QuizMessage from './QuizMessage';
import { generateSystemMessage } from '../utils/generateSystemMessage';

const ChatContainer = styled.div`
  width: 90%;
  max-width: 800px;
  height: 80vh;
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

const Message = styled.div`
  margin: 10px 0;
  padding: 10px 15px;
  border-radius: 10px;
  max-width: 70%;
  white-space: pre-wrap;
  ${props => props.isUser ? `
    background-color: #007bff;
    color: white;
    margin-left: auto;
  ` : `
    background-color: #e9ecef;
    color: black;
  `}
`;

const InputContainer = styled.div`
  padding: 20px;
  border-top: 1px solid #dee2e6;
  display: flex;
  gap: 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #dee2e6;
  border-radius: 5px;
  font-size: 16px;
`;

const SendButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

function ChatInterface({ files, messages, setMessages, isQuizMode = false }) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const createContextFromFiles = () => {
    if (!files || files.length === 0) return '';

    return files.map(file => `
파일명: ${file.name}
내용:
${file.content}
---
`).join('\n');
  };

  const fileContext = createContextFromFiles();
  const systemMessage = generateSystemMessage({ fileContext, isQuizMode });

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = isQuizMode && input.trim().toLowerCase().includes("퀴즈")
      ? `${input} [요청 ID: ${Date.now()}]` // 입력에 변동값을 추가
      : input;
    setInput('');
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setIsLoading(true);

    try {
      const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
        model: 'meta-llama/llama-4-maverick:free',
        messages: [
          {
            role: 'system',
            content: systemMessage
          },
          {
            role: 'user',
            content: userMessage
          }
        ]
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      const aiResponse = response.data.choices[0].message.content;
      setMessages(prev => [...prev, { text: aiResponse, isUser: false }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { text: '죄송합니다. 오류가 발생했습니다.', isUser: false }]);
    } finally {
      setIsLoading(false);
    }
  };


  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <ChatContainer>
      <MessagesContainer>
        {messages.map((message, index) => (
          <Message key={index} isUser={message.isUser}>
            {isQuizMode && !message.isUser && message.text.includes('문제:') ? (
              <QuizMessage text={message.text} fileContext={fileContext} quizId={index} />
            ) : (
              message.text
            )}
          </Message>
        ))}
        {isLoading && <Message isUser={false}>응답을 생성하는 중...</Message>}
      </MessagesContainer>
      <InputContainer>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={isQuizMode ? "퀴즈 생성을 요청하세요..." : "메시지를 입력하세요..."}
          disabled={isLoading}
        />
        <SendButton onClick={sendMessage} disabled={isLoading}>
          전송
        </SendButton>
      </InputContainer>
    </ChatContainer>
  );
}

export default ChatInterface; 