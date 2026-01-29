import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Wheat,
  CreditCard,
  TrendingUp,
  Package,
  AlertCircle,
  Calendar,
  Plus,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const FarmerDashboard: React.FC = () => {
  const { user } = useAuth();

  const farmStats = [
    {
      label: 'Listed Produce',
      value: '12',
      subtext: '3 pending approval',
      icon: Wheat,
    },
    {
      label: 'Total Sales',
      value: '$8,450',
      subtext: 'This month',
      icon: TrendingUp,
    },
    {
      label: 'Available Credit',
      value: '$2,300',
      subtext: 'of $5,000 limit',
      icon: CreditCard,
    },
    {
      label: 'Active Orders',
      value: '5',
      subtext: '2 ready for pickup',
      icon: Package,
    },
  ];

  const myProduce = [
    { name: 'Fresh Tomatoes', quantity: '200 kg', price: '$2.50/kg', status: 'available' },
    { name: 'Organic Lettuce', quantity: '150 units', price: '$1.20/unit', status: 'available' },
    { name: 'Sweet Corn', quantity: '500 kg', price: '$1.80/kg', status: 'pending' },
    { name: 'Green Beans', quantity: '100 kg', price: '$3.00/kg', status: 'sold' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">My Farm Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.firstName}!</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90">
          <Plus className="h-4 w-4 mr-2" />
          List New Produce
        </Button>
      </div>

      {/* Farm Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {farmStats.map((stat, index) => {
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
                <p className="text-sm text-muted-foreground mt-1">{stat.subtext}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Credit Status */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Credit Status</CardTitle>
            <CardDescription>Your current credit utilization</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Used Credit</span>
                <span className="text-sm text-muted-foreground">kes2,700 of kes5,000</span>
              </div>
              <Progress value={54} className="h-2" />
            </div>
            <div className="pt-2 border-t">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Next Payment Due</span>
                <span className="text-sm font-medium">Dec 15, 2024</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Amount Due</span>
                <span className="text-sm font-medium text-primary">kes450</span>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              View Credit History
            </Button>
          </CardContent>
        </Card>

        {/* My Produce */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>My Listed Produce</CardTitle>
            <CardDescription>Your current produce listings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {myProduce.map((produce, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-gradient-primary text-primary-foreground rounded">
                      <Wheat className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">{produce.name}</p>
                      <p className="text-sm text-muted-foreground">{produce.quantity} @ {produce.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      produce.status === 'available' ? 'bg-success/20 text-success' :
                      produce.status === 'pending' ? 'bg-warning/20 text-warning' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {produce.status}
                    </span>
                    <Button variant="ghost" size="icon">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Produce
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Alerts & Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Important Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-warning/10 rounded-lg">
              <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
              <div className="flex-1">
                <p className="font-medium">Credit Payment Reminder</p>
                <p className="text-sm text-muted-foreground">Your payment of kes450 is due in 5 days</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-success/10 rounded-lg">
              <Calendar className="h-5 w-5 text-success mt-0.5" />
              <div className="flex-1">
                <p className="font-medium">Harvest Season Starting</p>
                <p className="text-sm text-muted-foreground">Corn harvest season begins next week</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};