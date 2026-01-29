import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export const CartButton: React.FC = () => {
  const navigate = useNavigate();
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative"
      onClick={() => navigate('/cart')}
    >
      <ShoppingCart className="h-5 w-5" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 h-5 w-5 bg-accent text-accent-foreground rounded-full text-xs flex items-center justify-center font-bold">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </Button>
  );
};