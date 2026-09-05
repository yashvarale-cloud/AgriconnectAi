import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onSelect?: (r: number) => void;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  max = 5,
  size = 'md',
  interactive = false,
  onSelect
}) => {
  const sizeClass = size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-6 h-6' : 'w-4 h-4';

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }).map((_, i) => {
        const starNum = i + 1;
        const filled = starNum <= Math.round(rating);
        return (
          <button
            key={i}
            type="button"
            disabled={!interactive}
            onClick={() => onSelect && onSelect(starNum)}
            className={`transition-transform ${
              interactive ? 'cursor-pointer hover:scale-125 focus:outline-none' : 'cursor-default'
            }`}
          >
            <Star
              className={`${sizeClass} ${
                filled ? 'text-amber-400 fill-amber-400' : 'text-stone-300'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};