import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Target,
  Users,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Award,
  Calendar,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const SalespersonDashboard: React.FC = () => {
  const { user } = useAuth();

  const salesStats = [
    {
      label: 'Monthly Target',
      value: '$15,000',
      progress: 72,
      icon: Target,
    },
    {
      label: 'Total Sales',
      value: '$10,800',
      subtext: 'This month',
      icon: TrendingUp,
    },
    {
      label: 'Customers',
      value: '45',
      subtext: '8 new this week',
      icon: Users,
    },
    {
      label: 'Commission',
      value: '$1,620',
      subtext: '15% rate',
      icon: DollarSign,
    },
  ];

  const recentTransactions = [
    { customer: 'Green Valley Farm', product: 'Fertilizer Pack', amount: '$450', time: '1 hour ago' },
    { customer: 'Sunrise Agriculture', product: 'Seeds Bundle', amount: '$280', time: '3 hours ago' },
    { customer: 'Hill Top Farms', product: 'Pesticides', amount: '$320', time: '5 hours ago' },
    { customer: 'River Side Co-op', product: 'Farm Tools', amount: '$890', time: 'Yesterday' },
  ];

  const topCustomers = [
    { name: 'Green Valley Farm', purchases: 12, revenue: '$3,450' },
    { name: 'Sunrise Agriculture', purchases: 8, revenue: '$2,180' },
    { name: 'Mountain View Ranch', purchases: 6, revenue: '$1,950' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Sales Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.firstName}!</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90">
          <ShoppingCart className="h-4 w-4 mr-2" />
          New Transaction
        </Button>
      </div>

      {/* Sales Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {salesStats.map((stat, index) => {
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
                {stat.progress !== undefined ? (
                  <div className="mt-3">
                    <Progress value={stat.progress} className="h-2" />
                    <p className="text-sm text-muted-foreground mt-1">{stat.progress}% achieved</p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground mt-1">{stat.subtext}</p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Performance Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest sales activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-gradient-accent text-accent-foreground rounded">
                      <ShoppingCart className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">{transaction.customer}</p>
                      <p className="text-sm text-muted-foreground">{transaction.product}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary">{transaction.amount}</p>
                    <p className="text-xs text-muted-foreground">{transaction.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Transactions
            </Button>
          </CardContent>
        </Card>

        {/* Top Customers */}
        <Card>
          <CardHeader>
            <CardTitle>Top Customers</CardTitle>
            <CardDescription>Your best performing accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCustomers.map((customer, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-gradient-primary text-primary-foreground rounded-full text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-sm text-muted-foreground">{customer.purchases} orders</p>
                    </div>
                  </div>
                  <span className="font-semibold text-primary">{customer.revenue}</span>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              <Users className="h-4 w-4 mr-2" />
              Manage Customers
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Achievement Banner */}
      <Card className="bg-gradient-primary text-primary-foreground">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/20 rounded-lg">
                <Award className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Great Progress!</h3>
                <p className="opacity-90">You're 72% towards your monthly target. Keep it up!</p>
              </div>
            </div>
            <Button variant="secondary" className="hover:opacity-90">
              View Leaderboard
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};