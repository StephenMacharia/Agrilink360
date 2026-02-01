import React,{ useState} from 'react';
import { Bell, Search, Menu,LogOut, } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { CartButton } from './CartButton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Navigate,useNavigate } from 'react-router-dom';



interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

interface HeaderProps {
  onMenuClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user,logout } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([
  {
    id: '1',
    title: 'New Order',
    message: 'A buyer placed an order for 50kg of maize.',
    read: false,
    createdAt: '2 mins ago',
  },
  {
    id: '2',
    title: 'Payment Received',
    message: 'KES 12,000 has been credited to your wallet.',
    read: false,
    createdAt: '1 hour ago',
  },
]);
const unreadCount = notifications.filter(n => !n.read).length;



  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products, farmers, transactions..."
              className="pl-10 bg-background"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <CartButton />
          <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="icon" className="relative">
      <Bell className="h-5 w-5" />
      {unreadCount > 0 && (
        <span className="absolute top-1 right-1 h-2 w-2 bg-accent rounded-full" />
      )}
    </Button>
  </DropdownMenuTrigger>

  <DropdownMenuContent className="w-80" align="end">
    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
    <DropdownMenuSeparator />

    {notifications.length === 0 && (
      <div className="px-4 py-3 text-sm text-muted-foreground">
        No notifications
      </div>
    )}

    {notifications.map((notification) => (
      <DropdownMenuItem
        key={notification.id}
        className={`flex flex-col items-start space-y-1 cursor-pointer ${
          !notification.read ? 'bg-muted' : ''
        }`}
        onClick={() => {
          setNotifications(prev =>
            prev.map(n =>
              n.id === notification.id ? { ...n, read: true } : n
            )
          );
        }}
      >
        <p className="text-sm font-medium">{notification.title}</p>
        <p className="text-xs text-muted-foreground">
          {notification.message}
        </p>
        <span className="text-[10px] text-muted-foreground">
          {notification.createdAt}
        </span>
      </DropdownMenuItem>
    ))}
  </DropdownMenuContent>
</DropdownMenu>


          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user?.profileImage} alt={user?.firstName} />
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                    {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.firstName} {user?.lastName}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem><Button onClick={() => navigate("/profile")} variant="outline" className="flex-1">Profile</Button></DropdownMenuItem>
              <DropdownMenuItem><Button onClick={() => navigate("/settings")} variant="outline" className="flex-1">Settings</Button></DropdownMenuItem>
              <DropdownMenuItem><Button onClick={() => navigate("/settings")} variant="outline" className="flex-1">Help&Support</Button></DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive"><Button
                        onClick={logout}
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </Button></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};