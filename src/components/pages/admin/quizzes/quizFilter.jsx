import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Search } from "lucide-react";

export default function FilterSection({
  searchTerm,
  onSearchChange,
  filterCategory,
  onFilterChange,
  categoryOptions,
}) {
  return (
    <div className="flex space-x-4">
      <div className="flex-1">
        <Input
          startIcon={<Search />}
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="w-64">
        <Select
          label="Filter Category"
          options={categoryOptions}
          value={filterCategory}
          onChange={(e) => onFilterChange(e.target.value)}
        />
      </div>
    </div>
  );
}
