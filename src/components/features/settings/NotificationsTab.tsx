import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../../ui/Card';
import { Toggle } from '../../ui/Toggle';

interface NotificationSetting {
  id: string;
  title: string;
  desc: string;
  checked: boolean;
}

interface NotificationsTabProps {
  settings: NotificationSetting[];
  onToggle: (id: string) => void;
}

export const NotificationsTab = ({ settings, onToggle }: NotificationsTabProps) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Control how and when you receive updates from FinFlow.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {settings.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-slate-900/30">
              <div>
                <p className="font-medium text-white">{item.title}</p>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </div>
              <Toggle 
                enabled={item.checked} 
                onChange={() => onToggle(item.id)} 
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
