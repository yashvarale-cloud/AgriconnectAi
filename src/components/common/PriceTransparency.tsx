import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { TrendingUp, CheckCircle, XCircle } from 'lucide-react';

export const PriceTransparency: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            ₹
          </div>
          <div>
            <h3 className="font-extrabold text-stone-900 text-sm sm:text-base">
              {t('priceCompTitle')}
            </h3>
            <p className="text-xs text-stone-500">
              Benchmark comparison for Fresh Hybrid Tomatoes (Per kg)
            </p>
          </div>
        </div>
        <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full">
          +32% Higher Net Farmer Return
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Traditional */}
        <div className="border border-red-200 bg-red-50/40 rounded-xl p-4">
          <div className="flex items-center justify-between pb-2 border-b border-red-200 mb-3">
            <span className="font-bold text-xs sm:text-sm text-red-900 flex items-center gap-1">
              <XCircle className="w-4 h-4 text-red-600" />
              {t('priceCompTraditional')}
            </span>
            <span className="text-xs font-semibold text-red-700">4-5 Middlemen Cuts</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-stone-600">
              <span>Farmer gets at farm-gate:</span>
              <span className="font-bold text-red-800">₹22.00 / kg (61%)</span>
            </div>
            <div className="flex justify-between text-stone-500 text-[11px] pl-2">
              <span>• Village Aggregator / Commission:</span>
              <span>+ ₹3.00</span>
            </div>
            <div className="flex justify-between text-stone-500 text-[11px] pl-2">
              <span>• APMC Mandi Trader & Hamali:</span>
              <span>+ ₹4.00</span>
            </div>
            <div className="flex justify-between text-stone-500 text-[11px] pl-2">
              <span>• Secondary Wholesaler Markup:</span>
              <span>+ ₹3.50</span>
            </div>
            <div className="flex justify-between text-stone-500 text-[11px] pl-2">
              <span>• Retailer Margin:</span>
              <span>+ ₹3.50</span>
            </div>
            <div className="pt-2 border-t border-red-200 flex justify-between font-bold text-stone-900 text-sm">
              <span>Consumer / Buyer pays:</span>
              <span className="text-stone-900">₹36.00 / kg</span>
            </div>
          </div>
        </div>

        {/* AgriConnect */}
        <div className="border-2 border-agri-500 bg-agri-50/50 rounded-xl p-4 relative shadow-sm">
          <div className="absolute -top-3 right-4 bg-agri-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
            Direct Technology Flow
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-agri-200 mb-3">
            <span className="font-bold text-xs sm:text-sm text-agri-950 flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-agri-600" />
              {t('priceCompDirect')}
            </span>
            <span className="text-xs font-bold text-agri-700">Zero Middlemen</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-stone-800 font-bold">
              <span>Farmer receives directly:</span>
              <span className="font-extrabold text-agri-700 text-sm">₹29.00 / kg (93%)</span>
            </div>
            <div className="flex justify-between text-stone-600 text-[11px] pl-2">
              <span>• Direct Transport & Tracking:</span>
              <span>+ ₹2.00</span>
            </div>
            <div className="flex justify-between text-stone-600 text-[11px] pl-2">
              <span>• AgriConnect Platform & Escrow:</span>
              <span className="text-agri-700 font-bold">₹0.00 (0% Commission)</span>
            </div>
            <div className="flex justify-between text-stone-400 text-[11px] pl-2">
              <span>• Middlemen commissions:</span>
              <span className="line-through">Eliminated</span>
            </div>
            <div className="pt-2 border-t border-agri-300 flex justify-between font-bold text-stone-900 text-sm">
              <span>Consumer / Buyer pays:</span>
              <span className="text-agri-800 font-extrabold">₹31.00 / kg (Saved ₹5/kg!)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};