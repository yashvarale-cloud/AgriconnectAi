import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { StarRating } from '../common/StarRating';
import { Star, X, CheckCircle2 } from 'lucide-react';

interface ReviewModalProps {
  orderId: string;
  farmerName: string;
  onClose: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ orderId, farmerName, onClose }) => {
  const { addReview } = useData();
  const [rating, setRating] = useState(5);
  const [qualityRating, setQualityRating] = useState(5);
  const [deliveryRating, setDeliveryRating] = useState(5);
  const [commRating, setCommRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addReview({
      orderId,
      fromRole: 'buyer',
      toRole: 'farmer',
      fromName: 'FreshMart Supermarkets',
      toName: farmerName,
      rating,
      qualityRating,
      deliveryRating,
      commRating,
      comment: comment || 'Excellent produce quality and prompt dispatch directly from the farm.'
    });
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1200);
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
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                <Star className="w-6 h-6 fill-amber-500" />
              </div>
              <div>
                <h3 className="font-extrabold text-stone-900 text-base">Rate & Review Farmer</h3>
                <p className="text-xs text-stone-500">Order #{orderId} • {farmerName}</p>
              </div>
            </div>

            <div className="space-y-4 my-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Overall Experience:</label>
                <div className="flex items-center gap-2">
                  <StarRating rating={rating} interactive onSelect={setRating} size="lg" />
                  <span className="font-bold text-sm text-stone-800 ml-2">{rating} / 5</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 bg-stone-50 p-3 rounded-xl border border-stone-200">
                <div>
                  <span className="block font-semibold text-stone-600 mb-1">Crop Quality:</span>
                  <StarRating rating={qualityRating} interactive onSelect={setQualityRating} size="sm" />
                </div>
                <div>
                  <span className="block font-semibold text-stone-600 mb-1">Logistics:</span>
                  <StarRating rating={deliveryRating} interactive onSelect={setDeliveryRating} size="sm" />
                </div>
                <div>
                  <span className="block font-semibold text-stone-600 mb-1">Communication:</span>
                  <StarRating rating={commRating} interactive onSelect={setCommRating} size="sm" />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Review Comments:</label>
                <textarea
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share feedback on freshness, moisture, packing or delivery..."
                  className="w-full border border-stone-300 rounded-xl p-2.5 outline-none focus:border-agri-600"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-agri-600 hover:bg-agri-700 text-white font-bold rounded-xl shadow text-xs transition-all"
            >
              Submit Review
            </button>
          </form>
        ) : (
          <div className="text-center py-6">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-stone-900 text-sm">Review Submitted!</h4>
            <p className="text-xs text-stone-500">Thank you for helping build trust in the farming community.</p>
          </div>
        )}
      </div>
    </div>
  );
};