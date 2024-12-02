import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Info, CheckCircle, XCircle, X } from "lucide-react";

const alertVariants = {
  success: {
    icon: CheckCircle,
    colors: {
      bg: "bg-green-50",
      border: "border-green-700",
      text: "text-blue-900",
      iconColor: "text-green-500",
    },
  },
  error: {
    icon: XCircle,
    colors: {
      bg: "bg-red-50",
      border: "border-red-700",
      text: "text-red-900",
      iconColor: "text-red-500",
    },
  },
  warning: {
    icon: AlertTriangle,
    colors: {
      bg: "bg-yellow-50",
      border: "border-yellow-700",
      text: "text-black",
      iconColor: "text-yellow-500",
    },
  },
  info: {
    icon: Info,
    colors: {
      bg: "bg-blue-50",
      border: "border-blue-700",
      text: "text-blue-900",
      iconColor: "text-blue-500",
    },
  },
};

export const Alert = ({
  type = "info",
  title,
  description,
  className = "",
  children,
  onClose,
  closable = false,
}) => {
  const variant = alertVariants[type];
  const Icon = variant.icon;
  const { colors } = variant;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      className={`relative flex items-start space-x-4 p-4 rounded-xl border shadow-sm ${colors.bg} ${colors.border} ${colors.text} ${className}`}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="pt-1"
      >
        <Icon className={`size-6 ${colors.iconColor}`} />
      </motion.div>

      <div className="flex-1 space-y-1">
        {title && (
          <motion.h3
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-semibold text-base"
          >
            {title}
          </motion.h3>
        )}

        {description && (
          <motion.p
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm opacity-80"
          >
            {description}
          </motion.p>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-2"
          >
            {children}
          </motion.div>
        )}
      </div>

      {closable && onClose && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className={`absolute top-3 right-3 hover:bg-gray-100 rounded-full p-1 transition-colors ${colors.text}`}
        >
          <X className="w-4 h-4" />
        </motion.button>
      )}
    </motion.div>
  );
};

export const AlertGroup = ({ children }) => (
  <motion.div className="space-y-4" transition={{ staggerChildren: 0.1 }}>
    <AnimatePresence>{children}</AnimatePresence>
  </motion.div>
);
