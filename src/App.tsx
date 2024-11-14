import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MsalProvider, AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./auth/msalConfig";
import DashboardLayout from "./components/layout/DashboardLayout";
import Index from "./pages/Index";
import ExpenseForm from "./pages/employee/ExpenseForm";
import TravelRequest from "./pages/employee/TravelRequest";
import AdminDashboard from "./pages/admin/Dashboard";
import Login from "./pages/Login";

const msalInstance = new PublicClientApplication(msalConfig);
const queryClient = new QueryClient();

const App = () => (
  <MsalProvider instance={msalInstance}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <UnauthenticatedTemplate>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </UnauthenticatedTemplate>
          <AuthenticatedTemplate>
            <DashboardLayout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/employee/expenses" element={<ExpenseForm />} />
                <Route path="/employee/travel" element={<TravelRequest />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
              </Routes>
            </DashboardLayout>
          </AuthenticatedTemplate>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </MsalProvider>
);

export default App;