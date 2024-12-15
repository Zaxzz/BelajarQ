import Layout from "@/components/layout/adminLayout";
import SubjectCard from "@/components/partials/subjectCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Select } from "@/components/ui/select";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Plus, Search } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState, useMemo } from "react";
import { Toast, useToast } from "@/components/ui/toast";
import { Alert } from "@/components/ui/alert";
import SubjectLoading from "./loading";
import ErrorSubjects from "./error";

export default function SubjectsPageView({
  subjects,
  isLoading,
  error,
  categoryOptions,
  mutate,
  category,
}) {
  const router = useRouter();
  const { hideToast, showToast, toast } = useToast();

  const [state, setState] = useState({
    subjects: subjects || [],
    isAddModalOpen: false,
    isEditModalOpen: false,
    isDeleteModalOpen: false,
    selectedSubject: null,
    searchTerm: "",
    filterCategory: category || "",
    showDeleteConfirmation: false,
  });

  const [subjectForm, setSubjectForm] = useState({
    title: "",
    description: "",
    category: categoryOptions[1].value || "",
    subject: "",
    lesson: "",
  });

  const filteredSubjects = useMemo(() => {
    if (!Array.isArray(subjects)) return [];

    return subjects.filter((subject) => {
      const matchesCategory =
        !state.filterCategory ||
        subject.category?.toLowerCase() === state.filterCategory.toLowerCase();
      const matchesSearchTerm = subject.title
        ?.toLowerCase()
        .includes(state.searchTerm.toLowerCase());
      return matchesCategory && matchesSearchTerm;
    });
  }, [state.filterCategory, state.searchTerm, subjects]);

  useEffect(() => {
    router.push(
      {
        pathname: "/admin/subjects",
        query: { category: state.filterCategory || undefined },
      },
      undefined,
      { shallow: true }
    );
  }, [state.filterCategory, router]);

  const resetForm = () => {
    setSubjectForm({
      title: "",
      description: "",
      category: categoryOptions[1].value || "",
      subject: "",
      lesson: "",
    });
  };

  const handleFormChange = (field, value) => {
    setSubjectForm((prev) => ({ ...prev, [field]: value }));
  };

  const updateState = (updates) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const handleAddSubject = async (e) => {
    e.preventDefault();
    try {
      const { title, category, subject, lesson, description } = subjectForm;
      if (!title || !category || !subject || !lesson || !description) {
        showToast({
          title: "Warning",
          message: "Please fill in all required fields.",
          type: "error",
        });
        return;
      }
      await axios.post("/api/admin/subjects", {
        title,
        category,
        subject,
        lesson,
        description,
      });
      resetForm();
      updateState({ isAddModalOpen: false });
      mutate();
      showToast({
        title: "Success",
        message: "Subject added successfully.",
        type: "success",
      });
    } catch (error) {
      console.error("Error adding subject:", error);
      showToast({
        title: "Error",
        message: "Failed to add subject.",
        type: "error",
      });
    }
  };

  const handleEditSubject = async (e) => {
    e.preventDefault();
    try {
      const { title, category, subject, lesson, description } = subjectForm;
      if (!title || !category || !subject || !lesson || !description) {
        showToast({
          title: "Warning",
          message: "Please fill in all required fields.",
          type: "error",
        });
        return;
      }

      const response = await axios.patch(
        `https://api.kontenbase.com/query/api/v1/79297f44-a03f-401b-a2c6-6b7ce1c7866f/subjects/${state.selectedSubject._id}`,
        { title, category, subject, lesson, description },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      updateState({ isEditModalOpen: false, selectedSubject: null });
      resetForm();
      mutate();
      showToast({
        title: "Success",
        message: "Subject updated successfully.",
        type: "success",
      });
      return response.data;
    } catch (error) {
      console.error("Error editing subject:", error);
      showToast({
        title: "Error",
        message: "Failed to update subject.",
        type: "error",
      });
    }
  };

  const handleDeleteSubject = async () => {
    try {
      const response = await axios.delete(
        `https://api.kontenbase.com/query/api/v1/79297f44-a03f-401b-a2c6-6b7ce1c7866f/subjects/${state.selectedSubject._id}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
          },
        }
      );

      updateState({
        showDeleteConfirmation: false,
        selectedSubject: null,
      });
      mutate();
      showToast({
        title: "Success",
        message: "Subject deleted successfully.",
        type: "success",
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting quiz:", error);
      showToast({
        title: "Error",
        message: error.response?.data?.message || "Failed to delete subject",
        type: "error",
      });

      setState((prev) => ({
        ...prev,
        showDeleteConfirmation: false,
        selectedSubject: null,
      }));

      throw error;
    }
  };

  const openEditModal = (subject) => {
    setState((prev) => ({
      ...prev,
      isEditModalOpen: true,
      selectedSubject: subject,
    }));

    setSubjectForm({
      title: subject.title,
      description: subject.description,
      category: subject.category,
      subject: subject.subject,
      lesson: subject.lesson,
    });
  };

  const openDeleteModal = (subject) => {
    setState((prev) => ({
      ...prev,
      showDeleteConfirmation: true,
      selectedSubject: subject,
    }));
  };

  if (isLoading) return <SubjectLoading />;
  if (error) return <ErrorSubjects error={error} />;

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
            Subjects
          </motion.h1>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={() => router.push("/admin/courses")}>
              <ArrowLeft className="mr-2" /> Back
            </Button>
          </motion.div>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-fit"
        >
          <Button onClick={() => updateState({ isAddModalOpen: true })}>
            <Plus className="mr-2" /> Add Subject
          </Button>
        </motion.div>

        <div className="flex gap-4">
          <div className="flex-1">
            <Input
              startIcon={<Search />}
              placeholder="Search subjects..."
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
            {filteredSubjects.map((subject) => (
              <SubjectCard
                key={subject.id}
                subject={subject}
                onEdit={() => openEditModal(subject)}
                onDelete={() => openDeleteModal(subject)}
              />
            ))}
            {filteredSubjects.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-8 text-gray-500"
              >
                No subjects found
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {state.isAddModalOpen && (
            <Modal
              isOpen={state.isAddModalOpen}
              onClose={() => {
                resetForm();
                updateState({ isAddModalOpen: false });
              }}
              onSubmit={handleAddSubject}
              title="Subject"
            >
              <div className="space-y-4">
                <Input
                  label="Subject Name"
                  placeholder="Enter subject name"
                  value={subjectForm.title}
                  onChange={(e) => handleFormChange("title", e.target.value)}
                  required
                />
                <Input
                  label="Description"
                  placeholder="Subject description"
                  value={subjectForm.description}
                  onChange={(e) =>
                    handleFormChange("description", e.target.value)
                  }
                  type="textarea"
                />
                <Select
                  label="Category"
                  value={subjectForm.category}
                  onChange={(e) => handleFormChange("category", e.target.value)}
                  options={categoryOptions.slice(1)}
                  required
                />
                <Input
                  label="Mata Pelajaran"
                  placeholder="Mata Pelajaran"
                  value={subjectForm.subject}
                  onChange={(e) => handleFormChange("subject", e.target.value)}
                  required
                />
                <Input
                  label="Materi"
                  placeholder="Materi"
                  value={subjectForm.lesson}
                  onChange={(e) => handleFormChange("lesson", e.target.value)}
                  required
                />
              </div>
            </Modal>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {state.isEditModalOpen && state.selectedSubject && (
            <Modal
              isOpen={state.isEditModalOpen}
              onClose={() => updateState({ isEditModalOpen: false })}
              onSubmit={handleEditSubject}
              isEditing
              title="Subject"
            >
              <div className="space-y-4">
                <Input
                  label="Subject Name"
                  placeholder="Enter subject name"
                  value={subjectForm.title}
                  onChange={(e) => handleFormChange("title", e.target.value)}
                  required
                />
                <Input
                  label="Description"
                  placeholder="Subject description"
                  value={subjectForm.description}
                  onChange={(e) =>
                    handleFormChange("description", e.target.value)
                  }
                  type="textarea"
                />
                <Select
                  label="Category"
                  value={subjectForm.category}
                  onChange={(e) => handleFormChange("category", e.target.value)}
                  options={categoryOptions.slice(1)}
                  required
                />
                <Input
                  label="Mata Pelajaran"
                  placeholder="Mata Pelajaran"
                  value={subjectForm.subject}
                  onChange={(e) => handleFormChange("subject", e.target.value)}
                  required
                />
                <Input
                  label="Materi"
                  placeholder="Materi"
                  value={subjectForm.lesson}
                  onChange={(e) => handleFormChange("lesson", e.target.value)}
                  required
                />
              </div>
            </Modal>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {state.showDeleteConfirmation && state.selectedSubject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex justify-center"
            >
              <div className="w-full max-w-md">
                <Alert
                  type="warning"
                  title="Konfirmasi Hapus Quiz"
                  description={`Apakah Anda yakin ingin menghapus pelajaran "${state.selectedSubject.subject}"?`}
                >
                  <div className="flex justify-end space-x-2 mt-4">
                    <Button
                      variant="outline"
                      onClick={() =>
                        setState((prev) => ({
                          ...prev,
                          showDeleteConfirmation: false,
                          selectedSubject: null,
                        }))
                      }
                    >
                      Batal
                    </Button>
                    <Button variant="destructive" onClick={handleDeleteSubject}>
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
