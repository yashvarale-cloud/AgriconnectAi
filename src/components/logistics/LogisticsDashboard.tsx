import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { formatCurrency } from '../../utils/formatters';
import { Truck, Navigation, CheckCircle2, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { RouteOptimization } from './RouteOptimization';
import { DeliveryTracker } from './DeliveryTracker';
import { AvailableJobsView } from './AvailableJobsView';

interface LogisticsDashboardProps {
  activeSubTab?: string;
  setActiveTab?: (tab: string) => void;
}

export const LogisticsDashboard: React.FC<LogisticsDashboardProps> = ({ activeSubTab = 'overview', setActiveTab }) => {
  const { currentLogistics } = useAuth();
  const { deliveryJobs } = useData();
  const { t } = useLanguage();

  const availableJobs = deliveryJobs.filter(j => j.status === 'available');
  const activeJobs = deliveryJobs.filter(j => j.status === 'accepted' || j.status === 'in_transit');

  return (
    <div className="space-y-6">
      
      {/* Driver & Vehicle Header */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black text-xl shadow-sm">
              🚚
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-stone-900 m-0 leading-tight">
                  {currentLogistics.company}
                </h1>
                <span className="bg-stone-100 text-stone-800 text-xs font-mono font-bold px-2 py-0.5 rounded">
                  {currentLogistics.vehicleNumber}
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Captain: <b className="text-stone-700">{currentLogistics.name}</b> • {currentLogistics.vehicleType}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-emerald-100 text-emerald-800 font-bold text-xs px-3 py-1 rounded-full">
              ★ {currentLogistics.rating} Rating (87 Trips)
            </span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm">
          <span className="text-stone-500 text-xs font-bold block">Available Deliveries</span>
          <div className="text-2xl font-black text-amber-700 mt-1">{availableJobs.length}</div>
          <span className="text-[11px] text-stone-400">Ready for pickup</span>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm">
          <span className="text-stone-500 text-xs font-bold block">Active Trips</span>
          <div className="text-2xl font-black text-blue-700 mt-1">{activeJobs.length}</div>
          <span className="text-[11px] text-blue-700 font-semibold">Live GPS tracking</span>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm">
          <span className="text-stone-500 text-xs font-bold block">Completed Deliveries</span>
          <div className="text-2xl font-black text-purple-700 mt-1">{currentLogistics.completedTrips}</div>
          <span className="text-[11px] text-stone-400">100% on-time rate</span>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm">
          <span className="text-stone-500 text-xs font-bold block">Today&apos;s Earnings</span>
          <div className="text-2xl font-black text-emerald-700 mt-1">{formatCurrency(currentLogistics.todayEarnings)}</div>
          <span className="text-[11px] text-emerald-700 font-bold">Escrow cleared</span>
        </div>
      </div>

      {/* Embedded Route Optimization Showcase */}
      <RouteOptimization />

      {/* Live Interactive Delivery Tracker */}
      <DeliveryTracker />

      {/* Available Jobs list */}
      <AvailableJobsView />
    </div>
  );
};