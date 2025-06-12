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
  display: flex;
  align-items: flex-start;
  margin: 5px 0;
  cursor: pointer;
  line-height: 1.4;
`;

const OptionText = styled.span`
  margin-left: 8px;
  word-break: keep-all;
  white-space: pre-wrap;
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

const Explanation = styled.div`
  margin-top: 15px;
  padding: 10px;
  background-color: #e9ecef;
  border-radius: 5px;
  font-size: 0.9em;
`;

const FileContent = styled.pre`
  background-color: #f1f3f5;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
  font-size: 0.9em;
  white-space: pre-wrap;
`;

function QuizMessage({ text, fileContext, quizId }) {
    const [selected, setSelected] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const uniqueName = `quiz-${quizId}`;

    const parseQuiz = (text) => {
        const questionMatch = text.match(/문제:\s*(.*)/);
        const optionsMatch = text.match(/보기:\s*([\s\S]*?)정답:/);
        const answerMatch = text.match(/정답:\s*(\d)/);
        const explanationMatch = text.match(/설명:\s*([\s\S]*?)(?=---|$)/);

        const question = questionMatch?.[1] ?? '문제 없음';
        // const options = optionsMatch?.[1]?.trim().split('\n').map(line => line.trim()) ?? [];
        const cleanText = (text) => text.replace(/^["'“”‘’]+|["'“”‘’]+$/g, '').trim();
        const options = optionsMatch?.[1]?.trim().split('\n').map(line => cleanText(line.trim())) ?? [];
        const correctIndex = parseInt(answerMatch?.[1], 10) - 1;
        const explanation = explanationMatch?.[1]?.trim() ?? '';

        return { question, options, correctIndex, explanation };
    };

    const { question, options, correctIndex, explanation } = parseQuiz(text);

    const getExplanation = () => {
        if (selected === correctIndex) return '✅ 정답입니다!';

        const selectedOption = options[selected];
        const correctOption = options[correctIndex];

        const lines = fileContext.split('\n');
        const relevantLines = lines
            .map((line, i) => ({ line, i }))
            .filter(({ line }) =>
                line.includes(selectedOption) || line.includes(correctOption)
            )
            .flatMap(({ i }) => lines.slice(Math.max(0, i - 1), i + 2)); // 앞뒤 줄 포함

        const relevantContent = Array.from(new Set(relevantLines)).join('\n');

        return (
            <Explanation>
                <p>❌ 오답입니다. 정답은 {correctIndex + 1}번입니다.</p>
                <p>선택하신 답변: {selectedOption}</p>
                <p>정답: {correctOption}</p>
                {explanation && <p>설명: {explanation}</p>}
                {relevantContent && (
                    <>
                        <p>관련 파일 내용:</p>
                        <FileContent>{relevantContent}</FileContent>
                    </>
                )}
            </Explanation>
        );
    };

    return (
        <QuizBox>
            <Question>{question}</Question>
            {options.map((option, index) => (
                <Option key={index}>
                    <input
                        type="radio"
                        name={uniqueName}
                        value={index}
                        checked={selected === index}
                        onChange={() => setSelected(index)}
                        disabled={showResult}
                    />
                    <OptionText>{option}</OptionText>
                </Option>
            ))}
            {!showResult ? (
                <Button onClick={() => setShowResult(true)} disabled={selected === null}>
                    정답 확인
                </Button>
            ) : (
                getExplanation()
            )}
        </QuizBox>
    );
}

export default QuizMessage;
