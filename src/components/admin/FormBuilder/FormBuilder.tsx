import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { FormField } from "./FormField";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";

interface Field {
  id: string;
  type: string;
  label: string;
  required: boolean;
}

export const FormBuilder = () => {
  const { toast } = useToast();
  const [formName, setFormName] = useState("");
  const [fields, setFields] = useState<Field[]>([]);

  const addField = () => {
    const newField: Field = {
      id: uuidv4(),
      type: "text",
      label: "",
      required: false,
    };
    setFields([...fields, newField]);
  };

  const updateField = (id: string, updatedField: Field) => {
    setFields(fields.map((field) => (field.id === id ? updatedField : field)));
  };

  const deleteField = (id: string) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const handleSave = async () => {
    if (!formName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a form name",
        variant: "destructive",
      });
      return;
    }

    if (fields.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one field",
        variant: "destructive",
      });
      return;
    }

    try {
      // Here you would typically save the form to your backend
      toast({
        title: "Success",
        description: "Form saved successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save form",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-2">
        <Label htmlFor="formName">Form Name</Label>
        <Input
          id="formName"
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
          placeholder="Enter form name"
        />
      </div>

      <div className="space-y-4">
        {fields.map((field) => (
          <FormField
            key={field.id}
            field={field}
            onUpdate={updateField}
            onDelete={deleteField}
          />
        ))}
      </div>

      <div className="flex gap-4">
        <Button onClick={addField} variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add Field
        </Button>
        <Button onClick={handleSave}>Save Form</Button>
      </div>
    </Card>
  );
};