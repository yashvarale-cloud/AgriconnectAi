import React from 'react';
import { useData } from '../../context/DataContext';
import { LifeBuoy, CheckCircle2, Clock, MessageSquare } from 'lucide-react';

export const SupportTicketsView: React.FC = () => {
  const { tickets, updateTicketStatus } = useData();

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-extrabold text-stone-900">Support Help Desk Tickets</h2>
        <p className="text-xs text-stone-500">
          Manage 24x7 farmer and buyer platform tickets
        </p>
      </div>

      <div className="space-y-3">
        {tickets.map(tck => {
          const isOpen = tck.status === 'Open';
          const isInProgress = tck.status === 'In Progress';
          const isResolved = tck.status === 'Resolved';

          return (
            <div
              key={tck.id}
              className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm text-stone-900">Ticket #{tck.id}</span>
                  <span className="text-[10px] bg-stone-100 text-stone-700 font-bold px-2 py-0.5 rounded">
                    {tck.category}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isResolved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {tck.status}
                  </span>
                </div>
                <h4 className="font-bold text-xs text-stone-800 mt-1">{tck.subject}</h4>
                <p className="text-[11px] text-stone-500 mt-0.5 leading-snug">{tck.description}</p>
                <div className="text-[10px] text-stone-400 mt-1">
                  User: {tck.userName} ({tck.userRole}) • {tck.createdAt}
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {tck.status !== 'Resolved' ? (
                  <button
                    onClick={() => updateTicketStatus(tck.id, 'Resolved')}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Resolve Ticket</span>
                  </button>
                ) : (
                  <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Resolved
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};