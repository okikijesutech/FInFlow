import { useEffect } from 'react';
import { useDashboardStore } from '../store/useDashboardStore';
import { DashboardService } from '../services/DashboardService';
import type { Transaction } from '../types/dashboard';

export const useDashboardData = () => {
  const { 
    stats, 
    transactions, 
    isLoading, 
    searchQuery,
    setSearchQuery,
    setStats,
    setTransactions,
    addTransaction: addTxToStore,
    setLoading
  } = useDashboardStore();

  useEffect(() => {
    const loadData = async () => {
      // Only fetch if we don't have persisted transactions
      if (transactions.length === 0) {
        setLoading(true);
        try {
          const { stats: freshStats, transactions: freshTxs } = await DashboardService.fetchDashboardData();
          setStats(freshStats);
          setTransactions(freshTxs);
        } catch (error) {
          console.error("Failed to fetch dashboard data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    loadData();
  }, [setStats, setTransactions, setLoading, transactions.length]);

  const addTransaction = async (newTx: Omit<Transaction, 'id' | 'status'>) => {
    // Professional async data flow
    try {
      const tx = await DashboardService.addTransaction(newTx);
      addTxToStore(tx);
    } catch (error) {
      console.error("Failed to add transaction:", error);
    }
  };

  const filteredTransactions = transactions.filter(t => 
    t.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return {
    stats,
    transactions: filteredTransactions,
    isLoading,
    addTransaction,
    searchQuery,
    setSearchQuery
  };
};
