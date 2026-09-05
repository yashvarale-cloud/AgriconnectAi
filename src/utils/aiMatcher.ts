import { Product, FarmerProfile } from '../types';

export interface AIMatchResult {
  product: Product;
  farmer: FarmerProfile | undefined;
  matchScore: number;
  breakdown: {
    productMatchScore: number;
    priceScore: number;
    distanceScore: number;
    quantityScore: number;
    qualityScore: number;
    reliabilityScore: number;
  };
  reasons: string[];
  isTopRecommendation: boolean;
}

export function calculateFarmerBuyerMatch(
  requestedProduct: string,
  requestedQuantity: number,
  maxBudget: number,
  buyerLocation: string,
  preferredQuality: string,
  products: Product[],
  farmers: FarmerProfile[]
): AIMatchResult[] {
  const reqLower = requestedProduct.toLowerCase().trim();

  const results: AIMatchResult[] = products
    .filter(p => {
      // Crop name match or loose match
      return p.name.toLowerCase().includes(reqLower) || reqLower.includes(p.name.toLowerCase().split(' ')[0]);
    })
    .map(product => {
      const farmer = farmers.find(f => f.id === product.farmerId);
      
      // 1. Product Match (30 pts)
      const productMatchScore = 30;

      // 2. Price Score (20 pts) - lower price relative to budget gets full points
      let priceScore = 20;
      if (maxBudget > 0) {
        if (product.expectedPrice <= maxBudget) {
          priceScore = 20;
        } else {
          const diffPct = (product.expectedPrice - maxBudget) / maxBudget;
          priceScore = Math.max(0, 20 - Math.round(diffPct * 30));
        }
      }

      // 3. Distance Score (15 pts) - closer is better
      const dist = product.distanceKm || 80;
      let distanceScore = 15;
      if (dist <= 50) distanceScore = 15;
      else if (dist <= 100) distanceScore = 12;
      else if (dist <= 150) distanceScore = 9;
      else distanceScore = 6;

      // 4. Quantity Fulfillment Score (15 pts)
      let quantityScore = 15;
      if (product.quantity >= requestedQuantity) {
        quantityScore = 15;
      } else {
        const ratio = product.quantity / requestedQuantity;
        quantityScore = Math.max(5, Math.round(ratio * 15));
      }

      // 5. Quality Score (10 pts)
      let qualityScore = 10;
      if (preferredQuality && product.quality === preferredQuality) {
        qualityScore = 10;
      } else if (product.quality === 'Grade A') {
        qualityScore = 9;
      } else {
        qualityScore = 7;
      }

      // 6. Farmer Reliability (10 pts)
      const rating = product.rating || (farmer ? farmer.rating : 4.5);
      const isVerified = farmer ? (farmer.kycVerified && farmer.locationVerified) : product.isVerified;
      let reliabilityScore = Math.round((rating / 5) * 8) + (isVerified ? 2 : 0);

      const totalScore = Math.min(
        99,
        Math.max(
          55,
          productMatchScore + priceScore + distanceScore + quantityScore + qualityScore + reliabilityScore
        )
      );

      const reasons: string[] = [];
      if (product.expectedPrice <= maxBudget) {
        reasons.push(`Budget friendly: ₹${product.expectedPrice}/${product.unit} (Under budget limit ₹${maxBudget})`);
      }
      if (product.quantity >= requestedQuantity) {
        reasons.push(`Can fulfill 100% of required quantity (${product.quantity} ${product.unit} in stock)`);
      } else {
        reasons.push(`Can supply ${product.quantity} ${product.unit} ready for harvest`);
      }
      if (dist <= 90) {
        reasons.push(`Proximity advantage: only ${dist} km away with direct road transport corridor`);
      }
      if (farmer?.isFpo) {
        reasons.push(`FPO Aggregator with collective cold storage and quality grading`);
      }
      if (farmer?.kycVerified) {
        reasons.push(`Govt KYC & Farm Geo-location verified`);
      }

      return {
        product,
        farmer,
        matchScore: totalScore,
        breakdown: {
          productMatchScore,
          priceScore,
          distanceScore,
          quantityScore,
          qualityScore,
          reliabilityScore
        },
        reasons,
        isTopRecommendation: false
      };
    });

  // Sort descending by match score
  results.sort((a, b) => b.matchScore - a.matchScore);
  if (results.length > 0) {
    results[0].isTopRecommendation = true;
  }

  return results;
}