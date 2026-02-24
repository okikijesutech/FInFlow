import { Save } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../../ui/Card';
import { Button } from '../../ui/Button';

export const ProfileTab = () => {
  return (
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
  );
};
