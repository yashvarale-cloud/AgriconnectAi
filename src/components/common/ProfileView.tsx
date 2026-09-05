import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { formatCurrency } from '../../utils/formatters';
import {
  User,
  MapPin,
  Phone,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Truck,
  Sprout,
  Wallet
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { role, currentFarmer, currentBuyer, currentLogistics } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div>
        <h2 className="text-xl font-extrabold text-stone-900">{t('navProfile')}</h2>
        <p className="text-xs text-stone-500">
          Account details and verification credentials
        </p>
      </div>

      <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-5">
        {/* Role: Farmer */}
        {role === 'farmer' && (
          <>
            <div className="flex items-center gap-4 pb-4 border-b border-stone-100">
              <img
                src={currentFarmer.avatar}
                alt={currentFarmer.name}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-agri-500 shadow-sm"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-lg text-stone-900">{currentFarmer.name}</h3>
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified Farmer
                  </span>
                </div>
                <p className="text-xs text-stone-600 font-semibold">{currentFarmer.farmName}</p>
                <p className="text-xs text-stone-400 mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-stone-400" />
                  <span>{currentFarmer.village}, {currentFarmer.district}, {currentFarmer.state}</span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-stone-50 p-3 rounded-xl">
                <span className="text-stone-500 text-[11px] block">Registered Mobile:</span>
                <span className="font-bold text-stone-900">{currentFarmer.phone}</span>
              </div>
              <div className="bg-stone-50 p-3 rounded-xl">
                <span className="text-stone-500 text-[11px] block">Crops Cultivated:</span>
                <span className="font-bold text-stone-900">{currentFarmer.cropsGrown.join(', ')}</span>
              </div>
              <div className="bg-stone-50 p-3 rounded-xl">
                <span className="text-stone-500 text-[11px] block">Bank Account:</span>
                <span className="font-bold text-stone-900">Bank of Maharashtra (••• 4092)</span>
              </div>
              <div className="bg-stone-50 p-3 rounded-xl">
                <span className="text-stone-500 text-[11px] block">Aadhaar KYC:</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified (UIDAI 2026)
                </span>
              </div>
            </div>
          </>
        )}

        {/* Role: Buyer */}
        {role === 'buyer' && (
          <>
            <div className="flex items-center gap-4 pb-4 border-b border-stone-100">
              <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-2xl">
                🛒
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-lg text-stone-900">{currentBuyer.businessName}</h3>
                  <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                    {currentBuyer.buyerType}
                  </span>
                </div>
                <p className="text-xs text-stone-600 font-semibold">Procurement Manager: {currentBuyer.name}</p>
                <p className="text-xs text-stone-400 mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-stone-400" />
                  <span>{currentBuyer.city}, {currentBuyer.state}</span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-stone-50 p-3 rounded-xl">
                <span className="text-stone-500 text-[11px] block">Phone:</span>
                <span className="font-bold text-stone-900">{currentBuyer.phone}</span>
              </div>
              <div className="bg-stone-50 p-3 rounded-xl">
                <span className="text-stone-500 text-[11px] block">Total Direct Orders:</span>
                <span className="font-bold text-stone-900">{currentBuyer.ordersCount} Completed</span>
              </div>
              <div className="bg-stone-50 p-3 rounded-xl">
                <span className="text-stone-500 text-[11px] block">Total Procured:</span>
                <span className="font-bold text-agri-700">{formatCurrency(currentBuyer.totalSpent)}</span>
              </div>
              <div className="bg-stone-50 p-3 rounded-xl">
                <span className="text-stone-500 text-[11px] block">GSTIN / APMC License:</span>
                <span className="font-mono font-bold text-stone-800">27AAACH7409R1ZZ</span>
              </div>
            </div>
          </>
        )}

        {/* Role: Logistics */}
        {role === 'logistics' && (
          <>
            <div className="flex items-center gap-4 pb-4 border-b border-stone-100">
              <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-2xl">
                🚚
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-lg text-stone-900">{currentLogistics.company}</h3>
                  <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                    Agro Carrier
                  </span>
                </div>
                <p className="text-xs text-stone-600 font-semibold">Vehicle Number: {currentLogistics.vehicleNumber}</p>
                <p className="text-xs text-stone-400 mt-0.5">
                  Driver: {currentLogistics.name} • {currentLogistics.vehicleType}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-stone-50 p-3 rounded-xl">
                <span className="text-stone-500 text-[11px] block">Driver Contact:</span>
                <span className="font-bold text-stone-900">{currentLogistics.phone}</span>
              </div>
              <div className="bg-stone-50 p-3 rounded-xl">
                <span className="text-stone-500 text-[11px] block">Completed Runs:</span>
                <span className="font-bold text-stone-900">{currentLogistics.completedTrips} Trips</span>
              </div>
            </div>
          </>
        )}

        {/* Role: Admin */}
        {role === 'admin' && (
          <div className="text-xs space-y-2 text-stone-600">
            <h3 className="font-extrabold text-base text-stone-900">AgriConnect System Administrator</h3>
            <p>Authorized administrator access for APMC Mandi coordination and Escrow arbitrations.</p>
            <div className="bg-stone-50 p-3 rounded-xl font-mono text-[11px]">
              Access Level: Tier-1 Security • Escrow Node: MH-PUNE-01
            </div>
          </div>
        )}
      </div>
    </div>
  );
};