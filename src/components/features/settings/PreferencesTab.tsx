import { Globe } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../../ui/Card';
import { Toggle } from '../../ui/Toggle';

interface PreferencesTabProps {
  autoSync: boolean;
  onToggleSync: () => void;
}

export const PreferencesTab = ({ autoSync, onToggleSync }: PreferencesTabProps) => {
  return (
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
              <select className="w-full rounded-xl border border-white/10 bg-slate-900/50 p-3 text-white appearance-none focus:border-indigo-500 focus:outline-none transition-all">
                <option>USD ($) - US Dollar</option>
                <option>EUR (€) - Euro</option>
                <option>GBP (£) - British Pound</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Theme Engine</label>
              <select className="w-full rounded-xl border border-white/10 bg-slate-900/50 p-3 text-white appearance-none focus:border-indigo-500 focus:outline-none transition-all">
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
            <Toggle 
              enabled={autoSync} 
              onChange={onToggleSync} 
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
