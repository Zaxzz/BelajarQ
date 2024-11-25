import React, { useState } from "react";

const SimpleQuiz = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const question = {
    questionText: "Apa ibu kota Indonesia?",
    answerOptions: [
      { answerText: "Jakarta", isCorrect: true },
      { answerText: "Surabaya", isCorrect: false },
    ],
  };

  const handleAnswerClick = (isCorrect) => {
    setIsCorrect(isCorrect);
    console.log(isCorrect ? "Jawaban Benar!" : "Jawaban Salah!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-4 border rounded-lg shadow-lg bg-white">
        <h3 className="text-xl font-semibold mb-4">{question.questionText}</h3>
        <div>
          {question.answerOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(option.isCorrect)}
              className="w-full mb-2 p-2 border rounded-md bg-gray-100 hover:bg-gray-200"
            >
              {option.answerText}
            </button>
          ))}
        </div>
        {isCorrect !== null && (
          <div className="mt-4">
            <p>{isCorrect ? "Jawaban Benar!" : "Jawaban Salah!"}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleQuiz;
