import QuizPageView from "@/components/pages/admin/quizzes";
import axios from "axios";
import useSWR from "swr";

const CATEGORY_OPTIONS = [
  { value: "", label: "All Categories" },
  { value: "SD", label: "SD" },
  { value: "SMP", label: "SMP" },
  { value: "SMA", label: "SMA" },
  { value: "Kuliah", label: "Kuliah" },
];

const QUESTION_OPTIONS = [
  { value: "10", label: "10" },
  { value: "15", label: "15" },
  { value: "20", label: "20" },
  { value: "25", label: "25" },
  { value: "30", label: "30" },
  { value: "35", label: "35" },
  { value: "40", label: "40" },
  { value: "45", label: "45" },
  { value: "50", label: "50" },
];

const DURATION_OPTIONS = [
  { value: "30", label: "30 Minutes" },
  { value: "45", label: "45 Minutes" },
  { value: "60", label: "60 Minutes" },
  { value: "75", label: "75 Minutes" },
  { value: "90", label: "90 Minutes" },
  { value: "105", label: "105 Minutes" },
  { value: "120", label: "120 Minutes" },
];

const fetcher = (url) => axios.get(url).then((res) => res.data.data);

export default function QuizPage() {
  const {
    data: quizzes,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/admin/quizzes", fetcher);

  return (
    <QuizPageView
      key="quiz-page"
      quizzes={quizzes || []}
      isLoading={isLoading}
      error={error}
      categoryOptions={CATEGORY_OPTIONS}
      questionOptions={QUESTION_OPTIONS}
      durationOptions={DURATION_OPTIONS}
      mutate={mutate}
    />
  );
}
