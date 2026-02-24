import { useEffect, useState } from 'react';
import { X, DollarSign, Tag, Store } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { type Transaction } from '../../types/dashboard';

interface NewTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (transaction: Transaction) => void;
}

export const NewTransactionModal = ({ isOpen, onClose, onSubmit }: NewTransactionModalProps) => {
  const [amount, setAmount] = useState('');
  const [merchant, setMerchant] = useState('');
  const [category, setCategory] = useState('Technology');

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !merchant) return;

    onSubmit({
      id: Date.now().toString(),
      merchant,
      category,
      amount: -Math.abs(parseFloat(amount)), // Assuming expense for now
      date: 'Just now',
      status: 'completed',
      type: 'expense'
    });
    
    setAmount('');
    setMerchant('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative z-10 w-full max-w-md p-4 animate-in fade-in zoom-in-95 duration-200">
        <Card className="glass-card border-white/10 shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-4">
            <CardTitle className="text-xl text-white">New Transaction</CardTitle>
            <button 
              onClick={onClose}
              aria-label="Close modal"
              className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-indigo-400" />
                  Amount
                </label>
                <input 
                  type="number" 
                  step="0.01"
                  min="0"
                  required
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-slate-900/50 p-3 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <Store className="h-4 w-4 text-indigo-400" />
                  Merchant Name
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Apple Store"
                  value={merchant}
                  onChange={(e) => setMerchant(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-slate-900/50 p-3 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <Tag className="h-4 w-4 text-indigo-400" />
                  Category
                </label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-slate-900/50 p-3 text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all appearance-none"
                >
                  <option value="Technology">Technology</option>
                  <option value="Food & Drink">Food & Drink</option>
                  <option value="Transport">Transport</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Home">Home</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20"
                >
                  Add Transaction
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
