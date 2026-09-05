import React from 'react';
import { OrderStatus } from '../../types';
import { Check, Clock, AlertCircle } from 'lucide-react';

interface OrderStatusTrackerProps {
  status: OrderStatus;
}

const steps: OrderStatus[] = [
  'Requested',
  'Accepted',
  'Paid',
  'Pickup Scheduled',
  'Picked Up',
  'In Transit',
  'Delivered'
];

export const OrderStatusTracker: React.FC<OrderStatusTrackerProps> = ({ status }) => {
  const isCancelled = status === 'Cancelled';
  let currentIndex = steps.indexOf(status === 'Payment Pending' ? 'Accepted' : status);
  if (currentIndex === -1) {
    if (status === 'Completed') currentIndex = steps.length;
    else currentIndex = 1;
  }

  if (isCancelled) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2 text-red-800 text-xs font-semibold">
        <AlertCircle className="w-4 h-4 text-red-600" />
        Order was cancelled. Escrow refund processed.
      </div>
    );
  }

  return (
    <div className="w-full py-2">
      <div className="flex items-center justify-between relative">
        <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-1 bg-stone-200 -z-0" />
        <div
          className="absolute top-1/2 left-4 -translate-y-1/2 h-1 bg-agri-600 transition-all duration-500 -z-0"
          style={{ width: `${Math.min(100, (currentIndex / (steps.length - 1)) * 100)}%` }}
        />

        {steps.map((step, idx) => {
          const isDone = idx <= currentIndex;
          const isCurrent = idx === currentIndex;

          return (
            <div key={step} className="flex flex-col items-center z-10">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                  isDone
                    ? 'bg-agri-600 text-white ring-4 ring-agri-100'
                    : 'bg-stone-100 text-stone-400 border border-stone-300'
                }`}
              >
                {isDone ? <Check className="w-3.5 h-3.5" /> : idx + 1}
              </div>
              <span
                className={`text-[9px] sm:text-[10px] mt-1 font-semibold text-center max-w-[60px] leading-tight ${
                  isCurrent ? 'text-agri-700 font-bold' : isDone ? 'text-stone-700' : 'text-stone-400'
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};