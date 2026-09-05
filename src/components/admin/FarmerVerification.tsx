import React from 'react';
import { useData } from '../../context/DataContext';
import { ShieldCheck, CheckCircle2, XCircle, MapPin, FileText } from 'lucide-react';

export const FarmerVerification: React.FC = () => {
  const { farmers, updateFarmerVerification } = useData();

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-extrabold text-stone-900">Farmer & FPO KYC Verification</h2>
        <p className="text-xs text-stone-500">
          Verify 7/12 land extract, Aadhaar KYC, and GPS farm boundaries to maintain platform trust
        </p>
      </div>

      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-100 text-stone-700 font-bold uppercase text-[10px] border-b border-stone-200">
              <tr>
                <th className="py-3 px-4">Farmer / Entity</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Village & District</th>
                <th className="py-3 px-4">Aadhaar KYC</th>
                <th className="py-3 px-4">Farm Geo-Tag</th>
                <th className="py-3 px-4">FPO Certified</th>
                <th className="py-3 px-4">Admin Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium text-stone-800">
              {farmers.map(f => (
                <tr key={f.id} className="hover:bg-stone-50">
                  <td className="py-3 px-4 font-bold text-stone-900 flex items-center gap-2">
                    <img src={f.avatar} alt={f.name} className="w-8 h-8 rounded-lg object-cover" />
                    <div>
                      <div>{f.name}</div>
                      <div className="text-[10px] text-stone-400">{f.farmName}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      f.isFpo ? 'bg-blue-100 text-blue-800' : 'bg-stone-100 text-stone-700'
                    }`}>
                      {f.isFpo ? `FPO (${f.memberFarmersCount} Farmers)` : 'Individual'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-stone-600">{f.village}, {f.district}</td>
                  <td className="py-3 px-4">
                    {f.kycVerified ? (
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                      </span>
                    ) : (
                      <span className="text-amber-700 font-bold">Pending Review</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {f.locationVerified ? (
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Geo-Tagged
                      </span>
                    ) : (
                      <span className="text-stone-400">Unverified</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {f.fpoVerified ? (
                      <span className="text-blue-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Certified
                      </span>
                    ) : (
                      <span className="text-stone-400">N/A</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          updateFarmerVerification(f.id, 'kyc', !f.kycVerified);
                          updateFarmerVerification(f.id, 'location', !f.locationVerified);
                        }}
                        className="px-2.5 py-1 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-[11px] font-bold transition-all"
                      >
                        {f.kycVerified ? 'Revoke KYC' : 'Approve KYC'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};