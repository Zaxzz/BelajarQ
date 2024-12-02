import {
  Clock,
  ArrowRight,
  ScrollText,
  Hourglass,
  School,
  Edit,
  Trash,
} from "lucide-react";

export const QuizCard = ({ quiz, onView, onEdit, onDelete }) => {
  return (
    <div className="group relative bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-blue-100 hover:-translate-y-1">
      <div className="p-6 flex flex-col justify-between gap-4 h-full">
        <div className="space-y-4">
          <div className="flex-1 space-y-2.5">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1.5 w-fit text-xs font-medium px-2.5 py-1 rounded-lg bg-gray-50 text-gray-600">
                <Hourglass size={12} />
                Upcoming
              </div>
              <div className="flex items-center gap-1.5 w-fit text-xs font-medium px-2.5 py-1 rounded-lg bg-purple-50 text-purple-600">
                <School size={12} />
                {quiz.category}
              </div>
            </div>

            <h3 className="font-semibold text-xl text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {quiz.title}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 text-gray-600">
              <div className="p-2 rounded-lg bg-gray-50">
                <Clock size={16} />
              </div>
              <span className="text-sm font-medium">
                {quiz.duration} Minutes
              </span>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <div className="p-2 rounded-lg bg-gray-50">
                <ScrollText size={16} />
              </div>
              <span className="text-sm font-medium">
                {quiz.totalQuestion} Questions
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
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
          <button
            onClick={onView}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors group"
          >
            View Quiz
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
