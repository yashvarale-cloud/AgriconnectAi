import React from 'react';
import { useData } from '../../context/DataContext';
import { formatCurrency } from '../../utils/formatters';
import { AlertTriangle, CheckCircle2, ShieldAlert, ArrowRight } from 'lucide-react';

export const DisputeResolution: React.FC = () => {
  const { disputes, resolveDispute } = useData();

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-extrabold text-stone-900">AgriConnect Dispute Arbitrations</h2>
        <p className="text-xs text-stone-500">
          Admin escrow dispute arbitration for weighbridge shortages, transport delays, and moisture grade deviations
        </p>
      </div>

      <div className="space-y-3">
        {disputes.map(dsp => {
          const isPending = dsp.status === 'Under Review';

          return (
            <div
              key={dsp.id}
              className={`bg-white border rounded-2xl p-5 shadow-sm space-y-3 ${
                isPending ? 'border-red-300 ring-1 ring-red-200' : 'border-stone-200'
              }`}
            >
              <div className="flex items-start justify-between gap-2 pb-2 border-b border-stone-100 flex-wrap">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-base text-stone-900">Dispute #{dsp.id}</span>
                    <span className="bg-red-100 text-red-800 font-bold text-xs px-2.5 py-0.5 rounded-full">
                      {dsp.reason}
                    </span>
                    <span className="text-xs text-stone-400">Order #{dsp.orderId}</span>
                  </div>
                  <p className="text-xs text-stone-600 mt-1">
                    Raised by Buyer: <b className="text-stone-900">{dsp.buyerName}</b> against Farmer: <b className="text-stone-900">{dsp.farmerName}</b>
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-stone-400 block uppercase font-bold">Claimed Amount</span>
                  <div className="text-lg font-black text-red-700">{formatCurrency(dsp.claimedAmount)}</div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-0.5 ${
                    isPending ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {dsp.status}
                  </span>
                </div>
              </div>

              <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs space-y-1.5">
                <div className="text-stone-700">
                  <b className="text-stone-900">Buyer Statement:</b> {dsp.description}
                </div>
                <div className="text-stone-500 text-[11px]">
                  <b className="text-stone-700">Attached Proof:</b> {dsp.evidenceNote}
                </div>
              </div>

              {isPending && (
                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    onClick={() => {
                      resolveDispute(dsp.id, 'Refund Approved');
                      alert('Refund of ₹' + dsp.claimedAmount + ' approved from escrow to buyer!');
                    }}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
                  >
                    Approve Buyer Refund ({formatCurrency(dsp.claimedAmount)})
                  </button>
                  <button
                    onClick={() => {
                      resolveDispute(dsp.id, 'Payment Released');
                      alert('Dispute dismissed. 100% Escrow funds released to farmer.');
                    }}
                    className="px-4 py-2 bg-agri-600 hover:bg-agri-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
                  >
                    Release Escrow to Farmer
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};