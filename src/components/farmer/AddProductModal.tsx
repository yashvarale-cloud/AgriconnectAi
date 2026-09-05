import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { ProductQuality } from '../../types';
import { Sprout, X, Upload, CheckCircle2 } from 'lucide-react';

interface AddProductModalProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export const AddProductModal: React.FC<AddProductModalProps> = ({ onClose, onSuccess }) => {
  const { addProduct } = useData();
  const { t } = useLanguage();

  const [name, setName] = useState('Tomato (Hybrid Red)');
  const [category, setCategory] = useState<'Vegetables' | 'Fruits' | 'Grains' | 'Pulses' | 'Spices'>('Vegetables');
  const [variety, setVariety] = useState('Abhinav F1 Hybrid');
  const [quantity, setQuantity] = useState('500');
  const [unit, setUnit] = useState<'kg' | 'quintal' | 'crate' | 'ton'>('kg');
  const [expectedPrice, setExpectedPrice] = useState('30');
  const [quality, setQuality] = useState<ProductQuality>('Grade A');
  const [harvestDate, setHarvestDate] = useState('2026-09-04');
  const [availableFrom, setAvailableFrom] = useState('2026-09-05');
  const [location, setLocation] = useState('Pimpalgaon, Nashik');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80');
  const [isDone, setIsDone] = useState(false);

  const sampleImages = [
    { label: 'Tomato', url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80' },
    { label: 'Onion', url: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80' },
    { label: 'Potato', url: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80' },
    { label: 'Wheat', url: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80' },
    { label: 'Rice', url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80' },
    { label: 'Banana', url: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop&q=80' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({
      name,
      category,
      variety,
      quantity: Number(quantity),
      unit,
      expectedPrice: Number(expectedPrice),
      quality,
      harvestDate,
      availableFrom,
      location,
      district: 'Nashik',
      image,
      description: `Freshly harvested ${name} (${quality}), direct from ${location}. Graded and ready for pickup/delivery.`
    });
    setIsDone(true);
    setTimeout(() => {
      if (onSuccess) onSuccess();
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative border border-stone-200 my-8">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-stone-400 hover:text-stone-600 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {!isDone ? (
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-agri-100 text-agri-700 flex items-center justify-center shadow-sm">
                <Sprout className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-stone-900 text-base sm:text-lg">
                  {t('actionAddProduct')}
                </h3>
                <p className="text-xs text-stone-500">
                  List crop directly to verified buyers with zero middleman fee
                </p>
              </div>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Crop Name:</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Tomato, Onion, Potato"
                    className="w-full border border-stone-300 rounded-lg px-3 py-2 outline-none focus:border-agri-600 font-semibold"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Category:</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full border border-stone-300 rounded-lg px-3 py-2 outline-none focus:border-agri-600"
                  >
                    <option>Vegetables</option>
                    <option>Fruits</option>
                    <option>Grains</option>
                    <option>Pulses</option>
                    <option>Spices</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-1">
                  <label className="block font-semibold text-stone-700 mb-1">Quantity:</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full border border-stone-300 rounded-lg px-3 py-2 outline-none focus:border-agri-600 font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Unit:</label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value as any)}
                    className="w-full border border-stone-300 rounded-lg px-3 py-2 outline-none focus:border-agri-600"
                  >
                    <option value="kg">Kilogram (kg)</option>
                    <option value="quintal">Quintal (100 kg)</option>
                    <option value="crate">Crate (25 kg)</option>
                    <option value="ton">Metric Ton</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Price (₹ / unit):</label>
                  <input
                    type="number"
                    value={expectedPrice}
                    onChange={(e) => setExpectedPrice(e.target.value)}
                    className="w-full border border-stone-300 rounded-lg px-3 py-2 outline-none focus:border-agri-600 font-bold text-agri-700"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Quality Grade:</label>
                  <select
                    value={quality}
                    onChange={(e) => setQuality(e.target.value as any)}
                    className="w-full border border-stone-300 rounded-lg px-3 py-2 outline-none focus:border-agri-600 font-semibold"
                  >
                    <option value="Grade A">Grade A (Premium / Export)</option>
                    <option value="Grade B">Grade B (Standard Market)</option>
                    <option value="Grade C">Grade C (Processing)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Variety:</label>
                  <input
                    type="text"
                    value={variety}
                    onChange={(e) => setVariety(e.target.value)}
                    placeholder="e.g. Abhinav Hybrid F1"
                    className="w-full border border-stone-300 rounded-lg px-3 py-2 outline-none focus:border-agri-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Harvest Date:</label>
                  <input
                    type="date"
                    value={harvestDate}
                    onChange={(e) => setHarvestDate(e.target.value)}
                    className="w-full border border-stone-300 rounded-lg px-3 py-2 outline-none focus:border-agri-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Farm Location:</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Pimpalgaon, Nashik"
                    className="w-full border border-stone-300 rounded-lg px-3 py-2 outline-none focus:border-agri-600"
                  />
                </div>
              </div>

              {/* Quick Image Picker */}
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Choose Photo:</label>
                <div className="grid grid-cols-6 gap-2">
                  {sampleImages.map((img) => (
                    <button
                      key={img.label}
                      type="button"
                      onClick={() => {
                        setImage(img.url);
                        setName(img.label);
                      }}
                      className={`relative rounded-lg overflow-hidden border-2 aspect-square transition-all ${
                        image === img.url ? 'border-agri-600 ring-2 ring-agri-300' : 'border-stone-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                      <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[9px] text-center font-bold py-0.5">
                        {img.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 border border-stone-300 rounded-xl text-stone-700 font-bold text-xs hover:bg-stone-100"
              >
                {t('actionCancel')}
              </button>
              <button
                type="submit"
                className="flex-2 w-full py-2.5 bg-agri-600 hover:bg-agri-700 text-white font-extrabold rounded-xl shadow-md text-xs transition-all"
              >
                [ List Product in Marketplace ]
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-6">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-stone-900 text-base">Product Listed Successfully!</h4>
            <p className="text-xs text-stone-500 mt-1">
              {name} ({quantity} {unit}) is now visible in the Buyer Marketplace and your Stock Inventory.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};