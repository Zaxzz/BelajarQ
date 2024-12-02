import { BookOpen, Edit, Star } from "lucide-react";
import { Badge } from "../ui/badge";
import { ChalkboardTeacher } from "@phosphor-icons/react";

const SubjectCard = ({ subject, onEdit }) => {
  return (
    <div className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      <div className="relative">
        <div className="aspect-video relative overflow-hidden">
          <img
            src={subject.image}
            alt={subject.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        <button
          className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-105 focus:ring-2 focus:ring-blue-500"
          onClick={() => onEdit(subject)}
        >
          <Edit size={16} className="text-gray-700" />
        </button>
      </div>

      <div className="p-5 space-y-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600 inline-flex items-center gap-1.5">
              <ChalkboardTeacher size={12} />
              {subject.subject}
            </span>
          </div>

          <h3 className="font-semibold text-lg text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {subject.title}
          </h3>

          <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
            {subject.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2.5 text-gray-600">
            <div className="p-1.5 rounded-lg bg-gray-100">
              <BookOpen size={14} />
            </div>
            <span className="text-xs font-medium text-gray-600">
              {subject.lesson}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectCard;
