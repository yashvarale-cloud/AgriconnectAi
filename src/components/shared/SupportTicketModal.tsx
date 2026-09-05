import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { LifeBuoy, AlertTriangle, X, CheckCircle2 } from 'lucide-react';

interface SupportTicketModalProps {
  isDispute?: boolean;
  orderId?: string;
  onClose: () => void;
}

export const SupportTicketModal: React.FC<SupportTicketModalProps> = ({
  isDispute = false,
  orderId,
  onClose
}) => {
  const { addTicket, addDispute } = useData();
  const { role } = useAuth();

  const [category, setCategory] = useState<any>('Product Quality');
  const [disputeReason, setDisputeReason] = useState<any>('Quantity mismatch');
  const [subject, setSubject] = useState(isDispute ? 'Dispute on Order #' + (orderId || 'ORD-9082') : '');
  const [description, setDescription] = useState('');
  const [claimedAmount, setClaimedAmount] = useState('500');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isDispute) {
      addDispute({
        orderId: orderId || 'ORD-9082',
        buyerId: 'buyer-1',
        buyerName: 'FreshMart Supermarket',
        farmerId: 'farmer-1',
        farmerName: 'Ramesh Patil',
        reason: disputeReason,
        description: description || 'Consignment weight shortage detected during weighment.',
        claimedAmount: Number(claimedAmount) || 500,
        evidenceNote: 'Digital weighbridge slip uploaded to verification portal.'
      });
    } else {
      addTicket({
        userId: role === 'farmer' ? 'farmer-1' : 'buyer-1',
        userName: role === 'farmer' ? 'Ramesh Patil' : 'Anita Deshmukh',
        userRole: role,
        orderId,
        category,
        subject: subject || 'Query regarding platform transaction',
        description: description || 'Need assistance from support team.',
        priority: 'Medium'
      });
    }
    setSubmitted(true);
    setTimeout(() => onClose(), 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-stone-200">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-stone-400 hover:text-stone-600 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-2 mb-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isDispute ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                }`}
              >
                {isDispute ? <AlertTriangle className="w-6 h-6" /> : <LifeBuoy className="w-6 h-6" />}
              </div>
              <div>
                <h3 className="font-extrabold text-stone-900 text-base">
                  {isDispute ? 'Raise Escrow Dispute' : 'Raise Support Ticket'}
                </h3>
                <p className="text-xs text-stone-500">
                  {isDispute
                    ? 'Escrow payout is placed on hold until reviewed by admin'
                    : 'AgriConnect 24x7 Rural Support Desk'}
                </p>
              </div>
            </div>

            <div className="space-y-3 my-4 text-xs">
              {isDispute ? (
                <>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Dispute Reason:</label>
                    <select
                      value={disputeReason}
                      onChange={(e) => setDisputeReason(e.target.value)}
                      className="w-full border border-stone-300 rounded-lg px-3 py-2 outline-none focus:border-red-600"
                    >
                      <option>Quantity mismatch</option>
                      <option>Poor quality</option>
                      <option>Damaged product</option>
                      <option>Late delivery</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Claimed Compensation Amount (₹):</label>
                    <input
                      type="number"
                      value={claimedAmount}
                      onChange={(e) => setClaimedAmount(e.target.value)}
                      className="w-full border border-stone-300 rounded-lg px-3 py-2 outline-none focus:border-red-600 font-bold text-stone-900"
                    />
                  </div>
                </>
              ) : (
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Category:</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border border-stone-300 rounded-lg px-3 py-2 outline-none focus:border-blue-600"
                  >
                    <option>Payment Problem</option>
                    <option>Delivery Problem</option>
                    <option>Product Quality</option>
                    <option>Order Cancellation</option>
                    <option>Account Problem</option>
                    <option>Other</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Subject / Summary:</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Short summary of the issue..."
                  className="w-full border border-stone-300 rounded-lg px-3 py-2 outline-none focus:border-agri-600"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Detailed Description:</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain what happened. Include dates, measurements, or evidence notes..."
                  className="w-full border border-stone-300 rounded-xl p-2.5 outline-none focus:border-agri-600"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-2.5 font-bold rounded-xl shadow text-xs text-white transition-all ${
                isDispute ? 'bg-red-600 hover:bg-red-700' : 'bg-agri-600 hover:bg-agri-700'
              }`}
            >
              {isDispute ? 'Submit Dispute for Admin Review' : 'Create Support Ticket'}
            </button>
          </form>
        ) : (
          <div className="text-center py-6">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-stone-900 text-sm">
              {isDispute ? 'Dispute Registered!' : 'Ticket Created Successfully!'}
            </h4>
            <p className="text-xs text-stone-500">
              {isDispute
                ? 'AgriConnect grievance cell will arbitrate within 24 hours.'
                : 'Ticket ID generated. An agent will respond promptly.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};