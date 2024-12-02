import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function QuizHeader({ title, onAddQuiz }) {
  return (
    <div className="flex justify-between items-center">
      <motion.h1
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="text-2xl font-bold"
      >
        {title}
      </motion.h1>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button onClick={onAddQuiz}>
          <Plus className="mr-2" /> Add Quiz
        </Button>
      </motion.div>
    </div>
  );
}
