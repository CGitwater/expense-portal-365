import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { supabase } from "@/integrations/supabase/client";
import type { Database } from '@/integrations/supabase/types';

type ExpenseRequest = Database['public']['Tables']['expense_requests']['Insert'];
type MileageClaim = Database['public']['Tables']['mileage_claims']['Insert'];

const TravelRequest = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [singleJourneyMiles, setSingleJourneyMiles] = useState<number>(0);
  const [journeyType, setJourneyType] = useState<'single' | 'return'>('single');
  const [rate, setRate] = useState<0.25 | 0.45>(0.25);

  const calculateTotalMiles = () => {
    return journeyType === 'return' ? singleJourneyMiles * 2 : singleJourneyMiles;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const { data: { session } } = await supabase.auth.getSession();

      if (!session?.user) {
        throw new Error("Not authenticated");
      }

      // Create expense request first
      const expenseData: ExpenseRequest = {
        user_id: session.user.id,
        type: 'mileage',
        amount: calculateTotalMiles() * rate,
        reason: formData.get('reason')?.toString(),
        client_name: formData.get('clientName')?.toString(),
        date_submitted: new Date().toISOString(),
      };

      const { data: expenseData, error: expenseError } = await supabase
        .from('expense_requests')
        .insert(expenseData)
        .select()
        .single();

      if (expenseError || !expenseData) throw expenseError;

      // Create mileage claim
      const mileageData: MileageClaim = {
        expense_id: expenseData.id,
        from_postcode: formData.get('fromPostCode')?.toString() || '',
        to_postcode: formData.get('toPostCode')?.toString() || '',
        single_journey_miles: singleJourneyMiles,
        journey_type: journeyType,
        rate: rate,
        total_miles: calculateTotalMiles(),
        total_amount: calculateTotalMiles() * rate,
        ticket_number: formData.get('ticketNumber')?.toString(),
      };

      const { error: mileageError } = await supabase
        .from('mileage_claims')
        .insert(mileageData);

      if (mileageError) throw mileageError;

      toast({
        title: "Success",
        description: "Mileage claim submitted successfully.",
      });
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit mileage claim.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="travelDate">Date of Travel</Label>
          <Input
            type="date"
            id="travelDate"
            name="travelDate"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="reason">Reason for Travel</Label>
          <Textarea
            id="reason"
            name="reason"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ticketNumber">Ticket Number</Label>
          <Input
            type="text"
            id="ticketNumber"
            name="ticketNumber"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fromPostCode">From Post Code</Label>
            <Input
              type="text"
              id="fromPostCode"
              name="fromPostCode"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="toPostCode">To Post Code</Label>
            <Input
              type="text"
              id="toPostCode"
              name="toPostCode"
              required
            />
          </div>
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
          <Label htmlFor="singleJourneyMiles">Miles (Single Journey)</Label>
          <Input
            type="number"
            id="singleJourneyMiles"
            name="singleJourneyMiles"
            min="0"
            step="0.1"
            required
            onChange={(e) => setSingleJourneyMiles(Number(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="journeyType">Journey Type</Label>
          <Select 
            name="journeyType"
            onValueChange={(value) => setJourneyType(value as 'single' | 'return')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select journey type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Single</SelectItem>
              <SelectItem value="return">Return</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="totalMiles">Total Miles</Label>
          <Input
            type="number"
            id="totalMiles"
            name="totalMiles"
            value={calculateTotalMiles()}
            disabled
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="rate">Rate per Mile</Label>
          <Select 
            name="rate"
            onValueChange={(value) => setRate(Number(value) as 0.25 | 0.45)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select rate" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0.25">£0.25 per mile</SelectItem>
              <SelectItem value="0.45">£0.45 per mile</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="totalAmount">Total Amount</Label>
          <Input
            type="number"
            id="totalAmount"
            name="totalAmount"
            value={(calculateTotalMiles() * rate).toFixed(2)}
            disabled
          />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Mileage Claim"}
        </Button>
      </form>
    </Card>
  );
};

export default TravelRequest;