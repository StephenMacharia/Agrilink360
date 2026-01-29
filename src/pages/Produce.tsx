import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, MapPin, Calendar, User } from 'lucide-react';
import { Produce as ProduceType } from '@/types';
import { Navigate, useNavigate } from "react-router-dom";

const dummyProduce: ProduceType[] = [
  {
    id: '1',
    farmerId: 'f1',
    farmerName: 'John Kamau',
    farmerContact: {
      phone: '+25476333992',
      email: 'marywanjiru@gmail.com',
      whatsapp: '+25476333992',
    },
    name: 'Fresh Tomatoes',
    category: 'Vegetables',
    quantity: 500,
    unit: 'kg',
    pricePerUnit: 2.50,
    location: 'Kiambu',
    harvestDate: '2024-01-18',
    images: ['https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400'],
    status: 'available',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    farmerId: 'f2',
    farmerName: 'Mary Wanjiru',
    farmerContact: {
      phone: '+254715730317',
      email: 'marywanjiru@gmail.com',
      whatsapp: '+254715730317',
    },
    name: 'Organic Potatoes',
    category: 'Vegetables',
    quantity: 1000,
    unit: 'kg',
    pricePerUnit: 1.80,
    location: 'Nyandarua',
    harvestDate: '2024-01-20',
    images: ['https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400'],
    status: 'available',
    createdAt: '2024-01-16',
  },
  {
    id: '3',
    farmerId: 'f3',
    farmerName: 'Peter Ochieng',
    farmerContact: {
      phone: '+254798112233',
      email: 'marywanjiru@gmail.com',
      whatsapp: '+254798112233',
    },
    name: 'Sweet Corn',
    category: 'Grains',
    quantity: 300,
    unit: 'cobs',
    pricePerUnit: 0.50,
    location: 'Nakuru',
    harvestDate: '2024-01-19',
    images: ['https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400'],
    status: 'available',
    createdAt: '2024-01-16',
  },
  {
    id: '4',
    farmerId: 'f4',
    farmerName: 'Grace Mutua',
    farmerContact: {
      phone: '+254798112233',
      email: 'marywanjiru@gmail.com',
      whatsapp: '+254798112233',
    },
    name: 'Fresh Cabbage',
    category: 'Vegetables',
    quantity: 200,
    unit: 'heads',
    pricePerUnit: 1.20,
    location: 'Machakos',
    harvestDate: '2024-01-17',
    images: ['https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=400'],
    status: 'available',
    createdAt: '2024-01-15',
  },
  {
    id: '5',
    farmerId: 'f5',
    farmerName: 'David Kiprop',
    farmerContact: {
      phone: '+254798112233',
      email: 'marywanjiru@gmail.com',
      whatsapp: '+254798112233',
    },
    name: 'Fresh Milk',
    category: 'Dairy',
    quantity: 100,
    unit: 'liters',
    pricePerUnit: 3.00,
    location: 'Bomet',
    harvestDate: '2024-01-18',
    images: ['https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400'],
    status: 'available',
    createdAt: '2024-01-17',
  },
  {
    id: '6',
    farmerId: 'f6',
    farmerName: 'Sarah Njoki',
    farmerContact: {
      phone: '+254798112233',
      email: 'marywanjiru@gmail.com',
      whatsapp: '+254798112233',
    },
    name: 'Farm Eggs',
    category: 'Poultry',
    quantity: 50,
    unit: 'trays',
    pricePerUnit: 10.00,
    location: 'Nyeri',
    harvestDate: '2024-01-18',
    images: ['https://images.unsplash.com/photo-1569288052389-dac9b01c9c05?w=400'],
    status: 'available',
    createdAt: '2024-01-17',
  },
];

const categories = ['All', 'Vegetables', 'Grains', 'Dairy', 'Poultry', 'Fruits'];

export const Produce: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProduce = dummyProduce.filter(produce => {
    const matchesSearch = produce.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          produce.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          produce.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || produce.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          Produce Marketplace
        </h1>
        <p className="text-muted-foreground">Connect directly with farmers and buy fresh produce</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search produce, farmers, or locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-[200px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Produce Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProduce.map(produce => (
          <Card key={produce.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="aspect-video w-full mb-4 overflow-hidden rounded-lg bg-muted">
                <img 
                  src={produce.images[0]} 
                  alt={produce.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{produce.name}</CardTitle>
                <Badge variant="default" className="bg-primary/10 text-primary">
                  {produce.status}
                </Badge>
              </div>
              <CardDescription>
                <div className="flex items-center gap-1 mt-2">
                  <User className="h-3 w-3" />
                  <span className="text-sm">{produce.farmerName}</span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Price</span>
                  <span className="font-bold text-primary">
                    ${produce.pricePerUnit}/{produce.unit}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Quantity</span>
                  <span>{produce.quantity} {produce.unit}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{produce.location}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>Harvest: {new Date(produce.harvestDate).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              {/* <Button
  onClick={() => navigate(`/productsdetail/${produce.id}`)}
  variant="outline"
  className="flex-1"
>
  Contact Farmer
</Button> */}

             <Button
  onClick={() => navigate(`/productsdetail/${produce.id}`)}
  variant="outline"
  className="flex-1"
>
  View Details
</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};