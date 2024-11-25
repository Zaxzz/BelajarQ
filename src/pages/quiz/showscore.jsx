export default function ShowScore({ score }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full text-center">
          <h3 className="text-black ">Skor Anda :</h3>
          <h1 className="text-3xl text-black my-3">{score} / 5</h1>
          <button className="bg-purple-800 px-2 py-1 rounded-lg text-sm">
            Kembali ke halaman utama
          </button>
        </div>
      </div>
    </div>
  );
}
