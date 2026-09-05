import React, { createContext, useContext, useState } from 'react';
import { UserRole, FarmerProfile, BuyerProfile, LogisticsPartner } from '../types';
import { initialFarmers, initialBuyers, initialLogistics } from '../data/mockData';

interface AuthContextType {
  role: UserRole;
  isAuthenticated: boolean;
  currentFarmer: FarmerProfile;
  currentBuyer: BuyerProfile;
  currentLogistics: LogisticsPartner;
  loginAs: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem('agri_role') as UserRole;
    return saved && ['farmer', 'buyer', 'logistics', 'admin'].includes(saved) ? saved : 'farmer';
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('agri_logged_in') !== 'false';
  });

  const loginAs = (newRole: UserRole) => {
    setRole(newRole);
    setIsAuthenticated(true);
    localStorage.setItem('agri_role', newRole);
    localStorage.setItem('agri_logged_in', 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('agri_logged_in', 'false');
  };

  return (
    <AuthContext.Provider
      value={{
        role,
        isAuthenticated,
        currentFarmer: initialFarmers[0], // Ramesh Patil
        currentBuyer: initialBuyers[0],   // Anita Deshmukh (FreshMart)
        currentLogistics: initialLogistics[0], // Mahesh Shinde
        loginAs,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};