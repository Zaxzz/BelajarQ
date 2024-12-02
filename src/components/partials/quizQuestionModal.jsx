import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CheckCircle2,
  Clock,
  CloudUpload,
  Edit,
  FileQuestion,
  Save,
  X,
} from "lucide-react";

export const QuizQuestionModal = ({ quiz, onClose }) => {
  const [questions, setQuestions] = useState([]);
  const [isFile, setIsFile] = useState([]);

  useEffect(() => {
    setQuestions(
      Array.from({ length: quiz.totalQuestions }, (_, index) => ({
        id: index + 1,
        question: "",
        questionImage: null,
        points: 5,
        options: Array(4).fill({ text: "", isCorrect: false }),
        isSaved: false,
      }))
    );
  }, [quiz.totalQuestions]);

  const updateQuestion = (index, property, value) => {
    setQuestions((prev) =>
      prev.map((q, idx) => (idx === index ? { ...q, [property]: value } : q))
    );
  };

  const updateOption = (questionIndex, optionIndex, property, value) => {
    setQuestions((prev) =>
      prev.map((q, idx) =>
        idx === questionIndex
          ? {
              ...q,
              options: q.options.map((opt, i) =>
                i === optionIndex ? { ...opt, [property]: value } : opt
              ),
            }
          : q
      )
    );
  };

  const handleSaveQuestion = (index) => {
    const question = questions[index];
    if (!question.question || question.options.every((opt) => !opt.isCorrect)) {
      alert("Pastikan pertanyaan memiliki teks dan jawaban yang benar.");
      return;
    }
    if (question.isSaved) {
      updateQuestion(index, "isSaved", false);
      return;
    } else if (!question.isSaved) {
      updateQuestion(index, "isSaved", true);
      updateQuestion(index, "questionImage", fileUpload[index] || null);
    }
  };

  const handleImageUpload = (index, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setIsFile((prev) => {
          const updated = [...prev];
          updated[index] = reader.result;
          return updated;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const renderQuestionForm = (question, index) => (
    <>
      <div className="flex gap-4">
        <textarea
          rows="4"
          className="p-2.5 w-full lg:w-2/3 text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none"
          placeholder="Write your question here..."
          value={question.question}
          onChange={(e) => updateQuestion(index, "question", e.target.value)}
        />
        <label
          htmlFor={`uploadFile-${index}`}
          className="bg-white px-2 text-gray-500 font-semibold text-base rounded-lg flex-1 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed hover:border-blue-500 transition duration-200 ease-in-out"
        >
          {isFile[index] ? (
            <figure className="w-full h-32 max-h-32 rounded-lg overflow-hidden">
              <img
                src={isFile[index]}
                alt={`Preview question ${index + 1}`}
                className="w-full h-full object-contain"
              />
            </figure>
          ) : (
            <>
              <CloudUpload size={32} className="text-blue-500" />
              <span className="mt-2">Upload file</span>
            </>
          )}
          <input
            type="file"
            id={`uploadFile-${index}`}
            className="hidden"
            onChange={(e) => handleImageUpload(index, e.target.files[0])}
          />
        </label>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {question.options.map((option, optionIndex) => (
          <div key={optionIndex} className="flex gap-2 items-center">
            <Button
              variant="outline"
              onClick={() =>
                updateOption(index, optionIndex, "isCorrect", true)
              }
            >
              <CheckCircle2 className="text-green-500" />
            </Button>
            <Input
              placeholder={`Masukkan pilihan ${optionIndex + 1}`}
              value={option.text}
              onChange={(e) => {
                updateOption(index, optionIndex, "text", e.target.value);
              }}
            />
          </div>
        ))}
      </div>
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="bg-white rounded-2xl shadow-xl w-[900px] max-h-[90vh] overflow-y-auto p-8"
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <FileQuestion className="text-blue-600" size={32} />
            <h2 className="text-2xl font-semibold">{quiz.title}</h2>
          </div>
          <motion.button
            whileHover={{ rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
          >
            <X className="h-6 w-6 text-gray-500 hover:text-gray-700" />
          </motion.button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <QuizInfo
            icon={Clock}
            label="Durasi Pengerjaan"
            value={quiz.timeLimit}
          />
          <QuizInfo
            icon={CheckCircle2}
            label="Total Soal"
            value={quiz.totalQuestions}
          />
          <QuizInfo
            icon={FileQuestion}
            label="Kategori"
            value={quiz.category}
          />
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Daftar Soal</h3>
          <div className="space-y-4">
            {questions.map((q, index) => (
              <QuestionCard
                key={q.id}
                question={q}
                index={index}
                onSave={() => handleSaveQuestion(index)}
                renderForm={renderQuestionForm}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const QuizInfo = ({ icon: Icon, label, value }) => (
  <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-3">
    <Icon className="text-blue-600" size={24} />
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  </div>
);

const QuestionCard = ({ question, index, onSave, renderForm }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4 hover:shadow-sm transition-all">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <span className="font-medium text-lg">Soal {index + 1}</span>
        <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded font-semibold">
          Poin: {question.points}
        </span>
      </div>
      <Button onClick={onSave}>
        {question.isSaved ? (
          <Edit className="mr-2" />
        ) : (
          <Save className="mr-2" />
        )}
        {question.isSaved ? "Edit Soal" : "Simpan Soal"}
      </Button>
    </div>
    {question.isSaved ? (
      <div className="grid grid-cols-2 gap-2">
        {question.options.map((option, idx) => (
          <div
            key={idx}
            className={`p-2 rounded text-sm flex gap-2 ${
              option.isCorrect
                ? "bg-green-50 ring-1 ring-green-400"
                : "bg-gray-50"
            }`}
          >
            {option.text}
          </div>
        ))}
      </div>
    ) : (
      renderForm(question, index)
    )}
  </div>
);
