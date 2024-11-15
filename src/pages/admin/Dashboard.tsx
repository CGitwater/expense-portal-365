import { useQuery } from '@tanstack/react-query';
import { getSharePointItems } from '@/services/sharepoint';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface ExpenseRequest {
  id: string;
  date: string;
  employeeName: string;
  amount: number;
  category: string;
  status: 'pending' | 'approved' | 'declined';
  description: string;
}

const AdminDashboard = () => {
  const { toast } = useToast();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedExpense, setSelectedExpense] = useState<ExpenseRequest | null>(null);
  const [comment, setComment] = useState('');

  const { data: expenses, isLoading: expensesLoading } = useQuery({
    queryKey: ['expenses'],
    queryFn: () => getSharePointItems({
      siteUrl: 'your-sharepoint-site-url',
      listName: 'ExpenseClaims'
    })
  });

  const calculateTotalExpenses = (period: 'month' | 'quarter' | 'year') => {
    if (!expenses) return 0;
    const now = new Date();
    const filtered = expenses.filter((expense: ExpenseRequest) => {
      const expenseDate = new Date(expense.date);
      switch (period) {
        case 'month':
          return expenseDate.getMonth() === now.getMonth() && 
                 expenseDate.getFullYear() === now.getFullYear();
        case 'quarter':
          const quarter = Math.floor(now.getMonth() / 3);
          const expenseQuarter = Math.floor(expenseDate.getMonth() / 3);
          return expenseQuarter === quarter && 
                 expenseDate.getFullYear() === now.getFullYear();
        case 'year':
          return expenseDate.getFullYear() === now.getFullYear();
        default:
          return false;
      }
    });
    return filtered.reduce((acc: number, curr: ExpenseRequest) => acc + curr.amount, 0);
  };

  const handleApprove = async (id: string) => {
    try {
      // Implementation for approval logic
      toast({
        title: "Expense Approved",
        description: "The expense request has been approved successfully."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve expense request.",
        variant: "destructive"
      });
    }
  };

  const handleDecline = async (id: string) => {
    try {
      // Implementation for decline logic
      toast({
        title: "Expense Declined",
        description: "The expense request has been declined."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to decline expense request.",
        variant: "destructive"
      });
    }
  };

  const handleAddComment = async () => {
    if (!selectedExpense || !comment.trim()) return;
    try {
      // Implementation for adding comment
      toast({
        title: "Comment Added",
        description: "Your comment has been added successfully."
      });
      setComment('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add comment.",
        variant: "destructive"
      });
    }
  };

  const filteredExpenses = expenses?.filter((expense: ExpenseRequest) => {
    const categoryMatch = selectedFilter === 'all' || expense.category === selectedFilter;
    const statusMatch = selectedStatus === 'all' || expense.status === selectedStatus;
    return categoryMatch && statusMatch;
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-expense-800">Admin Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-2">Monthly Expenses</h3>
          <p className="text-3xl font-bold text-expense-600">£{calculateTotalExpenses('month').toFixed(2)}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-2">Quarterly Expenses</h3>
          <p className="text-3xl font-bold text-expense-600">£{calculateTotalExpenses('quarter').toFixed(2)}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-2">Yearly Expenses</h3>
          <p className="text-3xl font-bold text-expense-600">£{calculateTotalExpenses('year').toFixed(2)}</p>
        </Card>
      </div>

      <div className="flex gap-4 mb-6">
        <Select onValueChange={setSelectedFilter} defaultValue="all">
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="travel">Travel</SelectItem>
            <SelectItem value="meals">Meals</SelectItem>
            <SelectItem value="supplies">Supplies</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={setSelectedStatus} defaultValue="all">
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="declined">Declined</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Date</th>
                <th className="text-left p-2">Employee</th>
                <th className="text-left p-2">Amount</th>
                <th className="text-left p-2">Category</th>
                <th className="text-left p-2">Status</th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {expensesLoading ? (
                <tr>
                  <td colSpan={6} className="text-center p-4">Loading...</td>
                </tr>
              ) : filteredExpenses?.length ? (
                filteredExpenses.map((expense: ExpenseRequest) => (
                  <tr key={expense.id} className="border-b">
                    <td className="p-2">{new Date(expense.date).toLocaleDateString()}</td>
                    <td className="p-2">{expense.employeeName}</td>
                    <td className="p-2">£{expense.amount.toFixed(2)}</td>
                    <td className="p-2">{expense.category}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        expense.status === 'approved' ? 'bg-green-100 text-green-800' :
                        expense.status === 'declined' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {expense.status}
                      </span>
                    </td>
                    <td className="p-2">
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">View</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Expense Details</DialogTitle>
                              <DialogDescription>
                                Review expense details and add comments
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-medium">Description</h4>
                                <p>{expense.description}</p>
                              </div>
                              <div>
                                <h4 className="font-medium">Add Comment</h4>
                                <Textarea
                                  value={comment}
                                  onChange={(e) => setComment(e.target.value)}
                                  placeholder="Enter your comment..."
                                  className="mt-2"
                                />
                                <Button onClick={handleAddComment} className="mt-2">
                                  Add Comment
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleApprove(expense.id)}
                          className="bg-green-500 text-white hover:bg-green-600"
                        >
                          Approve
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDecline(expense.id)}
                          className="bg-red-500 text-white hover:bg-red-600"
                        >
                          Decline
                        </Button>
                      </div>
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
    </div>
  );
};

export default AdminDashboard;