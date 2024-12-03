import SubjectsPageView from "@/components/pages/admin/subjects";
import axios from "axios";
import { useRouter } from "next/router";
import useSWR from "swr";

const CATEGORY_OPTIONS = [
  { value: "", label: "All Categories" },
  { value: "SD", label: "SD" },
  { value: "SMP", label: "SMP" },
  { value: "SMA", label: "SMA" },
  { value: "Kuliah", label: "Kuliah" },
];

const fetcher = (url) => axios.get(url).then((res) => res.data.data);

export default function SubjectsPage() {
  const router = useRouter();
  const {
    data: subjects,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/subjects", fetcher);
  const { category } = router.query;

  return (
    <SubjectsPageView
      key="subjects-page"
      subjects={subjects}
      isLoading={isLoading}
      error={error}
      categoryOptions={CATEGORY_OPTIONS}
      mutate={mutate}
      category={category}
    />
  );
}
