import { useState } from 'react';
import { User, Bell, Shield, Key, Smartphone, Globe, Save } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../ui/Card';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';

export const SettingsPage = ({ initialTab = 'profile' }: { initialTab?: string }) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  const [notifications, setNotifications] = useState([
    { id: 'security', title: 'Security Alerts', desc: 'Critical changes to your account or login attempts', checked: true },
    { id: 'reports', title: 'Transaction Reports', desc: 'Weekly summary of your spending and revenue', checked: true },
    { id: 'budget', title: 'Budget Reminders', desc: 'Notifications when you reach 80% of your set limits', checked: false },
    { id: 'newsletter', title: 'Financial insights and platform updates', checked: false }
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
          {activeTab === 'profile' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Card>
                <CardHeader>
                  <CardTitle>Public Profile</CardTitle>
                  <CardDescription>This information will be displayed publicly so be careful what you share.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="h-20 w-20 overflow-hidden rounded-2xl border border-indigo-500/50 bg-indigo-500/10">
                      <img 
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" 
                        alt="Avatar" 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="space-x-3">
                      <Button variant="outline">Change Avatar</Button>
                      <Button variant="ghost" className="text-rose-400 hover:bg-rose-500/10 hover:text-rose-500">Remove</Button>
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                        First Name
                      </label>
                      <input 
                        defaultValue="Alex"
                        className="w-full rounded-xl border border-white/10 bg-slate-900/50 p-3 text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                        Last Name
                      </label>
                      <input 
                        defaultValue="Rivers"
                        className="w-full rounded-xl border border-white/10 bg-slate-900/50 p-3 text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                      Email Address
                    </label>
                    <input 
                      defaultValue="alex.rivers@example.com"
                      type="email"
                      className="w-full rounded-xl border border-white/10 bg-slate-900/50 p-3 text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                    />
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button className="gap-2 bg-indigo-600 hover:bg-indigo-500">
                      <Save className="h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your password and security preferences.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-slate-900/30">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                        <Key className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-white">Password</p>
                        <p className="text-sm text-slate-400">Last changed 3 months ago</p>
                      </div>
                    </div>
                    <Button variant="outline">Update</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-slate-900/30">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                        <Smartphone className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-white">Two-Factor Authentication</p>
                        <p className="text-sm text-slate-400">Secured with Authenticator App</p>
                      </div>
                    </div>
                    <Button variant="outline">Configured</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Control how and when you receive updates from FinFlow.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {notifications.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-slate-900/30">
                      <div>
                        <p className="font-medium text-white">{item.title}</p>
                        <p className="text-sm text-slate-400">{item.desc}</p>
                      </div>
                      <div 
                        onClick={() => toggleNotification(item.id)}
                        className={cn(
                          "h-6 w-11 rounded-full p-1 transition-colors cursor-pointer",
                          item.checked ? "bg-indigo-600" : "bg-slate-700"
                        )}
                      >
                        <div className={cn(
                          "h-4 w-4 rounded-full bg-white transition-transform duration-200",
                          item.checked ? "translate-x-5" : "translate-x-0"
                        )} />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Card>
                <CardHeader>
                  <CardTitle>System Preferences</CardTitle>
                  <CardDescription>Customize your workspace aesthetic and data display.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">Default Currency</label>
                      <select className="w-full rounded-xl border border-white/10 bg-slate-900/50 p-3 text-white appearance-none focus:border-indigo-500 focus:outline-none">
                        <option>USD ($) - US Dollar</option>
                        <option>EUR (€) - Euro</option>
                        <option>GBP (£) - British Pound</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">Theme Engine</label>
                      <select className="w-full rounded-xl border border-white/10 bg-slate-900/50 p-3 text-white appearance-none focus:border-indigo-500 focus:outline-none">
                        <option>Glassmorphism Dark (Default)</option>
                        <option>High Contrast</option>
                        <option>System Neutral</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-slate-900/30">
                    <div className="flex items-center gap-4">
                      <Globe className="h-5 w-5 text-indigo-400" />
                      <div>
                        <p className="font-medium text-white">Browser Auto-Sync</p>
                        <p className="text-sm text-slate-400">Keep data synchronized across multiple browser instances</p>
                      </div>
                    </div>
                    <div 
                      onClick={() => setAutoSync(!autoSync)}
                      className={cn(
                        "h-6 w-11 rounded-full p-1 transition-colors cursor-pointer",
                        autoSync ? "bg-indigo-600" : "bg-slate-700"
                      )}
                    >
                      <div className={cn(
                        "h-4 w-4 rounded-full bg-white transition-transform duration-200",
                        autoSync ? "translate-x-5" : "translate-x-0"
                      )} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
