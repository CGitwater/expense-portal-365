import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

export const SSOSettings = () => {
  const { toast } = useToast();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Implementation for saving SSO settings
      toast({
        title: "Success",
        description: "SSO settings saved successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save SSO settings",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSave} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="clientId">Client ID</Label>
          <Input id="clientId" name="clientId" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="clientSecret">Client Secret</Label>
          <Input id="clientSecret" name="clientSecret" type="password" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tenantId">Azure AD Tenant ID</Label>
          <Input id="tenantId" name="tenantId" required />
        </div>

        <Button type="submit">Save SSO Settings</Button>
      </form>
    </Card>
  );
};