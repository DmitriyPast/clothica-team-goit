import { User } from '@/types/user';
import { create } from 'zustand';

interface AuthStore {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

export const useAuthStore = create<AuthStore>()(set => ({
  isAuthenticated: false,
  user: null,
  setUser: (user: User) => {
    set(() => ({ user, isAuthenticated: true }));
  },
  clearIsAuthenticated: () => {
    set(() => ({ user: null, isAuthenticated: false }));
  },

  logout: () => {
    set(() => ({ user: null, isAuthenticated: false }));
    localStorage.removeItem('token');
  },
  updateUser: (data: Partial<User>) => {
    set(state => ({
      user: state.user ? { ...state.user, ...data } : null,
    }));
  },
}));
