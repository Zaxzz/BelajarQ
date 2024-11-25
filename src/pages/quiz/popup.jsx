export default function Popup({ setShowPopup, setIsConfirmed }) {
  const handleClose = () => setShowPopup(false); // Menutup popup dan mengatur showPopup ke false

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
          <p className="text-lg font-medium mb-4 text-black">
            Apakah Anda ingin mengirim jawaban?
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Tidak
            </button>
            <button
              onClick={() => {
                setIsConfirmed(true);
                handleClose();
              }}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Ya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
