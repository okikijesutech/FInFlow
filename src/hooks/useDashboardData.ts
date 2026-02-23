import { useState, useEffect } from 'react';
import type { DashboardStats, Transaction } from '../types/dashboard';

export const useDashboardData = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const fetchData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay

      setStats({
        totalBalance: 128430.00,
        monthlyRevenue: 12340.50,
        monthlySpending: 4210.20,
        revenueChange: 12.5,
        spendingChange: 8.2,
      });

      setTransactions([
        {
          id: '1',
          merchant: 'Apple Store',
          category: 'Technology',
          amount: -999.00,
          date: 'Today, 2:45 PM',
          status: 'completed',
          type: 'expense'
        },
        {
          id: '2',
          merchant: 'Starbucks',
          category: 'Food & Drink',
          amount: -5.50,
          date: 'Today, 10:20 AM',
          status: 'completed',
          type: 'expense'
        },
        {
          id: '3',
          merchant: 'Stripe Payout',
          category: 'Income',
          amount: 4500.00,
          date: 'Yesterday, 4:15 PM',
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
      ]);

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return { stats, transactions, isLoading };
};
