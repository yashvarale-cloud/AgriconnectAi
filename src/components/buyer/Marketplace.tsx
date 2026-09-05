import React, { useState, useMemo } from 'react';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { Product } from '../../types';
import { formatCurrency, formatWeight } from '../../utils/formatters';
import { StarRating } from '../common/StarRating';
import {
  Search,
  Filter,
  MapPin,
  CheckCircle,
  Truck,
  MessageSquare,
  ShoppingCart,
  Eye,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { ProductDetailModal } from './ProductDetailModal';
import { CartCheckoutModal } from './CartCheckoutModal';

interface MarketplaceProps {
  initialSearch?: string;
  onContactFarmer: (product: Product) => void;
}

export const Marketplace: React.FC<MarketplaceProps> = ({ initialSearch = '', onContactFarmer }) => {
  const { products } = useData();
  const { t } = useLanguage();

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [selectedQuality, setSelectedQuality] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'price_asc' | 'price_desc' | 'distance' | 'rating'>('rating');

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [checkoutProduct, setCheckoutProduct] = useState<Product | null>(null);

  const categories = ['All', 'Vegetables', 'Fruits', 'Grains'];
  const locations = ['All', 'Nashik', 'Pune', 'Sangli', 'Satara'];

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        const matchesSearch =
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.farmerName.toLowerCase().includes(search.toLowerCase()) ||
          p.location.toLowerCase().includes(search.toLowerCase()) ||
          p.district.toLowerCase().includes(search.toLowerCase());

        const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
        const matchesLoc = selectedLocation === 'All' || p.district.toLowerCase().includes(selectedLocation.toLowerCase());
        const matchesQuality = selectedQuality === 'All' || p.quality === selectedQuality;

        return matchesSearch && matchesCat && matchesLoc && matchesQuality;
      })
      .sort((a, b) => {
        if (sortBy === 'price_asc') return a.expectedPrice - b.expectedPrice;
        if (sortBy === 'price_desc') return b.expectedPrice - a.expectedPrice;
        if (sortBy === 'distance') return a.distanceKm - b.distanceKm;
        return b.rating - a.rating;
      });
  }, [products, search, selectedCategory, selectedLocation, selectedQuality, sortBy]);

  return (
    <div className="space-y-5">
      {/* Header & Category Filters */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-extrabold text-stone-900 m-0">{t('navMarketplace')}</h1>
            <p className="text-xs text-stone-500">
              Procure farm-fresh harvest directly from KYC verified farmers and FPOs
            </p>
          </div>

          {/* Search bar inside marketplace */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search crop, farmer or district..."
              className="w-full bg-stone-50 border border-stone-200 focus:border-agri-600 rounded-xl pl-9 pr-8 py-2 text-xs outline-none"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Filter controls row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-100 text-xs">
          {/* Categories */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  selectedCategory === c
                    ? 'bg-agri-600 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Location & Sort dropdowns */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1 text-stone-500">
              <MapPin className="w-3.5 h-3.5" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="border border-stone-300 rounded-lg px-2 py-1 text-xs outline-none bg-white font-semibold text-stone-800"
              >
                <option value="All">All Maharashtra</option>
                {locations.filter(l => l !== 'All').map(l => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1 text-stone-500">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="border border-stone-300 rounded-lg px-2 py-1 text-xs outline-none bg-white font-semibold text-stone-800"
              >
                <option value="rating">Top Rated</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="distance">Proximity (Nearest)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center">
          <p className="text-stone-500 text-sm font-semibold">{t('noProducts')}</p>
          <p className="text-xs text-stone-400 mt-1">Try clearing your search query or location filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 w-full bg-stone-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-stone-900 font-extrabold text-xs px-2.5 py-1 rounded-lg shadow">
                    {product.quality}
                  </div>
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-agri-300" />
                    <span>{product.distanceKm} km</span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-1 mb-1">
                    <h3 className="font-extrabold text-base text-stone-900 leading-snug">{product.name}</h3>
                    <div className="text-right">
                      <span className="font-extrabold text-agri-700 text-base">
                        ₹{product.expectedPrice}
                      </span>
                      <span className="text-[10px] text-stone-500 block">/ {product.unit}</span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 font-semibold flex items-center gap-1">
                    <span>{product.farmName}</span>
                    {product.isVerified && (
                      <span title="KYC Verified Farmer">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      </span>
                    )}
                  </p>

                  <p className="text-xs text-stone-400 mt-0.5 mb-3 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-stone-400" />
                    <span>{product.location}, {product.district}</span>
                  </p>

                  <div className="bg-stone-50 rounded-xl p-2.5 space-y-1 text-xs mb-3">
                    <div className="flex justify-between text-stone-600">
                      <span>Available Stock:</span>
                      <span className="font-bold text-stone-900">{formatWeight(product.quantity, product.unit)}</span>
                    </div>
                    <div className="flex justify-between items-center text-stone-600">
                      <span>Farmer Rating:</span>
                      <div className="flex items-center gap-1">
                        <StarRating rating={product.rating} size="sm" />
                        <span className="font-bold text-stone-800 text-[11px]">{product.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 pt-0 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="py-2 border border-stone-300 hover:bg-stone-50 rounded-xl text-stone-700 font-bold text-xs flex items-center justify-center gap-1 transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{t('actionViewDetails')}</span>
                  </button>
                  <button
                    onClick={() => onContactFarmer(product)}
                    className="py-2 border border-agri-600 hover:bg-agri-50 text-agri-800 rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition-all"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{t('actionContactFarmer')}</span>
                  </button>
                </div>

                <button
                  onClick={() => setCheckoutProduct(product)}
                  className="w-full py-2.5 bg-agri-600 hover:bg-agri-700 active:scale-95 text-white font-extrabold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>{t('actionBuyNow')} (Direct Escrow)</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onBuyNow={() => {
            const p = selectedProduct;
            setSelectedProduct(null);
            setCheckoutProduct(p);
          }}
          onContact={() => {
            const p = selectedProduct;
            setSelectedProduct(null);
            onContactFarmer(p);
          }}
        />
      )}

      {checkoutProduct && (
        <CartCheckoutModal
          product={checkoutProduct}
          onClose={() => setCheckoutProduct(null)}
        />
      )}
    </div>
  );
};