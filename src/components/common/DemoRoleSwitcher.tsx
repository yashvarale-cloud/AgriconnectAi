import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { UserRole } from '../../types';
import { Sprout, ShoppingCart, Truck, ShieldCheck, RotateCcw } from 'lucide-react';

export const DemoRoleSwitcher: React.FC = () => {
  const { role, loginAs } = useAuth();
  const { t } = useLanguage();
  const { resetDemoData } = useData();

  const roles: { id: UserRole; label: string; icon: any; color: string; desc: string }[] = [
    { id: 'farmer', label: 'Farmer / FPO', icon: Sprout, color: 'bg-emerald-700 text-white', desc: 'Ramesh Patil (Nashik)' },
    { id: 'buyer', label: 'Buyer', icon: ShoppingCart, color: 'bg-blue-700 text-white', desc: 'FreshMart (Pune)' },
    { id: 'logistics', label: 'Logistics', icon: Truck, color: 'bg-amber-700 text-white', desc: 'Kisan Rath (MH12)' },
    { id: 'admin', label: 'Admin', icon: ShieldCheck, color: 'bg-purple-800 text-white', desc: 'Govt / APMC Portal' },
  ];

  return (
    <div className="bg-stone-900 text-stone-100 px-3 py-2 text-xs border-b border-stone-800 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="bg-emerald-500 text-stone-950 font-extrabold px-1.5 py-0.5 rounded text-[10px] tracking-wide uppercase">
            Live Demo
          </span>
          <span className="text-stone-300 font-medium hidden sm:inline">
            Quick Role Switcher:
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          {roles.map(r => {
            const Icon = r.icon;
            const isActive = role === r.id;
            return (
              <button
                key={r.id}
                onClick={() => loginAs(r.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-semibold transition-all ${
                  isActive
                    ? `${r.color} ring-2 ring-emerald-400 shadow`
                    : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{r.label}</span>
                <span className="text-[10px] opacity-75 hidden md:inline">({r.desc})</span>
              </button>
            );
          })}

          <button
            onClick={() => {
              if (confirm('Reset all demo data back to initial state?')) {
                resetDemoData();
                alert('Demo data has been reset to initial state!');
              }
            }}
            title="Reset demo data to initial seed"
            className="flex items-center gap-1 px-2 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-200 border border-stone-700 text-[11px]"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden lg:inline">Reset State</span>
          </button>
        </div>
      </div>
    </div>
  );
};