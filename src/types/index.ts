export type UserRole = 'farmer' | 'buyer' | 'logistics' | 'admin';
export type Language = 'en' | 'hi' | 'mr';

export type BuyerType =
  | 'Individual Consumer'
  | 'Retailer'
  | 'Restaurant'
  | 'Hotel'
  | 'Wholesaler'
  | 'Supermarket'
  | 'Food Processor';

export type ProductQuality = 'Grade A' | 'Grade B' | 'Grade C';

export interface FarmerProfile {
  id: string;
  name: string;
  farmName: string;
  isFpo: boolean;
  village: string;
  district: string;
  state: string;
  phone: string;
  kycVerified: boolean;
  locationVerified: boolean;
  fpoVerified: boolean;
  cropsGrown: string[];
  totalSales: number;
  pendingPayment: number;
  receivedPayment: number;
  thisMonthSales: number;
  lastMonthSales: number;
  rating: number;
  reviewCount: number;
  avatar: string;
  memberFarmersCount?: number;
}

export interface BuyerProfile {
  id: string;
  name: string;
  businessName: string;
  buyerType: BuyerType;
  city: string;
  district: string;
  state: string;
  phone: string;
  ordersCount: number;
  totalSpent: number;
}

export interface LogisticsPartner {
  id: string;
  name: string;
  company: string;
  vehicleNumber: string;
  vehicleType: string;
  phone: string;
  currentCity: string;
  rating: number;
  activeTrips: number;
  completedTrips: number;
  todayEarnings: number;
}

export interface Product {
  id: string;
  farmerId: string;
  farmerName: string;
  farmName: string;
  isFpo: boolean;
  name: string;
  category: 'Vegetables' | 'Fruits' | 'Grains' | 'Pulses' | 'Spices';
  variety: string;
  quantity: number;
  originalStock: number;
  unit: 'kg' | 'quintal' | 'crate' | 'ton';
  expectedPrice: number;
  quality: ProductQuality;
  harvestDate: string;
  availableFrom: string;
  location: string;
  district: string;
  pickupAvailable: boolean;
  deliveryAvailable: boolean;
  rating: number;
  distanceKm: number;
  image: string;
  description: string;
  isVerified: boolean;
}

export interface BuyerRequest {
  id: string;
  buyerId: string;
  buyerName: string;
  buyerType: BuyerType;
  product: string;
  requiredQuantity: number;
  unit: 'kg' | 'quintal' | 'ton';
  maxBudget: number;
  quality: ProductQuality;
  requiredBy: string;
  location: string;
  district: string;
  additionalNotes: string;
  status: 'Pending' | 'Accepted' | 'Offer Made' | 'Rejected';
  createdAt: string;
  offerPrice?: number;
}

export type OrderStatus =
  | 'Requested'
  | 'Accepted'
  | 'Payment Pending'
  | 'Paid'
  | 'Pickup Scheduled'
  | 'Picked Up'
  | 'In Transit'
  | 'Delivered'
  | 'Completed'
  | 'Cancelled';

export interface Order {
  id: string;
  buyerId: string;
  buyerName: string;
  buyerType: BuyerType;
  farmerId: string;
  farmerName: string;
  farmName: string;
  productId: string;
  productName: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  productTotal: number;
  logisticsCost: number;
  platformFee: number;
  totalAmount: number;
  deliveryLocation: string;
  status: OrderStatus;
  createdAt: string;
  estimatedDelivery: string;
  logisticsPartnerId?: string;
  vehicleNumber?: string;
  trackingNumber?: string;
  paymentMethod?: 'UPI' | 'Card' | 'Net Banking';
  paymentId?: string;
  paymentStatus: 'Pending' | 'Paid' | 'Failed' | 'Refunded';
  escrowStatus: 'Deposited' | 'Held' | 'Released' | 'Refunded';
}

export interface NegotiationMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'farmer' | 'buyer';
  message: string;
  offerPrice?: number;
  timestamp: string;
}

export interface NegotiationThread {
  id: string;
  buyerId: string;
  buyerName: string;
  farmerId: string;
  farmerName: string;
  productId: string;
  productName: string;
  quantity: number;
  unit: string;
  originalPrice: number;
  agreedPrice?: number;
  status: 'active' | 'agreed' | 'rejected' | 'ordered';
  messages: NegotiationMessage[];
}

export interface DeliveryJob {
  id: string;
  orderId: string;
  pickupLocation: string;
  destination: string;
  product: string;
  quantity: number;
  unit: string;
  distanceKm: number;
  earnings: number;
  vehicleNumber: string;
  driverName: string;
  driverPhone: string;
  status: 'available' | 'accepted' | 'in_transit' | 'delivered';
  currentStepIndex: number; // 0: Scheduled, 1: Picked Up, 2: In Transit, 3: Delivered
  originalKm: number;
  optimizedKm: number;
  fuelSavedInr: number;
  timeSavedMinutes: number;
  eta: string;
  currentCheckpoint: string;
}

export interface Review {
  id: string;
  orderId: string;
  fromRole: 'buyer' | 'farmer';
  toRole: 'farmer' | 'buyer';
  fromName: string;
  toName: string;
  rating: number;
  qualityRating?: number;
  deliveryRating?: number;
  commRating?: number;
  comment: string;
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  orderId?: string;
  category: 'Payment Problem' | 'Delivery Problem' | 'Product Quality' | 'Order Cancellation' | 'Account Problem' | 'Other';
  subject: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'Open' | 'Assigned' | 'In Progress' | 'Resolved' | 'Closed';
  createdAt: string;
}

export interface Dispute {
  id: string;
  orderId: string;
  buyerId: string;
  buyerName: string;
  farmerId: string;
  farmerName: string;
  reason: 'Quantity mismatch' | 'Poor quality' | 'Damaged product' | 'Late delivery' | 'Other';
  description: string;
  claimedAmount: number;
  status: 'Under Review' | 'Refund Approved' | 'Dispute Resolved' | 'Payment Released';
  createdAt: string;
  evidenceNote: string;
}

export interface Notification {
  id: string;
  targetRole: UserRole | 'all';
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'order' | 'request' | 'payment' | 'logistics' | 'system';
}

export interface AIDemandInsight {
  crop: string;
  category: string;
  currentDemand: 'HIGH' | 'MEDIUM' | 'LOW';
  expectedDemandChange: number; // e.g. +18
  trendDays: number;
  adviceText: string;
  keyMarkets: string[];
  confidenceScore: number;
}

export interface AIPriceRecommendation {
  crop: string;
  currentPrice: number;
  suggestedMin: number;
  suggestedMax: number;
  recommendedPrice: number;
  apmcMandiTrend: 'Rising' | 'Stable' | 'Falling';
  marketArrivals: 'Low' | 'Normal' | 'High';
  advice: string;
}