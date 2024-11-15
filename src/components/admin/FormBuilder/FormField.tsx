import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2 } from "lucide-react";

interface FormFieldProps {
  field: {
    id: string;
    type: string;
    label: string;
    required: boolean;
  };
  onUpdate: (id: string, field: any) => void;
  onDelete: (id: string) => void;
}

export const FormField = ({ field, onUpdate, onDelete }: FormFieldProps) => {
  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <div className="flex justify-between items-start">
        <div className="space-y-2 flex-1">
          <Label>Field Label</Label>
          <Input
            value={field.label}
            onChange={(e) => onUpdate(field.id, { ...field, label: e.target.value })}
            placeholder="Enter field label"
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-red-500"
          onClick={() => onDelete(field.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-2">
        <Label>Field Type</Label>
        <Select
          value={field.type}
          onValueChange={(value) => onUpdate(field.id, { ...field, type: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select field type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="text">Text</SelectItem>
            <SelectItem value="number">Number</SelectItem>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="select">Dropdown</SelectItem>
            <SelectItem value="textarea">Text Area</SelectItem>
            <SelectItem value="file">File Upload</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id={`required-${field.id}`}
          checked={field.required}
          onChange={(e) => onUpdate(field.id, { ...field, required: e.target.checked })}
          className="rounded border-gray-300"
        />
        <Label htmlFor={`required-${field.id}`}>Required field</Label>
      </div>
    </div>
  );
};