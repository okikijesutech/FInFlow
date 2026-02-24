import { TrendingUp, TrendingDown, type LucideIcon } from 'lucide-react';
import { Card } from '../ui/Card';
import { cn } from '../../utils/cn';

interface StatsCardProps {
  title: string;
  value: string;
  change: number;
  icon: LucideIcon;
  trend: 'up' | 'down';
  color?: 'indigo' | 'emerald' | 'amber' | 'rose';
}

export const StatsCard = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  trend,
  color = 'indigo'
}: StatsCardProps) => {
  const colorClasses = {
    indigo: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    amber: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    rose: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
  };

  const trendIcon = trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />;
  const trendColor = trend === 'up' ? 'text-emerald-500' : 'text-rose-500';

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className={cn('flex h-12 w-12 items-center justify-center rounded-2xl border transition-all duration-300', colorClasses[color])}>
          <Icon className="h-6 w-6" />
        </div>
        <div className={cn('flex items-center gap-1 text-sm font-medium', trendColor)}>
          {trendIcon}
          <span>{Math.abs(change)}%</span>
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-muted">{title}</p>
        <h3 className="mt-1 text-2xl font-bold text-foreground tracking-tight">{value}</h3>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted/20">
        <div 
          className={cn('h-full transition-all duration-1000', 
            color === 'indigo' ? 'bg-indigo-500' : 
            color === 'emerald' ? 'bg-emerald-500' : 
            color === 'amber' ? 'bg-amber-500' : 'bg-rose-500'
          )} 
          style={{ width: '65%' }} 
        />
      </div>
    </Card>
  );
};
