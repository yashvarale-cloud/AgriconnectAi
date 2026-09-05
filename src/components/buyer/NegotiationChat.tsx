import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { Product } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import {
  Send,
  CheckCircle2,
  XCircle,
  Tag,
  ShieldCheck,
  Building2,
  ArrowRight,
  ShoppingCart
} from 'lucide-react';
import { MockPaymentModal } from '../shared/MockPaymentModal';

interface NegotiationChatProps {
  initialProduct?: Product | null;
  onOrderCreated?: (orderId: string) => void;
}

export const NegotiationChat: React.FC<NegotiationChatProps> = ({
  initialProduct,
  onOrderCreated
}) => {
  const { negotiation, sendNegotiationMessage, acceptNegotiationOffer, createOrder, orders } = useData();
  const { role } = useAuth();
  const { t } = useLanguage();

  const [messageInput, setMessageInput] = useState('');
  const [offerPriceInput, setOfferPriceInput] = useState('29');
  const [showPaymentForOrder, setShowPaymentForOrder] = useState<any>(null);

  const isAgreed = negotiation.status === 'agreed';

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    sendNegotiationMessage(messageInput, offerPriceInput ? Number(offerPriceInput) : undefined, role === 'farmer' ? 'farmer' : 'buyer');
    setMessageInput('');
  };

  const handleAcceptOffer = () => {
    acceptNegotiationOffer(role === 'farmer' ? 'farmer' : 'buyer');
  };

  const handleConfirmOrder = () => {
    const agreedRate = negotiation.agreedPrice || 29;
    const qty = negotiation.quantity || 500;
    const prodTotal = agreedRate * qty;
    const logistics = 1200;

    const orderId = createOrder({
      productName: negotiation.productName,
      quantity: qty,
      unit: negotiation.unit,
      pricePerUnit: agreedRate,
      productTotal: prodTotal,
      logisticsCost: logistics,
      totalAmount: prodTotal + logistics,
      deliveryLocation: 'FreshMart DC, Wagholi, Pune',
      farmerName: negotiation.farmerName,
      buyerName: negotiation.buyerName,
      status: 'Payment Pending'
    });

    const newOrder = {
      id: orderId,
      productName: negotiation.productName,
      quantity: qty,
      unit: negotiation.unit,
      pricePerUnit: agreedRate,
      productTotal: prodTotal,
      logisticsCost: logistics,
      totalAmount: prodTotal + logistics,
      deliveryLocation: 'FreshMart DC, Wagholi, Pune',
      status: 'Payment Pending' as const,
      paymentStatus: 'Pending' as const,
      escrowStatus: 'Held' as const,
      createdAt: 'Just now',
      estimatedDelivery: 'Tomorrow, 4:00 PM',
      farmerId: 'farmer-1',
      farmerName: negotiation.farmerName,
      farmName: 'Patil Agro Farms',
      productId: 'prod-1',
      buyerId: 'buyer-1',
      buyerName: negotiation.buyerName,
      buyerType: 'Supermarket' as const
    };

    setShowPaymentForOrder(newOrder);
    if (onOrderCreated) onOrderCreated(orderId);
  };

  return (
    <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden flex flex-col h-[650px] max-w-3xl mx-auto">
      
      {/* Chat Header */}
      <div className="p-4 bg-stone-900 text-white flex items-center justify-between flex-wrap gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-base">
              {negotiation.productName} ({negotiation.quantity} {negotiation.unit})
            </span>
            <span className="bg-agri-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-full">
              Direct Negotiation
            </span>
          </div>
          <p className="text-xs text-stone-300 mt-0.5">
            Buyer: <b className="text-white">{negotiation.buyerName}</b> ↔ Farmer: <b className="text-white">{negotiation.farmerName}</b>
          </p>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-stone-400 block uppercase font-bold">Current Agreed Price</span>
          <span className="text-lg font-black text-emerald-400">
            ₹{negotiation.agreedPrice || negotiation.originalPrice} / {negotiation.unit}
          </span>
        </div>
      </div>

      {/* Negotiation Status Ribbon */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-xs flex items-center justify-between flex-wrap gap-2 text-amber-900">
        <div className="flex items-center gap-1.5 font-semibold">
          <Tag className="w-4 h-4 text-amber-600" />
          <span>Listed Farm Gate: ₹{negotiation.originalPrice}/{negotiation.unit} • Targeted Offer: ₹{negotiation.agreedPrice}/{negotiation.unit}</span>
        </div>
        {isAgreed ? (
          <span className="bg-emerald-600 text-white font-bold text-[11px] px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Offer Mutually Agreed!
          </span>
        ) : (
          <span className="bg-amber-200 text-amber-900 font-bold text-[11px] px-2 py-0.5 rounded-full">
            In Negotiation
          </span>
        )}
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-stone-50/50">
        {negotiation.messages.map(msg => {
          const isMe = (role === 'buyer' && msg.senderRole === 'buyer') || (role === 'farmer' && msg.senderRole === 'farmer');

          return (
            <div
              key={msg.id}
              className={`flex flex-col max-w-[80%] ${
                isMe ? 'ml-auto items-end' : 'mr-auto items-start'
              }`}
            >
              <span className="text-[10px] font-semibold text-stone-500 mb-0.5 px-1">
                {msg.senderName} ({msg.senderRole}) • {msg.timestamp}
              </span>
              <div
                className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                  isMe
                    ? 'bg-agri-700 text-white rounded-tr-none'
                    : 'bg-white border border-stone-200 text-stone-900 rounded-tl-none'
                }`}
              >
                <p>{msg.message}</p>
                {msg.offerPrice && (
                  <div className={`mt-2 pt-2 border-t font-bold text-xs flex items-center gap-1 ${
                    isMe ? 'border-agri-600 text-amber-200' : 'border-stone-100 text-agri-700'
                  }`}>
                    <Tag className="w-3.5 h-3.5" />
                    <span>Proposed Counter Rate: ₹{msg.offerPrice} / {negotiation.unit}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Actions & Input */}
      <div className="p-4 bg-white border-t border-stone-200 space-y-3">
        {/* Deal Agreement / Order Conversion Bar */}
        <div className="flex items-center justify-between gap-2 p-2.5 bg-stone-100 rounded-xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-stone-700">Quick Actions:</span>
            {!isAgreed ? (
              <button
                type="button"
                onClick={handleAcceptOffer}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-sm transition-all"
              >
                Accept ₹{negotiation.agreedPrice}/kg
              </button>
            ) : (
              <span className="text-xs text-emerald-800 font-extrabold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Both parties agreed at ₹{negotiation.agreedPrice}/kg
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleConfirmOrder}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 active:scale-95 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
          >
            <ShoppingCart className="w-4 h-4 text-amber-400" />
            <span>Confirm Order & Pay Escrow</span>
          </button>
        </div>

        {/* Text Input */}
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-stone-100 px-2 py-1 rounded-xl border border-stone-300">
            <span className="text-[11px] font-bold text-stone-600">Rate ₹:</span>
            <input
              type="number"
              value={offerPriceInput}
              onChange={(e) => setOfferPriceInput(e.target.value)}
              className="w-14 bg-transparent outline-none text-xs font-black text-stone-900"
            />
          </div>

          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type negotiation message or counter offer..."
            className="flex-1 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-agri-600"
          />

          <button
            type="submit"
            className="p-2.5 bg-agri-600 hover:bg-agri-700 text-white rounded-xl shadow-sm transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Payment Popup */}
      {showPaymentForOrder && (
        <MockPaymentModal
          order={showPaymentForOrder}
          onClose={() => setShowPaymentForOrder(null)}
          onSuccess={() => alert('Order confirmed and Escrow deposited!')}
        />
      )}
    </div>
  );
};