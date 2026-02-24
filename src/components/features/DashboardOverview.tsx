import { motion } from 'framer-motion';
import { 
  Plus, 
  Download, 
  CreditCard, 
  TrendingUp, 
  ArrowDownRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { Button } from '../ui/Button';
import { StatsCard } from './StatsCard';
import { RevenueChart } from './RevenueChart';
import { RecentTransactions } from './RecentTransactions';
import { formatCurrency } from '../../utils/formatters';
import { useUserStore } from '../../store/useUserStore';
import type { Transaction, DashboardStats } from '../../types/dashboard';

interface DashboardOverviewProps {
  stats: DashboardStats;
  transactions: Transaction[];
  onNewTransaction: () => void;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export const DashboardOverview = ({ stats, transactions, onNewTransaction }: DashboardOverviewProps) => {
  const { user } = useUserStore();
  
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard Overview</h1>
          <p className="mt-1 text-muted text-lg">Good morning, {user.firstName}. Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="hidden sm:inline-flex gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
          <Button 
            className="gap-2 bg-primary hover:bg-primary/90 shadow-primary/20"
            onClick={onNewTransaction}
          >
            <Plus className="h-4 w-4" />
            New Transaction
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        <motion.div variants={item}>
          <StatsCard 
            title="Total Balance" 
            value={formatCurrency(stats.totalBalance)} 
            change={stats.revenueChange} 
            icon={CreditCard} 
            trend="up" 
            color="indigo"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard 
            title="Monthly Revenue" 
            value={formatCurrency(stats.monthlyRevenue)} 
            change={stats.revenueChange} 
            icon={TrendingUp} 
            trend="up" 
            color="emerald"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard 
            title="Monthly Spending" 
            value={formatCurrency(stats.monthlySpending)} 
            change={stats.spendingChange} 
            icon={ArrowDownRight} 
            trend="down" 
            color="amber"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard 
            title="Savings Target" 
            value="$2,100.00" 
            change={95} 
            icon={Zap} 
            trend="up" 
            color="rose"
          />
        </motion.div>
      </motion.div>

      {/* Charts and Transactions */}
      <div className="grid gap-8 lg:grid-cols-3">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <RevenueChart />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <RecentTransactions transactions={transactions} />
        </motion.div>
      </div>

      {/* Pro Feature Promo */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="relative overflow-hidden rounded-3xl bg-indigo-600 p-8 text-white shadow-2xl shadow-indigo-600/20"
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="max-w-2xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold">Secure your financial future with Premium</h2>
            <p className="mt-2 text-indigo-100">Get advanced analytics, fraud protection, and priority support. Join 50,000+ members today.</p>
          </div>
          <Button size="lg" className="bg-white text-indigo-600 hover:bg-slate-100 border-none shrink-0 font-bold px-8">
            Upgrade Now
          </Button>
        </div>
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 left-20 h-64 w-64 rounded-full bg-indigo-400/20 blur-3xl" />
      </motion.div>
    </div>
  );
};
