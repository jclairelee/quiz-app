import React, { useState } from "react";
import { fetchQuiz } from "./API";
//types
import { QuestionState, Difficulty } from "./API";
//compoenents
import Qcard from "./components/Qcard";

export type CorrectOne = string;

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TotalQues = 10;

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [queNum, setQueNum] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [gameOver, setGameOver] = useState(true);
  const [correctAnswer, setCorrectAnswer] = useState<CorrectOne[]>([]);

  fetchQuiz(TotalQues, Difficulty.EASY);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuiz(TotalQues, Difficulty.EASY);
    console.log();
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setQueNum(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[queNum].correct_answer === answer;
      //add score if answer is correct
      if (correct) {
        setScore((prev) => prev + 1);
        console.log("correct");
      } else {
        // If the answer is incorrect, show an alert with the correct answer
        alert(
          `Incorrect! The correct answer is: ${questions[queNum].correct_answer}`
        );
      }
      //save answer in the array for user answers
      const answerObject = {
        question: questions[queNum].question,
        answer,
        correct,
        correctAnswer: questions[queNum].correct_answer,
      };
      setCorrectAnswer((prev) => [...prev, questions[queNum].correct_answer]);
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    const nextQue = queNum + 1;
    if (nextQue === TotalQues) {
      setGameOver(true);
    } else {
      setQueNum(nextQue);
    }
  };

  return (
    <div>
      <h1>Quiz</h1>
      {gameOver || userAnswers.length === TotalQues ? (
        <button className="start" onClick={startTrivia}>
          Start
        </button>
      ) : null}
      {!gameOver ? <p className="score">Score: {score}</p> : null}
      {loading && <p>Loading Questions ...</p>}
      {!loading && !gameOver && (
        <Qcard
          questionNum={queNum + 1}
          totalQuestions={TotalQues}
          question={questions[queNum].question}
          answers={questions[queNum].answers}
          userAnswer={userAnswers ? userAnswers[queNum] : undefined}
          callback={checkAnswer}
        />
      )}

      {!gameOver &&
      !loading &&
      userAnswers.length === queNum + 1 &&
      queNum !== TotalQues - 1 ? (
        <button className="next" onClick={nextQuestion}>
          Next Question
        </button>
      ) : null}
    </div>
  );
}

export default App;
