import React, { useState } from 'react';
import styled from 'styled-components';

const QuizBox = styled.div`
  background: #f8f9fa;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const Question = styled.p`
  font-weight: bold;
`;

const Option = styled.label`
  display: block;
  margin: 5px 0;
  cursor: pointer;
`;

const Button = styled.button`
  margin-top: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
`;

function QuizMessage({ text }) {
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const parseQuiz = (text) => {
    const questionMatch = text.match(/문제:\s*(.*)/);
    const optionsMatch = text.match(/보기:\s*([\s\S]*?)정답:/);
    const answerMatch = text.match(/정답:\s*(\d)/);

    const question = questionMatch?.[1] ?? '문제 없음';
    const options = optionsMatch?.[1]?.trim().split('\n').map(line => line.trim()) ?? [];
    const correctIndex = parseInt(answerMatch?.[1], 10) - 1;

    return { question, options, correctIndex };
  };

  const { question, options, correctIndex } = parseQuiz(text);

  return (
    <QuizBox>
      <Question>{question}</Question>
      {options.map((option, index) => (
        <Option key={index}>
          <input
            type="radio"
            name="quiz"
            value={index}
            checked={selected === index}
            onChange={() => setSelected(index)}
            disabled={showResult}
          />
          {' '}
          {option}
        </Option>
      ))}
      {!showResult ? (
        <Button onClick={() => setShowResult(true)} disabled={selected === null}>
          정답 확인
        </Button>
      ) : (
        <p>
          {selected === correctIndex ? '✅ 정답입니다!' : `❌ 오답입니다. 정답은 ${correctIndex + 1}번입니다.`}
        </p>
      )}
    </QuizBox>
  );
}

export default QuizMessage;
