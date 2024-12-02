import { Button } from "@/components/ui/button";
import { Edit, FileQuestion, Save } from "lucide-react";
import { QuizInfo } from "./quizInfo";

export const QuestionCard = ({ question, index, onSave, renderForm }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4 hover:shadow-sm transition-all">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <span className="font-medium text-lg">Question {index + 1}</span>
        <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded font-semibold">
          Point: {question.points}
        </span>
      </div>
      <Button onClick={onSave}>
        {question.isSaved ? (
          <Edit className="mr-2" />
        ) : (
          <Save className="mr-2" />
        )}
        {question.isSaved ? "Edit" : "Save"}
      </Button>
    </div>
    {question.isSaved ? (
      <>
        <QuizInfo
          icon={FileQuestion}
          label="Question"
          value={question.question}
        />
        <div className="grid grid-cols-2 gap-2">
          {question.options.map((option, idx) => (
            <div
              key={idx}
              className={`p-2 rounded text-sm flex gap-2 ${
                option.isCorrect
                  ? "bg-green-50 ring-1 ring-green-400"
                  : "bg-gray-50"
              }`}
            >
              {option.text}
            </div>
          ))}
        </div>
      </>
    ) : (
      renderForm(question, index)
    )}
  </div>
);
