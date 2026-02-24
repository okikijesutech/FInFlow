import { 
  Loader2
} from 'lucide-react';
import { MainLayout } from './layouts/MainLayout';
import { DashboardOverview } from './components/features/DashboardOverview';
import { SettingsPage } from './components/features/SettingsPage';
import { BalancesPage } from './components/features/BalancesPage';
import { CardsPage } from './components/features/CardsPage';
import { TransactionsPage } from './components/features/TransactionsPage';
import { useDashboardData } from './hooks/useDashboardData';
import { NewTransactionModal } from './components/modals/NewTransactionModal';
import { useState } from 'react';

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

  return (
    <MainLayout 
      searchQuery={searchQuery} 
      setSearchQuery={setSearchQuery}
      activeItem={activePage}
      setActiveItem={setActivePage}
    >
      {activePage === 'Dashboard' && (
        <DashboardOverview
          stats={stats}
          transactions={transactions}
          onNewTransaction={() => setIsModalOpen(true)}
        />
      )}
      {activePage === 'Balances' && <BalancesPage />}
      {activePage === 'Transactions' && <TransactionsPage />}
      {activePage === 'Cards' && <CardsPage />}
      {activePage === 'Settings' && <SettingsPage />}

      <NewTransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={addTransaction} 
      />
    </MainLayout>
  );
}

export default App;
