import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExpenseOverview } from '@/components/admin/Dashboard/ExpenseOverview';
import { ExpenseList } from '@/components/admin/Dashboard/ExpenseList';
import { FormSubmissionsList } from '@/components/admin/FormSubmissions/FormSubmissionsList';

const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-expense-800">Admin Dashboard</h1>
      </div>

      <ExpenseOverview />

      <Tabs defaultValue="expenses" className="w-full">
        <TabsList>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="submissions">Form Submissions</TabsTrigger>
        </TabsList>
        <TabsContent value="expenses">
          <ExpenseList />
        </TabsContent>
        <TabsContent value="submissions">
          <FormSubmissionsList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;