import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SSOSettings } from "@/components/admin/Settings/SSOSettings";
import { SharePointSettings } from "@/components/admin/Settings/SharePointSettings";
import { BrandingSettings } from "@/components/admin/Settings/BrandingSettings";

const Settings = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Settings</h1>
      
      <Tabs defaultValue="sso" className="space-y-6">
        <TabsList>
          <TabsTrigger value="sso">Single Sign-On</TabsTrigger>
          <TabsTrigger value="sharepoint">SharePoint</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
        </TabsList>

        <TabsContent value="sso">
          <SSOSettings />
        </TabsContent>

        <TabsContent value="sharepoint">
          <SharePointSettings />
        </TabsContent>

        <TabsContent value="branding">
          <BrandingSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;