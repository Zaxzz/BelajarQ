import React from "react";

function Popup({ title, message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold text-center mb-4">{title}</h2>
        <p className="text-center mb-6">{message}</p>
        <div className="flex justify-around">
          <button
            onClick={onConfirm}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Ya
          </button>
          <button
            onClick={onCancel}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Tidak
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
