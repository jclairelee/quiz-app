import React from "react";

type Props = {
  question: string;
  answers: string[];
  callback: any;
  userAnswer: any;
  questionNum: number;
  totalQuestions: number;
};

const Qcard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNum,
  totalQuestions,
}) => {
  return (
    <div>
      <p>
        Question: {questionNum} / {totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }}></p>
      <div>
        {answers && answers.length > 0 ? (
          answers.map((item) => (
            <div key={item}>
              <button
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
