import { Key, Smartphone } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../../ui/Card';
import { Button } from '../../ui/Button';

export const SecurityTab = () => {
  return (
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
  );
};
