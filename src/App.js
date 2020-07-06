import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import QuestionsCard from './components/QuestionsCard';
import Result from './components/Result';

const MainContainer = styled.section`
  min-width: 50%;
  color: #02182b;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: monospace;
  text-align: center;
  .page-name {
    width: 100%;
    font-size: 60px;
  };
  .home-msg {
    margin-top: 40px;
    font-size: 20px;
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

const Spinner = styled.div`
  width: 60px;
  height: 60px;
  border: solid 6px #fb4d3d;
  border-radius: 100%;
  border-top-color: #02182b;
  border-left-color: #02182b;
  animation: spin 1s infinite ease-in-out;

  @keyframes spin {
   0% {
    transform: rotate(0deg);
   };
   100% {
    transform: rotate(360deg);
   };
  };
`;

const App = () => {

  const [questions, setQuestions] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [started, setStarted] = useState(false);
  const [userAnswers, setUserAnswers] = useState(Array.apply(null, Array(15)));
  const [correctAnswers, setCorrectAnswers] = useState([]);

  useEffect(() => {

    fetch(`https://opentdb.com/api.php?amount=15&category=14&difficulty=medium&type=multiple`)
      .then(res => res.json())
      .then(data => {
        let dataCorrectAnswers = data.results.map(question => question.correct_answer);
        setQuestions(data.results);
        setCorrectAnswers(dataCorrectAnswers);
      });
  }, []);

  const submitAnswerAndMoveOn = answerChoice => {
    let userChoices = userAnswers;
    userChoices.splice(currentQuestion, 1, answerChoice);
    setUserAnswers(userChoices);
    setCurrentQuestion(currentQuestion + 1);
  };

  if (currentQuestion > 14) return <Result userAnswers={userAnswers} correctAnswers={correctAnswers} />;

  return (
    <MainContainer>
      {!questions ? <Spinner />
        :
        <>{!started ?
          <>
            <h1 className="page-name">QuizTime</h1>
            <p className="home-msg">
              The best site to procrastinate.<br />
              <br />
              <br />
            Go on.<br />
            We won't judge.<br />
            </p>
            <Button onClick={() => setStarted(true)}>Start</Button>
          </>
          : <QuestionsCard
            question={questions[currentQuestion]}
            submitAnswerAndMoveOn={submitAnswerAndMoveOn}
            currentQuestion={currentQuestion}
          />
        }
        </>
      }
    </MainContainer>
  );
};

export default App;
