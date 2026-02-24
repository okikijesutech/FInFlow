import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string;
}

interface UserState {
  user: UserProfile;
  updateUser: (updates: Partial<UserProfile>) => void;
}

const DEFAULT_USER: UserProfile = {
  firstName: 'Alex',
  lastName: 'Rivers',
  email: 'alex.rivers@example.com',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: DEFAULT_USER,
      updateUser: (updates) => set((state) => ({ 
        user: { ...state.user, ...updates } 
      })),
    }),
    {
      name: 'finflow-user-identity',
    }
  )
);
