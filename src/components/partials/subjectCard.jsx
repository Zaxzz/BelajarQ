import { BookOpen, Edit, Star, StarIcon, Trash } from "lucide-react";
import { ChalkboardTeacher } from "@phosphor-icons/react";

const SubjectCard = ({ subject, onEdit, onDelete }) => {
  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      <div className="p-5 space-y-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600 inline-flex items-center gap-1.5">
              <ChalkboardTeacher size={12} />
              {subject.subject}
            </span>
            <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600 inline-flex items-center gap-1.5">
              <StarIcon size={12} />
              {subject.category}
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
          <div className="flex gap-2">
            <button
              onClick={onEdit}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={onDelete}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-colors group"
            >
              <Trash size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectCard;
