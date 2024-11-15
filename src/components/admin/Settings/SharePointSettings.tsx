import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

export const SharePointSettings = () => {
  const { toast } = useToast();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Implementation for saving SharePoint settings
      toast({
        title: "Success",
        description: "SharePoint settings saved successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save SharePoint settings",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSave} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="siteUrl">SharePoint Site URL</Label>
          <Input id="siteUrl" name="siteUrl" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="listName">List Name</Label>
          <Input id="listName" name="listName" required />
        </div>

        <Button type="submit">Save SharePoint Settings</Button>
      </form>
    </Card>
  );
};