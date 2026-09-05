import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { aiDemandData } from '../../data/mockData';
import { Sparkles, TrendingUp, TrendingDown, Minus, MapPin, CheckCircle2 } from 'lucide-react';

export const AIDemandForecasting: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-extrabold text-stone-900">{t('aiDemandForecast')}</h2>
        <p className="text-xs text-stone-500">
          Machine learning demand forecasting based on historical APMC arrivals, festival calendars, and retail procurement trends
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {aiDemandData.map(item => {
          const isHigh = item.currentDemand === 'HIGH';
          const isMedium = item.currentDemand === 'MEDIUM';
          const isPositive = item.expectedDemandChange > 0;

          return (
            <div
              key={item.crop}
              className={`bg-white border rounded-2xl p-5 shadow-sm space-y-3 transition-all ${
                isHigh ? 'border-emerald-300 ring-1 ring-emerald-200' : 'border-stone-200'
              }`}
            >
              <div className="flex items-start justify-between gap-2 pb-2 border-b border-stone-100">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-base text-stone-900">{item.crop}</h3>
                    <span className="text-xs bg-stone-100 text-stone-600 font-semibold px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                  </div>
                  <span className="text-[10px] text-stone-400">7-Day Prediction Model (Confidence: {item.confidenceScore}%)</span>
                </div>

                <div className="text-right">
                  <span
                    className={`inline-flex items-center gap-1 font-bold text-xs px-2.5 py-0.5 rounded-full ${
                      isHigh
                        ? 'bg-emerald-100 text-emerald-800'
                        : isMedium
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-stone-100 text-stone-700'
                    }`}
                  >
                    {isHigh ? <TrendingUp className="w-3.5 h-3.5" /> : isMedium ? <Minus className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                    <span>{item.currentDemand} DEMAND</span>
                  </span>
                  <div className={`text-xs font-black mt-1 ${isPositive ? 'text-emerald-700' : 'text-stone-600'}`}>
                    {isPositive ? `+${item.expectedDemandChange}%` : `${item.expectedDemandChange}%`} vs Prev Week
                  </div>
                </div>
              </div>

              <div className="bg-stone-50 border border-stone-100 rounded-xl p-3 text-xs text-stone-700 leading-relaxed">
                <b className="text-stone-900 block mb-0.5">🌾 Farmer Recommendation:</b>
                <span>{item.adviceText}</span>
              </div>

              <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
                <span>Key High-Demand Mandis:</span>
                <span className="font-bold text-stone-700">{item.keyMarkets.join(' • ')}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};