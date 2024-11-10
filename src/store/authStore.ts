import create from 'zustand';
import { AuthStore } from '../types';

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  login: async (email, password) => {
    // Simulate API call
    const user = {
      id: '1',
      email,
      preferences: {
        activityPreferences: ['museums', 'parks'],
        foodPreferences: ['local', 'vegetarian'],
        budgetPreference: 'medium',
      },
    };
    set({ user });
  },
  logout: () => set({ user: null }),
  updateUserPreferences: async (preferences) => {
    set((state) => ({
      user: state.user ? { ...state.user, preferences } : null,
    }));
  },
}));