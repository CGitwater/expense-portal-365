import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const ExpenseOverview = () => {
  const calculateTotalExpenses = (expenses: any[], period: 'month' | 'quarter' | 'year') => {
    if (!expenses) return 0;
    const now = new Date();
    const filtered = expenses.filter((expense) => {
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
    return filtered.reduce((acc, curr) => acc + curr.amount, 0);
  };

  const { data: expenses } = useQuery({
    queryKey: ['expenses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('expense_requests')
        .select('*');
      if (error) throw error;
      return data;
    }
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-2">Monthly Expenses</h3>
        <p className="text-3xl font-bold text-expense-600">
          £{calculateTotalExpenses(expenses || [], 'month').toFixed(2)}
        </p>
      </Card>
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-2">Quarterly Expenses</h3>
        <p className="text-3xl font-bold text-expense-600">
          £{calculateTotalExpenses(expenses || [], 'quarter').toFixed(2)}
        </p>
      </Card>
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-2">Yearly Expenses</h3>
        <p className="text-3xl font-bold text-expense-600">
          £{calculateTotalExpenses(expenses || [], 'year').toFixed(2)}
        </p>
      </Card>
    </div>
  );
};