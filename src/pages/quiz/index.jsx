import { useEffect, useState } from "react";
import Navbar from "./navbar.jsx";
import Popup from "./popup.jsx";
import ShowScore from "./showscore.jsx";

const questions = [
  {
    questionText:
      "Kehadiran penduduk Jepang di Indonesia memberikan dampak di bidang politik, yakni?",

    questionAnswer: [
      {
        answerText: "Melarang seluruh rapat dan kegiatan politik",
        isCorrect: true,
      },
      {
        answerText:
          "Membebaskan pembentukan organisasi saat pergerakan nasional",
        isCorrect: false,
      },
      {
        answerText: "Melarang seluruh rapat dan kegiatan politik",
        isCorrect: false,
      },
      {
        answerText:
          "Pengerahan tenaga rakyat untuk kepentingan Jepang dalam menghadapi perang dunia kedua",
        isCorrect: false,
      },
    ],
  },

  {
    questionText:
      "Bagaimana Jepang menanggapi peristiwa proklamasi kemerdekaan Indonesia?",

    questionAnswer: [
      {
        answerText: "Jepang mengakui kemerdekaan Indonesia",
        isCorrect: false,
      },
      {
        answerText: "Jepang izinkan Indonesia merdeka dengan syarat tertentu",
        isCorrect: true,
      },
      {
        answerText:
          "Jepang tidak mempedulikan proklamasi kemerdekaan Indonesia",
        isCorrect: false,
      },
      {
        answerText:
          "Jepang tidak mempedulikan proklamasi kemerdekaan Indonesia",
        isCorrect: false,
      },
    ],
  },

  {
    questionText:
      "Nippon Cahaya Asia, Nippon Pemimpin Asia, dan Nippon Pelindung Asia adalah jargon dari organisasi propaganda yakni",
    questionAnswer: [
      {
        answerText: "Gerakan Tiga A",
        isCorrect: true,
      },
      {
        answerText: "Putera",
        isCorrect: false,
      },
      {
        answerText: "Asia Hokokai",
        isCorrect: false,
      },
      {
        answerText: "Asia Raya",
        isCorrect: false,
      },
    ],
  },

  {
    questionText:
      "Sekolah Rakyat dalam masa penjajahan Jepang disebut juga sebagai",

    questionAnswer: [
      {
        answerText: "Kokkumin Gakko",
        isCorrect: true,
      },
      {
        answerText: "Shun Gakko",
        isCorrect: false,
      },
      {
        answerText: "Shoto Chu Gakko",
        isCorrect: false,
      },
      {
        answerText: "Koto Chu Gakko",
        isCorrect: false,
      },
    ],
  },
  {
    questionText:
      "Warga pribumi yang mempunyai simpati besar saat kedatangan awal Jepang adalah",

    questionAnswer: [
      {
        answerText: "Mohammad Yamin",
        isCorrect: false,
      },
      {
        answerText: "Soekarno",
        isCorrect: false,
      },
      {
        answerText: "M.H Thamrin",
        isCorrect: true,
      },
      {
        answerText: "Mohammad Hatta",
        isCorrect: false,
      },
    ],
  },
];

function Countdown({ initialSeconds }) {
  // dari sini dah berubah secondsnya jadi use effect jalan
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

  if (seconds <= 60) {
    return (
      <h1 className=" text-red-500 text-sm px-2 py-1 rounded-lg  bg-yellow-300">
        Time left: {formatTime(seconds)}
      </h1>
    );
  } else {
    return (
      <h1 className=" text-black px-2 py-1  text-sm rounded-lg  bg-yellow-300">
        Time left: {formatTime(seconds)}
      </h1>
    );
  }
}

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentProgress, setCurrentProgress] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [isConfirmed, setIsConfirmed] = useState(false);

  function handleNextQuestion() {
    if (selectedAnswer?.isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    // pop up
    if (currentQuestion < questions.length - 1) {
      // kl pake <= nanti error soalnya 4 <= 4 masih true jadi nambah lagi
      setCurrentQuestion((prev) => prev + 1);
      setCurrentProgress((cp) => cp + 1);
    } else {
      // tiap neken tombol next di soal no 5 nnti pop kebuka karena true
      setShowPopup(true);
    }

    // warna button kereset lagi
    setSelectedAnswer(null);
    setCurrentIndex(null);
  }

  function getIsCorrect(isCorrect, index) {
    setCurrentIndex(index);
    setSelectedAnswer({ isCorrect, index });
  }

  return (
    <>
      <Navbar />
      <div className="container flex flex-col justify-center items-center py-10 text-white">
        <div className="quiz max-w-md shadow-lg p-6 rounded-lg bg-slate-100 text-white">
          <div className="countdown flex justify-between mb-3 align-middle">
            <span className="text-sm text-black ">{currentProgress} / 5</span>
            <Countdown initialSeconds={180} />
          </div>

          <h1 className="mb-5 w-11/12 text-md font-bold text-black">
            {questions[currentQuestion].questionText}
          </h1>

          <div className="quiz-answer">
            {questions[currentQuestion].questionAnswer.map((answer, index) => (
              <button
                key={index}
                className={`px-4 py-2 mb-5 w-full text-left rounded-md shadow-lg  ${
                  currentIndex === index
                    ? "bg-green-100 text-black "
                    : "bg-white text-black hover:bg-gray-100"
                }`}
                onClick={() => getIsCorrect(answer.isCorrect, index)}
              >
                {answer.answerText}
              </button>
            ))}
          </div>

          <div className="quiz-control mt-2 flex justify-end">
            <button
              className=" bg-purple-800 text-white px-4 py-2 rounded-md hover:bg-purple-900"
              onClick={handleNextQuestion}
            >
              Next
            </button>
          </div>
        </div>
        {/* set show popup dikirim ke popup.jsx */}
        {showPopup && (
          <Popup setShowPopup={setShowPopup} setIsConfirmed={setIsConfirmed} />
        )}{" "}
        {isConfirmed && <ShowScore score={score} />}
      </div>
    </>
  );
}
