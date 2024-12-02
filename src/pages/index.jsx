import { CloudUpload, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useState } from "react";
import { signOut } from "next-auth/react";

export default function Home() {
  const [options, setOptions] = useState([
    { id: "A", text: "Paris", isCorrect: true },
    { id: "B", text: "London", isCorrect: false },
    { id: "C", text: "Berlin", isCorrect: false },
    { id: "D", text: "Rome", isCorrect: false },
  ]);
  return (
    <div className="h-screen flex items-center justify-center">
      <button onClick={() => signOut()}>LogOut</button>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="bg-white rounded-2xl shadow-xl w-[900px] max-h-[90vh] overflow-y-auto p-8"
      >
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Daftar Soal</h3>

          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4 hover:shadow-sm transition-all">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <span className="font-medium text-lg">Soal 1</span>
                  <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded font-semibold">
                    Poin: 30
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditQuestion(q)}
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteQuestion(q.id)}
                  >
                    <Trash size={16} />
                  </Button>
                </div>
              </div>
              <div className="flex gap-4">
                <textarea
                  id="message"
                  rows="10"
                  className="p-2.5 w-full lg:w-2/3 text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Write your question here..."
                  aria-label="Write your question"
                />

                <label
                  htmlFor="uploadFile1"
                  className="bg-white px-2 text-gray-500 font-semibold text-base rounded-lg flex-1 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed hover:border-blue-500 transition duration-200 ease-in-out"
                  aria-label="Upload file"
                >
                  <CloudUpload size={32} className="text-blue-500" />
                  <span className="mt-2">Upload file</span>
                  <input type="file" id="uploadFile1" className="hidden" />
                  <p className="text-xs font-medium text-gray-400 mt-2 text-center">
                    PNG, JPG, SVG, WEBP, and GIF are allowed.
                  </p>
                </label>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {options.map((o) => (
                  <button
                    key={o.id}
                    className="bg-gray-50 p-2 rounded text-sm flex items-center"
                  >
                    <p className="text-gray-700 font-semibold">
                      {o.id}. {o.text}
                    </p>
                    {o.isCorrect && (
                      <span className="ml-2 text-green-600 font-medium">
                        (Jawaban Benar)
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
