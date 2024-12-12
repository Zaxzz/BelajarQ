import QuizPageView from "@/components/pages/admin/quizzes";
import axios from "axios";
import useSWR from "swr";

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

  // Ambil data Mapel dari API
  const { data: mapelData, error: mapelError, isLoading: mapelLoading } = useSWR(
    "https://api.kontenbase.com/query/api/v1/79297f44-a03f-401b-a2c6-6b7ce1c7866f/Detailbelajar?$lookup=*",
    fetcher
  );

  // Jika data Mapel masih loading atau error
  if (mapelLoading) return <div>Loading categories...</div>;
  if (mapelError) return <div>Error loading categories</div>;

  // Cek apakah mapelData ada dan bukan undefined
  const CATEGORY_OPTIONS = [
    { value: "", label: "All Categories" },
    ...(mapelData && Array.isArray(mapelData) ? mapelData.map((item) => ({
      value: item.mapel,
      label: item.Mapel,
    })) : [])
  ];

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
