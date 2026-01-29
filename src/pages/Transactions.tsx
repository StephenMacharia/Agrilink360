import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, Download, Calendar, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { Transaction } from '@/types';

const dummyTransactions: Transaction[] = [
  {
    id: 't1',
    type: 'purchase',
    userId: 'u1',
    amount: 245.50,
    paymentMethod: 'credit',
    status: 'completed',
    items: [
      { productId: 'p1', productName: 'Premium Fertilizer', quantity: 3, price: 45.99, total: 137.97 },
      { productId: 'p2', productName: 'Organic Pesticide', quantity: 2, price: 28.50, total: 57.00 },
    ],
    createdAt: '2024-01-18T10:30:00',
  },
  {
    id: 't2',
    type: 'sale',
    userId: 'u2',
    amount: 500.00,
    paymentMethod: 'mobile_money',
    status: 'completed',
    items: [
      { productId: 'pr1', productName: 'Fresh Tomatoes', quantity: 200, price: 2.50, total: 500.00 },
    ],
    createdAt: '2024-01-17T14:20:00',
  },
  {
    id: 't3',
    type: 'purchase',
    userId: 'u3',
    amount: 120.00,
    paymentMethod: 'cash',
    status: 'pending',
    items: [
      { productId: 'p3', productName: 'Hybrid Maize Seeds', quantity: 1, price: 120.00, total: 120.00 },
    ],
    createdAt: '2024-01-17T09:15:00',
  },
  {
    id: 't4',
    type: 'sale',
    userId: 'u4',
    amount: 180.00,
    paymentMethod: 'credit',
    status: 'completed',
    items: [
      { productId: 'pr2', productName: 'Organic Potatoes', quantity: 100, price: 1.80, total: 180.00 },
    ],
    createdAt: '2024-01-16T16:45:00',
  },
  {
    id: 't5',
    type: 'purchase',
    userId: 'u5',
    amount: 65.00,
    paymentMethod: 'mobile_money',
    status: 'completed',
    items: [
      { productId: 'p4', productName: 'Garden Tools Set', quantity: 1, price: 65.00, total: 65.00 },
    ],
    createdAt: '2024-01-16T11:30:00',
  },
];

export const Transactions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredTransactions = dummyTransactions.filter(transaction => {
    const matchesSearch = transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          transaction.items.some(item => 
                            item.productName.toLowerCase().includes(searchTerm.toLowerCase())
                          );
    const matchesType = filterType === 'all' || transaction.type === filterType;
    const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalRevenue = dummyTransactions
    .filter(t => t.type === 'sale' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = dummyTransactions
    .filter(t => t.type === 'purchase' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          Transactions
        </h1>
        <p className="text-muted-foreground">Track all your purchases and sales</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">From sales this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <TrendingDown className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">${totalExpenses.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">From purchases this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
            <DollarSign className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">
              ${(totalRevenue - totalExpenses).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">This month's profit</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full md:w-[150px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="purchase">Purchases</SelectItem>
            <SelectItem value="sale">Sales</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full md:w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map(transaction => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.id}</TableCell>
                  <TableCell>
                    <Badge variant={transaction.type === 'sale' ? 'default' : 'secondary'}>
                      {transaction.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {transaction.items.map((item, idx) => (
                        <div key={idx}>{item.productName} x{item.quantity}</div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {transaction.paymentMethod.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-bold">
                    ${transaction.amount.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        transaction.status === 'completed' ? 'default' : 
                        transaction.status === 'pending' ? 'secondary' : 'destructive'
                      }
                    >
                      {transaction.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </div>
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