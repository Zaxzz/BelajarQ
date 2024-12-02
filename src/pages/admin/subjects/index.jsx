import Layout from "@/components/layout/adminLayout";
import SubjectCard from "@/components/partials/subjectCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Select } from "@/components/ui/select";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, CloudUpload, Plus, Search } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState, useMemo } from "react";

const CATEGORY_OPTIONS = [
  { value: "", label: "All Categories" },
  { value: "SD", label: "SD" },
  { value: "SMP", label: "SMP" },
  { value: "SMA", label: "SMA" },
  { value: "Kuliah", label: "Kuliah" },
];

const INITIAL_SUBJECTS = [
  {
    id: 1,
    title: "Advanced JavaScript Programming",
    description:
      "Deep dive into modern JavaScript techniques, ES6+ features, and advanced programming patterns.",
    category: "SD",
    lesson: "Sejarah 10 November sebagai Hari Pahlawan",
    subject: "Sejarah",
    status: "active",
    image: "/api/placeholder/800/600",
  },
  {
    id: 2,
    title: "Machine Learning Fundamentals",
    description:
      "Comprehensive introduction to machine learning concepts, algorithms, and practical applications.",
    category: "SMP",
    lesson: "Sejarah 10 November sebagai Hari Pahlawan",
    subject: "Sejarah",
    status: "draft",
    image: "/api/placeholder/800/600",
  },
  {
    id: 3,
    title: "UI/UX Design Principles",
    description:
      "Master the art of user interface and user experience design with hands-on projects and case studies.",
    category: "SMA",
    lesson: "Sejarah 10 November sebagai Hari Pahlawan",
    subject: "Sejarah",
    status: "active",
    image: "/api/placeholder/800/600",
  },
];

export default function SubjectsPage() {
  const router = useRouter();
  const { category } = router.query;
  const [state, setState] = useState({
    isAddModalOpen: false,
    isEditModalOpen: false,
    selectedSubject: null,
    searchTerm: "",
    filterCategory: category || "",
  });

  const filteredSubjects = useMemo(() => {
    return INITIAL_SUBJECTS.filter((subject) => {
      const matchesCategory =
        !state.filterCategory ||
        subject.category.toLowerCase() === state.filterCategory.toLowerCase();
      const matchesSearchTerm = subject.title
        .toLowerCase()
        .includes(state.searchTerm.toLowerCase());
      return matchesCategory && matchesSearchTerm;
    });
  }, [state.filterCategory, state.searchTerm]);

  const updateState = (updates) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

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

  const handleAddSubject = (e) => {
    e.preventDefault();
    updateState({ isAddModalOpen: false });
  };

  const handleEditSubject = (e) => {
    e.preventDefault();
    updateState({ isEditModalOpen: false });
  };

  const openEditModal = (subject) => {
    updateState({
      selectedSubject: subject,
      isEditModalOpen: true,
    });
  };

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
              options={CATEGORY_OPTIONS}
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
              onClose={() => updateState({ isAddModalOpen: false })}
              onSubmit={handleAddSubject}
              title="Subject"
            >
              <div className="space-y-4">
                <label
                  htmlFor="uploadFile1"
                  className="bg-white p-2 text-gray-500 font-semibold text-base rounded-lg flex-1 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed hover:border-blue-500 transition duration-200 ease-in-out"
                  aria-label="Upload file"
                >
                  <CloudUpload size={32} className="text-blue-500" />
                  <span className="mt-2">Upload file</span>
                  <input type="file" id="uploadFile1" className="hidden" />
                  <p className="text-xs font-medium text-gray-400 mt-2 text-center">
                    PNG, JPG, SVG, WEBP, and GIF are allowed.
                  </p>
                </label>
                <Input
                  label="Subject Name"
                  placeholder="Enter subject name"
                  required
                />
                <Input
                  label="Description"
                  placeholder="Subject description"
                  type="textarea"
                />
                <Select
                  label="Category"
                  options={CATEGORY_OPTIONS.slice(1)}
                  required
                />
                <Input
                  label="Mata Pelajaran"
                  placeholder="Mata Pelajaran"
                  required
                />
                <Input label="Materi" placeholder="Materi" type="number" />
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
              isEditing={true}
              title="Subject"
            >
              <div className="space-y-4">
                <label
                  htmlFor="uploadFile1"
                  className="bg-white p-2 text-gray-500 font-semibold text-base rounded-lg flex-1 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed hover:border-blue-500 transition duration-200 ease-in-out"
                  aria-label="Upload file"
                >
                  <CloudUpload size={32} className="text-blue-500" />
                  <span className="mt-2">Upload file</span>
                  <input type="file" id="uploadFile1" className="hidden" />
                  <p className="text-xs font-medium text-gray-400 mt-2 text-center">
                    PNG, JPG, SVG, WEBP, and GIF are allowed.
                  </p>
                </label>
                <Input
                  label="Subject Name"
                  placeholder="Enter subject name"
                  defaultValue={state.selectedSubject?.title}
                  required
                />
                <Input
                  label="Description"
                  placeholder="Subject description"
                  type="textarea"
                  defaultValue={state.selectedSubject?.description}
                />
                <Select
                  label="Category"
                  options={CATEGORY_OPTIONS.slice(1)}
                  defaultValue={state.selectedSubject?.category}
                  required
                />
                <Input
                  label="Mata Pelajaran"
                  placeholder="Mata Pelajaran"
                  defaultValue={state.selectedSubject?.subject}
                  required
                />
                <Input
                  label="Materi"
                  placeholder="Materi"
                  defaultValue={state.selectedSubject?.lesson}
                />
              </div>
            </Modal>
          )}
        </AnimatePresence>
      </motion.div>
    </Layout>
  );
}
