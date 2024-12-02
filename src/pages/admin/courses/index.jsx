import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Layout from "@/components/layout/adminLayout";
import { Select } from "@/components/ui/select";
import { CourseCard } from "@/components/partials/courseCard";

const courses = [
  {
    id: 1,
    description: "Berisi materi pelajaran mengenai tingkatan SD",
    category: "SD",
    status: "active",
    image: "/api/placeholder/800/600",
  },
  {
    id: 2,
    description: "Berisi materi pelajaran mengenai tingkatan SMP",
    category: "SMP",
    status: "draft",
    image: "/api/placeholder/800/600",
  },
  {
    id: 3,
    description: "Berisi materi pelajaran mengenai tingkatan SMA",
    category: "SMA",
    status: "draft",
    image: "/api/placeholder/800/600",
  },
  {
    id: 4,
    description: "Berisi materi pelajaran mengenai tingkatan Kuliah",
    category: "Kuliah",
    status: "draft",
    image: "/api/placeholder/800/600",
  },
];

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const categoryOptions = [
    { value: "", label: "All Categories" },
    { value: "SD", label: "SD" },
    { value: "SMP", label: "SMP" },
    { value: "SMA", label: "SMA" },
    { value: "Kuliah", label: "Kuliah" },
  ];

  const filteredCourses = courses.filter(
    (course) =>
      course.category.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory === "" || course.category === filterCategory)
  );

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
            Courses
          </motion.h1>
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
            <Input
              startIcon={<Search />}
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-64">
            <Select
              label="Filter Category"
              options={categoryOptions}
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            />
          </div>
        </div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
            {filteredCourses.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-8 text-gray-500"
              >
                No courses found
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </Layout>
  );
}
