import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import bcrypt from "bcryptjs";

export const CreateUserForm = () => {
  const { toast } = useToast();
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const createUser = async () => {
    try {
      // Hash password before storing
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newUser.password, salt);

      const { error } = await supabase.from("users").insert({
        email: newUser.email,
        password_hash: hashedPassword,
        role: newUser.role as "admin" | "user",
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "User created successfully",
      });

      setNewUser({ email: "", password: "", role: "user" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create user",
        variant: "destructive",
      });
    }
  };

  return (
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
  );
};