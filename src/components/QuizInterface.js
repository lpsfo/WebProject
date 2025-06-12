import React from 'react';
import styled from 'styled-components';

const QuizContainer = styled.div`
  width: 90%;
  max-width: 800px;
  height: 80vh;
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const QuizContent = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

function QuizInterface() {
  return (
    <QuizContainer>
      <QuizContent>
        <h2>퀴즈</h2>
        <p>퀴즈 기능이 준비 중입니다...</p>
      </QuizContent>
    </QuizContainer>
  );
}

export default QuizInterface; 