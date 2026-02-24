import { CreditCard as CardIcon, Shield, Zap, Plus, Settings2, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useState } from 'react';

const myCards = [
  {
    id: 'card-1',
    type: 'Virtual',
    name: 'Online Purchases',
    network: 'mastercard',
    number: '**** **** **** 5821',
    expiry: '12/28',
    color: 'from-indigo-500 to-purple-600',
    status: 'active',
    balance: 450.00
  },
  {
    id: 'card-2',
    type: 'Physical',
    name: 'Travel Premium',
    network: 'visa',
    number: '**** **** **** 9044',
    expiry: '05/27',
    color: 'from-emerald-500 to-teal-700',
    status: 'active',
    balance: 12500.00
  }
];

export const CardsPage = () => {
  const [showNumbers, setShowNumbers] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Cards Management</h1>
          <p className="mt-1 text-slate-400">Manage your virtual and physical premium cards.</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={() => setShowNumbers(!showNumbers)}
            className="gap-2"
          >
            {showNumbers ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {showNumbers ? 'Hide' : 'Show'} Details
          </Button>
          <Button className="gap-2 bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/20">
            <Plus className="h-4 w-4" />
            New Card
          </Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
        {myCards.map(card => (
          <div key={card.id} className="group relative flex flex-col gap-4">
            {/* The actual Card Graphic */}
            <div className={`relative h-56 w-full overflow-hidden rounded-2xl bg-gradient-to-br ${card.color} p-6 shadow-2xl transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-indigo-500/25`}>
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-black/10 blur-2xl" />
              
              <div className="relative z-10 flex h-full flex-col justify-between text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white/70 text-sm font-medium">{card.type} Card</p>
                    <p className="font-semibold tracking-wide mt-1">{card.name}</p>
                  </div>
                  <CardIcon className="h-8 w-8 opacity-80" />
                </div>
                
                <div className="space-y-4">
                  <p className="font-mono text-xl tracking-[0.2em] drop-shadow-md">
                    {showNumbers ? card.number.replace(/\*/g, '4') : card.number}
                  </p>
                  <div className="flex justify-between text-sm items-end">
                    <div className="flex gap-6">
                      <div>
                        <p className="text-white/60 text-xs">Valid Thru</p>
                        <p className="font-medium tracking-wider">{card.expiry}</p>
                      </div>
                      <div>
                        <p className="text-white/60 text-xs">CVC</p>
                        <p className="font-medium tracking-wider">{showNumbers ? '731' : '***'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg uppercase tracking-wider italic opacity-90">{card.network}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Settings/Controls */}
            <Card className="border-white/5 bg-slate-900/50 backdrop-blur-xl">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Badge variant={card.status === 'active' ? 'success' : 'neutral'}>
                    {card.status.toUpperCase()}
                  </Badge>
                  <span className="text-sm text-slate-400">Limit: $15,000</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="h-8 px-3 text-xs gap-2">
                    <Shield className="h-3 w-3" />
                    Freeze
                  </Button>
                  <Button variant="outline" className="h-8 px-3 text-xs gap-2">
                    <Settings2 className="h-3 w-3" />
                    Limits
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}

        {/* Create new card placeholder */}
        <button className="flex h-[324px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/10 bg-white/5 text-slate-400 transition-all hover:border-indigo-500/50 hover:bg-indigo-500/5 hover:text-indigo-400">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500/10 backdrop-blur-md">
            <Zap className="h-8 w-8" />
          </div>
          <span className="text-lg font-medium">Issue Instantly</span>
          <span className="text-sm opacity-70">Virtual or physical delivery</span>
        </button>
      </div>
    </div>
  );
};
