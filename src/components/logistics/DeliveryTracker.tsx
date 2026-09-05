import React from 'react';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { Truck, MapPin, User, Phone, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { OrderStatusTracker } from '../shared/OrderStatusTracker';

export const DeliveryTracker: React.FC = () => {
  const { deliveryJobs, advanceDeliveryStep } = useData();
  const { t } = useLanguage();

  const activeJob = deliveryJobs[0] || {
    id: 'job-1',
    orderId: 'ORD-9082',
    pickupLocation: 'Pimpalgaon Farm, Nashik',
    destination: 'FreshMart Wagholi DC, Pune',
    product: 'Tomato (Hybrid Red)',
    quantity: 500,
    unit: 'kg',
    distanceKm: 82,
    earnings: 1200,
    vehicleNumber: 'MH12 AB 1234',
    driverName: 'Mahesh Shinde',
    driverPhone: '+91 94220 90123',
    status: 'in_transit' as const,
    currentStepIndex: 2,
    originalKm: 189,
    optimizedKm: 142,
    fuelSavedInr: 520,
    timeSavedMinutes: 75,
    eta: 'Today, 4:30 PM',
    currentCheckpoint: 'Sangamner Bypass Highway'
  };

  const steps = [
    { name: 'Pickup Scheduled', desc: 'Driver confirmed & dispatch arranged' },
    { name: 'Picked Up from Farm', desc: 'Loaded, graded and sealed at Nashik' },
    { name: 'In Transit', desc: 'Moving along AI Optimized Agro Corridor' },
    { name: 'Delivered', desc: 'Unloaded, verified & escrow payment released!' }
  ];

  const handleStepSimulation = () => {
    advanceDeliveryStep(activeJob.id);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-xl font-extrabold text-stone-900">{t('navTracking')}</h2>
          <p className="text-xs text-stone-500">
            Real-time delivery progress for Order #{activeJob.orderId}
          </p>
        </div>

        {/* Live Simulation Step Button */}
        <button
          onClick={handleStepSimulation}
          className="px-4 py-2 bg-stone-900 hover:bg-stone-800 active:scale-95 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Simulate Next Step (Current: {steps[activeJob.currentStepIndex]?.name})</span>
        </button>
      </div>

      {/* Main Vehicle Card */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold shadow-sm">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-black text-lg text-stone-900 tracking-wide">
                  🚚 {activeJob.vehicleNumber}
                </span>
                <span className="bg-emerald-100 text-emerald-800 font-extrabold text-[11px] px-2.5 py-0.5 rounded-full uppercase">
                  {activeJob.status.replace('_', ' ')}
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Driver: <b className="text-stone-800">{activeJob.driverName}</b> ({activeJob.driverPhone})
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-stone-400 block uppercase font-bold">Estimated Arrival (ETA)</span>
            <div className="text-lg font-black text-stone-900">{activeJob.eta}</div>
            <span className="text-xs text-stone-500">{activeJob.currentCheckpoint}</span>
          </div>
        </div>

        {/* Route progression stepper */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 py-2">
          {steps.map((s, idx) => {
            const isDone = idx <= activeJob.currentStepIndex;
            const isCurrent = idx === activeJob.currentStepIndex;

            return (
              <div
                key={s.name}
                className={`p-3.5 rounded-xl border transition-all ${
                  isCurrent
                    ? 'border-agri-600 bg-agri-50 shadow-sm'
                    : isDone
                    ? 'border-stone-200 bg-stone-50 text-stone-700'
                    : 'border-stone-100 bg-white opacity-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold text-stone-400">Step {idx + 1}</span>
                  {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </div>
                <h4 className="font-extrabold text-xs text-stone-900">{s.name}</h4>
                <p className="text-[11px] text-stone-500 mt-1 leading-snug">{s.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Route Details Box */}
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs space-y-2">
          <div className="flex justify-between font-medium text-stone-600">
            <span>Pickup Point:</span>
            <span className="font-bold text-stone-900">{activeJob.pickupLocation}</span>
          </div>
          <div className="flex justify-between font-medium text-stone-600">
            <span>Drop Destination:</span>
            <span className="font-bold text-stone-900">{activeJob.destination}</span>
          </div>
          <div className="flex justify-between font-medium text-stone-600">
            <span>Produce Carried:</span>
            <span className="font-bold text-stone-900">{activeJob.product} ({activeJob.quantity} {activeJob.unit})</span>
          </div>
          <div className="flex justify-between font-medium text-stone-600">
            <span>Current Location:</span>
            <span className="font-extrabold text-agri-700">{activeJob.currentCheckpoint}</span>
          </div>
        </div>

        {activeJob.status === 'delivered' && (
          <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4 flex items-center justify-between text-xs text-emerald-900">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Consignment safely delivered! Escrow funds released to farmer bank account.</span>
            </div>
            <span className="font-bold bg-white px-3 py-1 rounded-lg text-emerald-800 shadow-xs">
              Completed
            </span>
          </div>
        )}
      </div>
    </div>
  );
};