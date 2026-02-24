import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface ToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  className?: string;
}

export const Toggle = ({ enabled, onChange, className }: ToggleProps) => {
  return (
    <div 
      onClick={() => onChange(!enabled)}
      className={cn(
        "h-6 w-11 rounded-full p-1 transition-colors cursor-pointer relative",
        enabled ? "bg-indigo-600" : "bg-slate-700",
        className
      )}
    >
      <motion.div 
        animate={{ x: enabled ? 20 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="h-4 w-4 rounded-full bg-white shadow-sm"
      />
    </div>
  );
};
