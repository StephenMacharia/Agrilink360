import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Filter, UserPlus, Mail, Phone, MapPin, Edit, Trash2 } from 'lucide-react';
import { User } from '@/types';

const dummyUsers: User[] = [
  {
    id: '1',
    username: 'jkamau',
    email: 'john.kamau@example.com',
    role: 'farmer',
    firstName: 'John',
    lastName: 'Kamau',
    phoneNumber: '+254700123456',
    location: 'Kiambu',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
  },
  {
    id: '2',
    username: 'mwanjiru',
    email: 'mary.wanjiru@example.com',
    role: 'salesperson',
    firstName: 'Mary',
    lastName: 'Wanjiru',
    phoneNumber: '+254711234567',
    location: 'Nairobi',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-16',
  },
  {
    id: '3',
    username: 'pochieng',
    email: 'peter.ochieng@example.com',
    role: 'admin',
    firstName: 'Peter',
    lastName: 'Ochieng',
    phoneNumber: '+254722345678',
    location: 'Kisumu',
    createdAt: '2023-12-15',
    updatedAt: '2024-01-10',
  },
  {
    id: '4',
    username: 'gmutua',
    email: 'grace.mutua@example.com',
    role: 'farmer',
    firstName: 'Grace',
    lastName: 'Mutua',
    phoneNumber: '+254733456789',
    location: 'Machakos',
    createdAt: '2024-01-08',
    updatedAt: '2024-01-18',
  },
  {
    id: '5',
    username: 'dkiprop',
    email: 'david.kiprop@example.com',
    role: 'farmer',
    firstName: 'David',
    lastName: 'Kiprop',
    phoneNumber: '+254744567890',
    location: 'Eldoret',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-17',
  },
];

export const Users: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  const filteredUsers = dummyUsers.filter(user => {
    const matchesSearch = 
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const getRoleBadgeVariant = (role: string) => {
    switch(role) {
      case 'admin': return 'destructive';
      case 'salesperson': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          User Management
        </h1>
        <p className="text-muted-foreground">Manage system users and their permissions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dummyUsers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Farmers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dummyUsers.filter(u => u.role === 'farmer').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Salespersons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dummyUsers.filter(u => u.role === 'salesperson').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Admins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dummyUsers.filter(u => u.role === 'admin').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterRole} onValueChange={setFilterRole}>
          <SelectTrigger className="w-full md:w-[150px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="farmer">Farmers</SelectItem>
            <SelectItem value="salesperson">Salespersons</SelectItem>
            <SelectItem value="admin">Admins</SelectItem>
          </SelectContent>
        </Select>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map(user => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.profileImage} />
                        <AvatarFallback>
                          {user.firstName[0]}{user.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.firstName} {user.lastName}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>
                    <Badge variant={getRoleBadgeVariant(user.role)}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="h-3 w-3" />
                        {user.email}
                      </div>
                      {user.phoneNumber && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          {user.phoneNumber}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {user.location && (
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="h-3 w-3" />
                        {user.location}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
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