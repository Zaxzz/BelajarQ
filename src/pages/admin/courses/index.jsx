import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Layout from "@/components/layout/adminLayout";
import { Select } from "@/components/ui/select";
import { CourseCard } from "@/components/partials/courseCard";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]); // State untuk data kursus
  const [searchTerm, setSearchTerm] = useState(""); // State untuk pencarian
  const [filterCategory, setFilterCategory] = useState(""); // State untuk filter kategori
  const [isLoading, setIsLoading] = useState(true); // State untuk status loading

  const categoryOptions = [
    { value: "", label: "All Categories" },
    { value: "SD", label: "SD" },
    { value: "SMP", label: "SMP" },
    { value: "SMA", label: "SMA" },
    { value: "KULIAH", label: "KULIAH" },
  ];

  // Mengambil data dari API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          "https://api.kontenbase.com/query/api/v1/79297f44-a03f-401b-a2c6-6b7ce1c7866f/Belajar?$lookup=*"
        );
        const data = await response.json();
        const formattedCourses = data.map((item) => ({
          id: item._id,
          description: item.description,
          category: item.Kategori,
          image: item.image[0]?.url || "/api/placeholder/800/600", // Gunakan placeholder jika gambar tidak ada
        }));
        setCourses(formattedCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Filter kursus berdasarkan kategori dan pencarian
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

        {isLoading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
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
                  No Courses Found
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </motion.div>
    </Layout>
  );
}
