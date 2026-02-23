export type TransactionStatus = 'completed' | 'pending' | 'failed';
export type TransactionType = 'income' | 'expense' | 'transfer';

export interface Transaction {
  id: string;
  merchant: string;
  category: string;
  amount: number;
  date: string;
  status: TransactionStatus;
  type: TransactionType;
  icon?: string;
}

export interface DashboardStats {
  totalBalance: number;
  monthlyRevenue: number;
  monthlySpending: number;
  revenueChange: number;
  spendingChange: number;
}
