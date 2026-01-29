export type UserRole = 'admin' | 'salesperson' | 'farmer';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  location?: string;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  unit: string;
  stockQuantity: number;
  images: string[];
  createdAt: string;
  updatedAt: string;
}
export interface FarmerContact {
  phone: string;
  email: string;
  whatsapp?: string;
}
export interface Produce {
  id: string;
  farmerId: string;
  farmerName: string;
  rating: number;
  farmerContact: FarmerContact;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  location: string;
  harvestDate: string;
  images: string[];
  status: 'available' | 'sold' | 'pending';
  createdAt: string;
}

export interface Transaction {
  id: string;
  type: 'purchase' | 'sale';
  userId: string;
  amount: number;
  paymentMethod: 'cash' | 'credit' | 'mobile_money';
  status: 'pending' | 'completed' | 'failed';
  items: TransactionItem[];
  createdAt: string;
}

export interface TransactionItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Credit {
  id: string;
  userId: string;
  creditLimit: number;
  usedCredit: number;
  availableCredit: number;
  status: 'active' | 'suspended' | 'pending';
  dueDate?: string;
  history: CreditHistory[];
}

export interface CreditHistory {
  id: string;
  type: 'debit' | 'credit';
  amount: number;
  balance: number;
  description: string;
  date: string;
}

export interface DashboardStats {
  totalRevenue: number;
  totalTransactions: number;
  activeUsers: number;
  totalProducts: number;
  revenueGrowth: number;
  transactionGrowth: number;
}