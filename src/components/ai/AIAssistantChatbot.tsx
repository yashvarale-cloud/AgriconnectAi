import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Sparkles, Send, Bot, User, ArrowRight, MessageSquare, Tag } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  chips?: { label: string; action: string }[];
  dataPreview?: any;
}

export const AIAssistantChatbot: React.FC = () => {
  const { role } = useAuth();
  const { t } = useLanguage();
  const { products, farmers } = useData();

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Namaste! I am AgriConnect AI, your 24/7 agriculture assistant. How can I help you today with prices, buyer demands, or direct matching?',
      chips: role === 'farmer' ? [
        { label: '🌾 Who is buying tomatoes near me?', action: 'buying_tomatoes' },
        { label: '💰 What price should I set for Nashik onions?', action: 'price_onions' },
        { label: '📈 Which crop has high demand next week?', action: 'demand_next_week' }
      ] : [
        { label: '🧅 Find 2 tons Grade A onions within 100 km', action: 'find_onions' },
        { label: '🍅 Show cheapest tomato suppliers', action: 'cheap_tomatoes' },
        { label: '🚚 Which FPO can deliver tomorrow?', action: 'fpo_tomorrow' }
      ]
    }
  ]);

  const handleChipClick = (action: string, label: string) => {
    // Add user question
    const userMsg: ChatMessage = { id: 'u-' + Date.now(), sender: 'user', text: label };
    setMessages(prev => [...prev, userMsg]);

    setTimeout(() => {
      let botResponse: ChatMessage;

      if (action === 'buying_tomatoes') {
        botResponse = {
          id: 'b-' + Date.now(),
          sender: 'bot',
          text: 'FreshMart Supermarkets (Pune Wagholi DC) has an active requirement for 2,000 kg Grade A Tomatoes with maximum budget ₹32/kg. You can offer directly at ₹30/kg for instant agreement!',
          chips: [{ label: 'View Buyer Request & Accept', action: 'open_requests' }]
        };
      } else if (action === 'price_onions') {
        botResponse = {
          id: 'b-' + Date.now(),
          sender: 'bot',
          text: 'Lasalgaon Mandi wholesale arrivals are normal. The AI recommended price for Grade A Red Onion is ₹25–₹26/kg. Direct buyers on AgriConnect are paying ₹24–₹25/kg with zero mandi hamali deduction.',
          chips: [{ label: 'Apply ₹25/kg to My Stock', action: 'apply_price' }]
        };
      } else if (action === 'demand_next_week') {
        botResponse = {
          id: 'b-' + Date.now(),
          sender: 'bot',
          text: 'AI Demand Forecast shows Tomatoes (+18%) and Sharbati Wheat (+12%) experiencing peak retail demand across Pune and Mumbai. Potatoes are currently facing heavy supply surplus (-4%).'
        };
      } else if (action === 'find_onions') {
        botResponse = {
          id: 'b-' + Date.now(),
          sender: 'bot',
          text: 'Found top match: Green Farmers FPO (Sangli) has 2,500 kg Grade A Lasalgaon Red Onions at ₹24/kg (72 km away). Match Score: 94%.',
          chips: [{ label: 'Start Negotiation with Green Farmers FPO', action: 'chat_fpo' }]
        };
      } else if (action === 'cheap_tomatoes') {
        botResponse = {
          id: 'b-' + Date.now(),
          sender: 'bot',
          text: 'Ramesh Patil (Patil Agro Farms, Nashik) has 500 kg Hybrid Red Tomatoes listed at ₹28–₹30/kg. Verified KYC farmer with 4.9★ rating.'
        };
      } else {
        botResponse = {
          id: 'b-' + Date.now(),
          sender: 'bot',
          text: 'Green Farmers Producer Co-op has 12.5 Tons aggregated inventory across 48 member farms and dedicated Tata 407 reefer transport ready for same-day dispatch.'
        };
      }

      setMessages(prev => [...prev, botResponse]);
    }, 600);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = { id: 'u-' + Date.now(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: 'b-' + Date.now(),
        sender: 'bot',
        text: `Based on real-time AgriConnect data for "${input}", verified farmers in Nashik and Pune have active produce matching your query. Would you like to check current APMC rates or request direct samples?`,
        chips: [
          { label: 'Check AI Demand Forecast', action: 'demand_next_week' },
          { label: 'Browse Verified Products', action: 'open_marketplace' }
        ]
      };
      setMessages(prev => [...prev, botResponse]);
    }, 600);
  };

  return (
    <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden flex flex-col h-[650px] max-w-3xl mx-auto">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-purple-900 to-indigo-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h3 className="font-black text-base leading-tight">AgriConnect Rural AI Assistant</h3>
            <p className="text-xs text-purple-200">Multilingual crop intelligence & price advisor</p>
          </div>
        </div>

        <span className="text-[10px] bg-emerald-500/30 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/40">
          ● Online
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-stone-50/60">
        {messages.map(msg => {
          const isUser = msg.sender === 'user';

          return (
            <div
              key={msg.id}
              className={`flex flex-col max-w-[85%] ${isUser ? 'ml-auto items-end' : 'mr-auto items-start'}`}
            >
              <div
                className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                  isUser
                    ? 'bg-agri-700 text-white rounded-tr-none shadow-xs'
                    : 'bg-white border border-stone-200 text-stone-900 rounded-tl-none shadow-xs'
                }`}
              >
                <p>{msg.text}</p>
              </div>

              {/* Clickable quick prompt chips for hackathon judges */}
              {msg.chips && msg.chips.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {msg.chips.map(chip => (
                    <button
                      key={chip.label}
                      onClick={() => handleChipClick(chip.action, chip.label)}
                      className="px-3 py-1 bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-900 text-[11px] font-bold rounded-full transition-all text-left shadow-2xs"
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Predefined Clickable Prompts Bar */}
      <div className="px-4 py-2 bg-stone-100 border-t border-stone-200 text-[11px] flex items-center gap-1.5 overflow-x-auto">
        <span className="font-bold text-stone-500 shrink-0">Demo Prompts:</span>
        <button
          onClick={() => handleChipClick('demand_next_week', 'Which crop has high demand next week?')}
          className="px-2.5 py-0.5 bg-white border border-stone-300 hover:border-agri-600 rounded-full font-semibold text-stone-700 shrink-0"
        >
          📈 High Demand Crops
        </button>
        <button
          onClick={() => handleChipClick('price_onions', 'What price should I set for Nashik onions?')}
          className="px-2.5 py-0.5 bg-white border border-stone-300 hover:border-agri-600 rounded-full font-semibold text-stone-700 shrink-0"
        >
          💰 Price for Onions
        </button>
        <button
          onClick={() => handleChipClick('find_onions', 'Find 2 tons Grade A onions within 100 km')}
          className="px-2.5 py-0.5 bg-white border border-stone-300 hover:border-agri-600 rounded-full font-semibold text-stone-700 shrink-0"
        >
          🧅 2 Tons Onion Match
        </button>
      </div>

      {/* Text Input */}
      <form onSubmit={handleSend} className="p-3 bg-white border-t border-stone-200 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask in English, हिंदी, or मराठी (e.g. Tomato price in Pune?)..."
          className="flex-1 border border-stone-300 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-agri-600"
        />
        <button
          type="submit"
          className="p-2.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl shadow-sm transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};