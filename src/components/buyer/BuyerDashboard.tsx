import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { formatCurrency, formatWeight } from '../../utils/formatters';
import {
  ShoppingBag,
  Inbox,
  CheckCircle2,
  TrendingUp,
  Truck,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star
} from 'lucide-react';
import { OrderStatusTracker } from '../shared/OrderStatusTracker';
import { MockPaymentModal } from '../shared/MockPaymentModal';
import { ReviewModal } from '../shared/ReviewModal';

interface BuyerDashboardProps {
  setActiveTab: (tab: string) => void;
}

export const BuyerDashboard: React.FC<BuyerDashboardProps> = ({ setActiveTab }) => {
  const { currentBuyer } = useAuth();
  const { orders, buyerRequests, products } = useData();
  const { t } = useLanguage();

  const [payingOrder, setPayingOrder] = useState<any>(null);
  const [reviewingOrder, setReviewingOrder] = useState<any>(null);

  const activeOrders = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled');
  const deliveredOrders = orders.filter(o => o.status === 'Delivered');

  return (
    <div className="space-y-6">
      
      {/* Buyer Welcome Card */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-stone-900 m-0 leading-tight">
                {currentBuyer.businessName}
              </h1>
              <span className="bg-blue-100 text-blue-800 text-xs font-extrabold px-2.5 py-0.5 rounded-full">
                {currentBuyer.buyerType}
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-1">
              Procurement Manager: <b className="text-stone-700">{currentBuyer.name}</b> • {currentBuyer.city}, {currentBuyer.state}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('marketplace')}
              className="px-4 py-2.5 bg-agri-600 hover:bg-agri-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
            >
              Browse Marketplace
            </button>
            <button
              onClick={() => setActiveTab('request-product')}
              className="px-4 py-2.5 border border-agri-600 hover:bg-agri-50 text-agri-800 font-bold text-xs rounded-xl transition-all"
            >
              + Request Product
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div
          onClick={() => setActiveTab('my-orders')}
          className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm cursor-pointer hover:border-agri-300 transition-all"
        >
          <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
            <span className="font-bold">Active Orders</span>
            <ShoppingBag className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-stone-900">{activeOrders.length}</div>
          <div className="text-[11px] text-blue-700 font-bold mt-1">In transit & pending</div>
        </div>

        <div
          onClick={() => setActiveTab('request-product')}
          className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm cursor-pointer hover:border-agri-300 transition-all"
        >
          <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
            <span className="font-bold">My Requests</span>
            <Inbox className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-700">{buyerRequests.length}</div>
          <div className="text-[11px] text-stone-500 mt-1">Custom procurement requirements</div>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
            <span className="font-bold">Total Purchases</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-agri-700">{formatCurrency(currentBuyer.totalSpent)}</div>
          <div className="text-[11px] text-emerald-700 font-bold mt-1">Saved ~18% vs APMC Mandi</div>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
            <span className="font-bold">Completed Deliveries</span>
            <CheckCircle2 className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-purple-700">{deliveredOrders.length}</div>
          <div className="text-[11px] text-stone-500 mt-1">Direct from farms</div>
        </div>
      </div>

      {/* Active Orders with live tracking & actions */}
      <div className="space-y-4">
        <h2 className="text-base font-extrabold text-stone-900 m-0">Live Orders & Escrow Tracking</h2>

        {orders.map(order => (
          <div key={order.id} className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-stone-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-base text-stone-900">{order.productName}</span>
                  <span className="text-xs bg-stone-100 px-2 py-0.5 rounded font-bold text-stone-700">
                    Order #{order.id}
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">
                  Farmer: <b className="text-stone-700">{order.farmerName}</b> ({order.farmName})
                </p>
              </div>

              <div className="flex items-center gap-2">
                {order.paymentStatus === 'Pending' && (
                  <button
                    onClick={() => setPayingOrder(order)}
                    className="px-3.5 py-1.5 bg-agri-600 hover:bg-agri-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Pay Escrow ({formatCurrency(order.totalAmount)})</span>
                  </button>
                )}

                {order.status === 'Delivered' && (
                  <button
                    onClick={() => setReviewingOrder(order)}
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1"
                  >
                    <Star className="w-3.5 h-3.5 fill-white" />
                    <span>Rate Farmer</span>
                  </button>
                )}

                <button
                  onClick={() => setActiveTab('tracking')}
                  className="px-3 py-1.5 border border-stone-300 hover:bg-stone-50 text-stone-700 font-bold text-xs rounded-xl flex items-center gap-1"
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>Track Vehicle</span>
                </button>
              </div>
            </div>

            <OrderStatusTracker status={order.status} />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-stone-50 p-3 rounded-xl">
              <div>
                <span className="text-stone-500 text-[11px] block">Consignment:</span>
                <span className="font-bold text-stone-900">{order.quantity} {order.unit}</span>
              </div>
              <div>
                <span className="text-stone-500 text-[11px] block">Agreed Price:</span>
                <span className="font-extrabold text-agri-700">₹{order.pricePerUnit} / {order.unit}</span>
              </div>
              <div>
                <span className="text-stone-500 text-[11px] block">Escrow Protection:</span>
                <span className="font-bold text-emerald-700">{order.escrowStatus}</span>
              </div>
              <div>
                <span className="text-stone-500 text-[11px] block">Vehicle:</span>
                <span className="font-mono font-bold text-stone-800">{order.vehicleNumber || 'MH12 AB 1234'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      {payingOrder && (
        <MockPaymentModal
          order={payingOrder}
          onClose={() => setPayingOrder(null)}
          onSuccess={() => alert('Escrow payment processed successfully!')}
        />
      )}

      {reviewingOrder && (
        <ReviewModal
          orderId={reviewingOrder.id}
          farmerName={reviewingOrder.farmerName}
          onClose={() => setReviewingOrder(null)}
        />
      )}
    </div>
  );
};