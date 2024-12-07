import { motion } from "framer-motion";
import {
  Brain,
  GraduationCap,
  Users,
  LogOut,
  LayoutDashboard,
  Library,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Sidebar() {
  const router = useRouter();

  const mainMenuItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin",
    },
    {
      label: "Users",
      icon: Users,
      href: "/admin/users",
    },
    {
      label: "Courses",
      icon: GraduationCap,
      href: "/admin/courses",
    },
    {
      label: "Subjects",
      icon: Library,
      href: "/admin/subjects",
    },
    {
      label: "Quizzes",
      icon: Brain,
      href: "/admin/quizzes",
    },
  ];

  return (
    <div className="fixed left-0 top-0 w-64 h-full bg-[#fff] border-r border-gray-100 shadow-md flex flex-col">
      <div className="flex items-center justify-center mb-10 p-4">
        <LayoutDashboard size={32} className="text-blue-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar">
        {mainMenuItems.map((menu) => (
          <motion.div
            key={menu.label}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href={menu.href}>
              <div
                className={`rounded-lg transition font-semibold cursor-pointer flex items-center p-3 ${
                  router.pathname === menu.href && "bg-blue-50 text-blue-600"
                }`}
              >
                <menu.icon className="mr-3" size={24} />
                {menu.label}
              </div>
            </Link>
          </motion.div>
        ))}
      </nav>

      <div className="p-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center w-full p-3 bg-blue-200 text-blue-600 rounded-lg transition-colors duration-200 ease-in-out font-semibold"
        >
          <LogOut className="mr-3" size={24} />
          Logout
        </motion.button>
      </div>
    </div>
  );
}
