import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { submitToSharePoint } from '@/services/sharepoint';

const ExpenseForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitToSharePoint(new FormData(e.target as HTMLFormElement), {
        siteUrl: 'your-sharepoint-site-url',
        listName: 'ExpenseClaims'
      });
      toast({
        title: "Success",
        description: "Your expense claim has been submitted.",
      });
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit expense claim. Please try again.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  return (
    <div className="form-container max-w-2xl mx-auto">
      <div className="glass-card p-8 rounded-lg">
        <h1 className="text-3xl font-semibold text-expense-800 mb-6">Submit Expense Claim</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-field space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              required
              className="w-full"
              placeholder="Brief description of the expense"
            />
          </div>
          
          <div className="form-field space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              required
              className="w-full"
              placeholder="0.00"
            />
          </div>
          
          <div className="form-field space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              name="date"
              type="date"
              required
              className="w-full"
            />
          </div>
          
          <div className="form-field space-y-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              name="category"
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              required
            >
              <option value="">Select a category</option>
              <option value="travel">Travel</option>
              <option value="meals">Meals</option>
              <option value="supplies">Supplies</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div className="form-field space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              className="w-full"
              placeholder="Any additional details..."
            />
          </div>
          
          <div className="form-field space-y-2">
            <Label htmlFor="receipt">Receipt</Label>
            <Input
              id="receipt"
              name="receipt"
              type="file"
              accept="image/*,.pdf"
              className="w-full"
            />
          </div>
          
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Expense Claim"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;