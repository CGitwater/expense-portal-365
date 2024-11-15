import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-expense-50">
      <nav className="glass-card fixed top-0 w-full z-50 px-6 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-semibold text-expense-800">
            ExpenseTrack
          </Link>
          <div className="space-x-6">
            <Link
              to="/employee/expenses"
              className={`transition-colors hover:text-expense-600 ${
                location.pathname.includes('/employee') ? 'text-expense-800' : 'text-expense-500'
              }`}
            >
              Employee Portal
            </Link>
            <Link
              to="/admin/dashboard"
              className={`transition-colors hover:text-expense-600 ${
                location.pathname.includes('/admin') ? 'text-expense-800' : 'text-expense-500'
              }`}
            >
              Admin Portal
            </Link>
            {location.pathname.includes('/admin') && (
              <>
                <Link
                  to="/admin/form-builder"
                  className="transition-colors hover:text-expense-600 text-expense-500"
                >
                  Form Builder
                </Link>
                <Link
                  to="/admin/settings"
                  className="transition-colors hover:text-expense-600 text-expense-500"
                >
                  Settings
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <main className="container mx-auto pt-24 pb-8">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;