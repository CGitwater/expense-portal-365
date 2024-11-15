import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import Index from "./pages/Index";
import ExpenseForm from "./pages/employee/ExpenseForm";
import TravelRequest from "./pages/employee/TravelRequest";
import AdminDashboard from "./pages/admin/Dashboard";
import Settings from "./pages/admin/Settings";
import { FormBuilder } from "./components/admin/FormBuilder/FormBuilder";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/employee/expenses" element={<ExpenseForm />} />
            <Route path="/employee/travel" element={<TravelRequest />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/settings" element={<Settings />} />
            <Route path="/admin/form-builder" element={<FormBuilder />} />
          </Routes>
        </DashboardLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;