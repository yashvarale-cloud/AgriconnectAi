import React, { useState } from 'react';
import { Order } from '../../types';
import { useData } from '../../context/DataContext';
import { formatCurrency } from '../../utils/formatters';
import { ShieldCheck, CheckCircle2, QrCode, CreditCard, Landmark, X } from 'lucide-react';

interface MockPaymentModalProps {
  order: Order;
  onClose: () => void;
  onSuccess?: () => void;
}

export const MockPaymentModal: React.FC<MockPaymentModalProps> = ({ order, onClose, onSuccess }) => {
  const { updatePaymentStatus } = useData();
  const [method, setMethod] = useState<'UPI' | 'Card' | 'Net Banking'>('UPI');
  const [upiId, setUpiId] = useState('freshmart@okicici');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const txnId = 'TXN-' + Math.floor(100000000 + Math.random() * 900000000);
      updatePaymentStatus(order.id, method, txnId);
      setIsProcessing(false);
      setIsDone(true);
      if (onSuccess) onSuccess();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-stone-200">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-stone-400 hover:text-stone-600 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {!isDone ? (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-xl bg-agri-100 text-agri-700 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-stone-900">AgriConnect Safe Escrow</h3>
                <p className="text-xs text-stone-500">Order #{order.id} • {order.productName}</p>
              </div>
            </div>

            {/* Bill summary */}
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-3.5 my-4 space-y-1.5 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Product Subtotal ({order.quantity} {order.unit}):</span>
                <span className="font-semibold text-stone-900">{formatCurrency(order.productTotal)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Logistics & Transit Fee:</span>
                <span className="font-semibold text-stone-900">{formatCurrency(order.logisticsCost)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>AgriConnect Platform Fee:</span>
                <span className="font-semibold text-agri-700">₹0 (Free)</span>
              </div>
              <div className="pt-2 border-t border-stone-200 flex justify-between font-bold text-sm text-stone-900">
                <span>Total Amount to Escrow:</span>
                <span className="text-agri-700 font-extrabold text-base">{formatCurrency(order.totalAmount)}</span>
              </div>
            </div>

            {/* Payment Method Tabs */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <button
                type="button"
                onClick={() => setMethod('UPI')}
                className={`flex flex-col items-center gap-1 p-2.5 rounded-xl border text-xs font-bold transition-all ${
                  method === 'UPI' ? 'border-agri-600 bg-agri-50 text-agri-800' : 'border-stone-200 hover:bg-stone-50'
                }`}
              >
                <QrCode className="w-5 h-5 text-agri-600" />
                <span>UPI / QR</span>
              </button>
              <button
                type="button"
                onClick={() => setMethod('Card')}
                className={`flex flex-col items-center gap-1 p-2.5 rounded-xl border text-xs font-bold transition-all ${
                  method === 'Card' ? 'border-agri-600 bg-agri-50 text-agri-800' : 'border-stone-200 hover:bg-stone-50'
                }`}
              >
                <CreditCard className="w-5 h-5 text-blue-600" />
                <span>Card</span>
              </button>
              <button
                type="button"
                onClick={() => setMethod('Net Banking')}
                className={`flex flex-col items-center gap-1 p-2.5 rounded-xl border text-xs font-bold transition-all ${
                  method === 'Net Banking' ? 'border-agri-600 bg-agri-50 text-agri-800' : 'border-stone-200 hover:bg-stone-50'
                }`}
              >
                <Landmark className="w-5 h-5 text-purple-600" />
                <span>Net Banking</span>
              </button>
            </div>

            {/* Method Inputs */}
            {method === 'UPI' && (
              <div className="space-y-3 mb-5">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Enter Virtual Payment Address (VPA) / UPI ID:
                  </label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="name@okaxis or 9876543210@paytm"
                    className="w-full border border-stone-300 rounded-lg px-3 py-2 text-xs outline-none focus:border-agri-600"
                  />
                </div>
                <div className="flex items-center gap-2 text-[11px] text-stone-500 bg-stone-100 p-2 rounded-lg">
                  <span>Supported:</span>
                  <span className="font-bold text-stone-700">GPay • PhonePe • Paytm • BHIM</span>
                </div>
              </div>
            )}

            {method === 'Card' && (
              <div className="space-y-2 mb-5 text-xs">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Card Number (Mock):</label>
                  <input
                    type="text"
                    defaultValue="4532 •••• •••• 8912"
                    className="w-full border border-stone-300 rounded-lg px-3 py-2 outline-none focus:border-agri-600"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    defaultValue="12/28"
                    placeholder="MM/YY"
                    className="border border-stone-300 rounded-lg px-3 py-2 outline-none focus:border-agri-600"
                  />
                  <input
                    type="password"
                    defaultValue="•••"
                    placeholder="CVV"
                    className="border border-stone-300 rounded-lg px-3 py-2 outline-none focus:border-agri-600"
                  />
                </div>
              </div>
            )}

            {method === 'Net Banking' && (
              <div className="space-y-2 mb-5 text-xs">
                <label className="block font-semibold text-stone-700">Select Bank:</label>
                <select className="w-full border border-stone-300 rounded-lg px-3 py-2 outline-none focus:border-agri-600">
                  <option>State Bank of India (SBI)</option>
                  <option>HDFC Bank</option>
                  <option>ICICI Bank</option>
                  <option>Bank of Maharashtra</option>
                  <option>Bank of Baroda</option>
                </select>
              </div>
            )}

            <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-xl text-[11px] text-amber-900 mb-4 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>Funds will be held securely in escrow until you confirm delivery inspection. Farmer is notified immediately.</span>
            </div>

            <button
              onClick={handlePay}
              disabled={isProcessing}
              className="w-full py-3 bg-agri-600 hover:bg-agri-700 text-white font-extrabold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Contacting Bank & Securing Escrow...</span>
                </>
              ) : (
                <span>Pay {formatCurrency(order.totalAmount)} into Escrow</span>
              )}
            </button>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-extrabold text-xl text-stone-900 mb-1">Payment Successful!</h3>
            <p className="text-xs text-stone-500 max-w-xs mx-auto mb-4">
              {formatCurrency(order.totalAmount)} is now safely held in AgriConnect Escrow. Driver & Farmer have been notified for dispatch.
            </p>

            <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs text-left mb-5 space-y-1">
              <div className="flex justify-between text-stone-600">
                <span>Txn ID:</span>
                <span className="font-mono font-bold text-stone-900">TXN-884920419</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Method:</span>
                <span className="font-bold text-stone-900">{method}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Escrow Status:</span>
                <span className="font-bold text-emerald-700">Deposited (Held)</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-xl text-xs transition-all"
            >
              Done & View Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};