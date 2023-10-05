import React, { useEffect, useState } from "react";
import { fetchQuiz } from "./API";
import "./App.css";
//types
import { QuestionState, Difficulty } from "./API";
//compoenents
import Qcard from "./components/Qcard";
// audio
import correctSoundEff from "./assets/audio/tada.mp3";
import errSoundEff from "./assets/audio/incorrect.mp3";

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

  fetchQuiz(TotalQues, Difficulty.EASY);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuiz(TotalQues, Difficulty.EASY);
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setQueNum(0);
    setLoading(false);
  };

  const playSound = (soundfile: any) => {
    const audio = new Audio(soundfile);
    audio.play();
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[queNum].correct_answer === answer;

      if (correct) {
        playSound(correctSoundEff);
        setScore((prev) => prev + 1);
        setTimeout(nextQuestion, 1000);
      } else {
        playSound(errSoundEff);
        // If the answer is incorrect, show an alert with the correct answer
        // alert(
        //   `Incorrect! The correct answer is: ${questions[queNum].correct_answer}`
        // );
        console.log(answer);
      }
      //save answer in the array for user answers
      const answerObject = {
        question: questions[queNum].question,
        answer,
        correct,
        correctAnswer: questions[queNum].correct_answer,
      };

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
    <div className="bg-sky-100 flex flex-col relative h-screen">
      {/* before the quiz starts */}
      {gameOver || userAnswers.length === TotalQues ? (
        <div className="mx-auto pt-[25vh]">
          <h1 className="text-2xl font-bold flex mb-3">Begin the Quiz Now</h1>
          <button
            className="h-10 w-20 flex justify-center mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-"
            onClick={startTrivia}
          >
            Start
          </button>
        </div>
      ) : null}
      {/* after the quiz starts */}
      {!gameOver ? (
        <p className="flex absolute right-10 mt-10">🍎 {score}</p>
      ) : null}
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
          Skip
        </button>
      ) : null}
    </div>
  );
}

export default App;
