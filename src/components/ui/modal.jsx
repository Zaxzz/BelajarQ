import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export const Modal = ({
  title,
  isOpen,
  onClose,
  isEditing = false,
  onSubmit,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[35rem] overflow-y-scroll p-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {isEditing ? "Edit" : "Add"} {title}
          </h2>
          <motion.button
            whileHover={{ rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
          >
            <X className="h-6 w-6 text-gray-500 hover:text-gray-700" />
          </motion.button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {children}

          <div className="flex justify-end space-x-3 mt-6">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button type="submit">
                {isEditing ? "Update" : "Create"} {title}
              </Button>
            </motion.div>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};
