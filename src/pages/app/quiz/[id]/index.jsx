import { useState, useEffect } from "react";

export async function getServerSideProps(context) {
  const { id } = context.params;

  const detailRes = await fetch(
    `https://api.kontenbase.com/query/api/v1/79297f44-a03f-401b-a2c6-6b7ce1c7866f/Detailbelajar/${id}?$lookup=*`
  );
  const questionRes = await fetch(
    "https://api.kontenbase.com/query/api/v1/79297f44-a03f-401b-a2c6-6b7ce1c7866f/Questions?$lookup=*"
  );
  const answerRes = await fetch(
    "https://api.kontenbase.com/query/api/v1/79297f44-a03f-401b-a2c6-6b7ce1c7866f/Answer?$lookup=*"
  );

  const detailData = await detailRes.json();
  const questionData = await questionRes.json();
  const answerData = await answerRes.json();

  const filteredQuestions = questionData.filter((q) =>
    q.Detailbelajar.some((detail) => detail._id === id)
  );

  return {
    props: {
      detail: detailData,
      questions: filteredQuestions,
      answers: answerData,
    },
  };
}

export default function QuizPage({ detail, questions, answers }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showScore, setShowScore] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const questionAnswers = answers.filter((answer) =>
    answer.questionid.some((q) => q._id === currentQuestion._id)
  );

  useEffect(() => {
    if (timeLeft > 0 && !isQuizFinished) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleFinishQuiz();
    }
  }, [timeLeft, isQuizFinished]);

  const handleAnswerSelect = (questionId, answerId) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: answerId });
  };

  const handleSelectQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleFinishQuiz = () => {
    setShowModal(true);
  };

  const confirmFinishQuiz = () => {
    let finalScore = 0;

    questions.forEach((question) => {
      const selectedAnswerId = selectedAnswers[question._id];
      const correctAnswer = answers.find(
        (answer) => answer._id === selectedAnswerId && answer.iscorrect === "true"
      );
      if (correctAnswer) {
        finalScore += 1;
      }
    });

    setScore(finalScore);
    setIsQuizFinished(true);
    setShowModal(false);
    setShowScore(true);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-blue-500 min-h-screen p-8">
      <div className="bg-white max-w-4xl mx-auto rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">{detail.Judul}</h1>

        {isQuizFinished ? (
          <div className="text-center">

          </div>
        ) : (
          <div className="flex">
            {/* Sidebar dengan daftar nomor soal */}
            <div className="flex-shrink-0 w-24 space-y-4">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-16 h-16 flex items-center justify-center text-white font-bold rounded-lg cursor-pointer ${
                    currentQuestionIndex === index
                      ? "bg-blue-700"
                      : selectedAnswers[questions[index]._id]
                      ? "bg-green-500"
                      : "bg-blue-300"
                  }`}
                  onClick={() => handleSelectQuestion(index)}
                >
                  {index + 1}
                </div>
              ))}
            </div>

            {/* Konten soal */}
            <div className="flex-1 ml-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">
                  {currentQuestion.questionText}
                </h3>
                <span className="text-lg font-bold text-red-500">
                  Waktu: {formatTime(timeLeft)}
                </span>
              </div>
              <div className="space-y-3">
                {questionAnswers.map((answer) => (
                  <button
                    key={answer._id}
                    className={`block w-full text-left py-2 px-4 border rounded-md ${
                      selectedAnswers[currentQuestion._id] === answer._id
                        ? "bg-blue-200"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                    onClick={() =>
                      handleAnswerSelect(currentQuestion._id, answer._id)
                    }
                  >
                    {answer.answerText}
                  </button>
                ))}
              </div>
              <div className="flex justify-between mt-6">
                {currentQuestionIndex < questions.length - 1 ? (
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    onClick={handleNextQuestion}
                  >
                    Selanjutnya
                  </button>
                ) : (
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    onClick={handleFinishQuiz}
                  >
                    Selesai
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-bold mb-4">Konfirmasi Selesai?</h2>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 mr-2"
                onClick={confirmFinishQuiz}
              >
                Ya
              </button>
              <button
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                onClick={() => setShowModal(false)}
              >
                Batal
              </button>
            </div>
          </div>
        )}

        {/* Tampilkan skor */}
        {showScore && (
          <div className="text-center mt-6">
            <h2 className="text-xl font-bold">Quiz Selesai!</h2>
            <p className="text-lg">Skor Anda: {score}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={() => window.location.reload()}
            >
              Mulai Ulang
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
