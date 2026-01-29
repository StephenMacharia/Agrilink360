import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AdminDashboard } from './AdminDashboard';
import { FarmerDashboard } from './FarmerDashboard';
import { SalespersonDashboard } from './SalespersonDashboard';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  switch (user?.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'farmer':
      return <FarmerDashboard />;
    case 'salesperson':
      return <SalespersonDashboard />;
    default:
      return <div>Invalid user role</div>;
  }
};