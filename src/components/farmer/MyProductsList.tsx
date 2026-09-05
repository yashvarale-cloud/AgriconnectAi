import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency, formatWeight } from '../../utils/formatters';
import { Trash2, Edit, MapPin, CheckCircle, Package, Plus } from 'lucide-react';
import { AddProductModal } from './AddProductModal';

export const MyProductsList: React.FC = () => {
  const { products, removeProduct, updateProduct } = useData();
  const { currentFarmer } = useAuth();
  const { t } = useLanguage();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newPrice, setNewPrice] = useState<string>('');

  // Farmer's products
  const myItems = products.filter(p => p.farmerId === currentFarmer.id || p.farmerName === currentFarmer.name);

  const handleUpdatePrice = (id: string) => {
    if (newPrice && !isNaN(Number(newPrice))) {
      updateProduct(id, { expectedPrice: Number(newPrice) });
      setEditingId(null);
      setNewPrice('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-xl font-extrabold text-stone-900">{t('navMyProducts')}</h2>
          <p className="text-xs text-stone-500">
            Active crops listed by you for direct procurement
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-agri-600 hover:bg-agri-700 text-white font-bold rounded-xl text-xs shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>{t('actionAddProduct')}</span>
        </button>
      </div>

      {myItems.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-2xl p-8 text-center">
          <Package className="w-12 h-12 text-stone-300 mx-auto mb-2" />
          <p className="text-stone-500 text-sm">{t('noProducts')}</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="mt-3 px-4 py-2 bg-agri-600 text-white font-bold rounded-xl text-xs"
          >
            {t('actionAddProduct')}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {myItems.map(p => (
            <div
              key={p.id}
              className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 w-full bg-stone-100 overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-stone-900 font-extrabold text-xs px-2.5 py-1 rounded-lg shadow">
                    {p.quality}
                  </div>
                  <div className="absolute top-3 right-3 bg-emerald-600 text-white font-bold text-[11px] px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
                    <CheckCircle className="w-3 h-3" />
                    <span>Active</span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-1 mb-1">
                    <h3 className="font-extrabold text-base text-stone-900 leading-snug">{p.name}</h3>
                    <span className="text-xs bg-stone-100 text-stone-600 font-semibold px-2 py-0.5 rounded">
                      {p.category}
                    </span>
                  </div>

                  <p className="text-xs text-stone-500 mb-3 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    <span>{p.location}, {p.district}</span>
                  </p>

                  <div className="bg-stone-50 rounded-xl p-2.5 space-y-1.5 text-xs mb-2">
                    <div className="flex justify-between text-stone-600">
                      <span>Available Stock:</span>
                      <span className="font-bold text-stone-900">{formatWeight(p.quantity, p.unit)}</span>
                    </div>
                    <div className="flex justify-between items-center text-stone-600">
                      <span>Listed Price:</span>
                      {editingId === p.id ? (
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            value={newPrice}
                            onChange={(e) => setNewPrice(e.target.value)}
                            placeholder={String(p.expectedPrice)}
                            className="w-16 border border-stone-300 rounded px-1.5 py-0.5 text-xs text-stone-900 font-bold"
                          />
                          <button
                            onClick={() => handleUpdatePrice(p.id)}
                            className="bg-agri-600 text-white px-2 py-0.5 rounded text-[10px] font-bold"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <span className="font-extrabold text-agri-700 text-sm">
                          ₹{p.expectedPrice} / {p.unit}
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between text-stone-500 text-[11px]">
                      <span>Harvested:</span>
                      <span>{p.harvestDate}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0 border-t border-stone-100 flex items-center justify-between gap-2 mt-2">
                <button
                  onClick={() => {
                    setEditingId(p.id === editingId ? null : p.id);
                    setNewPrice(String(p.expectedPrice));
                  }}
                  className="flex items-center gap-1 text-xs font-semibold text-stone-600 hover:text-agri-700 p-1.5"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>{editingId === p.id ? 'Cancel' : 'Edit Price'}</span>
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Remove ${p.name} from listed products?`)) {
                      removeProduct(p.id);
                    }
                  }}
                  className="flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-700 p-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showAddModal && <AddProductModal onClose={() => setShowAddModal(false)} />}
    </div>
  );
};