import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, CloudUpload } from "lucide-react";

export const QuestionForm = (question, index) => (
  <>
    <div className="flex gap-4">
      <textarea
        rows="4"
        className="p-2.5 w-full lg:w-2/3 text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none"
        placeholder="Write your question here..."
        value={question.question}
        onChange={(e) => updateQuestion(index, "question", e.target.value)}
      />
      <label
        htmlFor={`uploadFile-${index}`}
        className="bg-white px-2 text-gray-500 font-semibold text-base rounded-lg flex-1 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed hover:border-blue-500 transition duration-200 ease-in-out"
      >
        {isFile[index] ? (
          <figure className="w-full h-32 max-h-32 rounded-lg overflow-hidden">
            <img
              src={isFile[index]}
              alt={`Preview question ${index + 1}`}
              className="w-full h-full object-contain"
            />
          </figure>
        ) : (
          <>
            <CloudUpload size={32} className="text-blue-500" />
            <span className="mt-2">Upload file</span>
          </>
        )}
        <input
          type="file"
          id={`uploadFile-${index}`}
          className="hidden"
          onChange={(e) => handleImageUpload(index, e.target.files[0])}
        />
      </label>
    </div>
    <div className="grid grid-cols-2 gap-4">
      {question.options.map((option, optionIndex) => (
        <div key={optionIndex} className="flex gap-2 items-center">
          <Button
            variant="outline"
            onClick={() => updateOption(index, optionIndex)}
            className={`${
              option.isCorrect && "bg-green-50 ring-1 ring-green-400"
            }`}
          >
            <CheckCircle2 className="text-green-500" />
          </Button>
          <Input
            placeholder={`Input option ${optionIndex + 1}`}
            value={option.text}
            onChange={(e) => {
              updateOption(index, optionIndex, "text", e.target.value);
            }}
          />
        </div>
      ))}
    </div>
  </>
);
