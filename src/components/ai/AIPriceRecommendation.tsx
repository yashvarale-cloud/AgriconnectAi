import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { aiPriceRecommendations } from '../../data/mockData';
import { formatCurrency } from '../../utils/formatters';
import { Sparkles, TrendingUp, TrendingDown, Minus, Check, ArrowRight } from 'lucide-react';

interface AIPriceRecommendationProps {
  onApplyPrice?: (crop: string, price: number) => void;
}

export const AIPriceRecommendation: React.FC<AIPriceRecommendationProps> = ({ onApplyPrice }) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-xl font-extrabold text-stone-900">{t('aiPriceAdvisor')}</h2>
          <p className="text-xs text-stone-500">
            Real-time farm-gate price benchmarks derived from wholesale APMC arrivals and buyer budget ranges
          </p>
        </div>
        <span className="text-xs bg-purple-100 text-purple-800 font-bold px-3 py-1 rounded-full flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" />
          AI Mandi Trend
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {aiPriceRecommendations.map(rec => (
          <div
            key={rec.crop}
            className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between pb-2 border-b border-stone-100">
                <div>
                  <h3 className="font-extrabold text-sm text-stone-900">{rec.crop}</h3>
                  <span className="text-[10px] text-stone-400">APMC Trend: <b>{rec.apmcMandiTrend}</b></span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-stone-400 block">Your Current</span>
                  <span className="text-sm font-bold text-stone-700">₹{rec.currentPrice}/kg</span>
                </div>
              </div>

              <div className="my-3 bg-agri-50/70 border border-agri-200 rounded-xl p-3 text-xs space-y-1">
                <div className="flex justify-between text-stone-600">
                  <span>Suggested Range:</span>
                  <span className="font-bold text-stone-800">₹{rec.suggestedMin} – ₹{rec.suggestedMax} / kg</span>
                </div>
                <div className="flex justify-between text-stone-900 pt-1 border-t border-agri-200">
                  <span className="font-bold">AI Recommended:</span>
                  <span className="font-black text-agri-700 text-base">₹{rec.recommendedPrice} / kg</span>
                </div>
              </div>

              <p className="text-[11px] text-stone-600 leading-snug">
                {rec.advice}
              </p>
            </div>

            <button
              onClick={() => {
                if (onApplyPrice) onApplyPrice(rec.crop, rec.recommendedPrice);
                alert(`Recommended price of ₹${rec.recommendedPrice}/kg applied to your ${rec.crop}!`);
              }}
              className="w-full py-2 bg-agri-600 hover:bg-agri-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Apply ₹{rec.recommendedPrice}/kg to Crop</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};