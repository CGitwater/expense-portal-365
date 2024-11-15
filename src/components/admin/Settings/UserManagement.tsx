import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Loader2, Plus, Trash2 } from "lucide-react";

interface User {
  id: string;
  email: string;
  role: string;
  settings: {
    can_create_forms: boolean;
    can_manage_users: boolean;
  };
}

export const UserManagement = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const loadUsers = async () => {
    try {
      const { data: users, error } = await supabase
        .from("users")
        .select(`
          id,
          email,
          role,
          user_settings (
            can_create_forms,
            can_manage_users
          )
        `);

      if (error) throw error;
      setUsers(users.map(user => ({
        ...user,
        settings: user.user_settings[0]
      })));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load users",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createUser = async () => {
    try {
      const { error } = await supabase.from("users").insert({
        email: newUser.email,
        password_hash: newUser.password, // In a real app, you'd hash this
        role: newUser.role,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "User created successfully",
      });

      setNewUser({ email: "", password: "", role: "user" });
      loadUsers();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create user",
        variant: "destructive",
      });
    }
  };

  const updateUserPermissions = async (userId: string, data: Partial<User['settings']>) => {
    try {
      const { error } = await supabase
        .from("user_settings")
        .update(data)
        .eq("user_id", userId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "User permissions updated",
      });

      loadUsers();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user permissions",
        variant: "destructive",
      });
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      const { error } = await supabase
        .from("users")
        .delete()
        .eq("id", userId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "User deleted successfully",
      });

      loadUsers();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Create New User</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <Select
              value={newUser.role}
              onValueChange={(value) => setNewUser({ ...newUser, role: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={createUser} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Create User
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Manage Users</h3>
        {loading ? (
          <div className="flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : (
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="p-4 border rounded-lg flex items-center justify-between"
              >
                <div>
                  <p className="font-medium">{user.email}</p>
                  <p className="text-sm text-gray-500">Role: {user.role}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="space-x-2">
                    <input
                      type="checkbox"
                      id={`create-forms-${user.id}`}
                      checked={user.settings?.can_create_forms}
                      onChange={(e) =>
                        updateUserPermissions(user.id, {
                          can_create_forms: e.target.checked,
                        })
                      }
                    />
                    <Label htmlFor={`create-forms-${user.id}`}>Can Create Forms</Label>
                  </div>
                  <div className="space-x-2">
                    <input
                      type="checkbox"
                      id={`manage-users-${user.id}`}
                      checked={user.settings?.can_manage_users}
                      onChange={(e) =>
                        updateUserPermissions(user.id, {
                          can_manage_users: e.target.checked,
                        })
                      }
                    />
                    <Label htmlFor={`manage-users-${user.id}`}>Can Manage Users</Label>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500"
                    onClick={() => deleteUser(user.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};