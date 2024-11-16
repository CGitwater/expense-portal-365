import { UserList } from "./UserList";
import { CreateUserForm } from "./CreateUserForm";

export const UserManagement = () => {
  return (
    <div className="space-y-6">
      <CreateUserForm />
      <UserList />
    </div>
  );
};