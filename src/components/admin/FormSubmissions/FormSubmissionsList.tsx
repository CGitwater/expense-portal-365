import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

export const FormSubmissionsList = () => {
  const { data: submissions, isLoading } = useQuery({
    queryKey: ["formSubmissions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("form_submissions")
        .select(`
          *,
          users (
            email
          )
        `)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) return <div>Loading submissions...</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Form Submissions</h2>
      {submissions?.map((submission) => (
        <Card key={submission.id} className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">
                Form ID: {submission.form_id}
              </h3>
              <p className="text-sm text-gray-500">
                Submitted by: {submission.users?.email}
              </p>
              <p className="text-sm text-gray-500">
                Submitted {formatDistanceToNow(new Date(submission.created_at), { addSuffix: true })}
              </p>
            </div>
            <Badge>
              {submission.form_id.includes('expense') ? 'Expense' :
               submission.form_id.includes('mileage') ? 'Mileage' :
               submission.form_id.includes('prepaid') ? 'Prepaid' : 'Other'}
            </Badge>
          </div>
          <div className="mt-4">
            <h4 className="font-medium mb-2">Form Data:</h4>
            <pre className="bg-gray-50 p-2 rounded text-sm overflow-x-auto">
              {JSON.stringify(submission.form_data, null, 2)}
            </pre>
          </div>
        </Card>
      ))}
    </div>
  );
};