import { useEffect, useState } from "react";
import Popup from "./popup.jsx"; // Assuming Popup is your custom component
import ShowScore from "./showscore.jsx"; // Assuming ShowScore is your custom component

const API_URL =
  "https://api.kontenbase.com/query/api/v1/79297f44-a03f-401b-a2c6-6b7ce1c7866f/Questions?$lookup=*";
const ANSWER_API_URL =
  "https://api.kontenbase.com/query/api/v1/79297f44-a03f-401b-a2c6-6b7ce1c7866f/Answer?$lookup=*";

function Countdown({ initialSeconds }) {
  const [seconds, setSeconds] = useState(initialSeconds);

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondLeft = seconds % 60;
    return `${minutes}:${secondLeft.toString().padStart(2, "0")}`;
  }
 

  useEffect(() => {
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [seconds]);

  return (
    <h1
      className={`text-sm px-2 py-1 rounded-lg bg-yellow-300 ${
        seconds <= 60 ? "text-red-500" : "text-black"
      }`}
    >
      Time left: {formatTime(seconds)}
    </h1>
  );
}

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentProgress, setCurrentProgress] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [answersData, setAnswersData] = useState([]);

  const fetchQuestions = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      const formattedQuestions = data.map((item) => ({
        questionText: item.questionText,
        questionAnswer: item.Answer.map((answer) => ({
          answerText: answer.answerText,
          isCorrect: false, // Placeholder for correct answer flag
        })),
      }));

      setQuestions(formattedQuestions);

      // Fetch answers data to check correctness
      const answerResponse = await fetch(ANSWER_API_URL);
      const answerData = await answerResponse.json();
      setAnswersData(answerData);

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
      setIsLoading(false);
    }
  };


  const resetQuiz = () => {
    setScore(0);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsConfirmed(false);
    setShowPopup(false);
    setIsLoading(true);
    setAnswersData([]);
    // Optionally, refetch questions and answers
    fetchQuestions();
  };

  // Fetch questions and answers from the API
  useEffect(() => {
    
    fetchQuestions();
  }, []);

  // Check the correctness of the selected answer
  function getIsCorrect(answerText, index) {
    setSelectedAnswer({ answerText, index });

    // Find matching answer in the answer data
    const answer = answersData.find(
      (item) => item.answerText === answerText
    );

    if (answer && answer.iscorrect === "true") {
      setSelectedAnswer((prev) => ({
        ...prev,
        isCorrect: true,
      }));
    } else {
      setSelectedAnswer((prev) => ({
        ...prev,
        isCorrect: false,
      }));
    }
  }

  // Handle moving to the next question or submitting answers
  function handleNextQuestion() {
    if (selectedAnswer?.isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setCurrentProgress((cp) => cp + 1);
    } else {
      setShowPopup(true); // Show popup when the last question is reached
    }

    setSelectedAnswer(null);
  }

  // Handle submission of answers when user confirms
  const handleSubmit = () => {
    setIsConfirmed(true);
    setShowPopup(false);
  };

  if (isLoading) {
    return <h1 className="text-center text-black">Loading quiz...</h1>;
  }

  return (
    <div className="bg-blue-500">
      <div className="container flex flex-col justify-center items-center py-10 text-white ">
        <div className="quiz max-w-md shadow-lg p-6 rounded-lg text-white bg-white-300">
          <div className="countdown flex justify-between mb-3 align-middle">
            <span className="text-sm text-black">
              {currentProgress} / {questions.length}
            </span>
            <Countdown initialSeconds={180} />
          </div>

          <h1 className="mb-5 w-11/12 text-md font-bold text-black">
            {questions[currentQuestion]?.questionText}
          </h1>

          <div className="quiz-answer">
            {questions[currentQuestion]?.questionAnswer.map((answer, index) => (
              <button
                key={index}
                className={`px-4 py-2 mb-5 w-full text-left rounded-md shadow-lg  ${
                  selectedAnswer?.index === index
                    ? selectedAnswer?.isCorrect
                      ? "bg-gray-400 text-black"
                      : "bg-gray-400 text-black"
                    : "bg-white text-black hover:bg-gray-100"
                }`}
                onClick={() => getIsCorrect(answer.answerText, index)}
              >
                {answer.answerText}
              </button>
            ))}
          </div>

          <div className="quiz-control mt-2 flex justify-end">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-purple-900"
              onClick={handleNextQuestion}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Show popup to confirm submission */}
      {showPopup && (
        <Popup
          title="Submit Answers"
          message="Do you want to submit your answers?"
          onConfirm={handleSubmit}
          onCancel={() => setShowPopup(false)}
        />
      )}

      {/* Display the score after submission */}
      {isConfirmed && (
        <ShowScore
          score={score}
          totalQuestions={questions.length}
          resetQuiz={resetQuiz} // Pass resetQuiz here
        />
      )}
    </div>
  );
}
