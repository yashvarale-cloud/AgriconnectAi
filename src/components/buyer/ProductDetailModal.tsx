import React from 'react';
import { Product } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { formatWeight, formatCurrency } from '../../utils/formatters';
import { StarRating } from '../common/StarRating';
import {
  MapPin,
  CheckCircle2,
  Calendar,
  Truck,
  ShieldCheck,
  MessageSquare,
  ShoppingCart,
  X
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onBuyNow: () => void;
  onContact: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onBuyNow,
  onContact
}) => {
  const { t } = useLanguage();

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl relative border border-stone-200 my-6">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-stone-400 hover:text-stone-600 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative h-60 w-full rounded-xl overflow-hidden mb-4 bg-stone-100">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-stone-900 font-extrabold text-xs px-2.5 py-1 rounded-lg">
            {product.quality}
          </div>
          <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white font-bold text-xs px-3 py-1 rounded-full flex items-center gap-1">
            <Truck className="w-3.5 h-3.5 text-agri-300" />
            <span>{product.distanceKm} km from Pune</span>
          </div>
        </div>

        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h2 className="text-xl font-black text-stone-900 m-0">{product.name}</h2>
            <p className="text-xs text-stone-600 font-semibold flex items-center gap-1.5 mt-0.5">
              <span>{product.farmName}</span>
              <span>•</span>
              <span className="text-emerald-700 font-bold flex items-center gap-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> KYC Verified
              </span>
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-black text-agri-700">₹{product.expectedPrice}</div>
            <span className="text-xs text-stone-500">per {product.unit}</span>
          </div>
        </div>

        <p className="text-xs text-stone-600 leading-relaxed my-3 bg-stone-50 p-3 rounded-xl">
          {product.description}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs my-4 bg-stone-50 p-3 rounded-xl border border-stone-100">
          <div>
            <span className="text-stone-500 text-[11px] block">Available Stock:</span>
            <span className="font-bold text-stone-900">{formatWeight(product.quantity, product.unit)}</span>
          </div>
          <div>
            <span className="text-stone-500 text-[11px] block">Harvest Date:</span>
            <span className="font-bold text-stone-900 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-stone-400" />
              {product.harvestDate}
            </span>
          </div>
          <div>
            <span className="text-stone-500 text-[11px] block">Location:</span>
            <span className="font-bold text-stone-900 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-stone-400" />
              {product.location}, {product.district}
            </span>
          </div>
          <div>
            <span className="text-stone-500 text-[11px] block">Delivery:</span>
            <span className="font-bold text-stone-900">Same-Day / Next-Day</span>
          </div>
          <div>
            <span className="text-stone-500 text-[11px] block">Farmer Rating:</span>
            <div className="flex items-center gap-1 mt-0.5">
              <StarRating rating={product.rating} size="sm" />
              <span className="font-bold text-stone-800">{product.rating}</span>
            </div>
          </div>
          <div>
            <span className="text-stone-500 text-[11px] block">Escrow Protected:</span>
            <span className="font-bold text-emerald-700 flex items-center gap-0.5 mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Safe
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-5">
          <button
            onClick={onContact}
            className="py-3 border-2 border-agri-600 hover:bg-agri-50 text-agri-800 font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{t('actionMakeOffer')} / Chat</span>
          </button>
          <button
            onClick={onBuyNow}
            className="py-3 bg-agri-600 hover:bg-agri-700 active:scale-95 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-all"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>{t('actionBuyNow')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};