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
          <h1 className="text-3xl font-bold tracking-tight text-foreground">All Transactions</h1>
          <p className="mt-1 text-muted">View and manage your entire payment history.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
          <Button className="gap-2 bg-primary hover:bg-primary/90 shadow-primary/20">
            <Filter className="h-4 w-4" />
            Advanced Filters
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="border-b border-card-border pb-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input 
                type="text" 
                placeholder="Search merchant or category..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-card-border bg-card/50 py-2.5 pl-10 pr-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`rounded-lg px-4 py-2 text-xs font-medium transition-all whitespace-nowrap ${
                    filterCategory === cat 
                      ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                      : 'bg-muted/10 text-muted hover:bg-muted/20 hover:text-foreground'
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
                <tr className="border-b border-card-border bg-muted/5">
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted">Transaction</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted">Date</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted">Category</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted">Amount</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-card-border">
                {filteredTransactions.map((t) => (
                  <tr key={t.id} className="group hover:bg-muted/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                          t.type === 'income' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-500' : 'bg-rose-500/10 text-rose-600 dark:text-rose-500'
                        }`}>
                          {t.type === 'income' ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownRight className="h-5 w-5" />}
                        </div>
                        <span className="font-medium text-foreground transition-colors text-slate-800 dark:text-slate-200">
                          {t.merchant}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-muted">
                        <Clock className="h-4 w-4 opacity-50" />
                        {t.date}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-primary/60" />
                        <span className="text-sm text-muted">{t.category}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-semibold ${t.type === 'income' ? 'text-emerald-600 dark:text-emerald-500' : 'text-foreground'}`}>
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
