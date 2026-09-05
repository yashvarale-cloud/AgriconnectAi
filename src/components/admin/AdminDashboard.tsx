import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { formatCurrency } from '../../utils/formatters';
import {
  ShieldCheck,
  Users,
  ShoppingBag,
  Truck,
  TrendingUp,
  AlertTriangle,
  LifeBuoy,
  FileCheck2,
  Lock
} from 'lucide-react';
import { FarmerVerification } from './FarmerVerification';
import { DisputeResolution } from './DisputeResolution';
import { SupportTicketsView } from './SupportTicketsView';
import { PriceTransparency } from '../common/PriceTransparency';

export const AdminDashboard: React.FC = () => {
  const { products, orders, farmers, disputes, tickets } = useData();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'kyc' | 'disputes' | 'tickets'>('overview');

  const openDisputes = disputes.filter(d => d.status === 'Under Review');
  const openTickets = tickets.filter(t => t.status !== 'Resolved');

  return (
    <div className="space-y-6">
      
      {/* Admin Header */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-900 text-white flex items-center justify-center font-bold shadow-sm">
              <ShieldCheck className="w-7 h-7 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-stone-900 m-0 leading-tight">
                  AgriConnectAI Platform Administration
                </h1>
                <span className="bg-purple-100 text-purple-800 text-xs font-bold px-2 py-0.5 rounded-full">
                  Govt / APMC Portal
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Oversight, Escrow Custody, Mandi Parity, and Grievance Redressal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap text-xs font-bold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-2 rounded-xl transition-all ${
                activeTab === 'overview' ? 'bg-stone-900 text-white shadow-xs' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('kyc')}
              className={`px-3 py-2 rounded-xl transition-all ${
                activeTab === 'kyc' ? 'bg-stone-900 text-white shadow-xs' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              Farmer KYC
            </button>
            <button
              onClick={() => setActiveTab('disputes')}
              className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1 ${
                activeTab === 'disputes' ? 'bg-stone-900 text-white shadow-xs' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <span>Disputes</span>
              {openDisputes.length > 0 && (
                <span className="w-4 h-4 bg-red-600 text-white rounded-full text-[10px] flex items-center justify-center">
                  {openDisputes.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('tickets')}
              className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1 ${
                activeTab === 'tickets' ? 'bg-stone-900 text-white shadow-xs' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <span>Tickets</span>
              {openTickets.length > 0 && (
                <span className="w-4 h-4 bg-blue-600 text-white rounded-full text-[10px] flex items-center justify-center">
                  {openTickets.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'overview' && (
        <>
          {/* Top Platform KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
            <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm">
              <span className="text-stone-500 text-xs font-bold block">Verified Farmers</span>
              <div className="text-2xl font-black text-stone-900 mt-1">1,240</div>
              <span className="text-[11px] text-emerald-700 font-semibold">+84 registered FPOs</span>
            </div>

            <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm">
              <span className="text-stone-500 text-xs font-bold block">Active Buyers</span>
              <div className="text-2xl font-black text-blue-700 mt-1">3,520</div>
              <span className="text-[11px] text-stone-400">Retail, wholesale & hotels</span>
            </div>

            <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm">
              <span className="text-stone-500 text-xs font-bold block">Total Orders</span>
              <div className="text-2xl font-black text-agri-700 mt-1">8,410</div>
              <span className="text-[11px] text-agri-700 font-semibold">100% direct fulfillment</span>
            </div>

            <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm">
              <span className="text-stone-500 text-xs font-bold block">Escrow Pool Custody</span>
              <div className="text-2xl font-black text-purple-700 mt-1">₹14,20,000</div>
              <span className="text-[11px] text-purple-700 font-bold flex items-center gap-0.5">
                <Lock className="w-3 h-3" /> Safe Escrow
              </span>
            </div>
          </div>

          {/* Price Transparency Metric Tool */}
          <PriceTransparency />

          {/* Quick Tables preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FarmerVerification />
            <DisputeResolution />
          </div>
        </>
      )}

      {activeTab === 'kyc' && <FarmerVerification />}
      {activeTab === 'disputes' && <DisputeResolution />}
      {activeTab === 'tickets' && <SupportTicketsView />}
    </div>
  );
};