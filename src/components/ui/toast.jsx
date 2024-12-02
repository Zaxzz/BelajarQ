import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

export const useToast = () => {
  const [toast, setToast] = useState(null);

  const showToast = (config) => {
    setToast({
      message: config.message,
      title: config.title,
      type: config.type || "info",
      duration: config.duration || 4000,
    });
  };

  const hideToast = () => {
    setToast(null);
  };

  return { toast, showToast, hideToast };
};

// Komponen Toast
export const Toast = ({ toast, onClose }) => {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(onClose, toast.duration);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast) return null;

  const toastIcons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
  };

  const toastBackground = {
    success: "bg-green-50 border-green-200",
    error: "bg-red-50 border-red-200",
    warning: "bg-yellow-50 border-yellow-200",
    info: "bg-blue-50 border-blue-200",
  };

  return (
    <AnimatePresence>
      <motion.div
        key="toast"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
        className={`
          fixed top-4 right-4 w-96 p-4 rounded-lg shadow-xl border 
          flex items-start space-x-3 
          ${toastBackground[toast.type || "info"]}
        `}
      >
        <div className="flex-shrink-0">{toastIcons[toast.type || "info"]}</div>

        <div className="flex-grow">
          {toast.title && (
            <div className="font-semibold text-sm mb-1">{toast.title}</div>
          )}
          <p className="text-sm text-gray-700">{toast.message}</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
};
