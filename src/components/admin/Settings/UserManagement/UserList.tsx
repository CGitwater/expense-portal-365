import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2, Trash2 } from "lucide-react";

interface User {
  id: string;
  email: string;
  role: string;
  settings: {
    can_create_forms: boolean;
    can_manage_users: boolean;
  };
}

export const UserList = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    loadUsers();
  }, []);

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
  );
};