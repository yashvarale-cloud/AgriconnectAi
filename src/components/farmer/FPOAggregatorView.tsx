import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { formatWeight, formatCurrency } from '../../utils/formatters';
import { Users, Package, Warehouse, Truck, CheckCircle2, ArrowRight } from 'lucide-react';

export const FPOAggregatorView: React.FC = () => {
  const { t } = useLanguage();

  const members = [
    { name: 'Kisan Babar', crop: 'Tomato', village: 'Walwa', qty: '800 kg', grade: 'Grade A' },
    { name: 'Sambhaji Patil', crop: 'Onion', village: 'Islampur', qty: '1,500 kg', grade: 'Grade A' },
    { name: 'Sunita Mane', crop: 'Potato', village: 'Shirala', qty: '1,200 kg', grade: 'Grade A' },
    { name: 'Dattatray Shinde', crop: 'Turmeric', village: 'Walwa', qty: '400 kg', grade: 'Grade A' },
    { name: 'Pradip Kadam', crop: 'Pomegranate', village: 'Kavathe', qty: '900 kg', grade: 'Grade A' },
  ];

  return (
    <div className="space-y-5">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-agri-800 text-white rounded-2xl p-6 shadow-md">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <span className="bg-white/20 text-white font-extrabold text-[11px] px-2.5 py-0.5 rounded-full uppercase tracking-wide">
              Farmer Producer Company
            </span>
            <h2 className="text-2xl font-black mt-2">Green Farmers Producer Co-op</h2>
            <p className="text-xs text-agri-100 mt-1 max-w-xl leading-relaxed">
              Aggregating small & marginal farmers into collective bargaining units. Eliminating bulk trader exploitation through single-window procurement and grading.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-black/20 p-3 rounded-xl backdrop-blur-sm">
            <div className="text-right">
              <span className="text-[10px] text-agri-200 block">Federated Farmers</span>
              <span className="text-2xl font-black">48 Members</span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-emerald-500/30 flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Aggregated Stock Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-white/20 text-xs">
          <div className="bg-white/10 rounded-xl p-3">
            <span className="text-agri-200 text-[11px] block">Aggregated Stock:</span>
            <span className="text-lg font-black text-white">12.5 Tons</span>
          </div>
          <div className="bg-white/10 rounded-xl p-3">
            <span className="text-agri-200 text-[11px] block">Tomato Pooled:</span>
            <span className="text-lg font-black text-white">4,000 kg</span>
          </div>
          <div className="bg-white/10 rounded-xl p-3">
            <span className="text-agri-200 text-[11px] block">Onion Pooled:</span>
            <span className="text-lg font-black text-white">5,000 kg</span>
          </div>
          <div className="bg-white/10 rounded-xl p-3">
            <span className="text-agri-200 text-[11px] block">Potato Pooled:</span>
            <span className="text-lg font-black text-white">3,500 kg</span>
          </div>
        </div>
      </div>

      {/* Member farmers inventory */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-extrabold text-stone-900 text-sm">Collective Member Batches</h3>
            <p className="text-xs text-stone-500">Live harvest pooling from member farms ready for bulk dispatch</p>
          </div>
          <span className="text-xs text-agri-700 font-bold bg-agri-50 px-2.5 py-1 rounded-lg">
            Batch ID: GFC-2026-B9
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-100 text-stone-700 font-bold text-[10px] uppercase border-b border-stone-200">
              <tr>
                <th className="py-2.5 px-3">Member Farmer</th>
                <th className="py-2.5 px-3">Village / Cluster</th>
                <th className="py-2.5 px-3">Crop Pooled</th>
                <th className="py-2.5 px-3">Quantity</th>
                <th className="py-2.5 px-3">Quality Assured</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium text-stone-800">
              {members.map(m => (
                <tr key={m.name} className="hover:bg-stone-50">
                  <td className="py-3 px-3 font-bold">{m.name}</td>
                  <td className="py-3 px-3 text-stone-500">{m.village}</td>
                  <td className="py-3 px-3 font-semibold">{m.crop}</td>
                  <td className="py-3 px-3 font-extrabold text-agri-800">{m.qty}</td>
                  <td className="py-3 px-3">
                    <span className="bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">
                      {m.grade}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Graded & Pooled</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};