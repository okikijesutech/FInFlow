import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Transaction, DashboardStats } from '../types/dashboard';

interface DashboardState {
  stats: DashboardStats | null;
  transactions: Transaction[];
  isLoading: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setStats: (stats: DashboardStats) => void;
  setTransactions: (transactions: Transaction[]) => void;
  addTransaction: (transaction: Transaction) => void;
  setLoading: (loading: boolean) => void;
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      stats: null,
      transactions: [],
      isLoading: true,
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
      setStats: (stats) => set({ stats }),
      setTransactions: (transactions) => set({ transactions }),
      addTransaction: (tx) => set((state) => {
        const updatedTransactions = [tx, ...state.transactions];
        
        const isIncome = tx.type === 'income';
        const amount = Math.abs(tx.amount);

        const newStats = state.stats ? {
          ...state.stats,
          totalBalance: state.stats.totalBalance + tx.amount,
          monthlyRevenue: isIncome ? state.stats.monthlyRevenue + amount : state.stats.monthlyRevenue,
          monthlySpending: tx.type === 'expense' ? state.stats.monthlySpending + amount : state.stats.monthlySpending,
        } : null;

        return { 
          transactions: updatedTransactions,
          stats: newStats
        };
      }),
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'finflow-storage',
      partialize: (state) => ({ 
        transactions: state.transactions,
        stats: state.stats 
      }),
    }
  )
);
