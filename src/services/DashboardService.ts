import type { Transaction, DashboardStats } from '../types/dashboard';

const MOCK_STATS: DashboardStats = {
  totalBalance: 128430.00,
  monthlyRevenue: 12340.50,
  monthlySpending: 4210.20,
  revenueChange: 12.5,
  spendingChange: 8.2,
};

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    merchant: 'Apple Store',
    category: 'Technology',
    amount: -999.00,
    date: 'Feb 24, 2:45 PM',
    status: 'completed',
    type: 'expense'
  },
  {
    id: '2',
    merchant: 'Starbucks',
    category: 'Food & Drink',
    amount: -5.50,
    date: 'Feb 24, 10:20 AM',
    status: 'completed',
    type: 'expense'
  },
  {
    id: '3',
    merchant: 'Stripe Payout',
    category: 'Income',
    amount: 4500.00,
    date: 'Feb 23, 4:15 PM',
    status: 'completed',
    type: 'income'
  },
  {
    id: '4',
    merchant: 'Netflix Subscription',
    category: 'Entertainment',
    amount: -15.99,
    date: 'Feb 21, 2026',
    status: 'pending',
    type: 'expense'
  },
  {
    id: '5',
    merchant: 'Uber Technologies',
    category: 'Transport',
    amount: -24.50,
    date: 'Feb 20, 2026',
    status: 'completed',
    type: 'expense'
  },
];

export const DashboardService = {
  async fetchDashboardData(): Promise<{ stats: DashboardStats; transactions: Transaction[] }> {
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      stats: MOCK_STATS,
      transactions: MOCK_TRANSACTIONS
    };
  },

  async addTransaction(transaction: Omit<Transaction, 'id' | 'status'>): Promise<Transaction> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      ...transaction,
      id: `tx-${Date.now()}`,
      status: 'completed'
    };
  }
};
