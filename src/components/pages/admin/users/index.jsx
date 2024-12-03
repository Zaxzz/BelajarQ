import React, { useMemo, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, UserCircle } from "lucide-react";
import Layout from "@/components/layout/adminLayout";
import { Modal } from "@/components/ui/modal";
import { Select } from "@/components/ui/select";
import UserCard from "@/components/partials/userCard";
import { Toast, useToast } from "@/components/ui/toast";
import { Alert } from "@/components/ui/alert";

export default function UsersPageView({
  users,
  isLoading,
  error,
  statusOptions,
  roleOptions,
  mutate,
}) {
  const { toast, showToast, hideToast } = useToast();
  const [state, setState] = useState({
    isAddModalOpen: false,
    isEditModalOpen: false,
    showDeleteConfirmation: false,
    selectedUser: null,
    searchTerm: "",
    filterRole: "",
  });

  const [userForm, setUserForm] = useState({
    userName: "",
    email: "",
    role: roleOptions[2].value,
    status: statusOptions[0].value,
  });

  const filteredUsers = useMemo(() => {
    if (!Array.isArray(users)) return [];

    return users.filter((user) => {
      const matchesRole =
        !state.filterRole ||
        user.role?.toLowerCase() === state.filterRole.toLowerCase();

      const matchesSearchTerm =
        user.userName?.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(state.searchTerm.toLowerCase());

      return matchesRole && matchesSearchTerm;
    });
  }, [state.filterRole, state.searchTerm, users]);

  const resetForm = () =>
    setUserForm({
      userName: "",
      email: "",
      role: roleOptions[2].value,
      status: statusOptions[0].value,
    });

  const handleFormChange = (field, value) => {
    if (field === "role") value = Array.isArray(value) ? value : [value];
    setUserForm((prev) => ({ ...prev, [field]: value }));
  };

  const updateState = (updates) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const handleAddUser = async (e) => {
    e.preventDefault();

    try {
      const { userName, email, role, status } = userForm;

      if (!userName || !email || !role || !status) {
        showToast({
          title: "Warning",
          message: "Please fill in all required fields.",
          type: "error",
        });
        return;
      }

      const rolesArray = Array.isArray(role) ? role : [role];

      await axios.post(
        `${process.env.NEXT_PUBLIC_KONTENBASE_API_URL}/Users`,
        {
          userName,
          password: "belajarQ2024",
          firstName: "",
          email,
          role: rolesArray,
          isEmailVerified: true,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      resetForm();
      updateState({ isAddModalOpen: false });
      mutate();

      showToast({
        title: "Success",
        message: "User added successfully.",
        type: "success",
      });
    } catch (error) {
      console.error("Error adding user:", error);
      showToast({
        title: "Error",
        message: "Failed to add user.",
        type: "error",
      });
    }
  };

  const handleEditUser = async (e) => {
    e.preventDefault();

    try {
      const { userName, email, role, status } = userForm;

      if (!userName || !email || !role || !status) {
        showToast({
          title: "Warning",
          message: "Please fill in all required fields.",
          type: "error",
        });
        return;
      }

      await axios.patch(
        `${process.env.NEXT_PUBLIC_KONTENBASE_API_URL}/Users/${state.selectedUser._id}`,
        { userName, email, role, status },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      updateState({ isEditModalOpen: false, selectedUser: null });
      resetForm();
      mutate();

      showToast({
        title: "Success",
        message: "User updated successfully.",
        type: "success",
      });
    } catch (error) {
      console.error("Error editing user:", error);
      showToast({
        title: "Error",
        message: "Failed to update user.",
        type: "error",
      });
    }
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_KONTENBASE_API_URL}/Users/${state.selectedUser._id}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
          },
        }
      );

      updateState({
        showDeleteConfirmation: false,
        selectedUser: null,
      });

      mutate();

      showToast({
        title: "Success",
        message: "User deleted successfully.",
        type: "success",
      });
    } catch (error) {
      console.error("Error deleting user:", error);

      showToast({
        title: "Error",
        message: error.response?.data?.message || "Failed to delete user",
        type: "error",
      });

      updateState({
        showDeleteConfirmation: false,
        selectedUser: null,
      });

      throw error;
    }
  };

  const openEditModal = (user) => {
    updateState({
      isEditModalOpen: true,
      selectedUser: user,
    });

    setUserForm({
      userName: user.userName,
      email: user.email,
      role: user.role,
      status: user.status,
    });
  };

  const openDeleteModal = (user) => {
    updateState({
      showDeleteConfirmation: true,
      selectedUser: user,
    });
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
            Users Management
          </motion.h1>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={() => updateState({ isAddModalOpen: true })}>
              <Plus className="mr-2" /> Add User
            </Button>
          </motion.div>
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
            <Input
              startIcon={<Search />}
              placeholder="Search users..."
              value={state.searchTerm}
              onChange={(e) => updateState({ searchTerm: e.target.value })}
            />
          </div>
          <div className="w-64">
            <Select
              label="Filter Role"
              options={roleOptions}
              value={state.filterRole}
              onChange={(e) => updateState({ filterRole: e.target.value })}
            />
          </div>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredUsers.map((user) => (
                  <UserCard
                    key={user._id}
                    user={user}
                    onEdit={() => openEditModal(user)}
                    onDelete={() => openDeleteModal(user)}
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

        <AnimatePresence>
          {state.isAddModalOpen && (
            <Modal
              title="User"
              isOpen={state.isAddModalOpen}
              onClose={() => {
                resetForm();
                updateState({ isAddModalOpen: false });
              }}
              onSubmit={handleAddUser}
            >
              <div className="space-y-4">
                <Input
                  label="Username"
                  placeholder="Enter username"
                  value={userForm.userName}
                  onChange={(e) => handleFormChange("userName", e.target.value)}
                  required
                />
                <Input
                  label="Email"
                  type="email"
                  placeholder="Enter email"
                  value={userForm.email}
                  onChange={(e) => handleFormChange("email", e.target.value)}
                  required
                />
                <Select
                  label="Role"
                  options={roleOptions.slice(1)}
                  value={userForm.role}
                  onChange={(e) => handleFormChange("role", e.target.value)}
                  required
                />
                <Select
                  label="Status"
                  options={statusOptions}
                  value={userForm.status}
                  onChange={(e) => handleFormChange("status", e.target.value)}
                  required
                />
              </div>
            </Modal>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {state.isEditModalOpen && state.selectedUser && (
            <Modal
              title="User"
              isEditing
              isOpen={state.isEditModalOpen}
              onClose={() => updateState({ isEditModalOpen: false })}
              onSubmit={handleEditUser}
            >
              <div className="space-y-4">
                <Input
                  label="Username"
                  placeholder="Enter Username"
                  value={userForm.userName}
                  onChange={(e) => handleFormChange("userName", e.target.value)}
                  required
                />
                <Input
                  label="Email"
                  type="email"
                  placeholder="Enter email"
                  value={userForm.email}
                  onChange={(e) => handleFormChange("email", e.target.value)}
                  required
                />
                <Select
                  label="Role"
                  options={roleOptions.slice(1)}
                  value={userForm.role}
                  onChange={(e) => handleFormChange("role", e.target.value)}
                  required
                />
                <Select
                  label="Status"
                  options={statusOptions}
                  value={userForm.status}
                  onChange={(e) => handleFormChange("status", e.target.value)}
                  required
                />
              </div>
            </Modal>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {state.showDeleteConfirmation && state.selectedUser && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex justify-center"
            >
              <div className="w-full max-w-md">
                <Alert
                  type="warning"
                  title="Confirm Delete User"
                  description={`Are you sure you want to delete the user "${state.selectedUser.userName}"?`}
                >
                  <div className="flex justify-end space-x-2 mt-4">
                    <Button
                      variant="outline"
                      onClick={() =>
                        updateState({
                          showDeleteConfirmation: false,
                          selectedUser: null,
                        })
                      }
                    >
                      Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleDeleteUser}>
                      Delete
                    </Button>
                  </div>
                </Alert>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <Toast toast={toast} onClose={hideToast} />
    </Layout>
  );
}
