import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, ShoppingCart, Plus, Minus } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/types';

// Dummy product data
const dummyProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Fertilizer NPK 20-20-20',
    description: 'High-quality balanced fertilizer for all crops',
    category: 'Fertilizers',
    price: 45.99,
    unit: 'bag (50kg)',
    stockQuantity: 150,
    images: ['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400'],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Organic Pesticide Spray',
    description: 'Eco-friendly pest control solution',
    category: 'Pesticides',
    price: 28.50,
    unit: 'liter',
    stockQuantity: 200,
    images: ['https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?w=400'],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
  },
  {
    id: '3',
    name: 'Hybrid Maize Seeds',
    description: 'High-yield drought-resistant maize variety',
    category: 'Seeds',
    price: 120.00,
    unit: 'bag (10kg)',
    stockQuantity: 75,
    images: ['https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400'],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
  },
  {
    id: '4',
    name: 'Drip Irrigation Kit',
    description: 'Complete water-efficient irrigation system',
    category: 'Equipment',
    price: 189.99,
    unit: 'set',
    stockQuantity: 30,
    images: ['https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400'],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
  },
  {
    id: '5',
    name: 'Organic Compost',
    description: 'Rich organic matter for soil improvement',
    category: 'Fertilizers',
    price: 25.00,
    unit: 'bag (40kg)',
    stockQuantity: 250,
    images: ['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400'],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
  },
  {
    id: '6',
    name: 'Garden Tools Set',
    description: 'Essential tools for farming operations',
    category: 'Equipment',
    price: 65.00,
    unit: 'set',
    stockQuantity: 45,
    images: ['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400'],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
  },
];

const categories = ['All', 'Fertilizers', 'Pesticides', 'Seeds', 'Equipment'];

export const Products: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const { addToCart } = useCart();

  const filteredProducts = dummyProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleQuantityChange = (productId: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) + delta)
    }));
  };

  const handleAddToCart = (product: Product) => {
    const quantity = quantities[product.id] || 1;
    addToCart(product, quantity);
    setQuantities(prev => ({ ...prev, [product.id]: 1 }));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          Farm Input Products
        </h1>
        <p className="text-muted-foreground">Browse and purchase quality agricultural inputs</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
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

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="aspect-video w-full mb-4 overflow-hidden rounded-lg bg-muted">
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <Badge variant={product.stockQuantity > 50 ? "default" : "secondary"}>
                  {product.stockQuantity} in stock
                </Badge>
              </div>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="text-2xl font-bold text-primary">${product.price}</span>
                  <span className="text-muted-foreground text-sm ml-1">/{product.unit}</span>
                </div>
                <Badge variant="outline">{product.category}</Badge>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <div className="flex items-center gap-2 flex-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(product.id, -1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">
                  {quantities[product.id] || 1}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(product.id, 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button 
                onClick={() => handleAddToCart(product)}
                className="flex-1"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};