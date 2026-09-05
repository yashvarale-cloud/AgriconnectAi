import React from 'react';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { formatCurrency, formatWeight } from '../../utils/formatters';
import { Truck, MapPin, CheckCircle, Navigation } from 'lucide-react';

export const AvailableJobsView: React.FC = () => {
  const { deliveryJobs, acceptDeliveryJob } = useData();
  const { t } = useLanguage();

  const handleAccept = (jobId: string) => {
    acceptDeliveryJob(jobId, 'Mahesh Shinde', 'MH12 AB 1234');
    alert('Delivery Job Accepted! Proceed to Farm Gate for pickup.');
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-extrabold text-stone-900">Available Delivery Jobs</h2>
        <p className="text-xs text-stone-500">
          Open transport requests from confirmed farm sales with verified escrow payout
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {deliveryJobs.map(job => (
          <div
            key={job.id}
            className={`bg-white border rounded-2xl p-5 shadow-sm space-y-3 flex flex-col justify-between ${
              job.status === 'available' ? 'border-amber-300 ring-1 ring-amber-200' : 'border-stone-200'
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-2 pb-2 border-b border-stone-100">
                <div>
                  <h3 className="font-extrabold text-base text-stone-900">{job.product}</h3>
                  <span className="text-xs text-stone-500">
                    Consignment: {formatWeight(job.quantity, job.unit)}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-emerald-700">{formatCurrency(job.earnings)}</div>
                  <span className="text-[10px] text-stone-400">Guaranteed Payout</span>
                </div>
              </div>

              <div className="space-y-2 my-3 text-xs bg-stone-50 p-3 rounded-xl">
                <div className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-agri-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-stone-400 text-[10px] block">Pickup:</span>
                    <span className="font-bold text-stone-800">{job.pickupLocation}</span>
                  </div>
                </div>
                <div className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-stone-400 text-[10px] block">Destination:</span>
                    <span className="font-bold text-stone-800">{job.destination}</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-stone-200 flex justify-between text-stone-600 text-[11px]">
                  <span>Estimated Distance: <b>{job.distanceKm} km</b></span>
                  <span>AI Optimized corridor: <b>-47 km saved</b></span>
                </div>
              </div>
            </div>

            <div>
              {job.status === 'available' ? (
                <button
                  onClick={() => handleAccept(job.id)}
                  className="w-full py-2.5 bg-agri-600 hover:bg-agri-700 active:scale-95 text-white font-extrabold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5"
                >
                  <Truck className="w-4 h-4" />
                  <span>Accept Delivery Job ({formatCurrency(job.earnings)})</span>
                </button>
              ) : (
                <div className="flex items-center justify-between text-xs text-stone-500 bg-stone-100 p-2.5 rounded-xl">
                  <span>Assigned Driver: <b>{job.driverName}</b></span>
                  <span className="font-bold text-emerald-700 capitalize">{job.status}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};