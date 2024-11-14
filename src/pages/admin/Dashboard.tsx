import { useQuery } from '@tanstack/react-query';
import { getSharePointItems } from '@/services/sharepoint';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfQuarter, endOfQuarter, startOfYear, endOfYear } from 'date-fns';

const AdminDashboard = () => {
  const [timeFilter, setTimeFilter] = useState('month');
  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'yyyy-MM'));

  const getDateRange = () => {
    const date = new Date(selectedMonth);
    switch (timeFilter) {
      case 'month':
        return { start: startOfMonth(date), end: endOfMonth(date) };
      case 'quarter':
        return { start: startOfQuarter(date), end: endOfQuarter(date) };
      case 'year':
        return { start: startOfYear(date), end: endOfYear(date) };
      default:
        return { start: startOfMonth(date), end: endOfMonth(date) };
    }
  };

  const { data: expenses, isLoading: expensesLoading } = useQuery({
    queryKey: ['expenses', timeFilter, selectedMonth],
    queryFn: () => getSharePointItems({
      siteUrl: 'your-sharepoint-site-url',
      listName: 'ExpenseClaims',
      dateRange: getDateRange()
    })
  });

  const { data: travelRequests, isLoading: travelLoading } = useQuery({
    queryKey: ['travel-requests', timeFilter, selectedMonth],
    queryFn: () => getSharePointItems({
      siteUrl: 'your-sharepoint-site-url',
      listName: 'TravelRequests',
      dateRange: getDateRange()
    })
  });

  const totalExpenses = expenses?.reduce((sum, expense) => sum + expense.amount, 0) || 0;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-expense-800">Admin Dashboard</h1>
        <div className="flex gap-4">
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Monthly</SelectItem>
              <SelectItem value="quarter">Quarterly</SelectItem>
              <SelectItem value="year">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-4 py-2 rounded border border-input bg-background"
          />
          <Button>Export Reports</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-2">Pending Approvals</h3>
          <p className="text-3xl font-bold text-expense-600">
            {expenses?.filter(e => e.status === 'pending').length || 0}
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-2">Total Expenses</h3>
          <p className="text-3xl font-bold text-expense-600">
            ${totalExpenses.toLocaleString()}
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-2">Travel Requests</h3>
          <p className="text-3xl font-bold text-expense-600">
            {travelRequests?.length || 0}
          </p>
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
                  ) : expenses?.length ? (
                    expenses.map((expense) => (
                      <tr key={expense.id} className="border-b">
                        <td className="p-2">{format(new Date(expense.date), 'dd/MM/yyyy')}</td>
                        <td className="p-2">{expense.employee}</td>
                        <td className="p-2">{expense.description}</td>
                        <td className="p-2">${expense.amount.toLocaleString()}</td>
                        <td className="p-2">{expense.status}</td>
                        <td className="p-2">
                          <Button variant="outline" size="sm">Review</Button>
                        </td>
                      </tr>
                    ))
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
                  ) : travelRequests?.length ? (
                    travelRequests.map((request) => (
                      <tr key={request.id} className="border-b">
                        <td className="p-2">{format(new Date(request.date), 'dd/MM/yyyy')}</td>
                        <td className="p-2">{request.employee}</td>
                        <td className="p-2">{request.destination}</td>
                        <td className="p-2">{request.duration} days</td>
                        <td className="p-2">{request.status}</td>
                        <td className="p-2">
                          <Button variant="outline" size="sm">Review</Button>
                        </td>
                      </tr>
                    ))
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