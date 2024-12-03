import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, FileQuestion, Plus } from "lucide-react";
import Layout from "@/components/layout/adminLayout";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { QuizCard } from "@/components/partials/quizCard";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useRouter } from "next/router";
import QuizLoading from "./loading";
import ErrorQuizzes from "./error";
import { Toast, useToast } from "@/components/ui/toast";
import axios from "axios";
import { Alert } from "@/components/ui/alert";

export default function QuizPageView({
  quizzes,
  isLoading,
  error,
  categoryOptions,
  questionOptions,
  durationOptions,
  mutate,
}) {
  const router = useRouter();
  const { hideToast, showToast, toast } = useToast();
  const [state, setState] = useState({
    isAddModalOpen: false,
    isEditModalOpen: false,
    selectedQuiz: null,
    searchTerm: "",
    filterCategory: "",
    showDeleteConfirmation: false,
    quizToDelete: null,
  });

  const [quizForm, setQuizForm] = useState({
    title: "",
    category: categoryOptions[1].value || "",
    duration: durationOptions[1].value || "",
    totalQuestion: questionOptions[1].value || "",
  });

  const resetForm = () => {
    setQuizForm({
      title: "",
      category: categoryOptions[1]?.value || "",
      duration: durationOptions[1]?.value || "",
      totalQuestion: questionOptions[1]?.value || "",
    });
  };

  const handleFormChange = (field, value) => {
    setQuizForm({ ...quizForm, [field]: value });
  };

  const handleAddQuiz = async (e) => {
    e.preventDefault();
    try {
      const { title, category, duration, totalQuestion } = quizForm;
      if (!title || !category || !duration || !totalQuestion) {
        showToast({
          title: "Peringatan",
          message: "Please fill in all required fields.",
          type: "error",
        });
        return;
      }

      await axios.post("/api/quizzes", {
        title,
        category,
        duration,
        totalQuestion,
      });
      setState((prev) => ({ ...prev, isAddModalOpen: false }));
      resetForm();
      mutate();
      showToast({
        title: "Success",
        message: "Quiz added successfully.",
        type: "success",
      });
    } catch (error) {
      console.error("Error adding quiz:", error);
    }
  };

  const handleEditQuiz = async (e) => {
    e.preventDefault();
    try {
      const { title, category, duration, totalQuestion } = quizForm;
      if (!title || !category || !duration || !totalQuestion) {
        showToast({
          title: "Peringatan",
          message: "Please fill in all required fields.",
          type: "error",
        });
        return;
      }

      const updateData = {
        title,
        category,
        duration,
        totalQuestion,
      };

      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_KONTENBASE_API_URL}/quizzes/${state.selectedQuiz._id}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      setState((prev) => ({
        ...prev,
        isEditModalOpen: false,
        selectedQuiz: null,
      }));
      resetForm();
      mutate();
      showToast({
        title: "Success",
        message: "Quiz updated successfully",
        type: "success",
      });
      return response.data;
    } catch (error) {
      console.error("Error updating quiz:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to update quiz";
      showToast({
        title: "Error",
        message: errorMessage,
        type: "error",
      });
      setState((prev) => ({
        ...prev,
        isEditModalOpen: true,
      }));
      throw error;
    }
  };

  const handleDeleteQuiz = async () => {
    try {
      const quiz = state.quizToDelete;
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_KONTENBASE_API_URL}/quizzes/${quiz._id}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
          },
        }
      );

      // Close delete confirmation and reset quizToDelete
      setState((prev) => ({
        ...prev,
        showDeleteConfirmation: false,
        quizToDelete: null,
      }));

      mutate();
      showToast({
        title: "Success",
        message: "Quiz deleted successfully",
        type: "success",
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting quiz:", error);
      showToast({
        title: "Error",
        message: error.response?.data?.message || "Failed to delete quiz",
        type: "error",
      });

      // Close delete confirmation
      setState((prev) => ({
        ...prev,
        showDeleteConfirmation: false,
        quizToDelete: null,
      }));

      throw error;
    }
  };

  const openEditModal = (quiz) => {
    setState((prev) => ({
      ...prev,
      isEditModalOpen: true,
      selectedQuiz: quiz,
    }));

    setQuizForm({
      title: quiz.title,
      category: quiz.category,
      duration: quiz.duration,
      totalQuestion: quiz.totalQuestion.toString(),
    });
  };

  const openDeleteConfirmation = (quiz) => {
    setState((prev) => ({
      ...prev,
      showDeleteConfirmation: true,
      quizToDelete: quiz,
    }));
  };

  const filteredQuizzes = useMemo(() => {
    return quizzes.filter(
      (quiz) =>
        (quiz.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
          quiz.category
            .toLowerCase()
            .includes(state.searchTerm.toLowerCase())) &&
        (state.filterCategory === "" || quiz.category === state.filterCategory)
    );
  }, [quizzes, state.searchTerm, state.filterCategory]);

  const updateState = (updates) => {
    setState((prevState) => ({ ...prevState, ...updates }));
  };

  if (isLoading) {
    return <QuizLoading />;
  }

  if (error) {
    return <ErrorQuizzes error={error} />;
  }

  return (
    <Layout>
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
            Quizzes
          </motion.h1>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={() => updateState({ isAddModalOpen: true })}>
              <Plus className="mr-2" /> Add Quiz
            </Button>
          </motion.div>
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
            <Input
              startIcon={<Search />}
              placeholder="Search quizzes..."
              value={state.searchTerm}
              onChange={(e) => updateState({ searchTerm: e.target.value })}
            />
          </div>
          <div className="w-64">
            <Select
              label="Filter Category"
              options={categoryOptions}
              value={state.filterCategory}
              onChange={(e) => updateState({ filterCategory: e.target.value })}
            />
          </div>
        </div>

        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredQuizzes.map((quiz) => (
              <QuizCard
                key={quiz.id}
                quiz={quiz}
                onView={() => router.push(`/admin/quizzes/${quiz._id}`)}
                onEdit={() => openEditModal(quiz)}
                onDelete={() => openDeleteConfirmation(quiz)}
              />
            ))}

            {filteredQuizzes.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-8 text-gray-500"
              >
                <FileQuestion
                  className="mx-auto mb-4 text-gray-400"
                  size={48}
                />
                No quizzes found
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {state.isAddModalOpen && (
          <Modal
            title="Quiz"
            isOpen={state.isAddModalOpen}
            onClose={() => {
              setState((prev) => ({ ...prev, isAddModalOpen: false }));
              resetForm();
            }}
            onSubmit={handleAddQuiz}
          >
            <div className="space-y-4">
              <Input
                label="Quiz Name"
                placeholder="Name Quiz..."
                value={quizForm.title}
                onChange={(e) => handleFormChange("title", e.target.value)}
                required
              />
              <Select
                label="Category"
                options={categoryOptions.slice(1)}
                value={quizForm.category}
                onChange={(e) => handleFormChange("category", e.target.value)}
                required
              />
              <Select
                label="Duration"
                options={durationOptions.slice(1)}
                value={quizForm.duration}
                onChange={(e) => handleFormChange("duration", e.target.value)}
                required
              />
              <Select
                label="Total Question"
                options={questionOptions.slice(1)}
                value={quizForm.totalQuestion}
                onChange={(e) =>
                  handleFormChange("totalQuestion", e.target.value)
                }
                required
              />
            </div>
          </Modal>
        )}

        {state.isEditModalOpen && state.selectedQuiz && (
          <Modal
            title="Quiz"
            isEditing
            isOpen={state.isEditModalOpen}
            onClose={() => {
              setState((prev) => ({
                ...prev,
                isEditModalOpen: false,
                selectedQuiz: null,
              }));
              resetForm();
            }}
            onSubmit={handleEditQuiz}
          >
            <div className="space-y-4">
              <Input
                label="Quiz Name"
                placeholder="Name Quiz..."
                value={quizForm.title}
                onChange={(e) => handleFormChange("title", e.target.value)}
                required
              />
              <Select
                label="Category"
                options={categoryOptions.slice(1)}
                value={quizForm.category}
                onChange={(e) => handleFormChange("category", e.target.value)}
                required
              />
              <Select
                label="Duration"
                options={durationOptions.slice(1)}
                value={quizForm.duration}
                onChange={(e) => handleFormChange("duration", e.target.value)}
                required
              />
              <Select
                label="Total Question"
                options={questionOptions.slice(1)}
                value={quizForm.totalQuestion}
                onChange={(e) =>
                  handleFormChange("totalQuestion", e.target.value)
                }
                required
              />
            </div>
          </Modal>
        )}

        <AnimatePresence>
          {state.showDeleteConfirmation && state.quizToDelete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
            >
              <div className="w-full max-w-md">
                <Alert
                  type="warning"
                  title="Konfirmasi Hapus Quiz"
                  description={`Apakah Anda yakin ingin menghapus quiz "${state.quizToDelete.title}"?`}
                >
                  <div className="flex justify-end space-x-2 mt-4">
                    <Button
                      variant="outline"
                      onClick={() =>
                        setState((prev) => ({
                          ...prev,
                          showDeleteConfirmation: false,
                          quizToDelete: null,
                        }))
                      }
                    >
                      Batal
                    </Button>
                    <Button variant="destructive" onClick={handleDeleteQuiz}>
                      Hapus
                    </Button>
                  </div>
                </Alert>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <Toast toast={toast} onClose={hideToast} />
    </Layout>
  );
}
