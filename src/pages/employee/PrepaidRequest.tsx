import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { supabase } from "@/integrations/supabase/client";

const PrepaidRequest = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const { data: { session } } = await supabase.auth.getSession();

      if (!session?.user) {
        throw new Error("Not authenticated");
      }

      const { error } = await supabase
        .from('expense_requests')
        .insert({
          user_id: session.user.id,
          type: 'prepaid',
          amount: formData.get('amountRequired'),
          date_required: formData.get('dateRequired'),
          client_name: formData.get('clientName'),
          reason: formData.get('reason'),
          project_ticket: formData.get('projectTicket'),
          budget_code: formData.get('budgetCode'),
          expense_type: formData.get('expenseType'),
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Prepaid request submitted successfully.",
      });
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit prepaid request.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="dateRequired">Date Required</Label>
          <Input
            type="date"
            id="dateRequired"
            name="dateRequired"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="clientName">Client Name</Label>
          <Input
            type="text"
            id="clientName"
            name="clientName"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="reason">Reason for Expense</Label>
          <Textarea
            id="reason"
            name="reason"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="projectTicket">Project/Ticket</Label>
          <Input
            type="text"
            id="projectTicket"
            name="projectTicket"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="amountRequired">Amount Required (£)</Label>
          <Input
            type="number"
            id="amountRequired"
            name="amountRequired"
            step="0.01"
            min="0"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="budgetCode">Pre-Approved Budget Code</Label>
          <Input
            type="text"
            id="budgetCode"
            name="budgetCode"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="expenseType">Expense Type</Label>
          <Select name="expenseType">
            <SelectTrigger>
              <SelectValue placeholder="Select expense type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="parking">Parking</SelectItem>
              <SelectItem value="tolls">Tolls/Congestion</SelectItem>
              <SelectItem value="hotel">Hotel</SelectItem>
              <SelectItem value="train">Train</SelectItem>
              <SelectItem value="subsistence">Subsistence</SelectItem>
              <SelectItem value="entertainment">Entertainment</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Prepaid Request"}
        </Button>
      </form>
    </Card>
  );
};

export default PrepaidRequest;