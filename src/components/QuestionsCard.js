import React from 'react';
import styled from 'styled-components';

const QuestionContainer = styled.div`
 height: 100%;
 width: 80%;
 article {
   width: 100%;
   height: 100%;
   display: flex;
   flex-direction: column;
   justify-content: space-evenly;
   align-items: flex-start;
   text-align: left;
   color: #02182b;
   padding: 10px;
   h2 {
     font-size: 30px;
     line-height: 1;    
   };
   form {
     margin-top: 30px;
     font-size: 20px;
     display: flex;
     flex-direction: column;
     label {
       margin-bottom: 5px;
     };
     input {
       margin-right: 10px;
     };
   };
 }; 
`;

const Button = styled.button`
  border: 1px solid #fb4d3d;
  background-color: #fb4d3d;
  width: 90px;
  height: 45px;
  border-radius: 15px;
  margin-top: 40px;
  font-size: 20px;
  color: #eac435;
  box-shadow: 4px 4px 0px 0px rgba(2,24,43,1);
  font-family: monospace;
`;

const QuestionsCard = ({ question, submitAnswerAndMoveOn, currentQuestion }) => {

  const index = Math.floor(Math.random() * question.incorrect_answers.length);
  let answers = [...question.incorrect_answers];
  answers.splice(index, 0, question.correct_answer);
  let answerChoice;

  answers = answers.map(answer => {
    answer = answer.replace(/&quot;/g, '"');
    answer = answer.replace(/&#039;/g, "'");

    return answer;
  });

  const str = question.question;
  let cleanQuestion = str.replace(/&quot;/g, '"');
  cleanQuestion = cleanQuestion.replace(/&#039;/g, "'");

  const handleCheckboxChange = e => {
    answerChoice = e.target.checked && e.target.value;
  };

  return (
    <QuestionContainer>
      <article>
        <h2>{cleanQuestion}</h2>
        <form>
          {answers.map(answer =>
            <label key={answer}>
              <input
                type="radio"
                name={cleanQuestion}
                value={answer}
                onChange={handleCheckboxChange}
                key={answer}
              />
              {answer}
            </label>
          )}
        </form>

        {currentQuestion < 14
          ? <Button onClick={() => submitAnswerAndMoveOn(answerChoice)}>Next</Button>
          : <Button onClick={() => submitAnswerAndMoveOn(answerChoice)}>Results</Button>
        }

      </article>
    </QuestionContainer>
  );
};

export default QuestionsCard;