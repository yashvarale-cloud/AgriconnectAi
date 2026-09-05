import React, { useState } from 'react';
import { Product } from '../../types';
import { useData } from '../../context/DataContext';
import { formatCurrency, formatWeight } from '../../utils/formatters';
import { ShoppingCart, ShieldCheck, MapPin, Truck, X } from 'lucide-react';
import { MockPaymentModal } from '../shared/MockPaymentModal';

interface CartCheckoutModalProps {
  product: Product;
  onClose: () => void;
}

export const CartCheckoutModal: React.FC<CartCheckoutModalProps> = ({ product, onClose }) => {
  const { createOrder } = useData();
  const [quantity, setQuantity] = useState(String(Math.min(500, product.quantity)));
  const [deliveryAddress, setDeliveryAddress] = useState('FreshMart Supermarket Warehouse, Plot 14, Wagholi DC, Pune');
  const [orderCreated, setOrderCreated] = useState<any>(null);

  const qtyNumber = Number(quantity) || 100;
  const productTotal = qtyNumber * product.expectedPrice;
  const logisticsCost = 1200;
  const grandTotal = productTotal + logisticsCost;

  const handlePlaceOrder = () => {
    const orderId = createOrder({
      productId: product.id,
      productName: product.name,
      farmerId: product.farmerId,
      farmerName: product.farmerName,
      farmName: product.farmName,
      quantity: qtyNumber,
      unit: product.unit,
      pricePerUnit: product.expectedPrice,
      productTotal,
      logisticsCost,
      totalAmount: grandTotal,
      deliveryLocation: deliveryAddress,
      status: 'Payment Pending'
    });

    const newOrd = {
      id: orderId,
      productId: product.id,
      productName: product.name,
      farmerId: product.farmerId,
      farmerName: product.farmerName,
      farmName: product.farmName,
      quantity: qtyNumber,
      unit: product.unit,
      pricePerUnit: product.expectedPrice,
      productTotal,
      logisticsCost,
      totalAmount: grandTotal,
      deliveryLocation: deliveryAddress,
      status: 'Payment Pending' as const,
      paymentStatus: 'Pending' as const,
      escrowStatus: 'Held' as const,
      createdAt: 'Just now',
      estimatedDelivery: 'Tomorrow, 4:00 PM',
      buyerId: 'buyer-1',
      buyerName: 'FreshMart Supermarkets',
      buyerType: 'Supermarket' as const
    };

    setOrderCreated(newOrd);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative border border-stone-200 my-6">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-stone-400 hover:text-stone-600 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {!orderCreated ? (
          <div>
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-stone-100">
              <div className="w-10 h-10 rounded-xl bg-agri-100 text-agri-700 flex items-center justify-center shadow-sm">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-stone-900 m-0">Direct Farm Checkout</h2>
                <p className="text-xs text-stone-500">AgriConnect Safe Escrow Protected Order</p>
              </div>
            </div>

            {/* Item details */}
            <div className="flex items-center gap-3 bg-stone-50 p-3.5 rounded-xl mb-4 border border-stone-100">
              <img src={product.image} alt={product.name} className="w-14 h-14 rounded-lg object-cover" />
              <div className="flex-1 text-xs">
                <h4 className="font-extrabold text-stone-900">{product.name}</h4>
                <p className="text-stone-500">{product.farmName} • {product.quality}</p>
                <div className="font-black text-agri-700 mt-1">₹{product.expectedPrice} / {product.unit}</div>
              </div>
            </div>

            {/* Form Inputs */}
            <div className="space-y-3 text-xs mb-4">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Procure Quantity ({product.unit}):
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  max={product.quantity}
                  className="w-full border border-stone-300 rounded-xl px-3 py-2 outline-none focus:border-agri-600 font-bold"
                />
                <span className="text-[10px] text-stone-500 mt-0.5 block">
                  Available in farmer stock: {formatWeight(product.quantity, product.unit)}
                </span>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Delivery Destination Address:
                </label>
                <textarea
                  rows={2}
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full border border-stone-300 rounded-xl p-2.5 outline-none focus:border-agri-600"
                />
              </div>
            </div>

            {/* Price breakdown */}
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-3.5 space-y-1.5 text-xs mb-5">
              <div className="flex justify-between text-stone-600">
                <span>Produce Total ({qtyNumber} {product.unit}):</span>
                <span className="font-bold text-stone-900">{formatCurrency(productTotal)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Dedicated Agro Logistics (Tata 407 Reefer):</span>
                <span className="font-bold text-stone-900">{formatCurrency(logisticsCost)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>AgriConnect Digital Escrow Protection:</span>
                <span className="font-bold text-agri-700">₹0 (Free)</span>
              </div>
              <div className="pt-2 border-t border-stone-200 flex justify-between text-sm font-bold text-stone-900">
                <span>Total Amount:</span>
                <span className="text-agri-700 font-black text-base">{formatCurrency(grandTotal)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handlePlaceOrder}
              className="w-full py-3 bg-agri-600 hover:bg-agri-700 active:scale-95 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Confirm Order & Proceed to Mock Payment</span>
            </button>
          </div>
        ) : (
          <MockPaymentModal
            order={orderCreated}
            onClose={() => {
              setOrderCreated(null);
              onClose();
            }}
            onSuccess={() => {
              alert('Escrow payment simulated successfully!');
            }}
          />
        )}
      </div>
    </div>
  );
};