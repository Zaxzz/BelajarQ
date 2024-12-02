import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  Plus,
  UserCircle,
} from "lucide-react";
import Layout from "@/components/layout/adminLayout";
import { Modal } from "@/components/ui/modal";
import { Select } from "@/components/ui/select";
import UserCard from "@/components/partials/userCard";

// Sample users data
const users = [
  {
    id: 1,
    username: "johndoe",
    email: "john.doe@example.com",
    role: "admin",
    status: "online",
    registeredAt: "2023-05-15",
  },
  {
    id: 2,
    username: "janedoe",
    email: "jane.doe@example.com",
    role: "instructor",
    status: "offline",
    registeredAt: "2023-07-22",
  },
  {
    id: 3,
    username: "alexsmith",
    email: "alex.smith@example.com",
    role: "student",
    status: "online",
    registeredAt: "2023-09-10",
  },
];

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const roleOptions = [
    { value: "", label: "All Roles" },
    { value: "admin", label: "Admin" },
    { value: "instructor", label: "Instructor" },
    { value: "student", label: "Student" },
  ];

  const filteredUsers = users.filter(
    (user) =>
      (user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterRole === "" || user.role === filterRole)
  );

  const handleEditUser = (e) => {
    e.preventDefault();
    // Edit user logic
    setIsEditModalOpen(false);
  };

  const handleDeleteUser = (userId) => {
    // Delete user logic
    console.log(`Delete user with ID: ${userId}`);
  };

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex justify-between items-center">
          <motion.h1
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-2xl font-bold"
          >
            Users
          </motion.h1>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={() => setIsAddModalOpen(true)}>
              <Plus className="mr-2" /> Add User
            </Button>
          </motion.div>
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
            <Input
              startIcon={<Search />}
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-64">
            <Select
              label="Filter Role"
              options={roleOptions}
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Registered
                </th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredUsers.map((user) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    onEdit={(userData) => {
                      setSelectedUser(userData);
                      setIsEditModalOpen(true);
                    }}
                    onDelete={handleDeleteUser}
                  />
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <UserCircle className="mx-auto mb-4 text-gray-400" size={48} />
              No users found
            </div>
          )}
        </div>

        {/* Add User Modal */}
        <AnimatePresence>
          {isAddModalOpen && (
            <Modal
              title="User"
              isOpen={isAddModalOpen}
              onClose={() => setIsAddModalOpen(false)}
              onSubmit={console.log}
            >
              <div className="space-y-4">
                <Input label="Username" placeholder="Enter username" required />
                <Input
                  label="Email"
                  type="email"
                  placeholder="Enter email"
                  required
                />
                <Select label="Role" options={roleOptions.slice(1)} required />
                <Select
                  label="Status"
                  options={[
                    { value: "online", label: "Online" },
                    { value: "offline", label: "Offline" },
                  ]}
                  required
                />
              </div>
            </Modal>
          )}
        </AnimatePresence>

        {/* Edit User Modal */}
        <AnimatePresence>
          {isEditModalOpen && (
            <Modal
              title="User"
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
              onSubmit={handleEditUser}
              isEditing={true}
            >
              <div className="space-y-4">
                <Input
                  label="Username"
                  placeholder="Enter username"
                  defaultValue={selectedUser?.username}
                  required
                />
                <Input
                  label="Email"
                  type="email"
                  placeholder="Enter email"
                  defaultValue={selectedUser?.email}
                  required
                />
                <Select
                  label="Role"
                  options={roleOptions.slice(1)}
                  defaultValue={selectedUser?.role}
                  required
                />
                <Select
                  label="Status"
                  options={[
                    { value: "online", label: "Online" },
                    { value: "offline", label: "Offline" },
                  ]}
                  defaultValue={selectedUser?.status}
                  required
                />
              </div>
            </Modal>
          )}
        </AnimatePresence>
      </motion.div>
    </Layout>
  );
}
