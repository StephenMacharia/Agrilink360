import { api } from './api';
import { User } from '@/types';

interface LoginResponse {
  user: User;
  token: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  phoneNumber?: string;
  location?: string;
}

// Mock implementation for now - replace with actual API calls
export const authService = {
  login: async (username: string, password: string): Promise<LoginResponse> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock response based on username
    const role = username.includes('admin') ? 'admin' : 
                 username.includes('sales') ? 'salesperson' : 'farmer';
    
    return {
      user: {
        id: '1',
        username,
        email: `${username}@agrilink360.com`,
        role: role as any,
        firstName: username.charAt(0).toUpperCase() + username.slice(1),
        lastName: 'User',
        phoneNumber: '+1234567890',
        location: 'Rural County',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      token: 'mock-jwt-token-' + Date.now(),
    };
  },

  register: async (data: RegisterData): Promise<LoginResponse> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      user: {
        id: Date.now().toString(),
        username: data.username,
        email: data.email,
        role: data.role as any,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        location: data.location,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      token: 'mock-jwt-token-' + Date.now(),
    };
  },

  logout: async (): Promise<void> => {
    // Clear any server-side session if needed
    await new Promise(resolve => setTimeout(resolve, 500));
  },

  resetPassword: async (email: string): Promise<void> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
  },
};