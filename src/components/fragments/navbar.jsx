import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, LogOut, Settings, User, UserCircle } from "lucide-react";
import Breadcrumbs from "./breadcrumbs";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const ProfileDropdown = () => (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute right-0 top-full mt-2 w-48 bg-white shadow-lg rounded-lg border z-10"
    >
      <div className="px-4 py-3 border-b text-sm text-gray-600">
        Admin Dashboard
      </div>
      <ul>
        {[
          { icon: User, label: "Profile", action: () => {} },
          { icon: Settings, label: "Settings", action: () => {} },
          { icon: LogOut, label: "Logout", action: () => {} },
        ].map((item, index) => (
          <li
            key={index}
            className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer"
            onClick={item.action}
          >
            <item.icon className="mr-3" size={20} />
            {item.label}
          </li>
        ))}
      </ul>
    </motion.div>
  );

  return (
    <nav className="bg-white shadow-sm h-16 flex items-center justify-between px-6 relative">
      <Breadcrumbs />
      <div className="flex gap-4 items-center">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="mr-4 cursor-pointer text-gray-600 hover:text-blue-600"
        >
          <Bell size={24} />
        </motion.div>
        <div className="relative">
          <motion.div
            whileHover={{ scale: 1.1 }}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="cursor-pointer"
          >
            <UserCircle size={32} className="text-gray-700" />
          </motion.div>
          <AnimatePresence>
            {dropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10 bg-transparent"
                  onClick={() => setDropdownOpen(false)}
                />
                <ProfileDropdown />
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}
