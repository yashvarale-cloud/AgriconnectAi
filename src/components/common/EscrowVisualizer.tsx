import React from 'react';
import { ShieldCheck, Truck, ArrowRight, CheckCircle2, Lock, Banknote } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const EscrowVisualizer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-gradient-to-br from-agri-50 to-stone-50 border border-agri-200 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-agri-600 text-white flex items-center justify-center shadow">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-extrabold text-stone-900 text-sm sm:text-base">
            {t('escrowTitle')}
          </h3>
          <p className="text-xs text-stone-500">
            Guaranteed payment protection for farmers and delivery assurance for buyers
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-4 relative">
        {/* Step 1 */}
        <div className="bg-white border border-stone-200 rounded-xl p-3.5 flex flex-col justify-between shadow-sm relative">
          <div className="flex items-center justify-between mb-2">
            <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">1</span>
            <Lock className="w-4 h-4 text-blue-600" />
          </div>
          <h4 className="font-bold text-stone-800 text-xs sm:text-sm">Buyer Deposits in Escrow</h4>
          <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
            Buyer pays digitally. Funds are locked safely in escrow before farmer harvests or packs.
          </p>
          <span className="mt-2 inline-flex text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
            Zero Payment Risk
          </span>
        </div>

        {/* Step 2 */}
        <div className="bg-white border border-stone-200 rounded-xl p-3.5 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 font-bold text-xs flex items-center justify-center">2</span>
            <Truck className="w-4 h-4 text-amber-600" />
          </div>
          <h4 className="font-bold text-stone-800 text-xs sm:text-sm">Farmer Dispatches & Tracks</h4>
          <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
            Logistics partner picks up crop. Real-time GPS location and checkpoints shared with buyer.
          </p>
          <span className="mt-2 inline-flex text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
            Live Checkpoints
          </span>
        </div>

        {/* Step 3 */}
        <div className="bg-white border border-stone-200 rounded-xl p-3.5 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center">3</span>
            <CheckCircle2 className="w-4 h-4 text-purple-600" />
          </div>
          <h4 className="font-bold text-stone-800 text-xs sm:text-sm">Buyer Receives & Inspects</h4>
          <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
            Unloading and weight verification at destination warehouse or retail store.
          </p>
          <span className="mt-2 inline-flex text-[10px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
            Grade A Assurance
          </span>
        </div>

        {/* Step 4 */}
        <div className="bg-agri-600 text-white border border-agri-700 rounded-xl p-3.5 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="w-6 h-6 rounded-full bg-white text-agri-800 font-bold text-xs flex items-center justify-center">4</span>
            <Banknote className="w-4 h-4 text-agri-100" />
          </div>
          <h4 className="font-bold text-white text-xs sm:text-sm">Instant Farmer Payout</h4>
          <p className="text-[11px] text-agri-100 mt-1 leading-relaxed">
            Escrow automatically releases 100% amount to farmer bank account via instant settlement.
          </p>
          <span className="mt-2 inline-flex text-[10px] font-semibold text-agri-950 bg-white/90 px-2 py-0.5 rounded">
            Instant Bank Credit
          </span>
        </div>
      </div>
    </div>
  );
};