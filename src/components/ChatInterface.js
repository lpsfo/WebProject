import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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

function ChatInterface({ files }) {
  const [messages, setMessages] = useState([]);
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

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setIsLoading(true);

    try {
      const fileContext = createContextFromFiles();
      const systemMessage = fileContext ?
  `당신은 전문적인 AI 조수입니다. 사용자가 업로드한 파일은 다음과 같은 컨텍스트를 제공합니다. 이 파일의 내용을 정확하게 참고하여 질문에 답변하고, 필요 시 해당 문맥을 인용하거나 요약하여 설명하세요.

파일 내용:
${fileContext}

지침:
- 파일 내용을 바탕으로 구체적이고 정확하게 답변하세요.
- 모호하거나 누락된 정보가 있으면 정중하게 사용자에게 질문하여 명확히 하세요.
- 답변은 간결하되, 필요한 경우 예시나 코드 블록을 포함하여 설명하세요.
- 답변이 길어지거나, 너무 많은 내용을 포함하거나, 번호로 순서가 있는 경우 적절하게 줄바꿈을 해주세요.
- 사용자의 의도를 먼저 파악하고, 그것에 맞는 도움을 제공하세요.
- 답변은 한글로 작성해주세요.` 
:
  `당신은 전문적인 AI 조수입니다. 지금은 파일이 제공되지 않았으므로 일반적인 대화에 친절하고 명확하게 응답해주세요. 사용자의 질문에 적절히 예시를 들고, 추가적인 질문이 필요한 경우에는 유도 질문을 해주세요.`;


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
            {message.text}
          </Message>
        ))}
        {isLoading && <Message isUser={false}>응답을 생성하는 중...</Message>}
      </MessagesContainer>
      <InputContainer>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="메시지를 입력하세요..."
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