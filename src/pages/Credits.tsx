import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CreditCard, TrendingUp, TrendingDown, Calendar, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Credit, CreditHistory } from '@/types';

const dummyCredit: Credit = {
  id: 'c1',
  userId: 'u1',
  creditLimit: 5000,
  usedCredit: 2450,
  availableCredit: 2550,
  status: 'active',
  dueDate: '2024-02-15',
  history: [
    { id: 'h1', type: 'debit', amount: 245.50, balance: 2450, description: 'Purchase: Farm Inputs', date: '2024-01-18' },
    { id: 'h2', type: 'credit', amount: 500.00, balance: 2204.50, description: 'Payment Received', date: '2024-01-15' },
    { id: 'h3', type: 'debit', amount: 120.00, balance: 2704.50, description: 'Purchase: Seeds', date: '2024-01-12' },
    { id: 'h4', type: 'debit', amount: 189.99, balance: 2584.50, description: 'Purchase: Irrigation Kit', date: '2024-01-10' },
    { id: 'h5', type: 'credit', amount: 1000.00, balance: 2394.51, description: 'Payment Received', date: '2024-01-05' },
  ],
};

export const Credits: React.FC = () => {
  const creditUsagePercentage = (dummyCredit.usedCredit / dummyCredit.creditLimit) * 100;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          Credit Management
        </h1>
        <p className="text-muted-foreground">Manage your farm credit and payment history</p>
      </div>

      {/* Credit Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credit Limit</CardTitle>
            <CreditCard className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${dummyCredit.creditLimit.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Total approved credit</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Used Credit</CardTitle>
            <TrendingUp className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">${dummyCredit.usedCredit.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Current outstanding</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Credit</CardTitle>
            <TrendingDown className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">${dummyCredit.availableCredit.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Ready to use</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Payment Due</CardTitle>
            <Calendar className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Date(dummyCredit.dueDate!).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.ceil((new Date(dummyCredit.dueDate!).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days remaining
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Credit Usage */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Credit Usage</CardTitle>
          <CardDescription>Your current credit utilization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Used: ${dummyCredit.usedCredit.toFixed(2)}</span>
              <span>Limit: ${dummyCredit.creditLimit.toFixed(2)}</span>
            </div>
            <Progress value={creditUsagePercentage} className="h-3" />
            <div className="flex items-center gap-2">
              {creditUsagePercentage > 75 ? (
                <>
                  <AlertCircle className="h-4 w-4 text-destructive" />
                  <span className="text-sm text-destructive">High credit utilization</span>
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-sm text-primary">Healthy credit utilization</span>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Credit Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Make Payment</CardTitle>
            <CardDescription>Reduce your outstanding balance</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Pay Now</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Request Increase</CardTitle>
            <CardDescription>Apply for higher credit limit</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">Request Increase</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Download Statement</CardTitle>
            <CardDescription>Get your credit history report</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">Download PDF</Button>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>Recent credit transactions</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyCredit.history.map(transaction => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="h-3 w-3" />
                      {new Date(transaction.date).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>
                    <Badge variant={transaction.type === 'credit' ? 'default' : 'secondary'}>
                      {transaction.type}
                    </Badge>
                  </TableCell>
                  <TableCell className={transaction.type === 'credit' ? 'text-primary' : 'text-destructive'}>
                    {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </TableCell>
                  <TableCell className="font-medium">${transaction.balance.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      <Clock className="h-3 w-3 mr-1" />
                      Completed
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};