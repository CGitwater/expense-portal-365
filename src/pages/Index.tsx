import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-expense-50 p-4">
      <div className="text-center max-w-3xl mx-auto space-y-6 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold text-expense-800 mb-4">
          Expense Management System
        </h1>
        <p className="text-xl text-expense-600 mb-8">
          Streamlined expense tracking and travel management for your organization
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <Card className="p-6 glass-card hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-semibold text-expense-800 mb-4">Employee Portal</h2>
            <p className="text-expense-600 mb-6">
              Submit expense claims and travel requests quickly and easily
            </p>
            <div className="space-y-4">
              <Link to="/employee/expenses">
                <Button className="w-full">Submit Expense Claim</Button>
              </Link>
              <Link to="/employee/travel">
                <Button variant="outline" className="w-full">New Travel Request</Button>
              </Link>
            </div>
          </Card>
          
          <Card className="p-6 glass-card hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-semibold text-expense-800 mb-4">Admin Portal</h2>
            <p className="text-expense-600 mb-6">
              Manage and approve expense claims and travel requests
            </p>
            <Link to="/admin/dashboard">
              <Button className="w-full">Access Dashboard</Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;