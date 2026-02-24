import { ShoppingBag, Coffee, Car, Home, Smartphone } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { cn } from '../../utils/cn';
import { formatCurrency } from '../../utils/formatters';
import type { Transaction } from '../../types/dashboard';

const getIcon = (merchant: string) => {
  if (merchant.includes('Apple') || merchant.includes('Smartphone')) return Smartphone;
  if (merchant.includes('Starbucks') || merchant.includes('Coffee')) return Coffee;
  if (merchant.includes('Uber')) return Car;
  if (merchant.includes('Rent')) return Home;
  return ShoppingBag;
};

export const RecentTransactions = ({ transactions }: { transactions: Transaction[] }) => {
  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Latest activities from your accounts</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="mt-4 px-0">
        <div className="space-y-1">
          {transactions.map((tx) => {
            const Icon = getIcon(tx.merchant);
            return (
              <div 
                key={tx.id} 
                className="flex items-center justify-between p-4 transition-all duration-200 hover:bg-card/50 rounded-xl group"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-card border border-card-border group-hover:border-primary/30 transition-colors">
                    <Icon className="h-5 w-5 text-muted group-hover:text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{tx.merchant}</p>
                    <p className="text-xs text-muted">{tx.date}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={cn(
                    "text-sm font-bold",
                    tx.amount > 0 ? "text-emerald-500" : "text-foreground"
                  )}>
                    {tx.amount > 0 ? `+${formatCurrency(tx.amount)}` : formatCurrency(tx.amount)}
                  </span>
                  <Badge variant={tx.status === 'completed' ? 'success' : 'warning'}>
                    {tx.status}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
