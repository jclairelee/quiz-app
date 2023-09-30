import React, { useState } from "react";
import { Difficulty, fetchQuiz } from "./API";

const TotalQues = 10;

function App() {
  const selectedDifficulty: Difficulty = Difficulty.EASY;

  fetchQuiz(TotalQues, selectedDifficulty);

  const startTrivia = async () => {};

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {};

  const nextQuestion = () => {};

  return (
    <div>
      <h1>Quiz</h1>
      <button className="start" onClick={startTrivia}>
        Start
      </button>
      <p className="score">Score:</p>
      <p>Loading Questions ...</p>

      <button className="next" onClick={nextQuestion}>
        Next
      </button>
    </div>
  );
}

export default App;
