import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';

const ExpenseForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      // Implementation for form submission
      toast({
        title: "Success",
        description: "Expense claim submitted successfully.",
      });
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit expense claim.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            type="date"
            id="date"
            name="date"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="department">Department</Label>
          <Select name="department">
            <SelectTrigger>
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="it">IT</SelectItem>
              <SelectItem value="hr">HR</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            required
            disabled
            value="user@example.com" // This will be populated from Microsoft 365 login
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="transactionDate">Date of Transaction</Label>
          <Input
            type="date"
            id="transactionDate"
            name="transactionDate"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="paymentType">Type of Payment</Label>
          <Select name="paymentType">
            <SelectTrigger>
              <SelectValue placeholder="Select payment type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cash">Cash</SelectItem>
              <SelectItem value="personal">Personal Card</SelectItem>
              <SelectItem value="corporate">Corporate Card</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Amount Requested (£)</Label>
          <Input
            type="number"
            id="amount"
            name="amount"
            step="0.01"
            required
            min="0"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="reason">Reason for Purchase</Label>
          <Textarea
            id="reason"
            name="reason"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="receipt">Receipt Upload</Label>
          <Input
            type="file"
            id="receipt"
            name="receipt"
            accept=".doc,.docx,.xls,.xlsx,.ppt,.pptx,.pdf,image/*"
            multiple
          />
          <p className="text-sm text-gray-500">
            Supported files: Word, Excel, PPT, PDF, and images. Max 10 files, 100MB each.
          </p>
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Expense Claim"}
        </Button>
      </form>
    </Card>
  );
};

export default ExpenseForm;