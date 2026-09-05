import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { formatCurrency } from '../../utils/formatters';
import { Wallet, ArrowUpRight, Clock, CheckCircle2, TrendingUp, ShieldCheck } from 'lucide-react';

export const FarmerEarnings: React.FC = () => {
  const { currentFarmer } = useAuth();
  const { t } = useLanguage();

  const monthlyData = [
    { month: 'Apr', amount: 32000, height: 45 },
    { month: 'May', amount: 38500, height: 55 },
    { month: 'Jun', amount: 41000, height: 62 },
    { month: 'Jul', amount: 43800, height: 70 },
    { month: 'Aug', amount: 52400, height: 88 },
    { month: 'Sep (Est)', amount: 61000, height: 100 }
  ];

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-extrabold text-stone-900">{t('earningsTitle')}</h2>
        <p className="text-xs text-stone-500">
          Direct digital escrow settlements credited straight to your Bank of Maharashtra account
        </p>
      </div>

      {/* Main KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
            <span>{t('thisMonth')}</span>
            <ArrowUpRight className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-stone-900">
            {formatCurrency(currentFarmer.thisMonthSales)}
          </div>
          <div className="text-[10px] text-emerald-700 font-bold mt-1 flex items-center gap-0.5">
            <span>+19.6% vs last month</span>
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
            <span>{t('totalSales')}</span>
            <Wallet className="w-4 h-4 text-agri-600" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-agri-700">
            {formatCurrency(currentFarmer.totalSales)}
          </div>
          <div className="text-[10px] text-stone-400 mt-1">
            All-time direct sales
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-amber-800 text-xs mb-1">
            <span>{t('pendingPayment')}</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-amber-900">
            {formatCurrency(currentFarmer.pendingPayment)}
          </div>
          <div className="text-[10px] text-amber-700 font-semibold mt-1">
            Releases upon delivery
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-emerald-800 text-xs mb-1">
            <span>{t('receivedPayment')}</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-900">
            {formatCurrency(currentFarmer.receivedPayment)}
          </div>
          <div className="text-[10px] text-emerald-700 font-semibold mt-1">
            100% Settled to Bank
          </div>
        </div>
      </div>

      {/* Visual Chart & Crop Sales */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Monthly Earnings Chart */}
        <div className="lg:col-span-2 bg-white border border-stone-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-extrabold text-stone-900 text-sm">Monthly Revenue Trend</h3>
              <p className="text-xs text-stone-500">Direct sales growth since eliminating village middlemen</p>
            </div>
            <span className="text-xs bg-agri-100 text-agri-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +44% Annual
            </span>
          </div>

          {/* Simple Clean Bar Chart */}
          <div className="pt-6 pb-2">
            <div className="h-44 flex items-end justify-between gap-3 px-2 border-b border-stone-200">
              {monthlyData.map(m => (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-1.5 group">
                  <span className="text-[10px] font-bold text-stone-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    ₹{(m.amount / 1000).toFixed(1)}k
                  </span>
                  <div
                    className="w-full max-w-[44px] bg-gradient-to-t from-agri-700 to-agri-500 rounded-t-lg transition-all group-hover:brightness-110 shadow-sm"
                    style={{ height: `${m.height}%` }}
                  />
                  <span className="text-[11px] font-semibold text-stone-600 mt-1">{m.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product wise breakdown */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-stone-900 text-sm mb-1">Crop Revenue Share</h3>
            <p className="text-xs text-stone-500 mb-4">Sales by primary agricultural commodities</p>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between font-bold text-stone-800 mb-1">
                  <span>Hybrid Tomatoes</span>
                  <span>₹1,18,000 (41%)</span>
                </div>
                <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-red-500 h-full rounded-full" style={{ width: '41%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-stone-800 mb-1">
                  <span>Lasalgaon Red Onion</span>
                  <span>₹82,500 (29%)</span>
                </div>
                <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-600 h-full rounded-full" style={{ width: '29%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-stone-800 mb-1">
                  <span>Sharbati Wheat</span>
                  <span>₹56,000 (20%)</span>
                </div>
                <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '20%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-stone-800 mb-1">
                  <span>Grapes & Fruits</span>
                  <span>₹28,000 (10%)</span>
                </div>
                <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '10%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-stone-100 flex items-center gap-2 text-[11px] text-stone-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Bank of Maharashtra A/C •••• 4092 verified</span>
          </div>
        </div>
      </div>
    </div>
  );
};