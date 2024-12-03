import { useRouter } from "next/router";

export default function ShowScore({ score, totalQuestions, resetQuiz }) {
  const router = useRouter();

  const goToHomePage = () => {
    router.replace("/"); // Arahkan ke halaman utama
  };

  const retryQuiz = () => {
    resetQuiz(); // Panggil fungsi resetQuiz dari komponen induk
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full text-center">
          <h3 className="text-black">Skor Anda :</h3>
          <h1 className="text-3xl text-black my-3">{score} / {totalQuestions}</h1>
          <div className="flex flex-col space-y-2">
            <button
              className="bg-purple-800 px-2 py-1 rounded-lg text-sm text-white"
              onClick={goToHomePage}
            >
              Kembali ke Halaman Utama
            </button>
            <button
              className="bg-blue-500 px-2 py-1 rounded-lg text-sm text-white"
              onClick={retryQuiz}
            >
              Ulangi Kuis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
