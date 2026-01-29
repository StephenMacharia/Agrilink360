import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Users,
  Package,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Activity,
  Download,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    {
      label: 'Total Revenue',
      value: '$125,430',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
    },
    {
      label: 'Active Users',
      value: '2,543',
      change: '+8.2%',
      trend: 'up',
      icon: Users,
    },
    {
      label: 'Total Products',
      value: '486',
      change: '+15.3%',
      trend: 'up',
      icon: Package,
    },
    {
      label: 'Transactions',
      value: '8,745',
      change: '-2.4%',
      trend: 'down',
      icon: ShoppingCart,
    },
  ];

  const recentActivities = [
    { user: 'John Farmer', action: 'Listed 50kg of tomatoes', time: '2 minutes ago' },
    { user: 'Sarah Sales', action: 'Completed transaction #4521', time: '15 minutes ago' },
    { user: 'Mike Manager', action: 'Updated product inventory', time: '1 hour ago' },
    { user: 'Lisa Farmer', action: 'Requested credit increase', time: '2 hours ago' },
    { user: 'Tom Trader', action: 'Added new customer', time: '3 hours ago' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.firstName}!</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-base">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-sm mt-2">
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="h-4 w-4 text-success mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-destructive mr-1" />
                  )}
                  <span className={stat.trend === 'up' ? 'text-success' : 'text-destructive'}>
                    {stat.change}
                  </span>
                  <span className="text-muted-foreground ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue for the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-subtle rounded-lg flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-primary mx-auto mb-2" />
                <p className="text-muted-foreground">Revenue chart will be displayed here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Growth Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>New users registered over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-subtle rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Users className="h-12 w-12 text-secondary mx-auto mb-2" />
                <p className="text-muted-foreground">User growth chart will be displayed here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest platform activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Activity className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{activity.user}</p>
                    <p className="text-sm text-muted-foreground">{activity.action}</p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">
            View All Activities
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};