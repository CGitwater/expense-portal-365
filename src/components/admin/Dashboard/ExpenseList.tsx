import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const ExpenseList = () => {
  const { toast } = useToast();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedExpense, setSelectedExpense] = useState<any>(null);
  const [comment, setComment] = useState('');

  const { data: expenses, isLoading: expensesLoading } = useQuery({
    queryKey: ['expenses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('expense_requests')
        .select('*');
      if (error) throw error;
      return data;
    }
  });

  const handleApprove = async (id: string) => {
    try {
      const { error } = await supabase
        .from('expense_requests')
        .update({ status: 'approved' })
        .eq('id', id);
      
      if (error) throw error;
      
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
      const { error } = await supabase
        .from('expense_requests')
        .update({ status: 'declined' })
        .eq('id', id);
      
      if (error) throw error;
      
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

  const filteredExpenses = expenses?.filter((expense) => {
    const categoryMatch = selectedFilter === 'all' || expense.type === selectedFilter;
    const statusMatch = selectedStatus === 'all' || expense.status === selectedStatus;
    return categoryMatch && statusMatch;
  });

  return (
    <Card className="p-6">
      <div className="flex gap-4 mb-6">
        <Select onValueChange={setSelectedFilter} defaultValue="all">
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="mileage">Mileage</SelectItem>
            <SelectItem value="prepaid">Prepaid</SelectItem>
            <SelectItem value="general">General</SelectItem>
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

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Date</th>
              <th className="text-left p-2">Type</th>
              <th className="text-left p-2">Amount</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expensesLoading ? (
              <tr>
                <td colSpan={5} className="text-center p-4">Loading...</td>
              </tr>
            ) : filteredExpenses?.length ? (
              filteredExpenses.map((expense) => (
                <tr key={expense.id} className="border-b">
                  <td className="p-2">{new Date(expense.created_at).toLocaleDateString()}</td>
                  <td className="p-2">{expense.type}</td>
                  <td className="p-2">£{expense.amount.toFixed(2)}</td>
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
                              <p>{expense.reason}</p>
                            </div>
                            <div>
                              <h4 className="font-medium">Add Comment</h4>
                              <Textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Enter your comment..."
                                className="mt-2"
                              />
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
                <td colSpan={5} className="text-center p-4">No expenses found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};