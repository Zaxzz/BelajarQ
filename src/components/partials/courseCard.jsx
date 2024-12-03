import React from "react";
import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";

export const CourseCard = ({ course }) => {
  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:border-blue-100">
      <div className="relative">
        <div className="aspect-video overflow-hidden">
          <img
            src={course.image}
            alt={course.category}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      <div className="p-5 space-y-3">
        <div className="flex items-center gap-2 text-gray-500">
          <BookOpen size={16} className="text-gray-400" />
          <span className="text-sm font-medium">{course.category}</span>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {course.description}
        </h3>

        <Link
          href={`/admin/subjects?category=${encodeURIComponent(
            course.category
          )}`}
          className="group/link text-blue-600 hover:text-blue-700 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">View Details</span>
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1"
            />
          </div>
        </Link>
      </div>
    </div>
  );
};
