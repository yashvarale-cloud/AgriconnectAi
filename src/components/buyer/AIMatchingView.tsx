import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { calculateFarmerBuyerMatch } from '../../utils/aiMatcher';
import { formatCurrency, formatWeight } from '../../utils/formatters';
import { StarRating } from '../common/StarRating';
import {
  Sparkles,
  CheckCircle2,
  MapPin,
  TrendingDown,
  ShieldCheck,
  Building2,
  MessageSquare,
  ShoppingCart
} from 'lucide-react';
import { CartCheckoutModal } from './CartCheckoutModal';
import { Product } from '../../types';

interface AIMatchingViewProps {
  requestedProduct?: string;
  requestedQuantity?: number;
  maxBudget?: number;
  buyerLocation?: string;
  preferredQuality?: string;
  onSelectProduct?: (p: Product) => void;
}

export const AIMatchingView: React.FC<AIMatchingViewProps> = ({
  requestedProduct = 'Onion',
  requestedQuantity = 2000,
  maxBudget = 25,
  buyerLocation = 'Pune',
  preferredQuality = 'Grade A',
  onSelectProduct
}) => {
  const { products, farmers } = useData();
  const { t } = useLanguage();
  const [checkoutProduct, setCheckoutProduct] = useState<Product | null>(null);

  const matchResults = calculateFarmerBuyerMatch(
    requestedProduct,
    requestedQuantity,
    maxBudget,
    buyerLocation,
    preferredQuality,
    products,
    farmers
  );

  return (
    <div className="space-y-5">
      {/* AI Matching Header */}
      <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-agri-950 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Sparkles className="w-48 h-48" />
        </div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-300 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AgriConnect Smart Matcher v2.4</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white m-0">
            AI Farmer-Buyer Match Results
          </h2>
          <p className="text-xs text-purple-200 mt-1 max-w-xl leading-relaxed">
            Multi-factor compatibility computed across Product Variety, Available Stock, Road Corridor Distance, Mandi Price Benchmarks, and KYC Reliability.
          </p>

          <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-white/15 text-xs text-purple-100">
            <span className="bg-white/10 px-2.5 py-1 rounded-lg">Requirement: {requestedProduct}</span>
            <span className="bg-white/10 px-2.5 py-1 rounded-lg">Target: {requestedQuantity.toLocaleString()} kg</span>
            <span className="bg-white/10 px-2.5 py-1 rounded-lg">Budget Limit: ₹{maxBudget}/kg</span>
            <span className="bg-white/10 px-2.5 py-1 rounded-lg">Location: {buyerLocation}</span>
          </div>
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        {matchResults.length === 0 ? (
          <div className="bg-white border border-stone-200 rounded-2xl p-8 text-center text-stone-500 text-xs">
            No exact matching farmer harvest currently found for &quot;{requestedProduct}&quot;.
          </div>
        ) : (
          matchResults.map((result, idx) => {
            const isTop = idx === 0;

            return (
              <div
                key={result.product.id}
                className={`bg-white border rounded-2xl p-5 shadow-sm transition-all relative ${
                  isTop ? 'border-purple-300 ring-2 ring-purple-400/30' : 'border-stone-200'
                }`}
              >
                {isTop && (
                  <div className="absolute -top-3 left-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold text-[11px] px-3 py-0.5 rounded-full shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>{t('aiRecommended')} • Best Overall Value</span>
                  </div>
                )}

                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                  {/* Left: Product & Farmer */}
                  <div className="flex items-start gap-3.5">
                    <img
                      src={result.product.image}
                      alt={result.product.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover ring-1 ring-stone-200"
                    />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-extrabold text-base text-stone-900 m-0">
                          {result.product.farmName}
                        </h3>
                        {result.product.isFpo && (
                          <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            FPO Co-op
                          </span>
                        )}
                        <span className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-bold">
                          {result.product.quality}
                        </span>
                      </div>

                      <p className="text-xs text-stone-500 mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-stone-400" />
                        <span>{result.product.location}, {result.product.district} ({result.product.distanceKm} km away)</span>
                      </p>

                      <div className="flex items-center gap-3 mt-2 text-xs">
                        <div className="flex items-center gap-1">
                          <StarRating rating={result.farmer?.rating || result.product.rating} size="sm" />
                          <span className="font-bold text-stone-800">{result.farmer?.rating || result.product.rating}</span>
                        </div>
                        <span className="text-stone-300">•</span>
                        <span className="font-bold text-stone-700">
                          Stock: {formatWeight(result.product.quantity, result.product.unit)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Middle: Match Score Badge & Breakdown */}
                  <div className="flex items-center gap-4 bg-purple-50/70 border border-purple-100 p-3 rounded-xl">
                    <div className="text-center">
                      <span className="text-[10px] font-bold text-purple-900 block uppercase tracking-wider">
                        {t('matchScore')}
                      </span>
                      <div className="text-2xl sm:text-3xl font-black text-purple-700 leading-none mt-1">
                        {result.matchScore}%
                      </div>
                    </div>

                    <div className="border-l border-purple-200 pl-3 space-y-1 text-[11px] text-stone-600">
                      <div>Price Match: <b className="text-stone-900">₹{result.product.expectedPrice}/{result.product.unit}</b></div>
                      <div>Quantity: <b className="text-stone-900">100% Ready</b></div>
                      <div>Distance: <b className="text-stone-900">{result.product.distanceKm} km corridor</b></div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex flex-col gap-2 w-full lg:w-44">
                    <button
                      onClick={() => setCheckoutProduct(result.product)}
                      className="w-full py-2.5 bg-agri-600 hover:bg-agri-700 text-white font-extrabold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>{t('actionBuyNow')}</span>
                    </button>
                    <button
                      onClick={() => onSelectProduct && onSelectProduct(result.product)}
                      className="w-full py-2 border border-stone-300 hover:bg-stone-50 text-stone-700 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Negotiate / Offer</span>
                    </button>
                  </div>
                </div>

                {/* AI Rationale Chips */}
                <div className="mt-3 pt-3 border-t border-stone-100 flex flex-wrap gap-1.5">
                  {result.reasons.map((reason, rIdx) => (
                    <span
                      key={rIdx}
                      className="bg-stone-100 text-stone-700 text-[10px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3 text-agri-600 shrink-0" />
                      <span>{reason}</span>
                    </span>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>

      {checkoutProduct && (
        <CartCheckoutModal
          product={checkoutProduct}
          onClose={() => setCheckoutProduct(null)}
        />
      )}
    </div>
  );
};