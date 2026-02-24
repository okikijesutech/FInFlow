import { 
  Plus, 
  Download, 
  CreditCard, 
  TrendingUp, 
  ArrowDownRight,
  ShieldCheck,
  Zap,
  Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { MainLayout } from './layouts/MainLayout';
import { Button } from './components/ui/Button';
import { StatsCard } from './components/features/StatsCard';
import { RevenueChart } from './components/features/RevenueChart';
import { RecentTransactions } from './components/features/RecentTransactions';
import { SettingsPage } from './components/features/SettingsPage';
import { BalancesPage } from './components/features/BalancesPage';
import { CardsPage } from './components/features/CardsPage';
import { TransactionsPage } from './components/features/TransactionsPage';
import { useDashboardData } from './hooks/useDashboardData';
import { formatCurrency } from './utils/formatters';
import { NewTransactionModal } from './components/modals/NewTransactionModal';
import { useState } from 'react';

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

function App() {
  const { 
    stats, 
    transactions, 
    isLoading, 
    addTransaction,
    searchQuery,
    setSearchQuery
  } = useDashboardData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePage, setActivePage] = useState('Dashboard');

  if (isLoading || !stats) {
    return (
      <MainLayout>
        <div className="flex h-[60vh] w-full flex-col items-center justify-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-indigo-500" />
          <p className="text-slate-400 font-medium animate-pulse">Loading dashboard intelligence...</p>
        </div>
      </MainLayout>
    );
  }

  const renderDashboard = () => (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard Overview</h1>
          <p className="mt-1 text-slate-400 text-lg">Good morning, Alex. Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="hidden sm:inline-flex gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
          <Button 
            className="gap-2 bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/20"
            onClick={() => setIsModalOpen(true)}
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

      {/* Pro Feature Promo - Demonstration of Glassmorphism */}
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
        {/* Decorative gradients */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 left-20 h-64 w-64 rounded-full bg-indigo-400/20 blur-3xl" />
      </motion.div>
    </div>
  );

  return (
    <MainLayout 
      searchQuery={searchQuery} 
      setSearchQuery={setSearchQuery}
      activeItem={activePage}
      setActiveItem={setActivePage}
    >
      {activePage === 'Dashboard' && renderDashboard()}
      {activePage === 'Balances' && <BalancesPage />}
      {activePage === 'Transactions' && <TransactionsPage />}
      {activePage === 'Cards' && <CardsPage />}
      {activePage === 'Settings' && <SettingsPage />}
      
      {/* Fallback for profile access via Sidebar/Topbar */}
      {activePage === 'Profile' && (
        <div className="animate-in fade-in duration-500">
           {/* We redirect profile view to settings for now, as it hosts the profile form */}
           <SettingsPage initialTab="profile" />
        </div>
      )}

      <NewTransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={addTransaction} 
      />
    </MainLayout>
  );
}

export default App;
