import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { CreditCard, Banknote, Smartphone, ArrowLeft, CheckCircle } from 'lucide-react';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleCheckout = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Order Successful!",
      description: "Your order has been placed successfully.",
    });
    
    clearCart();
    navigate('/transactions');
  };

  if (items.length === 0) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <Card className="text-center py-12">
          <CardContent>
            <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Add some products to get started</p>
            <Button onClick={() => navigate('/products')}>
              Browse Products
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Button
        variant="ghost"
        onClick={() => navigate('/cart')}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Cart
      </Button>

      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Information */}
          <Card>
            <CardHeader>
              <CardTitle>Delivery Information</CardTitle>
              <CardDescription>Where should we deliver your order?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue={user?.firstName} />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue={user?.lastName} />
                </div>
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" defaultValue={user?.phoneNumber} />
              </div>
              <div>
                <Label htmlFor="address">Delivery Address</Label>
                <Input id="address" placeholder="Enter your farm or delivery address" />
              </div>
              <div>
                <Label htmlFor="location">Location/District</Label>
                <Input id="location" defaultValue={user?.location} />
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Choose how you'd like to pay</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent/5 transition-colors">
                    <RadioGroupItem value="credit" id="credit" />
                    <Label htmlFor="credit" className="flex items-center cursor-pointer flex-1">
                      <CreditCard className="h-5 w-5 mr-3 text-primary" />
                      <div>
                        <p className="font-medium">Farm Credit</p>
                        <p className="text-sm text-muted-foreground">Pay later with your credit line</p>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent/5 transition-colors">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="flex items-center cursor-pointer flex-1">
                      <Banknote className="h-5 w-5 mr-3 text-primary" />
                      <div>
                        <p className="font-medium">Cash on Delivery</p>
                        <p className="text-sm text-muted-foreground">Pay when you receive your order</p>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent/5 transition-colors">
                    <RadioGroupItem value="mobile" id="mobile" />
                    <Label htmlFor="mobile" className="flex items-center cursor-pointer flex-1">
                      <Smartphone className="h-5 w-5 mr-3 text-primary" />
                      <div>
                        <p className="font-medium">Mobile Money</p>
                        <p className="text-sm text-muted-foreground">Pay with MTN or Airtel Money</p>
                      </div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {item.name} x {item.quantity}
                  </span>
                  <span className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full"
                size="lg"
              >
                {isProcessing ? "Processing..." : "Complete Order"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};