import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export const Label = ({ children, className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label className={cn("text-sm font-medium text-slate-300 flex items-center gap-2", className)} {...props}>
    {children}
  </label>
);

export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "w-full rounded-xl border border-white/10 bg-slate-900/50 p-3 text-white transition-all",
      "focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500",
      "placeholder:text-slate-500",
      className
    )}
    {...props}
  />
));
Input.displayName = 'Input';

export const ErrorMessage = ({ children }: { children?: React.ReactNode }) => {
  if (!children) return null;
  return (
    <p className="mt-1 text-xs font-medium text-rose-500 animate-in fade-in slide-in-from-top-1">
      {children}
    </p>
  );
};
