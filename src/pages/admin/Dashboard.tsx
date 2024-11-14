import { useQuery } from '@tanstack/react-query';
import { getSharePointItems } from '@/services/sharepoint';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AdminDashboard = () => {
  const { data: expenses, isLoading: expensesLoading } = useQuery({
    queryKey: ['expenses'],
    queryFn: () => getSharePointItems({
      siteUrl: 'your-sharepoint-site-url',
      listName: 'ExpenseClaims'
    })
  });

  const { data: travelRequests, isLoading: travelLoading } = useQuery({
    queryKey: ['travel-requests'],
    queryFn: () => getSharePointItems({
      siteUrl: 'your-sharepoint-site-url',
      listName: 'TravelRequests'
    })
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-expense-800">Admin Dashboard</h1>
        <Button>Export Reports</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-2">Pending Approvals</h3>
          <p className="text-3xl font-bold text-expense-600">12</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-2">Total Expenses</h3>
          <p className="text-3xl font-bold text-expense-600">$24,150</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-2">Travel Requests</h3>
          <p className="text-3xl font-bold text-expense-600">8</p>
        </Card>
      </div>

      <Tabs defaultValue="expenses" className="w-full">
        <TabsList>
          <TabsTrigger value="expenses">Expense Claims</TabsTrigger>
          <TabsTrigger value="travel">Travel Requests</TabsTrigger>
        </TabsList>
        
        <TabsContent value="expenses" className="space-y-4">
          <Card className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Date</th>
                    <th className="text-left p-2">Employee</th>
                    <th className="text-left p-2">Description</th>
                    <th className="text-left p-2">Amount</th>
                    <th className="text-left p-2">Status</th>
                    <th className="text-left p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {expensesLoading ? (
                    <tr>
                      <td colSpan={6} className="text-center p-4">Loading...</td>
                    </tr>
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center p-4">No expenses found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="travel" className="space-y-4">
          <Card className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Date</th>
                    <th className="text-left p-2">Employee</th>
                    <th className="text-left p-2">Destination</th>
                    <th className="text-left p-2">Duration</th>
                    <th className="text-left p-2">Status</th>
                    <th className="text-left p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {travelLoading ? (
                    <tr>
                      <td colSpan={6} className="text-center p-4">Loading...</td>
                    </tr>
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center p-4">No travel requests found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;