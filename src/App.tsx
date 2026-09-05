import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { DataProvider, useData } from './context/DataContext';

// Components
import { DemoRoleSwitcher } from './components/common/DemoRoleSwitcher';
import { Navbar } from './components/common/Navbar';
import { LoginScreen } from './components/common/LoginScreen';
import { ProfileView } from './components/common/ProfileView';
import { SupportTicketModal } from './components/shared/SupportTicketModal';

// Farmer
import { FarmerDashboard } from './components/farmer/FarmerDashboard';
import { MyProductsList } from './components/farmer/MyProductsList';
import { MyStockManager } from './components/farmer/MyStockManager';
import { BuyerRequestsView } from './components/farmer/BuyerRequestsView';
import { FarmerEarnings } from './components/farmer/FarmerEarnings';
import { FPOAggregatorView } from './components/farmer/FPOAggregatorView';

// Buyer
import { BuyerDashboard } from './components/buyer/BuyerDashboard';
import { Marketplace } from './components/buyer/Marketplace';
import { RequestProductForm } from './components/buyer/RequestProductForm';
import { AIMatchingView } from './components/buyer/AIMatchingView';
import { NegotiationChat } from './components/buyer/NegotiationChat';

// Logistics
import { LogisticsDashboard } from './components/logistics/LogisticsDashboard';
import { AvailableJobsView } from './components/logistics/AvailableJobsView';
import { DeliveryTracker } from './components/logistics/DeliveryTracker';
import { RouteOptimization } from './components/logistics/RouteOptimization';

// Admin
import { AdminDashboard } from './components/admin/AdminDashboard';
import { FarmerVerification } from './components/admin/FarmerVerification';
import { DisputeResolution } from './components/admin/DisputeResolution';
import { SupportTicketsView } from './components/admin/SupportTicketsView';

// AI
import { AIDemandForecasting } from './components/ai/AIDemandForecasting';
import { AIPriceRecommendation } from './components/ai/AIPriceRecommendation';
import { AIAssistantChatbot } from './components/ai/AIAssistantChatbot';

// Icons
import {
  LayoutDashboard,
  Sprout,
  Package,
  Inbox,
  ShoppingBag,
  Wallet,
  Sparkles,
  MessageSquare,
  Truck,
  ShieldCheck,
  LifeBuoy,
  Users,
  Navigation,
  FileQuestion,
  User,
  Plus
} from 'lucide-react';
import { Product } from './types';

const MainApp: React.FC = () => {
  const { role, isAuthenticated } = useAuth();
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [globalSearch, setGlobalSearch] = useState('');
  const [selectedChatProduct, setSelectedChatProduct] = useState<Product | null>(null);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showDisputeModal, setShowDisputeModal] = useState(false);

  if (!isAuthenticated) {
    return <LoginScreen onLoginSuccess={() => setActiveTab('dashboard')} />;
  }

  // Define tabs based on role
  const getNavTabs = () => {
    if (role === 'farmer') {
      return [
        { id: 'dashboard', label: t('navDashboard'), icon: LayoutDashboard },
        { id: 'my-products', label: t('navMyProducts'), icon: Sprout },
        { id: 'stock', label: t('navMyStock'), icon: Package },
        { id: 'requests', label: t('navBuyerRequests'), icon: Inbox },
        { id: 'earnings', label: t('navEarnings'), icon: Wallet },
        { id: 'ai-insights', label: t('navAiInsights'), icon: Sparkles },
        { id: 'ai-assistant', label: t('navAiAssistant'), icon: MessageSquare },
        { id: 'fpo', label: t('navFpoView'), icon: Users },
        { id: 'profile', label: t('navProfile'), icon: User },
      ];
    }
    if (role === 'buyer') {
      return [
        { id: 'dashboard', label: t('navDashboard'), icon: LayoutDashboard },
        { id: 'marketplace', label: t('navMarketplace'), icon: Sprout },
        { id: 'request-product', label: t('actionRequestProduct'), icon: Plus },
        { id: 'ai-matching', label: 'AI Matching', icon: Sparkles },
        { id: 'chat', label: 'Negotiation', icon: MessageSquare },
        { id: 'tracking', label: t('navTracking'), icon: Truck },
        { id: 'ai-assistant', label: t('navAiAssistant'), icon: Sparkles },
        { id: 'profile', label: t('navProfile'), icon: User },
      ];
    }
    if (role === 'logistics') {
      return [
        { id: 'dashboard', label: t('navDashboard'), icon: LayoutDashboard },
        { id: 'available-jobs', label: 'Available Jobs', icon: Package },
        { id: 'tracking', label: t('navTracking'), icon: Truck },
        { id: 'route-opt', label: t('aiRouteOptimization'), icon: Navigation },
        { id: 'profile', label: t('navProfile'), icon: User },
      ];
    }
    // Admin
    return [
      { id: 'dashboard', label: t('navDashboard'), icon: LayoutDashboard },
      { id: 'kyc', label: 'Farmer KYC', icon: ShieldCheck },
      { id: 'disputes', label: t('navDisputes'), icon: FileQuestion },
      { id: 'tickets', label: t('navSupport'), icon: LifeBuoy },
      { id: 'profile', label: t('navProfile'), icon: User },
    ];
  };

  const tabs = getNavTabs();

  // Switch to contact farmer
  const handleContactFarmer = (product: Product) => {
    setSelectedChatProduct(product);
    setActiveTab('chat');
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-100 text-stone-900">
      
      {/* 1. Top floating Demo role switcher */}
      <DemoRoleSwitcher />

      {/* 2. Global header with language selector & notifications */}
      <Navbar
        onSearch={(query) => {
          setGlobalSearch(query);
          if (role === 'buyer') setActiveTab('marketplace');
        }}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* 3. Sub-Navigation Bar */}
      <nav className="bg-white border-b border-stone-200 sticky top-[101px] z-30 shadow-2xs overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 py-2 min-w-max">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-agri-600 text-white shadow-xs'
                      : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}

            {/* Support button */}
            <button
              onClick={() => setShowSupportModal(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-100 ml-auto"
            >
              <LifeBuoy className="w-4 h-4" />
              <span>{t('navSupport')}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* 4. Main Body Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* FARMER VIEWS */}
        {role === 'farmer' && (
          <>
            {activeTab === 'dashboard' && <FarmerDashboard setActiveTab={setActiveTab} />}
            {activeTab === 'my-products' && <MyProductsList />}
            {activeTab === 'stock' && <MyStockManager />}
            {activeTab === 'requests' && <BuyerRequestsView onOpenChat={() => setActiveTab('ai-assistant')} />}
            {activeTab === 'earnings' && <FarmerEarnings />}
            {activeTab === 'ai-insights' && (
              <div className="space-y-6">
                <AIDemandForecasting />
                <AIPriceRecommendation />
              </div>
            )}
            {activeTab === 'ai-assistant' && <AIAssistantChatbot />}
            {activeTab === 'fpo' && <FPOAggregatorView />}
            {activeTab === 'profile' && <ProfileView />}
          </>
        )}

        {/* BUYER VIEWS */}
        {role === 'buyer' && (
          <>
            {activeTab === 'dashboard' && <BuyerDashboard setActiveTab={setActiveTab} />}
            {activeTab === 'marketplace' && (
              <Marketplace
                initialSearch={globalSearch}
                onContactFarmer={handleContactFarmer}
              />
            )}
            {activeTab === 'request-product' && <RequestProductForm />}
            {activeTab === 'ai-matching' && (
              <AIMatchingView
                onSelectProduct={(p) => {
                  setSelectedChatProduct(p);
                  setActiveTab('chat');
                }}
              />
            )}
            {activeTab === 'chat' && (
              <NegotiationChat
                initialProduct={selectedChatProduct}
                onOrderCreated={() => setActiveTab('dashboard')}
              />
            )}
            {activeTab === 'tracking' && <DeliveryTracker />}
            {activeTab === 'ai-assistant' && <AIAssistantChatbot />}
            {activeTab === 'profile' && <ProfileView />}
          </>
        )}

        {/* LOGISTICS VIEWS */}
        {role === 'logistics' && (
          <>
            {activeTab === 'dashboard' && <LogisticsDashboard setActiveTab={setActiveTab} />}
            {activeTab === 'available-jobs' && <AvailableJobsView />}
            {activeTab === 'tracking' && <DeliveryTracker />}
            {activeTab === 'route-opt' && <RouteOptimization />}
            {activeTab === 'profile' && <ProfileView />}
          </>
        )}

        {/* ADMIN VIEWS */}
        {role === 'admin' && (
          <>
            {activeTab === 'dashboard' && <AdminDashboard />}
            {activeTab === 'kyc' && <FarmerVerification />}
            {activeTab === 'disputes' && <DisputeResolution />}
            {activeTab === 'tickets' && <SupportTicketsView />}
            {activeTab === 'profile' && <ProfileView />}
          </>
        )}
      </main>

      {/* 5. Footer */}
      <footer className="bg-white border-t border-stone-200 mt-12 py-6 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-stone-900">🌾 AgriConnectAI</span>
            <span>•</span>
            <span>Empowering Indian Agriculture Through Direct Fair-Price Marketplace</span>
          </div>
          <div className="flex items-center gap-4 text-stone-400 font-semibold">
            <span>Direct Farm-to-Buyer Ecosystem</span>
            <span>•</span>
            <span>APMC Mandi Integration Ready</span>
          </div>
        </div>
      </footer>

      {/* Support Ticket Modal */}
      {showSupportModal && (
        <SupportTicketModal
          onClose={() => setShowSupportModal(false)}
        />
      )}
    </div>
  );
};

export function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <DataProvider>
          <MainApp />
        </DataProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;