import React from "react";

type Props = {
  question: string;
  answers: string[];
  callback: any;
  userAnswer: any;
  questionNum: number;
  totalQuestions: number;
  isActive: boolean;
};

const Qcard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNum,
  totalQuestions,
  isActive,
}) => {
  const combinedHTML = `<p>${questionNum}. ${question}</p>`;
  return (
    <div className="pl-10 mt-10">
      <p className="mb-5">
        🍏 {questionNum} / {totalQuestions}
      </p>
      <p
        dangerouslySetInnerHTML={{ __html: combinedHTML }}
        className="pl-3 mb-5 mr-10 text-2xl"
      ></p>
      <div>
        {answers && answers.length > 0 ? (
          answers.map((item) => (
            <div key={item} className="mb-3 pr-10">
              <button
                className={`h-8 w-full px-5 ${
                  isActive
                    ? "cursor-pointer text-indigo-700 transition-colors duration-150 border border-indigo-500 rounded-lg focus:shadow-outline hover:bg-indigo-500 hover:text-indigo-10"
                    : " text-white bg-gray-300 rounded focus:outline-none"
                }`}
                disabled={userAnswer ? true : false}
                value={item}
                onClick={callback}
              >
                <span dangerouslySetInnerHTML={{ __html: item }} />
              </button>
            </div>
          ))
        ) : (
          <p>No answer</p>
        )}
      </div>
    </div>
  );
};

export default Qcard;
// if gameover, qcard display none.
