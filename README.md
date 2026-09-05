# 🌾 AgriConnectAI

> Direct Digital Agriculture Marketplace connecting farmers and FPOs directly with bulk buyers and consumers to eliminate unnecessary intermediaries.

---

## 🌟 Key Features

- **Direct Farmer-to-Buyer Marketplace**: Filterable crop catalog with Indian agricultural commodities (Tomatoes, Onions, Potatoes, Wheat, Rice, Fruits) and farm-gate pricing.
- **Trilingual Localization (English • हिंदी • मराठी)**: Accessible rural-friendly vocabulary across the entire interface.
- **Role-Based Workflows**:
  - 🌾 **Farmer / FPO**: Add harvest, manage live inventory with automatic stock deduction, accept/reject buyer requests, and track direct bank payouts.
  - 🛒 **Buyer**: Browse crops, post procurement requests, negotiate prices with live counter-offers, and place orders into escrow.
  - 🚚 **Logistics Partner**: Accept delivery jobs, view AI-optimized routes (saving fuel, distance, and transit time), and track live delivery checkpoints.
  - 🛡️ **Platform Admin**: Farmer KYC verifications, dispute arbitrations, and support ticket management.
- **AI-Powered Capabilities**:
  - Multi-factor Farmer-Buyer compatibility matching.
  - 7-day crop demand forecasting based on mandi arrivals.
  - Mandi price advisory benchmarks.
  - Perishable route optimization with cold-chain checkpoints.
- **Safe Escrow Simulation**: Buyer funds locked securely until delivery inspection is confirmed, guaranteeing zero farmer default.
- **Zero Localhost / Zero Secrets**: Completely self-contained client-side application ready for public deployment.

---

## 🛠️ Technology Stack

- **Framework**: React 18 with TypeScript
- **Bundler & Build Tool**: Vite 5
- **Styling**: Tailwind CSS v3 & PostCSS
- **Icons**: Lucide React
- **Hosting / Deployment Target**: Vercel (`vercel.json` configured with SPA rewrites)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or 20.x LTS
- npm

### Installation & Local Run
```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build locally
npm run preview
```

---

## 🌐 Deployment (Vercel)

This repository is pre-configured for instant deployment on Vercel:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Environment Variables**: None required

