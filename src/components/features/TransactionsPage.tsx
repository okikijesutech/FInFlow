import { Search, Filter, Download, ArrowUpRight, ArrowDownRight, Tag, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useDashboardData } from '../../hooks/useDashboardData';
import { formatCurrency } from '../../utils/formatters';
import { useState } from 'react';

export const TransactionsPage = () => {
  const { transactions, searchQuery, setSearchQuery } = useDashboardData();
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = ['All', 'Technology', 'Food & Drink', 'Transport', 'Entertainment', 'Income', 'Home', 'Other'];

  const filteredTransactions = transactions.filter(t => 
    (filterCategory === 'All' || t.category === filterCategory)
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">All Transactions</h1>
          <p className="mt-1 text-slate-400">View and manage your entire payment history.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2 border-white/10 hover:bg-white/5">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
          <Button className="gap-2 bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/20">
            <Filter className="h-4 w-4" />
            Advanced Filters
          </Button>
        </div>
      </div>

      <Card className="glass-card border-white/5 bg-slate-900/40 backdrop-blur-xl">
        <CardHeader className="border-b border-white/5 pb-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search merchant or category..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-950/50 py-2.5 pl-10 pr-4 text-sm text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`rounded-lg px-4 py-2 text-xs font-medium transition-all whitespace-nowrap ${
                    filterCategory === cat 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                      : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/5">
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Transaction</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Date</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Category</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Amount</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredTransactions.map((t) => (
                  <tr key={t.id} className="group hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                          t.type === 'income' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                        }`}>
                          {t.type === 'income' ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownRight className="h-5 w-5" />}
                        </div>
                        <span className="font-medium text-slate-200 group-hover:text-white transition-colors">
                          {t.merchant}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <Clock className="h-4 w-4 opacity-50" />
                        {t.date}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-indigo-400/60" />
                        <span className="text-sm text-slate-400">{t.category}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-semibold ${t.type === 'income' ? 'text-emerald-400' : 'text-slate-100'}`}>
                        {t.type === 'income' ? '+' : ''}{formatCurrency(t.amount)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Badge variant={t.status === 'completed' ? 'success' : 'warning'}>
                        {t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                      </Badge>
                    </td>
                  </tr>
                ))}
                {filteredTransactions.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center">
                      <p className="text-slate-500 font-medium">No transactions found matching your criteria.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
