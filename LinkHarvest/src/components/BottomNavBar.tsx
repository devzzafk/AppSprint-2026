import React from 'react';
import {
  LayoutDashboard,
  FileSpreadsheet,
  MessageSquare,
  Truck,
  Settings,
  Plus,
  Mic,
  Sparkles,
} from 'lucide-react';
import { Language } from '../types';

export type NavTab = 'dashboard' | 'matches' | 'community' | 'logistics' | 'settings';

interface Props {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  language: Language;
  onOpenQuickAction: () => void;
  unreadMessagesCount?: number;
}

export const BottomNavBar: React.FC<Props> = ({
  activeTab,
  onSelectTab,
  language,
  onOpenQuickAction,
  unreadMessagesCount = 0,
}) => {
  const isEn = language === 'en';

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 px-2 sm:px-6 pb-2 pt-1 pointer-events-none">
      <div className="max-w-xl mx-auto pointer-events-auto">
        <nav
          className="relative bg-[#2D5F19] text-white rounded-3xl shadow-2xl border-t-2 border-[#5EAA32]/40 px-3 py-2 flex items-center justify-between backdrop-blur-md"
          aria-label="Main Navigation"
        >
          {/* Tab 1: Marketplace */}
          <button
            onClick={() => onSelectTab('dashboard')}
            className={`flex flex-col items-center justify-center flex-1 py-1 px-1 transition-all cursor-pointer ${
              activeTab === 'dashboard'
                ? 'text-white'
                : 'text-[#B8E29E] hover:text-white opacity-80 hover:opacity-100'
            }`}
          >
            <div
              className={`w-10 h-8 rounded-2xl flex items-center justify-center transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-[#4B9526] shadow-xs ring-1 ring-[#7BC74E]'
                  : ''
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold tracking-tight mt-0.5">
              {isEn ? 'Market' : 'മാർക്കറ്റ്'}
            </span>
          </button>

          {/* Tab 2: Harvest Fits & Matches */}
          <button
            onClick={() => onSelectTab('matches')}
            className={`flex flex-col items-center justify-center flex-1 py-1 px-1 transition-all cursor-pointer ${
              activeTab === 'matches'
                ? 'text-white'
                : 'text-[#B8E29E] hover:text-white opacity-80 hover:opacity-100'
            }`}
          >
            <div
              className={`w-10 h-8 rounded-2xl flex items-center justify-center transition-all ${
                activeTab === 'matches'
                  ? 'bg-[#4B9526] shadow-xs ring-1 ring-[#7BC74E]'
                  : ''
              }`}
            >
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold tracking-tight mt-0.5">
              {isEn ? 'Matches' : 'മാച്ചുകൾ'}
            </span>
          </button>

          {/* Center Action Button: Elevated Signature Circle */}
          <div className="flex flex-col items-center justify-center px-1 -mt-5">
            <button
              onClick={onOpenQuickAction}
              className="w-13 h-13 rounded-full bg-[#52A428] hover:bg-[#5EBA2E] text-white flex items-center justify-center shadow-lg ring-4 ring-[#2D5F19] transition-transform active:scale-95 cursor-pointer"
              title={isEn ? 'Quick Action / Add Harvest / Voice' : 'ദ്രുത നടപടി'}
            >
              <Plus className="w-7 h-7 stroke-[2.5]" />
            </button>
            <span className="text-[10px] font-bold text-[#D5F0C2] tracking-tight mt-1">
              {isEn ? 'Action' : 'ചേർക്കുക'}
            </span>
          </div>

          {/* Tab 4: Discussions & Deals / Monitoring */}
          <button
            onClick={() => onSelectTab('community')}
            className={`flex flex-col items-center justify-center flex-1 py-1 px-1 relative transition-all cursor-pointer ${
              activeTab === 'community'
                ? 'text-white'
                : 'text-[#B8E29E] hover:text-white opacity-80 hover:opacity-100'
            }`}
          >
            <div
              className={`w-10 h-8 rounded-2xl flex items-center justify-center relative transition-all ${
                activeTab === 'community'
                  ? 'bg-[#4B9526] shadow-xs ring-1 ring-[#7BC74E]'
                  : ''
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              {unreadMessagesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 text-stone-900 text-[9px] font-black flex items-center justify-center">
                  {unreadMessagesCount}
                </span>
              )}
            </div>
            <span className="text-[10px] font-bold tracking-tight mt-0.5">
              {isEn ? 'Deals' : 'ഡീലുകൾ'}
            </span>
          </button>

          {/* Tab 5: Logistics & Settings */}
          <button
            onClick={() => onSelectTab('settings')}
            className={`flex flex-col items-center justify-center flex-1 py-1 px-1 transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'text-white'
                : 'text-[#B8E29E] hover:text-white opacity-80 hover:opacity-100'
            }`}
          >
            <div
              className={`w-10 h-8 rounded-2xl flex items-center justify-center transition-all ${
                activeTab === 'settings'
                  ? 'bg-[#4B9526] shadow-xs ring-1 ring-[#7BC74E]'
                  : ''
              }`}
            >
              <Settings className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold tracking-tight mt-0.5">
              {isEn ? 'Profile' : 'പ്രൊഫൈൽ'}
            </span>
          </button>
        </nav>
      </div>
    </div>
  );
};
