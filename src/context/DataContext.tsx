import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  BuyerRequest,
  Order,
  OrderStatus,
  NegotiationThread,
  DeliveryJob,
  FarmerProfile,
  Review,
  SupportTicket,
  Dispute,
  Notification
} from '../types';
import {
  initialProducts,
  initialBuyerRequests,
  initialOrders,
  initialNegotiation,
  initialDeliveryJobs,
  initialFarmers,
  initialReviews,
  initialTickets,
  initialDisputes,
  initialNotifications
} from '../data/mockData';

interface DataContextType {
  products: Product[];
  addProduct: (data: any) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  removeProduct: (id: string) => void;
  
  buyerRequests: BuyerRequest[];
  addBuyerRequest: (data: any) => string;
  updateBuyerRequestStatus: (id: string, status: BuyerRequest['status'], offerPrice?: number) => void;
  
  orders: Order[];
  createOrder: (data: Partial<Order>) => string;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  updatePaymentStatus: (orderId: string, method: 'UPI' | 'Card' | 'Net Banking', txnId: string) => void;
  cancelOrder: (orderId: string, reason: string) => void;

  negotiation: NegotiationThread;
  sendNegotiationMessage: (message: string, offerPrice?: number, senderRole?: 'farmer' | 'buyer') => void;
  acceptNegotiationOffer: (senderRole: 'farmer' | 'buyer') => void;

  deliveryJobs: DeliveryJob[];
  acceptDeliveryJob: (jobId: string, driverName: string, vehicleNumber: string) => void;
  advanceDeliveryStep: (jobId: string) => void;

  farmers: FarmerProfile[];
  updateFarmerVerification: (farmerId: string, field: 'kyc' | 'location' | 'fpo', val: boolean) => void;

  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'createdAt'>) => void;

  tickets: SupportTicket[];
  addTicket: (ticket: Omit<SupportTicket, 'id' | 'createdAt' | 'status'>) => void;
  updateTicketStatus: (id: string, status: SupportTicket['status']) => void;

  disputes: Dispute[];
  addDispute: (dispute: Omit<Dispute, 'id' | 'createdAt' | 'status'>) => void;
  resolveDispute: (id: string, resolution: Dispute['status']) => void;

  notifications: Notification[];
  markNotificationAsRead: (id: string) => void;
  addNotification: (notif: Omit<Notification, 'id' | 'time' | 'read'>) => void;

  resetDemoData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const loadState = <T,>(key: string, defaultVal: T): T => {
    try {
      const saved = localStorage.getItem('agri_' + key);
      return saved ? JSON.parse(saved) : defaultVal;
    } catch {
      return defaultVal;
    }
  };

  const [products, setProducts] = useState<Product[]>(() => loadState('products', initialProducts));
  const [buyerRequests, setBuyerRequests] = useState<BuyerRequest[]>(() => loadState('requests', initialBuyerRequests));
  const [orders, setOrders] = useState<Order[]>(() => loadState('orders', initialOrders));
  const [negotiation, setNegotiation] = useState<NegotiationThread>(() => loadState('negotiation', initialNegotiation));
  const [deliveryJobs, setDeliveryJobs] = useState<DeliveryJob[]>(() => loadState('logistics', initialDeliveryJobs));
  const [farmers, setFarmers] = useState<FarmerProfile[]>(() => loadState('farmers', initialFarmers));
  const [reviews, setReviews] = useState<Review[]>(() => loadState('reviews', initialReviews));
  const [tickets, setTickets] = useState<SupportTicket[]>(() => loadState('tickets', initialTickets));
  const [disputes, setDisputes] = useState<Dispute[]>(() => loadState('disputes', initialDisputes));
  const [notifications, setNotifications] = useState<Notification[]>(() => loadState('notifications', initialNotifications));

  // Auto-sync to localStorage
  useEffect(() => { localStorage.setItem('agri_products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('agri_requests', JSON.stringify(buyerRequests)); }, [buyerRequests]);
  useEffect(() => { localStorage.setItem('agri_orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('agri_negotiation', JSON.stringify(negotiation)); }, [negotiation]);
  useEffect(() => { localStorage.setItem('agri_logistics', JSON.stringify(deliveryJobs)); }, [deliveryJobs]);
  useEffect(() => { localStorage.setItem('agri_farmers', JSON.stringify(farmers)); }, [farmers]);
  useEffect(() => { localStorage.setItem('agri_reviews', JSON.stringify(reviews)); }, [reviews]);
  useEffect(() => { localStorage.setItem('agri_tickets', JSON.stringify(tickets)); }, [tickets]);
  useEffect(() => { localStorage.setItem('agri_disputes', JSON.stringify(disputes)); }, [disputes]);
  useEffect(() => { localStorage.setItem('agri_notifications', JSON.stringify(notifications)); }, [notifications]);

  // Notifications helper
  const addNotification = (notif: Omit<Notification, 'id' | 'time' | 'read'>) => {
    const newNotif: Notification = {
      ...notif,
      id: 'notif-' + Date.now(),
      time: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  // Products
  const addProduct = (data: any) => {
    const newProduct: Product = {
      id: 'prod-' + Date.now(),
      farmerId: 'farmer-1',
      farmerName: 'Ramesh Patil',
      farmName: 'Patil Agro Farms',
      isFpo: false,
      rating: 4.9,
      isVerified: true,
      distanceKm: 82,
      originalStock: Number(data.quantity),
      quantity: Number(data.quantity),
      unit: data.unit || 'kg',
      name: data.name,
      category: data.category || 'Vegetables',
      variety: data.variety || 'Desi Farm Hybrid',
      expectedPrice: Number(data.expectedPrice),
      quality: data.quality || 'Grade A',
      harvestDate: data.harvestDate || new Date().toISOString().split('T')[0],
      availableFrom: data.availableFrom || new Date().toISOString().split('T')[0],
      location: data.location || 'Nashik',
      district: data.district || 'Nashik',
      pickupAvailable: true,
      deliveryAvailable: true,
      image: data.image || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
      description: data.description || 'Farm-fresh harvest, graded and packed directly at farm gate.'
    };
    setProducts(prev => [newProduct, ...prev]);
    addNotification({
      targetRole: 'farmer',
      title: 'Product Listed',
      message: `${newProduct.name} (${newProduct.quantity} ${newProduct.unit}) listed in marketplace.`,
      type: 'request'
    });
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const removeProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Buyer Requests
  const addBuyerRequest = (data: any): string => {
    const id = 'req-' + Date.now();
    const newReq: BuyerRequest = {
      id,
      buyerId: 'buyer-1',
      buyerName: 'Anita Deshmukh (FreshMart)',
      buyerType: data.buyerType || 'Supermarket',
      product: data.product,
      requiredQuantity: Number(data.requiredQuantity),
      unit: data.unit || 'kg',
      maxBudget: Number(data.maxBudget),
      quality: data.quality || 'Grade A',
      requiredBy: data.requiredBy || '2026-09-15',
      location: data.location || 'Pune Wagholi DC',
      district: data.district || 'Pune',
      additionalNotes: data.additionalNotes || 'Direct farm procurement required.',
      status: 'Pending',
      createdAt: 'Just now'
    };
    setBuyerRequests(prev => [newReq, ...prev]);
    addNotification({
      targetRole: 'farmer',
      title: 'New Buyer Requirement',
      message: `Buyer requested ${newReq.requiredQuantity} ${newReq.unit} of ${newReq.product} in ${newReq.district}.`,
      type: 'request'
    });
    return id;
  };

  const updateBuyerRequestStatus = (id: string, status: BuyerRequest['status'], offerPrice?: number) => {
    setBuyerRequests(prev => prev.map(r => r.id === id ? { ...r, status, ...(offerPrice ? { offerPrice } : {}) } : r));
    addNotification({
      targetRole: 'buyer',
      title: 'Request Status Updated',
      message: `Farmer has responded to your request: ${status}${offerPrice ? ` at ₹${offerPrice}/kg` : ''}`,
      type: 'request'
    });
  };

  // Orders
  const createOrder = (data: Partial<Order>): string => {
    const orderId = 'ORD-' + Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      id: orderId,
      buyerId: data.buyerId || 'buyer-1',
      buyerName: data.buyerName || 'FreshMart Supermarkets',
      buyerType: data.buyerType || 'Supermarket',
      farmerId: data.farmerId || 'farmer-1',
      farmerName: data.farmerName || 'Ramesh Patil',
      farmName: data.farmName || 'Patil Agro Farms',
      productId: data.productId || 'prod-1',
      productName: data.productName || 'Fresh Harvest Crop',
      quantity: Number(data.quantity) || 100,
      unit: data.unit || 'kg',
      pricePerUnit: Number(data.pricePerUnit) || 30,
      productTotal: Number(data.productTotal) || (Number(data.quantity) * Number(data.pricePerUnit)),
      logisticsCost: Number(data.logisticsCost) || 1200,
      platformFee: 0,
      totalAmount: Number(data.totalAmount) || (Number(data.productTotal) + 1200),
      deliveryLocation: data.deliveryLocation || 'FreshMart DC, Wagholi, Pune',
      status: 'Payment Pending',
      createdAt: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedDelivery: 'Tomorrow, 04:00 PM',
      paymentStatus: 'Pending',
      escrowStatus: 'Held'
    };

    setOrders(prev => [newOrder, ...prev]);

    // Create a matching delivery job automatically
    const newJob: DeliveryJob = {
      id: 'job-' + Date.now(),
      orderId,
      pickupLocation: newOrder.farmName + ', ' + (data.deliveryLocation?.includes('Pune') ? 'Nashik' : 'Farm Gate'),
      destination: newOrder.deliveryLocation,
      product: newOrder.productName,
      quantity: newOrder.quantity,
      unit: newOrder.unit,
      distanceKm: 85,
      earnings: newOrder.logisticsCost,
      vehicleNumber: 'Pending Assignment',
      driverName: 'Pending Partner',
      driverPhone: '-',
      status: 'available',
      currentStepIndex: 0,
      originalKm: 180,
      optimizedKm: 140,
      fuelSavedInr: 480,
      timeSavedMinutes: 65,
      eta: 'Scheduled',
      currentCheckpoint: 'Awaiting Driver Pickup'
    };
    setDeliveryJobs(prev => [newJob, ...prev]);

    addNotification({
      targetRole: 'farmer',
      title: 'New Order Received',
      message: `Order #${orderId} confirmed for ${newOrder.quantity} ${newOrder.unit} ${newOrder.productName}.`,
      type: 'order'
    });
    addNotification({
      targetRole: 'logistics',
      title: 'New Delivery Run Available',
      message: `Delivery available for ${newOrder.productName} (${newOrder.quantity} ${newOrder.unit}). Payout: ₹${newOrder.logisticsCost}`,
      type: 'logistics'
    });

    return orderId;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const updatePaymentStatus = (orderId: string, method: 'UPI' | 'Card' | 'Net Banking', txnId: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          status: 'Paid',
          paymentStatus: 'Paid',
          paymentMethod: method,
          paymentId: txnId,
          escrowStatus: 'Deposited'
        };
      }
      return o;
    }));

    addNotification({
      targetRole: 'farmer',
      title: 'Payment Secured in Escrow',
      message: `Buyer has paid for Order #${orderId}. Funds are securely deposited in AgriConnect Escrow.`,
      type: 'payment'
    });
  };

  const cancelOrder = (orderId: string, reason: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          status: 'Cancelled',
          paymentStatus: 'Refunded',
          escrowStatus: 'Refunded'
        };
      }
      return o;
    }));
    addNotification({
      targetRole: 'buyer',
      title: 'Order Cancelled & Refund Initiated',
      message: `Order #${orderId} was cancelled (${reason}). Escrow refund has been processed.`,
      type: 'order'
    });
  };

  // Negotiation
  const sendNegotiationMessage = (message: string, offerPrice?: number, senderRole: 'farmer' | 'buyer' = 'buyer') => {
    const newMsg = {
      id: 'm-' + Date.now(),
      senderId: senderRole === 'buyer' ? 'buyer-1' : 'farmer-1',
      senderName: senderRole === 'buyer' ? 'Anita Deshmukh' : 'Ramesh Patil',
      senderRole,
      message,
      offerPrice,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setNegotiation(prev => ({
      ...prev,
      messages: [...prev.messages, newMsg],
      agreedPrice: offerPrice || prev.agreedPrice
    }));
  };

  const acceptNegotiationOffer = (senderRole: 'farmer' | 'buyer') => {
    setNegotiation(prev => ({
      ...prev,
      status: 'agreed',
      messages: [
        ...prev.messages,
        {
          id: 'm-' + Date.now(),
          senderId: senderRole === 'buyer' ? 'buyer-1' : 'farmer-1',
          senderName: senderRole === 'buyer' ? 'Anita Deshmukh' : 'Ramesh Patil',
          senderRole,
          message: `Offer accepted at ₹${prev.agreedPrice}/kg! Ready to generate confirmed order.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    }));
  };

  // Logistics
  const acceptDeliveryJob = (jobId: string, driverName: string, vehicleNumber: string) => {
    setDeliveryJobs(prev => prev.map(j => {
      if (j.id === jobId) {
        return {
          ...j,
          status: 'accepted',
          driverName,
          vehicleNumber,
          driverPhone: '+91 94220 90123',
          currentStepIndex: 1, // Picked Up
          currentCheckpoint: 'Picked up from Farm'
        };
      }
      return j;
    }));

    // Update order status
    const targetJob = deliveryJobs.find(j => j.id === jobId);
    if (targetJob) {
      setOrders(prev => prev.map(o => {
        if (o.id === targetJob.orderId) {
          return {
            ...o,
            status: 'Picked Up',
            vehicleNumber,
            trackingNumber: 'TRK-' + vehicleNumber.replace(/\s+/g, '') + '-' + o.id
          };
        }
        return o;
      }));
    }
  };

  const advanceDeliveryStep = (jobId: string) => {
    setDeliveryJobs(prev => prev.map(j => {
      if (j.id === jobId) {
        const nextStep = Math.min(3, j.currentStepIndex + 1);
        const isDelivered = nextStep === 3;
        
        const updatedJob: DeliveryJob = {
          ...j,
          currentStepIndex: nextStep,
          status: isDelivered ? 'delivered' : 'in_transit',
          currentCheckpoint: nextStep === 1 ? 'Farm Gate Loaded' : nextStep === 2 ? 'Sangamner Bypass Corridor' : 'Delivered at Buyer DC'
        };

        // If delivered, update order and deduct stock automatically!
        if (isDelivered) {
          setOrders(ordersList => ordersList.map(o => {
            if (o.id === j.orderId) {
              return {
                ...o,
                status: 'Delivered',
                escrowStatus: 'Released'
              };
            }
            return o;
          }));

          // Deduct product stock
          setProducts(prods => prods.map(p => {
            if (p.id === 'prod-1' || p.name.includes(j.product)) {
              const newQty = Math.max(0, p.quantity - j.quantity);
              return { ...p, quantity: newQty };
            }
            return p;
          }));

          // Increase farmer earnings
          setFarmers(farmerList => farmerList.map(f => {
            if (f.id === 'farmer-1') {
              return {
                ...f,
                receivedPayment: f.receivedPayment + 14500,
                pendingPayment: Math.max(0, f.pendingPayment - 8500),
                totalSales: f.totalSales + 14500
              };
            }
            return f;
          }));

          addNotification({
            targetRole: 'farmer',
            title: 'Delivery Complete & Payout Released!',
            message: `Order #${j.orderId} was delivered! Escrow funds released to your bank account.`,
            type: 'payment'
          });

          addNotification({
            targetRole: 'buyer',
            title: 'Order Delivered!',
            message: `Your consignment for ${j.product} (${j.quantity} ${j.unit}) has arrived at your destination.`,
            type: 'logistics'
          });
        }

        return updatedJob;
      }
      return j;
    }));
  };

  // Farmer verification
  const updateFarmerVerification = (farmerId: string, field: 'kyc' | 'location' | 'fpo', val: boolean) => {
    setFarmers(prev => prev.map(f => {
      if (f.id === farmerId) {
        if (field === 'kyc') return { ...f, kycVerified: val };
        if (field === 'location') return { ...f, locationVerified: val };
        if (field === 'fpo') return { ...f, fpoVerified: val };
      }
      return f;
    }));
  };

  // Reviews
  const addReview = (review: Omit<Review, 'id' | 'createdAt'>) => {
    const newRev: Review = {
      ...review,
      id: 'rev-' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setReviews(prev => [newRev, ...prev]);
  };

  // Tickets
  const addTicket = (ticket: Omit<SupportTicket, 'id' | 'createdAt' | 'status'>) => {
    const newTck: SupportTicket = {
      ...ticket,
      id: 'TCK-' + Math.floor(100 + Math.random() * 900),
      status: 'Open',
      createdAt: 'Just now'
    };
    setTickets(prev => [newTck, ...prev]);
  };

  const updateTicketStatus = (id: string, status: SupportTicket['status']) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status } : t));
  };

  // Disputes
  const addDispute = (dispute: Omit<Dispute, 'id' | 'createdAt' | 'status'>) => {
    const newDsp: Dispute = {
      ...dispute,
      id: 'DSP-' + Math.floor(100 + Math.random() * 900),
      status: 'Under Review',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setDisputes(prev => [newDsp, ...prev]);
  };

  const resolveDispute = (id: string, resolution: Dispute['status']) => {
    setDisputes(prev => prev.map(d => d.id === id ? { ...d, status: resolution } : d));
  };

  // Reset
  const resetDemoData = () => {
    localStorage.clear();
    setProducts(initialProducts);
    setBuyerRequests(initialBuyerRequests);
    setOrders(initialOrders);
    setNegotiation(initialNegotiation);
    setDeliveryJobs(initialDeliveryJobs);
    setFarmers(initialFarmers);
    setReviews(initialReviews);
    setTickets(initialTickets);
    setDisputes(initialDisputes);
    setNotifications(initialNotifications);
  };

  return (
    <DataContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        removeProduct,
        buyerRequests,
        addBuyerRequest,
        updateBuyerRequestStatus,
        orders,
        createOrder,
        updateOrderStatus,
        updatePaymentStatus,
        cancelOrder,
        negotiation,
        sendNegotiationMessage,
        acceptNegotiationOffer,
        deliveryJobs,
        acceptDeliveryJob,
        advanceDeliveryStep,
        farmers,
        updateFarmerVerification,
        reviews,
        addReview,
        tickets,
        addTicket,
        updateTicketStatus,
        disputes,
        resolveDispute,
        addDispute,
        notifications,
        markNotificationAsRead,
        addNotification,
        resetDemoData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};