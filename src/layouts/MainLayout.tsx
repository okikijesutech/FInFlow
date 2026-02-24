import { useState } from 'react';
import { 
  LayoutDashboard, 
  Wallet, 
  ArrowLeftRight, 
  CreditCard, 
  Settings, 
  Bell, 
  Search, 
  Menu,
  X,
  LogOut
} from 'lucide-react';
import { cn } from '../utils/cn';
import { useUserStore } from '../store/useUserStore';
import { ThemeSwitcher } from '../components/ui/ThemeSwitcher';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const NavItem = ({ icon: Icon, label, isActive, onClick }: NavItemProps) => (
  <button
    onClick={onClick}
    className={cn(
      'flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200',
      isActive 
        ? 'bg-indigo-600/90 text-white shadow-lg shadow-indigo-600/20' 
        : 'text-slate-400 hover:bg-white/5 hover:text-slate-100'
    )}
  >
    <Icon className="h-5 w-5" />
    {label}
  </button>
);

interface MainLayoutProps {
  children: React.ReactNode;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  activeItem?: string;
  setActiveItem?: (item: string) => void;
}

export const MainLayout = ({ 
  children, 
  searchQuery, 
  setSearchQuery,
  activeItem = 'Dashboard',
  setActiveItem
}: MainLayoutProps) => {
  const { user } = useUserStore();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [internalActiveItem, setInternalActiveItem] = useState('Dashboard');

  const currentActiveItem = setActiveItem ? activeItem : internalActiveItem;
  const handleItemClick = (name: string) => {
    if (setActiveItem) {
      setActiveItem(name);
    } else {
      setInternalActiveItem(name);
    }
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard' },
    { icon: Wallet, label: 'Balances' },
    { icon: ArrowLeftRight, label: 'Transactions' },
    { icon: CreditCard, label: 'Cards' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="flex min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Sidebar - Desktop */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-72 border-r border-card-border bg-background/50 backdrop-blur-xl lg:block">
        <div className="flex h-full flex-col p-6">
          <div className="mb-10 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">FinFlow</span>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <NavItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                isActive={currentActiveItem === item.label}
                onClick={() => handleItemClick(item.label)}
              />
            ))}
          </nav>

          <div className="mt-auto">
            <NavItem icon={LogOut} label="Sign Out" />
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Mobile */}
      <aside className={cn(
        "fixed left-0 top-0 z-50 h-screen w-[280px] bg-background border-r border-card-border p-6 transition-transform duration-300 lg:hidden",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-full flex-col">
          <div className="mb-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <Wallet className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">FinFlow</span>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="text-muted">
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <NavItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                isActive={currentActiveItem === item.label}
                onClick={() => {
                  handleItemClick(item.label);
                  setSidebarOpen(false);
                }}
              />
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-72">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-card-border bg-background/50 px-6 backdrop-blur-xl lg:px-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 hover:bg-card/50 lg:hidden"
            >
              <Menu className="h-6 w-6 text-muted" />
            </button>
            <div className="hidden items-center gap-2 text-sm text-muted md:flex">
              <span>Pages</span>
              <span>/</span>
              <span className="text-foreground/80">{currentActiveItem}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 lg:gap-6">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input 
                type="text" 
                placeholder="Search transactions..." 
                value={searchQuery || ''}
                onChange={(e) => setSearchQuery?.(e.target.value)}
                className="h-10 w-64 rounded-xl border border-card-border bg-card/30 pl-10 pr-4 text-sm text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
            <ThemeSwitcher />
            <button className="relative rounded-xl border border-card-border bg-card/30 p-2.5 text-muted hover:text-foreground transition-all">
              <Bell className="h-5 w-5" />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-rose-500 border-2 border-background" />
            </button>
            <button 
              onClick={() => handleItemClick('Settings')}
              className="flex items-center gap-3 pl-4 border-l border-card-border group transition-all"
            >
              <div className="hidden flex-col items-end text-sm md:flex group-hover:opacity-80">
                <span className="font-medium text-foreground">{user.firstName} {user.lastName}</span>
                <span className="text-xs text-muted">Premium Member</span>
              </div>
              <div className="h-10 w-10 overflow-hidden rounded-xl border border-primary/50 bg-primary/10 shadow-lg shadow-primary/10 group-hover:border-primary group-hover:scale-95 transition-all">
                <img 
                  src={user.avatarUrl} 
                  alt="Avatar" 
                  className="h-full w-full object-cover"
                />
              </div>
            </button>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="p-6 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
};
