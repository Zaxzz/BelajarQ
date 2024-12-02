import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";

const AccordionMenu = ({ label, icon: Icon, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-2">
      <motion.button
        whileHover={{ x: 5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center w-full justify-between p-3 rounded-lg transition font-semibold ${
          isOpen ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"
        }`}
      >
        <div className="flex items-center">
          <Icon className="mr-3" size={24} />
          {label}
        </div>
        {isOpen ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
      </motion.button>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={
          isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
        }
        className={`overflow-hidden bg-gray-50 p-3 rounded-lg ${
          isOpen ? "" : "hidden"
        }`}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default AccordionMenu;
