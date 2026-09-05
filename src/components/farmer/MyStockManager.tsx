import React from 'react';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { formatWeight, formatCurrency } from '../../utils/formatters';
import { Package, TrendingDown, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';

export const MyStockManager: React.FC = () => {
  const { products } = useData();
  const { t } = useLanguage();

  const totalStockKg = products.reduce((acc, p) => acc + (p.unit === 'kg' ? p.quantity : p.quantity * 100), 0);
  const totalValue = products.reduce((acc, p) => acc + (p.quantity * p.expectedPrice), 0);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-xl font-extrabold text-stone-900">{t('stockTitle')}</h2>
          <p className="text-xs text-stone-500">{t('stockSub')}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-agri-50 border border-agri-200 rounded-xl px-3 py-1.5 text-right">
            <span className="text-[10px] text-stone-500 font-semibold block">Total Available</span>
            <span className="text-sm font-extrabold text-agri-800">{formatWeight(totalStockKg, 'kg')}</span>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-1.5 text-right">
            <span className="text-[10px] text-stone-500 font-semibold block">Est. Market Value</span>
            <span className="text-sm font-extrabold text-emerald-800">{formatCurrency(totalValue)}</span>
          </div>
        </div>
      </div>

      {/* Auto-deduction banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-blue-900">
        <RefreshCw className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block">Automated Live Inventory Sync:</span>
          <span>
            Whenever a buyer order status advances to &quot;Delivered&quot;, the platform automatically deducts the exact quantity from your stock and credits escrow funds to your bank balance.
          </span>
        </div>
      </div>

      {/* Inventory table */}
      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-100 text-stone-700 font-bold uppercase tracking-wider text-[10px] border-b border-stone-200">
              <tr>
                <th className="py-3 px-4">Crop / Variety</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Quality Grade</th>
                <th className="py-3 px-4">Harvested Stock</th>
                <th className="py-3 px-4">Remaining Available</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium">
              {products.map(p => {
                const percentLeft = Math.round((p.quantity / (p.originalStock || p.quantity || 1)) * 100);
                const isLow = percentLeft < 20;

                return (
                  <tr key={p.id} className="hover:bg-stone-50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-stone-900 flex items-center gap-2">
                      <img src={p.image} alt={p.name} className="w-8 h-8 rounded-lg object-cover" />
                      <div>
                        <div>{p.name}</div>
                        <div className="text-[10px] text-stone-400 font-normal">{p.variety}</div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-stone-600">{p.category}</td>
                    <td className="py-3.5 px-4">
                      <span className="bg-stone-100 text-stone-800 px-2 py-0.5 rounded font-bold text-[11px]">
                        {p.quality}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-stone-500 font-medium">
                      {formatWeight(p.originalStock || p.quantity, p.unit)}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="space-y-1 max-w-[140px]">
                        <div className="flex justify-between text-[11px] font-bold">
                          <span className={isLow ? 'text-amber-700' : 'text-stone-900'}>
                            {formatWeight(p.quantity, p.unit)}
                          </span>
                          <span className="text-stone-400 text-[10px]">{percentLeft}%</span>
                        </div>
                        <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${isLow ? 'bg-amber-500' : 'bg-agri-600'}`}
                            style={{ width: `${percentLeft}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      {p.quantity > 0 ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3" />
                          In Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded-full">
                          <AlertCircle className="w-3 h-3" />
                          Sold Out
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};