import { Edit, Trash2 } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const UserCard = ({ user, onEdit, onDelete }) => {
  return (
    <tr className="hover:bg-gray-50 transition-colors border-b">
      <td className="p-4">
        <div className="text-sm font-medium">{user.userName}</div>
        <div className="text-xs text-gray-500">{user.email}</div>
      </td>
      <td className="p-4 text-xs font-semibold text-gray-600">{user._id}</td>
      <td className="p-4">
        <Badge variant={user.role === "admin" ? "success" : "warning"}>
          {user.role}
        </Badge>
      </td>
      <td className="p-4">
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => onEdit(user)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => onDelete(user.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default UserCard;
