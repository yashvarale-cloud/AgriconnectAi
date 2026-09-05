import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { BuyerType, ProductQuality } from '../../types';
import { Send, Sparkles, Building2, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { AIMatchingView } from './AIMatchingView';

export const RequestProductForm: React.FC = () => {
  const { addBuyerRequest, products, farmers } = useData();
  const { t } = useLanguage();

  const [product, setProduct] = useState('Onion');
  const [requiredQuantity, setRequiredQuantity] = useState('2000');
  const [unit, setUnit] = useState<'kg' | 'quintal' | 'ton'>('kg');
  const [maxBudget, setMaxBudget] = useState('25');
  const [quality, setQuality] = useState<ProductQuality>('Grade A');
  const [requiredBy, setRequiredBy] = useState('2026-09-12');
  const [location, setLocation] = useState('Pune Supermarket Warehouse, Wagholi');
  const [buyerType, setBuyerType] = useState<BuyerType>('Supermarket');
  const [additionalNotes, setAdditionalNotes] = useState('Need standard mesh/jute bags with minimum 45mm bulb size.');

  const [showAIMatch, setShowAIMatch] = useState(false);
  const [submittedReqId, setSubmittedReqId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = addBuyerRequest({
      product,
      requiredQuantity: Number(requiredQuantity),
      unit,
      maxBudget: Number(maxBudget),
      quality,
      requiredBy,
      location,
      district: 'Pune',
      buyerType,
      additionalNotes
    });
    setSubmittedReqId(newId);
    setShowAIMatch(true);
  };

  return (
    <div className="space-y-6">
      {!showAIMatch ? (
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-stone-100">
            <div className="w-10 h-10 rounded-xl bg-agri-100 text-agri-700 flex items-center justify-center shadow-sm">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-stone-900 m-0">{t('actionRequestProduct')}</h2>
              <p className="text-xs text-stone-500">
                Post custom bulk requirements. Our AI will automatically match verified farmers and FPOs.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Crop Required:</label>
                <input
                  type="text"
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  placeholder="e.g. Onion, Tomato, Potato, Wheat"
                  className="w-full border border-stone-300 rounded-xl px-3 py-2 outline-none focus:border-agri-600 font-semibold"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Buyer Category:</label>
                <select
                  value={buyerType}
                  onChange={(e) => setBuyerType(e.target.value as BuyerType)}
                  className="w-full border border-stone-300 rounded-xl px-3 py-2 outline-none focus:border-agri-600 font-semibold"
                >
                  <option>Individual Consumer</option>
                  <option>Retailer</option>
                  <option>Restaurant</option>
                  <option>Hotel</option>
                  <option>Wholesaler</option>
                  <option>Supermarket</option>
                  <option>Food Processor</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Required Quantity:</label>
                <input
                  type="number"
                  value={requiredQuantity}
                  onChange={(e) => setRequiredQuantity(e.target.value)}
                  className="w-full border border-stone-300 rounded-xl px-3 py-2 outline-none focus:border-agri-600 font-bold"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Unit:</label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value as any)}
                  className="w-full border border-stone-300 rounded-xl px-3 py-2 outline-none focus:border-agri-600"
                >
                  <option value="kg">kg (Kilograms)</option>
                  <option value="quintal">Quintal</option>
                  <option value="ton">Metric Tons</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Max Budget (₹/unit):</label>
                <input
                  type="number"
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(e.target.value)}
                  className="w-full border border-stone-300 rounded-xl px-3 py-2 outline-none focus:border-agri-600 font-bold text-agri-700"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Quality Requirement:</label>
                <select
                  value={quality}
                  onChange={(e) => setQuality(e.target.value as ProductQuality)}
                  className="w-full border border-stone-300 rounded-xl px-3 py-2 outline-none focus:border-agri-600"
                >
                  <option value="Grade A">Grade A (Export / Supermarket Premium)</option>
                  <option value="Grade B">Grade B (Standard Commercial)</option>
                  <option value="Grade C">Grade C (Industrial / Processing)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Required Delivery Date:</label>
                <input
                  type="date"
                  value={requiredBy}
                  onChange={(e) => setRequiredBy(e.target.value)}
                  className="w-full border border-stone-300 rounded-xl px-3 py-2 outline-none focus:border-agri-600"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Delivery Destination / Warehouse:</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Pune Wagholi DC or Mumbai Vashi Market"
                className="w-full border border-stone-300 rounded-xl px-3 py-2 outline-none focus:border-agri-600"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Packaging / Special Notes:</label>
              <textarea
                rows={2}
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                placeholder="Specific packaging, moisture tolerance, delivery schedule..."
                className="w-full border border-stone-300 rounded-xl p-2.5 outline-none focus:border-agri-600"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-agri-600 hover:bg-agri-700 active:scale-95 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Post Request & Find AI Matches</span>
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setShowAIMatch(false)}
              className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-lg"
            >
              ← Edit Request
            </button>
            <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              ✓ Request #{submittedReqId} Saved to My Requests
            </span>
          </div>

          <AIMatchingView
            requestedProduct={product}
            requestedQuantity={Number(requiredQuantity)}
            maxBudget={Number(maxBudget)}
            buyerLocation={location}
            preferredQuality={quality}
          />
        </div>
      )}
    </div>
  );
};