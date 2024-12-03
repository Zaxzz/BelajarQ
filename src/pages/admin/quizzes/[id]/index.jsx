import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, CheckCircle2, Clock, ScrollText } from "lucide-react";
import { Toast, useToast } from "@/components/ui/toast";
import axios from "axios";
import useSWR from "swr";
import { QuizInfo } from "@/components/pages/admin/quizzes/quizInfo";
import { QuestionCard } from "@/components/pages/admin/quizzes/questionCard";

const fetcher = (url) => axios.get(url).then((res) => res.data.data);

export default function QuizDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  const { hideToast, showToast, toast } = useToast();
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);

  const {
    data: quizzes,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/admin/quizzes", fetcher);

  useEffect(() => {
    if (!quizzes) return;
    const selectedQuiz = quizzes.find((q) => q._id === id);
    if (selectedQuiz) {
      setQuiz(selectedQuiz);

      setQuestions(
        Array.from({ length: selectedQuiz.totalQuestion }, (_, index) => ({
          id: index + 1,
          question: "",
          questionImage: null,
          points: 5,
          options: Array(4).fill({ text: "", isCorrect: false }),
          isSaved: false,
        }))
      );
    }
  }, [id, quizzes]);

  const updateQuestion = (index, property, value) => {
    setQuestions((prev) =>
      prev.map((q, idx) => (idx === index ? { ...q, [property]: value } : q))
    );
  };

  const updateOption = (questionIndex, selectedOptionIndex) => {
    setQuestions((prev) =>
      prev.map((q, idx) =>
        idx === questionIndex
          ? {
              ...q,
              options: q.options.map((opt, i) => ({
                ...opt,
                isCorrect: i === selectedOptionIndex,
              })),
            }
          : q
      )
    );
  };

  const updateOptionText = (questionIndex, optionIndex, value) => {
    setQuestions((prev) =>
      prev.map((q, idx) =>
        idx === questionIndex
          ? {
              ...q,
              options: q.options.map((opt, i) =>
                i === optionIndex ? { ...opt, text: value } : opt
              ),
            }
          : q
      )
    );
  };

  const handleSaveQuestion = (index) => {
    const question = questions[index];

    if (!question.question || question.options.every((opt) => !opt.isCorrect)) {
      showToast({
        title: "Peringatan",
        message: "Pastikan pertanyaan memiliki teks dan jawaban yang benar.",
        type: "warning",
      });
      return;
    }

    // tambah logic disini, tambah mutate()
    updateQuestion(index, "isSaved", true);
  };

  const renderQuestionForm = (question, index) => (
    <>
      <textarea
        rows={4}
        className="p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none"
        placeholder="Write your question here..."
        value={question.question}
        onChange={(e) => updateQuestion(index, "question", e.target.value)}
      />
      <div className="grid grid-cols-2 gap-4">
        {question.options.map((option, optionIndex) => (
          <div key={optionIndex} className="flex gap-2 items-center">
            <Button
              variant="outline"
              onClick={() => updateOption(index, optionIndex)}
              className={`${
                option.isCorrect && "bg-green-50 ring-1 ring-green-400"
              }`}
            >
              <CheckCircle2 className="text-green-500" />
            </Button>
            <Input
              placeholder={`Input option ${optionIndex + 1}`}
              value={option.text}
              onChange={(e) => {
                updateOptionText(index, optionIndex, e.target.value);
              }}
            />
          </div>
        ))}
      </div>
    </>
  );

  if (!quiz) return <div>Loading...</div>;
  if (error) return <div>Error loading quizzes.</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <main className="p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex justify-between items-center">
          <motion.h1
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-2xl font-bold"
          >
            {quiz.title}
          </motion.h1>
          <Button onClick={() => router.push("/admin/quizzes")}>
            Back to Quizzes
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <QuizInfo icon={Clock} label="Duration" value={quiz.duration} />
          <QuizInfo
            icon={ScrollText}
            label="Total Question"
            value={quiz.totalQuestion}
          />
          <QuizInfo icon={BookOpen} label="Category" value={quiz.category} />
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Question List</h3>
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
      <Toast toast={toast} onClose={hideToast} />
    </main>
  );
}
