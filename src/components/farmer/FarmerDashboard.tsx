import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { formatCurrency, formatWeight } from '../../utils/formatters';
import {
  Sprout,
  PlusCircle,
  Inbox,
  ShoppingBag,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { AddProductModal } from './AddProductModal';
import { OrderStatusTracker } from '../shared/OrderStatusTracker';
import { EscrowVisualizer } from '../common/EscrowVisualizer';
import { PriceTransparency } from '../common/PriceTransparency';

interface FarmerDashboardProps {
  setActiveTab: (tab: string) => void;
}

export const FarmerDashboard: React.FC<FarmerDashboardProps> = ({ setActiveTab }) => {
  const { currentFarmer } = useAuth();
  const { products, buyerRequests, orders } = useData();
  const { t } = useLanguage();
  const [showAddModal, setShowAddModal] = useState(false);

  const activeOrders = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled');
  const pendingRequests = buyerRequests.filter(r => r.status === 'Pending');
  const totalStockKg = products.reduce((sum, p) => sum + (p.unit === 'kg' ? p.quantity : p.quantity * 100), 0);

  return (
    <div className="space-y-6">
      
      {/* Top Banner with Farmer KYC & Quick Info */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={currentFarmer.avatar}
              alt={currentFarmer.name}
              className="w-14 h-14 rounded-2xl object-cover ring-2 ring-agri-400 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-extrabold text-stone-900 m-0 leading-tight">
                  {currentFarmer.name}
                </h1>
                <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-xs font-extrabold px-2.5 py-0.5 rounded-full shadow-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  {t('verifiedFarmer')}
                </span>
                {currentFarmer.isFpo && (
                  <span className="bg-blue-100 text-blue-800 text-xs font-extrabold px-2.5 py-0.5 rounded-full">
                    {t('verifiedFpo')}
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-500 mt-1 flex items-center gap-1.5 flex-wrap">
                <span className="font-semibold text-stone-700">{currentFarmer.farmName}</span>
                <span>•</span>
                <span className="flex items-center gap-0.5">
                  <MapPin className="w-3 h-3 text-stone-400" />
                  {currentFarmer.village}, {currentFarmer.district}
                </span>
                <span>•</span>
                <span>Crops: {currentFarmer.cropsGrown.join(', ')}</span>
              </p>
            </div>
          </div>

          {/* Quick Add Product Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="w-full md:w-auto px-5 py-3 bg-agri-600 hover:bg-agri-700 active:scale-95 text-white font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <PlusCircle className="w-5 h-5" />
            <span>{t('actionAddProduct')}</span>
          </button>
        </div>
      </div>

      {/* 4 Primary Large Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        
        {/* Total Earnings */}
        <div
          onClick={() => setActiveTab('earnings')}
          className="bg-white border border-stone-200 hover:border-agri-300 rounded-2xl p-4 shadow-sm cursor-pointer transition-all hover:shadow-md"
        >
          <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
            <span className="font-bold">{t('totalSales')}</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-stone-900">
            {formatCurrency(currentFarmer.totalSales)}
          </div>
          <div className="text-[11px] text-emerald-700 font-bold mt-1">
            ₹{currentFarmer.thisMonthSales.toLocaleString('en-IN')} this month
          </div>
        </div>

        {/* Active Orders */}
        <div
          onClick={() => setActiveTab('orders')}
          className="bg-white border border-stone-200 hover:border-agri-300 rounded-2xl p-4 shadow-sm cursor-pointer transition-all hover:shadow-md"
        >
          <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
            <span className="font-bold">{t('navOrders')}</span>
            <ShoppingBag className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-blue-700">
            {activeOrders.length}
          </div>
          <div className="text-[11px] text-stone-500 font-medium mt-1">
            {orders.length} total completed
          </div>
        </div>

        {/* Available Stock */}
        <div
          onClick={() => setActiveTab('stock')}
          className="bg-white border border-stone-200 hover:border-agri-300 rounded-2xl p-4 shadow-sm cursor-pointer transition-all hover:shadow-md"
        >
          <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
            <span className="font-bold">{t('stockTitle')}</span>
            <Sprout className="w-4 h-4 text-agri-600" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-agri-700">
            {formatWeight(totalStockKg, 'kg')}
          </div>
          <div className="text-[11px] text-stone-500 font-medium mt-1">
            Across {products.length} listed crops
          </div>
        </div>

        {/* Buyer Requests */}
        <div
          onClick={() => setActiveTab('requests')}
          className="bg-white border border-stone-200 hover:border-agri-300 rounded-2xl p-4 shadow-sm cursor-pointer transition-all hover:shadow-md"
        >
          <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
            <span className="font-bold">{t('navBuyerRequests')}</span>
            <Inbox className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-amber-700">
            {pendingRequests.length}
          </div>
          <div className="text-[11px] text-amber-800 font-semibold mt-1">
            Awaiting your offer
          </div>
        </div>
      </div>

      {/* Touch-friendly Quick Actions Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <button
          onClick={() => setShowAddModal(true)}
          className="p-3 bg-agri-50 hover:bg-agri-100 border border-agri-200 rounded-xl text-left transition-colors"
        >
          <span className="text-xs font-bold text-agri-900 block">+ Add Crop</span>
          <span className="text-[10px] text-agri-700">List to marketplace</span>
        </button>
        <button
          onClick={() => setActiveTab('requests')}
          className="p-3 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl text-left transition-colors"
        >
          <span className="text-xs font-bold text-amber-900 block">Buyer Requests ({pendingRequests.length})</span>
          <span className="text-[10px] text-amber-700">Negotiate & sell</span>
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className="p-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl text-left transition-colors"
        >
          <span className="text-xs font-bold text-blue-900 block">My Orders</span>
          <span className="text-[10px] text-blue-700">Track shipments</span>
        </button>
        <button
          onClick={() => setActiveTab('ai-insights')}
          className="p-3 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl text-left transition-colors"
        >
          <span className="text-xs font-bold text-purple-900 block">AI Price & Demand</span>
          <span className="text-[10px] text-purple-700">APMC price forecasts</span>
        </button>
      </div>

      {/* Active Order with Live Progress */}
      {activeOrders.length > 0 && (
        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div>
              <h3 className="font-extrabold text-base text-stone-900">Active Order Dispatch</h3>
              <p className="text-xs text-stone-500">Order #{activeOrders[0].id} • {activeOrders[0].productName}</p>
            </div>
            <span className="bg-blue-100 text-blue-800 font-bold text-xs px-3 py-1 rounded-full">
              Status: {activeOrders[0].status}
            </span>
          </div>

          <OrderStatusTracker status={activeOrders[0].status} />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-50 p-3.5 rounded-xl text-xs mt-4">
            <div>
              <span className="text-stone-500 text-[11px] block">Buyer:</span>
              <span className="font-bold text-stone-900">{activeOrders[0].buyerName}</span>
            </div>
            <div>
              <span className="text-stone-500 text-[11px] block">Consignment Quantity:</span>
              <span className="font-bold text-stone-900">{activeOrders[0].quantity} {activeOrders[0].unit}</span>
            </div>
            <div>
              <span className="text-stone-500 text-[11px] block">Agreed Farm Gate Rate:</span>
              <span className="font-extrabold text-agri-700">₹{activeOrders[0].pricePerUnit} / {activeOrders[0].unit}</span>
            </div>
            <div>
              <span className="text-stone-500 text-[11px] block">Escrow Security:</span>
              <span className="font-bold text-emerald-700 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                {activeOrders[0].escrowStatus}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Price Transparency Comparison Component */}
      <PriceTransparency />

      {/* Escrow Flow Visualization */}
      <EscrowVisualizer />

      {showAddModal && <AddProductModal onClose={() => setShowAddModal(false)} />}
    </div>
  );
};