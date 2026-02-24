import { Wallet, PiggyBank, TrendingUp, Plus, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { formatCurrency } from '../../utils/formatters';

const accounts = [
  {
    id: 'acc-1',
    name: 'Main Checking',
    type: 'checking',
    balance: 42500.00,
    number: '**** 4582',
    icon: Wallet,
    color: 'indigo',
    recentActivity: [
      { id: '1', name: 'Apple Store', amount: -999.00, isExpense: true },
      { id: '2', name: 'Salary Deposit', amount: 5200.00, isExpense: false },
    ]
  },
  {
    id: 'acc-2',
    name: 'High-Yield Savings',
    type: 'savings',
    balance: 65000.00,
    number: '**** 9921',
    icon: PiggyBank,
    color: 'emerald',
    recentActivity: [
      { id: '3', name: 'Monthly Transfer', amount: 1500.00, isExpense: false },
      { id: '4', name: 'Interest Yield', amount: 245.50, isExpense: false },
    ]
  },
  {
    id: 'acc-3',
    name: 'Investment Portfolio',
    type: 'investment',
    balance: 20930.00,
    number: '**** 1104',
    icon: TrendingUp,
    color: 'purple',
    recentActivity: [
      { id: '5', name: 'AAPL Dividend', amount: 120.00, isExpense: false },
      { id: '6', name: 'Vanguard ETF Buy', amount: -500.00, isExpense: true },
    ]
  }
];

// Tailwind needs full class names, it can't evaluate dynamic strings during build
const colorMap: Record<string, { bg: string, text: string, decoration: string }> = {
  indigo: { bg: 'bg-indigo-500/20', text: 'text-indigo-400', decoration: 'bg-indigo-500/10' },
  emerald: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', decoration: 'bg-emerald-500/10' },
  purple: { bg: 'bg-purple-500/20', text: 'text-purple-400', decoration: 'bg-purple-500/10' },
};

export const BalancesPage = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Account Balances</h1>
          <p className="mt-1 text-slate-400">Manage your connected bank accounts and portfolios.</p>
        </div>
        <Button className="gap-2 bg-white text-indigo-950 hover:bg-slate-200 shadow-xl shadow-white/10">
          <Plus className="h-4 w-4" />
          Connect Account
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {accounts.map((account) => {
          const Icon = account.icon;
          const colors = colorMap[account.color];
          
          return (
            <Card key={account.id} className="relative overflow-hidden border-white/5 bg-slate-900/40 backdrop-blur-xl transition-all hover:border-white/10 hover:shadow-2xl hover:-translate-y-1">
              <div className={`absolute right-0 top-0 h-32 w-32 -translate-y-16 translate-x-16 rounded-full ${colors.decoration} blur-3xl`} />
              
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${colors.bg} ${colors.text}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <Badge variant={account.type === 'savings' ? 'success' : account.type === 'investment' ? 'warning' : 'neutral'}>
                    {account.type.charAt(0).toUpperCase() + account.type.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <p className="text-sm font-medium text-slate-400">{account.name}</p>
                  <h3 className="mt-1 text-3xl font-bold text-white tracking-tight">
                    {formatCurrency(account.balance)}
                  </h3>
                  <p className="mt-2 font-mono text-sm text-slate-500">{account.number}</p>
                </div>

                <div className="space-y-3 border-t border-white/5 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Recent Activity</p>
                  {account.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between text-sm">
                      <span className="text-slate-300">{activity.name}</span>
                      <span className={`flex items-center gap-1 font-medium ${activity.isExpense ? 'text-slate-300' : 'text-emerald-400'}`}>
                        {activity.isExpense ? <ArrowDownRight className="h-3 w-3 text-slate-500" /> : <ArrowUpRight className="h-3 w-3" />}
                        {formatCurrency(Math.abs(activity.amount))}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 flex gap-2">
                  <Button variant="outline" className="w-full text-xs h-9">Transfer</Button>
                  <Button variant="outline" className="w-full text-xs h-9">Details</Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
