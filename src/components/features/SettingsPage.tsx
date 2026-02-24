import { useState } from 'react';
import { User, Bell, Shield, Globe } from 'lucide-react';
import { cn } from '../../utils/cn';
import { ProfileTab } from './settings/ProfileTab';
import { SecurityTab } from './settings/SecurityTab';
import { NotificationsTab } from './settings/NotificationsTab';
import { PreferencesTab } from './settings/PreferencesTab';

export const SettingsPage = ({ initialTab = 'profile' }: { initialTab?: string }) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  const [notifications, setNotifications] = useState([
    { id: 'security', title: 'Security Alerts', desc: 'Critical changes to your account or login attempts', checked: true },
    { id: 'reports', title: 'Transaction Reports', desc: 'Weekly summary of your spending and revenue', checked: true },
    { id: 'budget', title: 'Budget Reminders', desc: 'Notifications when you reach 80% of your set limits', checked: false },
    { id: 'newsletter', title: 'Newsletter', desc: 'Financial insights and platform updates', checked: false }
  ]);

  const [autoSync, setAutoSync] = useState(true);

  const toggleNotification = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, checked: !n.checked } : n
    ));
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: Globe },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Settings</h1>
        <p className="mt-1 text-slate-400">Manage your account settings and preferences.</p>
      </div>

      <div className="flex flex-col gap-8 md:flex-row">
        {/* Settings Navigation */}
        <div className="w-full md:w-64 shrink-0">
          <nav className="flex space-x-2 md:flex-col md:space-x-0 md:space-y-2 overflow-x-auto pb-2 md:pb-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all whitespace-nowrap",
                    activeTab === tab.id
                      ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20"
                      : "text-slate-400 hover:bg-white/5 hover:text-slate-100"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1 space-y-6">
          {activeTab === 'profile' && <ProfileTab />}
          {activeTab === 'security' && <SecurityTab />}
          {activeTab === 'notifications' && (
            <NotificationsTab 
              settings={notifications} 
              onToggle={toggleNotification} 
            />
          )}
          {activeTab === 'preferences' && (
            <PreferencesTab 
              autoSync={autoSync} 
              onToggleSync={() => setAutoSync(!autoSync)} 
            />
          )}
        </div>
      </div>
    </div>
  );
};
