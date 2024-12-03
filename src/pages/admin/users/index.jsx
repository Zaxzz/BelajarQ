import UsersPageView from "@/components/pages/admin/users";
import axios from "axios";
import useSWR from "swr";

const ROLE_OPTIONS = [
  { value: "", label: "All Roles" },
  { value: ["admin"], label: "Admin" },
  { value: ["student"], label: "Student" },
];

const STATUS_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

const fetcher = (url) => axios.get(url).then((res) => res.data.data);

export default function UsersPage() {
  const {
    data: users,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/admin/users", fetcher);

  return (
    <UsersPageView
      key="users-page"
      users={users}
      isLoading={isLoading}
      error={error}
      mutate={mutate}
      roleOptions={ROLE_OPTIONS}
      statusOptions={STATUS_OPTIONS}
    />
  );
}
