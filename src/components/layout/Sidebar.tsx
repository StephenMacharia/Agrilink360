import React, {  useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Home,
  Package,
  ShoppingCart,
  CreditCard,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Wheat,
  TrendingUp,
  FileText,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';



interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  roles?: ('admin' | 'salesperson' | 'farmer')[];
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: Home,
  },
  {
    label: 'Products',
    href: '/products',
    icon: Package,
  },
  {
    label: 'Marketplace',
    href: '/produce',
    icon: Wheat,
  },
  {
    label: 'Transactions',
    href: '/transactions',
    icon: ShoppingCart,
  },
  {
    label: 'Credits',
    href: '/credits',
    icon: CreditCard,
  },
  {
    label: 'Reports',
    href: '/reports',
    icon: BarChart3,
    roles: ['admin', 'salesperson'],
  },
  {
    label: 'Users',
    href: '/users',
    icon: Users,
    roles: ['admin'],
  },
  {
    label: 'Profile',
    href: '/profile',
    icon: User,
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const filteredNavItems = navItems.filter(item => {
    if (!item.roles) return true;
    return item.roles.includes(user?.role || 'farmer');
  });

  const handleLinkClick = () => {
    setCollapsed(true); // collapse sidebar when a link is clicked
  };

  return (
    // sidebar container
    <aside className={cn(
        'bg-card border-r border-border h-screen flex flex-col transition-all duration-300',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Logo and Collapse Button */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!collapsed && (
          <Link to="/" className="flex items-center space-x-2" onClick={handleLinkClick}>
            <Wheat className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Agrilink360
            </span>
          </Link>
        )}

        <button
          className="p-1 rounded hover:bg-accent/10"
          onClick={() => setCollapsed(prev => !prev)}
        >
          {collapsed ? '☰' : 'x'}
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {filteredNavItems.map(item => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;

          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={handleLinkClick} // collapse on click
              className={cn(
                'flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-base',
                'hover:bg-accent/10 hover:text-primary',
                isActive && 'bg-gradient-primary text-primary-foreground shadow-sm',
                collapsed && 'justify-center space-x-0'
              )}
            >
              <Icon className="h-5 w-5" />
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

       {/* User info + Logout */}
      <div className="p-4 border-t border-border flex flex-col items-center">
        {!collapsed && (
          <div className="flex items-center space-x-3 mb-3 w-full">
            <div className="flex-1">
              <p className="text-sm font-medium">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
            </div>
          </div>
        )}

        <Button
          onClick={logout}
          variant="outline"
          className={cn('w-full justify-center', collapsed ? 'px-0' : '')}
        >
          <LogOut className="h-4 w-4 mr-2" />
          {!collapsed && 'Logout'}
        </Button>
      </div>
    </aside>
  );
};