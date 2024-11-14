import { useMsal } from "@azure/msal-react";
import { loginRequest } from "@/auth/msalConfig";
import { Button } from "@/components/ui/button";

const Login = () => {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginPopup(loginRequest).catch(e => {
      console.error(e);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-expense-50">
      <div className="glass-card p-8 text-center space-y-4">
        <h1 className="text-3xl font-semibold text-expense-800">ExpenseTrack</h1>
        <p className="text-expense-600">Sign in with your Microsoft 365 account</p>
        <Button onClick={handleLogin} className="w-full">
          Sign In
        </Button>
      </div>
    </div>
  );
};

export default Login;