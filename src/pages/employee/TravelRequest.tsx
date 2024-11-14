import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { submitToSharePoint } from '@/services/sharepoint';

const TravelRequest = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitToSharePoint(new FormData(e.target as HTMLFormElement), {
        siteUrl: 'your-sharepoint-site-url',
        listName: 'TravelRequests'
      });
      toast({
        title: "Success",
        description: "Your travel request has been submitted.",
      });
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit travel request. Please try again.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  return (
    <div className="form-container max-w-2xl mx-auto">
      <div className="glass-card p-8 rounded-lg">
        <h1 className="text-3xl font-semibold text-expense-800 mb-6">Travel Request Form</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-field space-y-2">
            <Label htmlFor="destination">Destination</Label>
            <Input
              id="destination"
              name="destination"
              required
              className="w-full"
              placeholder="Travel destination"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="form-field space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                required
                className="w-full"
              />
            </div>
            
            <div className="form-field space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                required
                className="w-full"
              />
            </div>
          </div>
          
          <div className="form-field space-y-2">
            <Label htmlFor="purpose">Purpose of Travel</Label>
            <Textarea
              id="purpose"
              name="purpose"
              required
              className="w-full"
              placeholder="Describe the purpose of your travel..."
            />
          </div>
          
          <div className="form-field space-y-2">
            <Label htmlFor="estimatedCost">Estimated Cost</Label>
            <Input
              id="estimatedCost"
              name="estimatedCost"
              type="number"
              step="0.01"
              required
              className="w-full"
              placeholder="0.00"
            />
          </div>
          
          <div className="form-field space-y-2">
            <Label htmlFor="transportation">Mode of Transportation</Label>
            <select
              id="transportation"
              name="transportation"
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              required
            >
              <option value="">Select transportation</option>
              <option value="flight">Flight</option>
              <option value="train">Train</option>
              <option value="car">Car</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div className="form-field space-y-2">
            <Label htmlFor="additionalInfo">Additional Information</Label>
            <Textarea
              id="additionalInfo"
              name="additionalInfo"
              className="w-full"
              placeholder="Any additional details..."
            />
          </div>
          
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Travel Request"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default TravelRequest;