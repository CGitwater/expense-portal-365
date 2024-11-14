import { useMsal } from "@azure/msal-react";
import { loginRequest } from "@/auth/msalConfig";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const Login = () => {
  const { instance } = useMsal();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      // Clear any existing interactions first
      await instance.initialize();
      await instance.handleRedirectPromise();
      
      const response = await instance.loginPopup(loginRequest);
      if (response) {
        toast({
          title: "Success",
          description: "Successfully signed in",
        });
      }
    } catch (error: any) {
      if (error.errorCode === "user_cancelled") {
        toast({
          title: "Login cancelled",
          description: "You cancelled the login process",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Login failed",
          description: error.message || "An error occurred during sign in",
          variant: "destructive",
        });
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-expense-50">
      <div className="glass-card p-8 text-center space-y-4">
        <h1 className="text-3xl font-semibold text-expense-800">ExpenseTrack</h1>
        <p className="text-expense-600">Sign in with your Microsoft 365 account</p>
        <Button 
          onClick={handleLogin} 
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </div>
    </div>
  );
};

export default Login;