import React, { useState } from 'react';
import {
  Sparkles,
  Plus,
  Mic,
  TrendingUp,
  Package,
  Layers,
  Scale,
  IndianRupee,
  Clock,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import {
  SupplyItem,
  DemandItem,
  HarvestMatchResult,
  Language,
  UserProfile,
} from '../types';
import { HarvestMatchCard } from './HarvestMatchCard';
import { TRANSLATIONS } from '../utils/translations';

interface Props {
  producer: UserProfile;
  supplies: SupplyItem[];
  allDemands: DemandItem[];
  opportunities: HarvestMatchResult[];
  language: Language;
  onOpenAddSupply: () => void;
  onOpenVoiceAssist: () => void;
  onViewBreakdown: (match: HarvestMatchResult) => void;
  onAcceptOpportunity: (match: HarvestMatchResult) => void;
  onOpenChat: (match: HarvestMatchResult) => void;
  onTrackLogistics: (match: HarvestMatchResult) => void;
  onOpenHeatmapTab: () => void;
}

export const ProducerDashboard: React.FC<Props> = ({
  producer,
  supplies,
  opportunities,
  language,
  onOpenAddSupply,
  onOpenVoiceAssist,
  onViewBreakdown,
  onAcceptOpportunity,
  onOpenChat,
  onTrackLogistics,
  onOpenHeatmapTab,
}) => {
  const [activeTab, setActiveTab] = useState<'what-can-i-sell' | 'my-inventory'>('what-can-i-sell');
  const t = TRANSLATIONS[language];

  // Filter supplies for this producer
  const mySupplies = supplies.filter((s) => s.producerId === producer.id || s.status === 'available');

  const totalKg = mySupplies.reduce((acc, s) => acc + s.availableKg, 0);
  const totalValue = mySupplies.reduce((acc, s) => acc + s.availableKg * s.pricePerKg, 0);

  return (
    <div className="space-y-8">
      {/* Welcome & Action Banner */}
      <div className="bg-gradient-to-br from-[#0F281E] via-[#16382A] to-[#0A1F17] text-white p-6 sm:p-8 rounded-3xl shadow-sm border border-emerald-800/40 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold tracking-wide border border-emerald-400/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{language === 'en' ? 'Direct Farmgate Match' : 'നേരിട്ടുള്ള ഫാംഗേറ്റ് ലിങ്ക്'}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              {t.producerWelcome}, {producer.name}!
            </h1>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              {t.producerSubtitle}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onOpenVoiceAssist}
              className="px-4 py-2.5 sm:px-5 sm:py-3 bg-white hover:bg-stone-100 text-stone-900 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center gap-2 shadow-sm min-h-[44px]"
            >
              <Mic className="w-4 h-4 text-emerald-700" />
              <span>{t.voiceAssist}</span>
            </button>

            <button
              onClick={onOpenAddSupply}
              className="px-4 py-2.5 sm:px-5 sm:py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center gap-2 shadow-md shadow-emerald-950/40 ring-1 ring-emerald-400/30 min-h-[44px]"
            >
              <Plus className="w-4 h-4" />
              <span>{t.addSupply}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Snapshot Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-md transition-shadow">
          <span className="text-xs font-medium text-stone-500 block">
            {t.availableInventory}
          </span>
          <div className="text-xl sm:text-2xl font-black font-display text-stone-900 mt-1.5 flex items-center gap-2">
            <Scale className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>{totalKg.toLocaleString()} kg</span>
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">
            {language === 'en' ? 'Verified in storage' : 'സംഭരണത്തിൽ ഉള്ളത്'}
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-md transition-shadow">
          <span className="text-xs font-medium text-stone-500 block">
            {t.matchedDemands}
          </span>
          <div className="text-xl sm:text-2xl font-black font-display text-stone-900 mt-1.5 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-600 shrink-0" />
            <span>{opportunities.length} Orders</span>
          </div>
          <span className="text-[11px] text-amber-700 font-semibold mt-1 block">
            {language === 'en' ? 'Ready for immediate deal' : 'ഇടപാടിന് തയ്യാറാണ്'}
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-md transition-shadow">
          <span className="text-xs font-medium text-stone-500 block">
            {t.farmgateValue}
          </span>
          <div className="text-xl sm:text-2xl font-black font-display text-stone-900 mt-1.5 flex items-center gap-1.5">
            <IndianRupee className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>₹{totalValue.toLocaleString()}</span>
          </div>
          <span className="text-[11px] text-stone-500 font-medium mt-1 block">
            {language === 'en' ? 'Calculated at current rate' : 'നിലവിലെ നിരക്കിൽ'}
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-md transition-shadow">
          <span className="text-xs font-medium text-stone-500 block">
            {t.avgMatchFit}
          </span>
          <div className="text-xl sm:text-2xl font-black font-display text-emerald-800 mt-1.5 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
            <span>92% Top Fit</span>
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">
            {language === 'en' ? 'Proximity & price aligned' : 'വിലയും ദൂരവും അനുയോജ്യം'}
          </span>
        </div>
      </div>

      {/* Tabs & View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-2">
        <div className="flex items-center gap-2 bg-stone-100 p-1.5 rounded-2xl w-fit">
          <button
            onClick={() => setActiveTab('what-can-i-sell')}
            className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold font-display transition-all flex items-center gap-2 ${
              activeTab === 'what-can-i-sell'
                ? 'bg-white text-stone-900 shadow-sm ring-1 ring-stone-200'
                : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>{t.tabWhatCanISell}</span>
            <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-100 text-emerald-900 font-bold">
              {opportunities.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('my-inventory')}
            className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold font-display transition-all flex items-center gap-2 ${
              activeTab === 'my-inventory'
                ? 'bg-white text-stone-900 shadow-sm ring-1 ring-stone-200'
                : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
            }`}
          >
            <Package className="w-4 h-4 text-emerald-700" />
            <span>{t.tabMyInventory}</span>
            <span className="px-2 py-0.5 text-xs rounded-full bg-stone-200 text-stone-800 font-bold">
              {mySupplies.length}
            </span>
          </button>
        </div>

        <button
          onClick={onOpenHeatmapTab}
          className="text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1.5 transition-colors self-end sm:self-auto"
        >
          <Layers className="w-4 h-4 text-emerald-700" />
          <span>{language === 'en' ? 'Open Regional Crop Heatmap →' : 'പ്രാദേശിക വിള മാപ്പ് കാണുക →'}</span>
        </button>
      </div>

      {/* TAB CONTENT 1: WHAT CAN I SELL? */}
      {activeTab === 'what-can-i-sell' && (
        <div className="space-y-6">
          <div className="bg-emerald-50/70 p-4 sm:p-5 rounded-2xl border border-emerald-200/80 text-xs sm:text-sm text-stone-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <strong className="text-emerald-950 font-bold font-display block text-sm sm:text-base">
                {t.discoveryTitle}
              </strong>
              <p className="text-stone-600 mt-1 leading-relaxed">
                {t.discoveryDesc}
              </p>
            </div>
            <span className="px-3 py-1.5 bg-emerald-600 text-white font-bold rounded-xl text-xs shrink-0 self-start sm:self-center shadow-xs">
              {language === 'en' ? 'Harvest Match™ Active' : 'ഹാർവെസ്റ്റ് മാച്ച്™ ആക്റ്റീവ്'}
            </span>
          </div>

          {opportunities.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-stone-200">
              <Package className="w-12 h-12 text-stone-300 mx-auto mb-3" />
              <h4 className="font-bold text-stone-800 text-base">{t.noDemandsFound}</h4>
              <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto mt-1.5">
                {t.noDemandsDesc}
              </p>
              <button
                onClick={onOpenAddSupply}
                className="mt-5 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs"
              >
                {t.addSupply}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {opportunities.map((opp) => (
                <HarvestMatchCard
                  key={opp.matchId}
                  match={opp}
                  role="producer"
                  language={language}
                  onViewBreakdown={onViewBreakdown}
                  onExpressInterest={onAcceptOpportunity}
                  onOpenChat={onOpenChat}
                  onTrackLogistics={onTrackLogistics}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT 2: MY FARM INVENTORY */}
      {activeTab === 'my-inventory' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold font-display text-stone-900">
              {language === 'en' ? `Registered Produce Lots (${mySupplies.length})` : `രജിസ്റ്റർ ചെയ്ത വിളകൾ (${mySupplies.length})`}
            </h3>
            <button
              onClick={onOpenAddSupply}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white text-xs sm:text-sm font-bold rounded-xl flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              {t.addSupply}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {mySupplies.map((supply) => (
              <div
                key={supply.id}
                className="bg-white rounded-2xl border border-stone-200/90 p-5 shadow-xs hover:border-emerald-600/40 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <img
                      src={supply.imageUrl}
                      alt={supply.product}
                      className="w-16 h-16 rounded-xl object-cover border border-stone-200 shadow-xs"
                    />
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-900 border border-emerald-200 text-[11px] font-bold rounded-lg uppercase tracking-wider">
                      {supply.category}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-display font-bold text-stone-900 text-base sm:text-lg">
                      {supply.product}
                    </h4>
                    <p className="text-xs text-stone-500 flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{supply.producerLocation}</span>
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 bg-stone-50 p-3 rounded-xl border border-stone-200/70 text-xs">
                    <div>
                      <span className="text-[10px] text-stone-500 uppercase font-medium block">
                        {t.availableKg}
                      </span>
                      <strong className="font-display font-bold text-stone-900 text-sm">
                        {supply.availableKg} kg
                      </strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-500 uppercase font-medium block">
                        {t.farmgatePrice}
                      </span>
                      <strong className="font-display font-bold text-stone-900 text-sm">
                        ₹{supply.pricePerKg}/kg
                      </strong>
                    </div>
                  </div>

                  <div className="text-xs text-stone-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    <span>{supply.availableFrom}</span>
                    <span>• {supply.qualityGrade}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {language === 'en' ? 'Active on Network' : 'ലിസ്റ്റ് ചെയ്തത്'}
                  </span>
                  <button
                    onClick={() => setActiveTab('what-can-i-sell')}
                    className="text-xs font-bold text-emerald-800 hover:underline"
                  >
                    {language === 'en' ? 'Find Buyers →' : 'വാങ്ങുന്നവരെ കാണുക →'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
