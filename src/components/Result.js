import React from 'react';
import styled from 'styled-components';

const ResultSection = styled.section`
  height: 100%;
  padding: 20px;
  font-family: monospace;
  color: #02182b;
  div {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    h2 {
      font-size: 60px;
    };
    .result {
      font-size: 40px;
    };
    .result-msg {
      font-size: 20px;
    };
  };
`;

const Result = ({ userAnswers, correctAnswers }) => {

  let rightAnswers = 0;

  userAnswers.forEach((userAnswer, key) => userAnswer === correctAnswers[key] && rightAnswers++);

  let resultMessage;

  if (rightAnswers === 0) {
    resultMessage = 'Dude, seriously?'
  } else if (rightAnswers > 0 && rightAnswers <= 7) {
    resultMessage = "I just... can't"
  } else if (rightAnswers <= 10) {
    resultMessage = 'Knowledgeable enough'
  } else if (rightAnswers <= 14) {
    resultMessage = 'NOICE.'
  } else if (rightAnswers <= 15) {
    resultMessage = 'Yeeeahh, nailed it.'
  } else {
    resultMessage = 'Oops, results got lost in translation.'
  };

  return (
    <ResultSection>
      <div>
        <h2>Result</h2>
        <p className="result">{`${rightAnswers}/15`}</p>
        <p className="result-msg">{resultMessage}</p>
      </div>
    </ResultSection>
  );
};

export default Result;