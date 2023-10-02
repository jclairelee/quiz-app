import { shuffleArray } from "./utils";

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type QuestionState = Question & { answers: string[] };

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export const fetchQuiz = async (amount: number, difficulty: Difficulty) => {
  try {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const result = await fetch(endpoint);
    if (!result.ok) {
      throw new Error("failed to fetch data");
    }

    const data = await result.json();

    return data.results.map((question: Question) => ({
      ...question,
      correctOne: question.correct_answer,
      answers: shuffleArray([
        ...question.incorrect_answers,
        question.correct_answer,
      ]),
    }));
  } catch (error) {
    console.error("An error occurred:", error);
    return [];
  }
};
