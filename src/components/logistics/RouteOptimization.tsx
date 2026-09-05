import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Truck, Navigation, Fuel, Clock, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

export const RouteOptimization: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-extrabold text-stone-900">{t('aiRouteOptimization')}</h2>
        <p className="text-xs text-stone-500">
          Smart routing avoiding rural bottlenecks, weight station delays, and heat exposure for perishables
        </p>
      </div>

      {/* KPI Savings Highlight Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm">
          <span className="text-stone-500 text-xs font-semibold block">Original Route</span>
          <div className="text-xl font-black text-stone-800 mt-1">189 km</div>
          <span className="text-[10px] text-stone-400">Standard highway route</span>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 shadow-sm">
          <span className="text-emerald-800 text-xs font-bold block">AI Optimized Route</span>
          <div className="text-xl font-black text-emerald-900 mt-1">142 km</div>
          <span className="text-[10px] text-emerald-700 font-bold">47 km Distance Saved!</span>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 shadow-sm">
          <span className="text-blue-800 text-xs font-bold block">Fuel Cost Saved</span>
          <div className="text-xl font-black text-blue-900 mt-1">₹520</div>
          <span className="text-[10px] text-blue-700 font-semibold">Reduced carbon footprint</span>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 shadow-sm">
          <span className="text-purple-800 text-xs font-bold block">Time Saved</span>
          <div className="text-xl font-black text-purple-900 mt-1">1 hr 15 min</div>
          <span className="text-[10px] text-purple-700 font-semibold">Prevents crop spoilage</span>
        </div>
      </div>

      {/* Visual Map / Route diagram */}
      <div className="bg-stone-900 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
        <div className="flex items-center justify-between pb-4 border-b border-stone-800 mb-6 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 text-stone-950 flex items-center justify-center font-bold">
              <Navigation className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">Active Corridor: Nashik Farm ➔ Pune Wagholi DC</h3>
              <p className="text-[11px] text-stone-400">Tata 407 Reefer • Reg: MH12 AB 1234 • 500 kg Hybrid Tomatoes</p>
            </div>
          </div>
          <span className="bg-emerald-500/20 text-emerald-400 font-bold text-xs px-3 py-1 rounded-full border border-emerald-500/30">
            ✓ Cold-Chain Safe Corridor
          </span>
        </div>

        {/* Visual Waypoint Track */}
        <div className="relative py-4">
          <div className="hidden md:block absolute top-1/2 left-8 right-8 -translate-y-1/2 h-1 bg-stone-700 -z-0" />
          <div className="hidden md:block absolute top-1/2 left-8 -translate-y-1/2 h-1 bg-emerald-500 w-2/3 -z-0" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
            {/* Waypoint 1 */}
            <div className="bg-stone-800 border border-stone-700 rounded-xl p-3 text-xs">
              <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Origin: Farm Gate</span>
              </div>
              <div className="font-bold text-white text-sm">Pimpalgaon Farm, Nashik</div>
              <p className="text-[11px] text-stone-400 mt-1">Crates loaded & temperature logged (+12°C)</p>
            </div>

            {/* Waypoint 2 */}
            <div className="bg-stone-800 border border-stone-700 rounded-xl p-3 text-xs">
              <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Checkpoint 1</span>
              </div>
              <div className="font-bold text-white text-sm">Sangamner Bypass</div>
              <p className="text-[11px] text-stone-400 mt-1">AI route bypasses city traffic gridlock (saved 35 min)</p>
            </div>

            {/* Waypoint 3 */}
            <div className="bg-stone-800 border-2 border-emerald-500 rounded-xl p-3 text-xs ring-4 ring-emerald-500/20">
              <div className="flex items-center gap-2 text-amber-400 font-bold mb-1">
                <Truck className="w-4 h-4 animate-pulse" />
                <span>Current Vehicle Position</span>
              </div>
              <div className="font-bold text-white text-sm">Chakan Agro Highway</div>
              <p className="text-[11px] text-stone-400 mt-1">Speed: 58 km/h • Remaining: 24 km • ETA: 4:30 PM</p>
            </div>

            {/* Waypoint 4 */}
            <div className="bg-stone-800/60 border border-stone-700 rounded-xl p-3 text-xs opacity-75">
              <div className="flex items-center gap-2 text-stone-400 font-bold mb-1">
                <Navigation className="w-4 h-4" />
                <span>Destination</span>
              </div>
              <div className="font-bold text-white text-sm">FreshMart DC, Pune</div>
              <p className="text-[11px] text-stone-400 mt-1">Automated gate pass & digital weighment ready</p>
            </div>
          </div>
        </div>

        {/* AI Insight Box */}
        <div className="mt-6 bg-stone-800/80 border border-stone-700 p-3 rounded-xl text-xs flex items-start gap-2.5 text-stone-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <b className="text-white">AI Spoilage Reduction Algorithm:</b> By avoiding 3 congestion hotspots on NH60 and rerouting via the rural western agro-expressway, total in-transit transit time drops from 4 hrs 10 mins to 2 hrs 55 mins, reducing tomato transit bruising and shrinkage loss by 94%.
          </div>
        </div>
      </div>
    </div>
  );
};