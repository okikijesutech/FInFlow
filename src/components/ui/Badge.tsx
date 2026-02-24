import { cn } from '../../utils/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'success' | 'warning' | 'error' | 'neutral';
}

export const Badge = ({ className, variant = 'neutral', children, ...props }: BadgeProps) => {
  const variants = {
    success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-500 border-amber-500/20',
    error: 'bg-rose-500/10 text-rose-600 dark:text-rose-500 border-rose-500/20',
    neutral: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
