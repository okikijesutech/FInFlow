import { Sun, Moon, Monitor } from 'lucide-react';
import { useThemeStore } from '../../store/useThemeStore';
import { cn } from '../../utils/cn';

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useThemeStore();

  const options: { value: 'light' | 'dark' | 'system'; icon: any; label: string }[] = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'dark', icon: Moon, label: 'Dark' },
    { value: 'system', icon: Monitor, label: 'System' },
  ];

  return (
    <div className="flex items-center gap-1 rounded-xl border border-white/5 bg-slate-900/50 p-1 backdrop-blur-md">
      {options.map((opt) => {
        const Icon = opt.icon;
        const isActive = theme === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => setTheme(opt.value)}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200",
              isActive 
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
                : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
            )}
            title={opt.label}
          >
            <Icon className="h-4 w-4" />
          </button>
        );
      })}
    </div>
  );
};
