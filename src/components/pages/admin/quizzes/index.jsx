import { useState, useEffect, useMemo } from "react";
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
    category: categoryOptions[1]?.value || "", // categoryOptions yang lama
    duration: durationOptions[1]?.value || "",
    totalQuestion: questionOptions[1]?.value || "",
  });

 const [categoryOptionsState, setCategoryOptionsState] = useState([]);
 
 useEffect(() => {
  const fetchCategoryOptions = async () => {
    try {
      const response = await axios.get(
        "https://api.kontenbase.com/query/api/v1/79297f44-a03f-401b-a2c6-6b7ce1c7866f/Detailbelajar?$lookup=*"
      );

      // Memformat kategori yang diambil dari API
      const categories = response.data.map((item) => ({
        label: item.Mapel, // Mapel adalah nama kategori
        value: item._id,   // ID kategori
      }));

      // Tambahkan opsi default
      const optionsWithDefault = [
        { label: "Pilih Mapel", value: "" },
        ...categories,
      ];

      setCategoryOptionsState(optionsWithDefault);

      // Mengatur kategori default
      setQuizForm((prevForm) => ({
        ...prevForm,
        category: "", // Set ke nilai kosong agar pengguna harus memilih
      }));
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  fetchCategoryOptions();
}, []);

  

  const resetForm = () => {
    setQuizForm({
      title: "",
      category: categoryOptionsState[0]?.value || "", // Menggunakan categoryOptionsState setelah data di-fetch
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
  
      // Validasi input
      if (!title || !category || !duration || category === "" || !totalQuestion) {
        showToast({
          title: "Peringatan",
          message: "Please fill in all required fields.",
          type: "warning",
        });
        return;
      }
  
      // Format category menjadi array dengan ID saja
      const formattedCategory = Array.isArray(category) ? category.map(cat => cat.value) : [category];
  
      console.log("Formatted mapel:", formattedCategory);
  
      const newQuizData = {
        title,
        category: formattedCategory, // Menggunakan array dengan ID saja
        duration,
        totalQuestion,
      };
  
      // Mengirim data kuis baru ke API
      const response = await axios.post(
        `https://api.kontenbase.com/query/api/v1/79297f44-a03f-401b-a2c6-6b7ce1c7866f/quizzes`,
        newQuizData,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      // Memperbarui state dan memberikan feedback kepada pengguna
      setState((prev) => ({
        ...prev,
        isAddModalOpen: false,
      }));
      resetForm();
      mutate();
      showToast({
        title: "Success",
        message: "Quiz added successfully",
        type: "success",
      });
  
      return response.data;
    } catch (error) {
      console.error("Error adding quiz:", error);
      const errorMessage = error.response?.data?.message || "Failed to add quiz";
      showToast({
        title: "Error",
        message: errorMessage,
        type: "error",
      });
  
      setState((prev) => ({
        ...prev,
        isAddModalOpen: true,
      }));
      throw error;
    }
  };
  
  const handleCategorySelect = (id) => {
    setSelectedCategoryId(id);
  };

  const handleEditQuiz = async (e) => {
    e.preventDefault();
    try {
      const { title, category, duration, totalQuestion } = quizForm;
  
      // Validasi input
      if (!title || !category || !duration || category === "" || !totalQuestion) {
        showToast({
          title: "Peringatan",
          message: "Please fill in all required fields.",
          type: "warning",
        });
        return;
      }
  
      // Format category menjadi array dengan ID saja
      const formattedCategory = Array.isArray(category) ? category.map(cat => cat.value) : [category];
  
      console.log("Formatted mapel:", formattedCategory);
  
      const updateData = {
        title,
        category: formattedCategory, // Menggunakan array dengan ID saja
        duration,
        totalQuestion,
      };
  
      // Mengirim data yang diperbarui ke API
      const response = await axios.patch(
        `https://api.kontenbase.com/query/api/v1/79297f44-a03f-401b-a2c6-6b7ce1c7866f/quizzes/${state.selectedQuiz._id}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      // Memperbarui state dan memberikan feedback kepada pengguna
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
      const errorMessage = error.response?.data?.message || "Failed to update quiz";
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
        `https://api.kontenbase.com/query/api/v1/79297f44-a03f-401b-a2c6-6b7ce1c7866f/quizzes/${quiz._id}`,
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
            <Button onClick={() => setState((prev) => ({ ...prev, isAddModalOpen: true }))}>
              <Plus className="mr-2" /> Add Quiz
            </Button>
          </motion.div>
        </div>

        {/* Filter and Search Components */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <Input
              startIcon={<Search />}
              placeholder="Search quizzes..."
              value={state.searchTerm}
              onChange={(e) => setState({ searchTerm: e.target.value })}
            />
          </div>
          <div className="w-64">
            <Select
              label="Filter Category"
              options={categoryOptionsState} // Menggunakan categoryOptionsState yang baru
              value={state.filterCategory}
              onChange={(e) => setState({ filterCategory: e.target.value })}
            />
          </div>
        </div>

        {/* Quizzes List */}
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
          </AnimatePresence>
        </motion.div>

        {/* Add Quiz Modal */}
        {state.isAddModalOpen && (
  <Modal
    title="Add Quiz"
    isOpen={state.isAddModalOpen}
    onClose={() => setState((prev) => ({ ...prev, isAddModalOpen: false }))}
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
        options={categoryOptionsState}
        value={quizForm.category}
        onChange={(e) => handleFormChange("category", e.target.value)}
        required
      />
      <Select
        label="Duration"
        options={durationOptions}
        value={quizForm.duration}
        onChange={(e) => handleFormChange("duration", e.target.value)}
        required
      />
      <Select
        label="Total Questions"
        options={questionOptions}
        value={quizForm.totalQuestion}
        onChange={(e) => handleFormChange("totalQuestion", e.target.value)}
        required
      />
    </div>
  </Modal>
)}

        {/* Edit Quiz Modal */}
        {state.isEditModalOpen && state.selectedQuiz && (
          <Modal
            title="Edit Quiz"
            isOpen={state.isEditModalOpen}
            onClose={() => setState((prev) => ({ ...prev, isEditModalOpen: false }))}
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
                options={categoryOptionsState}
                value={quizForm.category}
                onChange={(e) => handleFormChange("category", e.target.value)}
                required
              />
              <Select
                label="Duration"
                options={durationOptions}
                value={quizForm.duration}
                onChange={(e) => handleFormChange("duration", e.target.value)}
                required
              />
              <Select
                label="Total Questions"
                options={questionOptions}
                value={quizForm.totalQuestion}
                onChange={(e) => handleFormChange("totalQuestion", e.target.value)}
                required
              />
            </div>
          </Modal>
        )}

        {/* Delete Confirmation Modal */}
        {state.showDeleteConfirmation && state.quizToDelete && (
          <Modal
            title="Confirm Deletion"
            isOpen={state.showDeleteConfirmation}
            onClose={() => setState((prev) => ({ ...prev, showDeleteConfirmation: false }))}
            onSubmit={handleDeleteQuiz}
          >
            <Alert type="warning">
              Are you sure you want to delete this quiz? This action cannot be undone.
            </Alert>
          </Modal>
        )}

      </motion.div>
      <Toast toast={toast} onClose={hideToast} />
    </Layout>
  );
}
