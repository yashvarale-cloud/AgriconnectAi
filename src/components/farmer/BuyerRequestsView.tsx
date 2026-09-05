import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { formatWeight, formatCurrency } from '../../utils/formatters';
import { Send, CheckCircle, XCircle, MapPin, Calendar, Building2 } from 'lucide-react';

interface BuyerRequestsViewProps {
  onOpenChat?: () => void;
}

export const BuyerRequestsView: React.FC<BuyerRequestsViewProps> = ({ onOpenChat }) => {
  const { buyerRequests, updateBuyerRequestStatus, sendNegotiationMessage } = useData();
  const { t } = useLanguage();
  const [offerInput, setOfferInput] = useState<{ [id: string]: string }>({});

  const handleMakeOffer = (reqId: string, basePrice: number) => {
    const customPrice = offerInput[reqId] ? Number(offerInput[reqId]) : basePrice;
    updateBuyerRequestStatus(reqId, 'Offer Made', customPrice);
    sendNegotiationMessage(`Namaste! I can supply this requirement at ₹${customPrice}/kg direct from my farm.`, customPrice, 'farmer');
    alert(`Counter offer of ₹${customPrice}/kg sent to the buyer!`);
  };

  const handleAccept = (reqId: string, price: number) => {
    updateBuyerRequestStatus(reqId, 'Accepted', price);
    sendNegotiationMessage(`Offer accepted at your requested price of ₹${price}/kg! Proceeding to dispatch.`, price, 'farmer');
    alert('You accepted the buyer requirement! An order will be generated.');
  };

  const handleReject = (reqId: string) => {
    updateBuyerRequestStatus(reqId, 'Rejected');
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-extrabold text-stone-900">{t('navBuyerRequests')}</h2>
        <p className="text-xs text-stone-500">
          Direct purchase requirements posted by retail chains, supermarkets, and hotels
        </p>
      </div>

      {buyerRequests.length === 0 ? (
        <p className="p-8 text-center bg-white rounded-2xl border text-stone-500 text-xs">
          {t('noRequests')}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {buyerRequests.map(req => {
            const isPending = req.status === 'Pending';
            const isAccepted = req.status === 'Accepted';
            const isOfferMade = req.status === 'Offer Made';
            const isRejected = req.status === 'Rejected';

            return (
              <div
                key={req.id}
                className={`bg-white border rounded-2xl p-5 shadow-sm transition-all flex flex-col justify-between ${
                  isAccepted ? 'border-emerald-300 ring-1 ring-emerald-200' : 'border-stone-200'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 pb-3 border-b border-stone-100">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-stone-900 text-base">{req.product}</span>
                        <span className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-bold">
                          {req.quality}
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 font-semibold flex items-center gap-1 mt-0.5">
                        <Building2 className="w-3.5 h-3.5 text-stone-400" />
                        <span>{req.buyerName}</span>
                      </p>
                    </div>

                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                        isAccepted
                          ? 'bg-emerald-100 text-emerald-800'
                          : isOfferMade
                          ? 'bg-blue-100 text-blue-800'
                          : isRejected
                          ? 'bg-stone-200 text-stone-600'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {req.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 my-3 text-xs bg-stone-50 p-3 rounded-xl">
                    <div>
                      <span className="text-stone-500 text-[11px] block">Required Quantity:</span>
                      <span className="font-bold text-stone-900">{formatWeight(req.requiredQuantity, req.unit)}</span>
                    </div>
                    <div>
                      <span className="text-stone-500 text-[11px] block">Buyer Max Budget:</span>
                      <span className="font-extrabold text-agri-700">₹{req.maxBudget} / {req.unit}</span>
                    </div>
                    <div>
                      <span className="text-stone-500 text-[11px] block">Required By:</span>
                      <span className="font-medium text-stone-700 flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3 h-3 text-stone-400" />
                        {req.requiredBy}
                      </span>
                    </div>
                    <div>
                      <span className="text-stone-500 text-[11px] block">Delivery Destination:</span>
                      <span className="font-medium text-stone-700 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-stone-400" />
                        {req.district}
                      </span>
                    </div>
                  </div>

                  {req.additionalNotes && (
                    <p className="text-[11px] text-stone-600 italic bg-amber-50/70 border border-amber-100 p-2 rounded-lg mb-3">
                      &quot;{req.additionalNotes}&quot;
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-stone-100">
                  {isPending ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          placeholder={`Counter Price (e.g. ₹${req.maxBudget + 1})`}
                          value={offerInput[req.id] || ''}
                          onChange={(e) => setOfferInput({ ...offerInput, [req.id]: e.target.value })}
                          className="flex-1 border border-stone-300 rounded-xl px-3 py-1.5 text-xs outline-none focus:border-agri-600"
                        />
                        <button
                          onClick={() => handleMakeOffer(req.id, req.maxBudget)}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
                        >
                          {t('actionMakeOffer')}
                        </button>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAccept(req.id, req.maxBudget)}
                          className="flex-1 py-2 bg-agri-600 hover:bg-agri-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Accept (₹{req.maxBudget}/kg)</span>
                        </button>
                        <button
                          onClick={() => handleReject(req.id)}
                          className="px-3 py-2 border border-stone-300 hover:bg-stone-100 text-stone-700 font-bold text-xs rounded-xl transition-all"
                        >
                          {t('actionReject')}
                        </button>
                      </div>
                    </div>
                  ) : isOfferMade ? (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-blue-700 font-semibold">
                        Your counter-offer: ₹{req.offerPrice}/kg sent
                      </span>
                      {onOpenChat && (
                        <button
                          onClick={onOpenChat}
                          className="px-3 py-1 bg-stone-900 text-white text-xs font-bold rounded-lg"
                        >
                          Open Chat
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="text-xs text-stone-500 italic">
                      Status: {req.status}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};