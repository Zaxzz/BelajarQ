  import React, { useMemo, useState, useEffect } from "react";
  import axios from "axios";
  import { motion, AnimatePresence } from "framer-motion";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import { Search, Plus, UserCircle } from "lucide-react";
  import Layout from "@/components/layout/adminLayout";
  import { Toast, useToast } from "@/components/ui/toast";

  export default function UsersPageView({ statusOptions, roleOptions }) {
    const { toast, showToast } = useToast();

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [state, setState] = useState({
      searchTerm: "",
      filterRole: "",
    });

    const [editUser, setEditUser] = useState(null); // State for editing user

    // Fetch users from API
    useEffect(() => {
      fetchUsers();
    }, []);

    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://api.kontenbase.com/query/api/v1/79297f44-a03f-401b-a2c6-6b7ce1c7866f/Users",
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
            },
          }
        );
        setUsers(response.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setError(err.message || "Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    };

    // Handle delete user
    const handleDelete = async (userId) => {
      try {
        await axios.delete(
          `https://api.kontenbase.com/query/api/v1/79297f44-a03f-401b-a2c6-6b7ce1c7866f/Users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
            },
          }
        );
        showToast({ title: "User deleted successfully", variant: "success" });
        fetchUsers(); // Refresh the user list
      } catch (err) {
        console.error("Failed to delete user:", err);
        showToast({ title: "Failed to delete user", variant: "destructive" });
      }
    };

    // Handle edit user
    const handleEdit = async (user) => {
      try {
        const updatedUser = await axios.patch(
          `https://api.kontenbase.com/query/api/v1/79297f44-a03f-401b-a2c6-6b7ce1c7866f/Users/${user._id}`,
          {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
            },
          }
        );
        showToast({ title: "User updated successfully", variant: "success" });
        setEditUser(null); // Exit edit mode
        fetchUsers(); // Refresh the user list
      } catch (err) {
        console.error("Failed to update user:", err);
        showToast({ title: "Failed to update user", variant: "destructive" });
      }
    };

    // Filter users based on search and role
    const filteredUsers = useMemo(() => {
      if (!Array.isArray(users)) return [];

      return users.filter((user) => {
        const matchesRole =
          !state.filterRole ||
          user.role?.some((role) =>
            role.toLowerCase().includes(state.filterRole.toLowerCase())
          );

        const matchesSearchTerm =
          user.userName?.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
          user.email?.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
          user.firstName?.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
          user.lastName?.toLowerCase().includes(state.searchTerm.toLowerCase());

        return matchesRole && matchesSearchTerm;
      });
    }, [state.filterRole, state.searchTerm, users]);

    const handleSearchChange = (event) => {
      setState((prevState) => ({
        ...prevState,
        searchTerm: event.target.value,
      }));
    };

    const handleRoleFilterChange = (event) => {
      setState((prevState) => ({
        ...prevState,
        filterRole: event.target.value,
      }));
    };

    return (
      <Layout>
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">User Management</h1>
            <Button className="flex items-center gap-2">
              <Plus size={20} /> Add User
            </Button>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-4 mb-4">
            <Input
              type="text"
              placeholder="Search by name, email..."
              value={state.searchTerm}
              onChange={handleSearchChange}
            />
            <select
              value={state.filterRole}
              onChange={handleRoleFilterChange}
              className="border rounded p-2"
            >
              <option value="">All Roles</option>
              {roleOptions.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>

          {/* User List */}
          {isLoading ? (
            <p>Loading users...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : (
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr>
                  <th className="border border-gray-200 px-4 py-2">Username</th>
                  <th className="border border-gray-200 px-4 py-2">Email</th>
                  <th className="border border-gray-200 px-4 py-2">Role</th>
                  <th className="border border-gray-200 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredUsers.map((user) => (
                    <tr key={user._id}>
                      <td className="border border-gray-200 px-4 py-2">
                        {user.userName}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {editUser === user._id ? (
                          <Input
                            value={user.email}
                            onChange={(e) =>
                              setEditUser((prev) => ({
                                ...prev,
                                email: e.target.value,
                              }))
                            }
                          />
                        ) : (
                          user.email
                        )}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {user.role.join(", ")}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {editUser === user._id ? (
                          <Button onClick={() => handleEdit(user)}>Save</Button>
                        ) : (
                          <Button onClick={() => setEditUser(user._id)}>Edit</Button>
                        )}
                        <Button
                          className="ml-2"
                          variant="destructive"
                          onClick={() => handleDelete(user._id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          )}
        </div>
      </Layout>
    );
  }
