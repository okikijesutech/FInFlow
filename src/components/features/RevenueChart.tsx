import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';

const data = [
  { name: 'Jan', revenue: 4000, spending: 2400 },
  { name: 'Feb', revenue: 3000, spending: 1398 },
  { name: 'Mar', revenue: 2000, spending: 9800 },
  { name: 'Apr', revenue: 2780, spending: 3908 },
  { name: 'May', revenue: 1890, spending: 4800 },
  { name: 'Jun', revenue: 2390, spending: 3800 },
  { name: 'Jul', revenue: 3490, spending: 4300 },
];

export const RevenueChart = () => {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Revenue Flow</CardTitle>
        <CardDescription>Monthly revenue vs spending analytics</CardDescription>
      </CardHeader>
      <CardContent className="h-[350px] w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--card-border)" />
            <XAxis 
              dataKey="name" 
              stroke="var(--muted)" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              dy={10}
            />
            <YAxis 
              stroke="var(--muted)" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--card)', 
                borderColor: 'var(--card-border)',
                borderRadius: '12px',
                color: 'var(--foreground)'
              }}
              itemStyle={{ color: 'var(--foreground)' }}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#6366f1" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
            />
            <Area 
              type="monotone" 
              dataKey="spending" 
              stroke="#ec4899" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorSpending)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
