import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { UserRole } from '../../types';
import { Sprout, ShoppingCart, Truck, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const { loginAs } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [selectedRole, setSelectedRole] = useState<UserRole>('farmer');

  const roleOptions: {
    id: UserRole;
    title: string;
    sub: string;
    icon: any;
    color: string;
    demoAction: string;
  }[] = [
    {
      id: 'farmer',
      title: 'Farmer / FPO',
      sub: 'Sell crops directly at fair farm-gate prices with zero middlemen',
      icon: Sprout,
      color: 'border-agri-500 bg-agri-50/60 text-agri-900',
      demoAction: 'Login as Demo Farmer (Ramesh Patil)'
    },
    {
      id: 'buyer',
      title: 'Buyer (Bulk / Retail)',
      sub: 'Procure farm-fresh harvest directly with guaranteed escrow protection',
      icon: ShoppingCart,
      color: 'border-blue-500 bg-blue-50/60 text-blue-900',
      demoAction: 'Login as Demo Buyer (FreshMart Supermarket)'
    },
    {
      id: 'logistics',
      title: 'Logistics Partner',
      sub: 'Accept delivery runs with AI optimized routes and instant fuel payouts',
      icon: Truck,
      color: 'border-amber-500 bg-amber-50/60 text-amber-900',
      demoAction: 'Login as Demo Logistics (Kisan Rath MH12)'
    },
    {
      id: 'admin',
      title: 'Platform Admin',
      sub: 'KYC approvals, escrow custody, dispute resolutions and analytics',
      icon: ShieldCheck,
      color: 'border-purple-500 bg-purple-50/60 text-purple-900',
      demoAction: 'Login as Demo Admin (APMC Portal)'
    }
  ];

  const handleRoleSelectAndLogin = (roleId: UserRole) => {
    loginAs(roleId);
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
      {/* Top Language Bar */}
      <div className="max-w-md w-full mx-auto flex justify-end mb-4">
        <div className="flex items-center bg-white p-1 rounded-xl border border-stone-200 shadow-xs text-xs font-semibold">
          <button
            onClick={() => setLanguage('en')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              language === 'en' ? 'bg-agri-600 text-white font-bold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLanguage('hi')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              language === 'hi' ? 'bg-agri-600 text-white font-bold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            हिंदी
          </button>
          <button
            onClick={() => setLanguage('mr')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              language === 'mr' ? 'bg-agri-600 text-white font-bold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            मराठी
          </button>
        </div>
      </div>

      <div className="max-w-md w-full mx-auto bg-white rounded-3xl shadow-xl border border-stone-200 p-7 sm:p-8">
        
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-agri-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-3 shadow-md">
            <Sprout className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight m-0">
            Agri<span className="text-agri-600">Connect</span><span className="text-earth-600">AI</span>
          </h1>
          <p className="text-xs text-stone-500 font-medium mt-1">
            Direct Digital Agriculture Platform
          </p>
          <p className="text-xs font-bold text-agri-700 mt-0.5">
            Connecting Farmers Directly with Buyers • Zero Middlemen
          </p>
        </div>

        {/* Role Selector Header */}
        <div className="space-y-3 mb-6">
          <label className="block text-xs font-extrabold text-stone-700 uppercase tracking-wider text-center">
            Select Your Role to Enter:
          </label>

          <div className="space-y-2.5">
            {roleOptions.map(opt => {
              const Icon = opt.icon;
              const isSelected = selectedRole === opt.id;

              return (
                <div
                  key={opt.id}
                  onClick={() => setSelectedRole(opt.id)}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                    isSelected ? opt.color : 'border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-xs">
                        <Icon className="w-5 h-5 text-stone-800" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-extrabold text-xs text-stone-900">{opt.title}</h4>
                        <p className="text-[10px] text-stone-500 leading-tight mt-0.5 max-w-[220px]">
                          {opt.sub}
                        </p>
                      </div>
                    </div>

                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? 'border-stone-900 bg-stone-900' : 'border-stone-300'
                    }`}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Enter Dashboard Button */}
        <button
          onClick={() => handleRoleSelectAndLogin(selectedRole)}
          className="w-full py-3 bg-agri-600 hover:bg-agri-700 active:scale-95 text-white font-extrabold text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 mb-4"
        >
          <span>Enter as {roleOptions.find(r => r.id === selectedRole)?.title}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Quick Demo Credentials for Judges */}
        <div className="pt-4 border-t border-stone-200 text-center">
          <span className="text-[11px] font-bold text-stone-400 block mb-2 uppercase tracking-wide">
            Judge 1-Click Quick Logins
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => handleRoleSelectAndLogin('farmer')}
              className="py-2 px-2.5 bg-stone-100 hover:bg-stone-200 rounded-xl font-bold text-stone-800 text-[11px] transition-all"
            >
              🌾 Demo Farmer
            </button>
            <button
              onClick={() => handleRoleSelectAndLogin('buyer')}
              className="py-2 px-2.5 bg-stone-100 hover:bg-stone-200 rounded-xl font-bold text-stone-800 text-[11px] transition-all"
            >
              🛒 Demo Buyer
            </button>
            <button
              onClick={() => handleRoleSelectAndLogin('logistics')}
              className="py-2 px-2.5 bg-stone-100 hover:bg-stone-200 rounded-xl font-bold text-stone-800 text-[11px] transition-all"
            >
              🚚 Demo Logistics
            </button>
            <button
              onClick={() => handleRoleSelectAndLogin('admin')}
              className="py-2 px-2.5 bg-stone-100 hover:bg-stone-200 rounded-xl font-bold text-stone-800 text-[11px] transition-all"
            >
              🛡️ Demo Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};