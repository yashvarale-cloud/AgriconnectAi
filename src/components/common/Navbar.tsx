import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { Language } from '../../types';
import { Sprout, Bell, Globe, Search, User, LogOut, X } from 'lucide-react';

interface NavbarProps {
  onSearch?: (query: string) => void;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearch, activeTab, setActiveTab }) => {
  const { role, currentFarmer, currentBuyer, currentLogistics, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { notifications, markNotificationAsRead } = useData();

  const [showNotifs, setShowNotifs] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const unreadNotifs = notifications.filter(
    n => !n.read && (n.targetRole === role || n.targetRole === 'all')
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(searchQuery);
    if (setActiveTab) setActiveTab('marketplace');
  };

  const getRoleTitle = () => {
    if (role === 'farmer') return currentFarmer.isFpo ? 'Green Farmers FPO' : currentFarmer.name;
    if (role === 'buyer') return currentBuyer.businessName;
    if (role === 'logistics') return currentLogistics.company;
    return 'AgriConnect Admin';
  };

  const getRoleSub = () => {
    if (role === 'farmer') return 'Nashik • ' + (currentFarmer.isFpo ? 'FPO Partner' : 'Farmer');
    if (role === 'buyer') return currentBuyer.city + ' • Bulk Buyer';
    if (role === 'logistics') return currentLogistics.vehicleNumber + ' • Transport';
    return 'Ministry / APMC Cell';
  };

  return (
    <header className="bg-white border-b border-stone-200 sticky top-[37px] z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab && setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-agri-600 flex items-center justify-center text-white shadow-sm ring-2 ring-agri-100">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-stone-900">
                  Agri<span className="text-agri-600">Connect</span><span className="text-earth-600">AI</span>
                </span>
              </div>
              <p className="text-[11px] text-stone-500 font-medium hidden sm:block">
                Direct Farm-to-Buyer Digital Marketplace
              </p>
            </div>
          </div>

          {/* Search bar */}
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (onSearch) onSearch(e.target.value);
                }}
                placeholder={t('actionSearch')}
                className="w-full bg-stone-100 hover:bg-stone-50 focus:bg-white border border-stone-200 focus:border-agri-500 rounded-full pl-10 pr-4 py-1.5 text-sm outline-none transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => { setSearchQuery(''); onSearch && onSearch(''); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>

          {/* Right controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Language Selector */}
            <div className="flex items-center bg-stone-100 p-0.5 rounded-lg border border-stone-200 text-xs font-semibold">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded transition-all ${
                  language === 'en' ? 'bg-white text-agri-700 shadow-sm font-bold' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2 py-1 rounded transition-all ${
                  language === 'hi' ? 'bg-white text-agri-700 shadow-sm font-bold' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                हिंदी
              </button>
              <button
                onClick={() => setLanguage('mr')}
                className={`px-2 py-1 rounded transition-all ${
                  language === 'mr' ? 'bg-white text-agri-700 shadow-sm font-bold' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                मराठी
              </button>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifs(!showNotifs)}
                className="relative p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-all"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifs.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                    {unreadNotifs.length}
                  </span>
                )}
              </button>

              {/* Notifications dropdown */}
              {showNotifs && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-stone-200 rounded-xl shadow-xl z-50 p-2 text-stone-800">
                  <div className="flex items-center justify-between pb-2 px-3 border-b border-stone-100">
                    <span className="font-bold text-sm">{t('notifications')}</span>
                    <span className="text-xs text-agri-600 font-semibold">{unreadNotifs.length} new</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-stone-100">
                    {notifications.length === 0 ? (
                      <p className="p-4 text-center text-xs text-stone-500">{t('noNotifications')}</p>
                    ) : (
                      notifications.slice(0, 8).map(n => (
                        <div
                          key={n.id}
                          onClick={() => markNotificationAsRead(n.id)}
                          className={`p-3 text-xs hover:bg-stone-50 cursor-pointer transition-colors ${
                            !n.read ? 'bg-agri-50/50 font-medium' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-bold text-stone-900">{n.title}</h4>
                            <span className="text-[10px] text-stone-400 shrink-0">{n.time}</span>
                          </div>
                          <p className="text-stone-600 mt-1 leading-relaxed">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Role / User pill */}
            <div className="flex items-center gap-2 pl-2 border-l border-stone-200">
              <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center text-stone-700 font-bold text-xs">
                {getRoleTitle().charAt(0)}
              </div>
              <div className="text-left hidden xl:block">
                <div className="font-bold text-xs text-stone-900 leading-tight">{getRoleTitle()}</div>
                <div className="text-[10px] text-stone-500 leading-tight">{getRoleSub()}</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};