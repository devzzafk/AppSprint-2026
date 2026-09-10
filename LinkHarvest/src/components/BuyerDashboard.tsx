import React, { useState } from 'react';
import {
  Sparkles,
  Plus,
  TrendingUp,
  MapPin,
  IndianRupee,
  Scale,
  Clock,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import {
  DemandItem,
  SupplyItem,
  HarvestMatchResult,
  Language,
  UserProfile,
} from '../types';
import { HarvestMatchCard } from './HarvestMatchCard';
import { findMatchesForDemand } from '../utils/harvestMatcher';
import { TRANSLATIONS } from '../utils/translations';

interface Props {
  buyer: UserProfile;
  demands: DemandItem[];
  allSupplies: SupplyItem[];
  language: Language;
  onOpenPostDemand: () => void;
  onViewBreakdown: (match: HarvestMatchResult) => void;
  onExpressInterest: (match: HarvestMatchResult) => void;
  onOpenChat: (match: HarvestMatchResult) => void;
  onTrackLogistics: (match: HarvestMatchResult) => void;
  onOpenHeatmapTab: () => void;
}

export const BuyerDashboard: React.FC<Props> = ({
  buyer,
  demands,
  allSupplies,
  language,
  onOpenPostDemand,
  onViewBreakdown,
  onExpressInterest,
  onOpenChat,
  onTrackLogistics,
  onOpenHeatmapTab,
}) => {
  const [selectedDemandId, setSelectedDemandId] = useState<string>(
    demands[0]?.id || ''
  );
  const t = TRANSLATIONS[language];

  const myDemands = demands.filter((d) => d.buyerId === buyer.id || d.status === 'active');
  const currentDemand = myDemands.find((d) => d.id === selectedDemandId) || myDemands[0];

  // Calculate live matches for current demand
  const currentMatches = currentDemand
    ? findMatchesForDemand(currentDemand, allSupplies)
    : [];

  return (
    <div className="space-y-8">
      {/* Buyer Hero Banner */}
      <div className="bg-gradient-to-br from-[#1C2D24] via-[#16382A] to-[#0A1F17] text-white p-6 sm:p-8 rounded-3xl shadow-sm border border-emerald-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold tracking-wide border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{language === 'en' ? 'Direct Farmgate Procurement' : 'നേരിട്ടുള്ള സംഭരണ കേന്ദ്രം'}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              {buyer.organization || buyer.name}
            </h1>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              {t.buyerSubtitle}
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={onOpenPostDemand}
              className="px-5 py-3 sm:px-6 sm:py-3.5 bg-amber-600 hover:bg-amber-500 text-white text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center gap-2 shadow-md shadow-amber-950/40 ring-1 ring-amber-400/30 min-h-[44px]"
            >
              <Plus className="w-4 h-4" />
              <span>{t.postDemand}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Snapshot Procurement Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-md transition-shadow">
          <span className="text-xs font-medium text-stone-500 block">
            {t.activeDemands}
          </span>
          <div className="text-xl sm:text-2xl font-black font-display text-stone-900 mt-1.5 flex items-center gap-2">
            <span>{myDemands.length} Requirements</span>
          </div>
          <span className="text-[11px] text-amber-700 font-semibold mt-1 block">
            {language === 'en' ? 'Active broadcast' : 'സജീവ ആവശ്യങ്ങൾ'}
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-md transition-shadow">
          <span className="text-xs font-medium text-stone-500 block">
            {t.matchedProducers}
          </span>
          <div className="text-xl sm:text-2xl font-black font-display text-stone-900 mt-1.5 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>{allSupplies.length} Local Lots</span>
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">
            {language === 'en' ? 'Ready for farmgate dispatch' : 'ലഭ്യമായ ഫാം ഉൽപ്പന്നങ്ങൾ'}
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-md transition-shadow">
          <span className="text-xs font-medium text-stone-500 block">
            {t.avgProximity}
          </span>
          <div className="text-xl sm:text-2xl font-black font-display text-stone-900 mt-1.5 flex items-center gap-1.5">
            <MapPin className="w-5 h-5 text-amber-600 shrink-0" />
            <span>11.4 km radius</span>
          </div>
          <span className="text-[11px] text-stone-500 font-medium mt-1 block">
            {language === 'en' ? 'Fresh morning harvest' : 'രാവിലത്തെ വിളവെടുപ്പ്'}
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-md transition-shadow">
          <span className="text-xs font-medium text-stone-500 block">
            {t.qualityStandard}
          </span>
          <div className="text-xl sm:text-2xl font-black font-display text-emerald-800 mt-1.5 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Grade A Certified</span>
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">
            {language === 'en' ? 'Direct from growers' : 'നേരിട്ട് കർഷകരിൽ നിന്ന്'}
          </span>
        </div>
      </div>

      {/* Demand Selector Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold font-display text-stone-900">
              {t.buyerReqTitle}
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              {t.buyerReqSubtitle}
            </p>
          </div>

          <button
            onClick={onOpenPostDemand}
            className="text-xs sm:text-sm font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>{t.postNewReq}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {myDemands.map((demand) => {
            const isSelected = demand.id === currentDemand?.id;
            const matchesCount = findMatchesForDemand(demand, allSupplies).length;

            return (
              <button
                key={demand.id}
                onClick={() => setSelectedDemandId(demand.id)}
                className={`text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-emerald-600 ring-2 ring-emerald-600/20 shadow-md'
                    : 'bg-stone-50/80 border-stone-200/80 hover:bg-white hover:border-stone-300'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-stone-900 text-base sm:text-lg">
                      {demand.product}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        demand.urgency === 'urgent'
                          ? 'bg-rose-100 text-rose-800 border border-rose-200'
                          : 'bg-stone-200 text-stone-700'
                      }`}
                    >
                      {demand.urgency === 'urgent' ? 'Urgent' : 'Standard'}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-stone-600">
                    <div className="flex items-center gap-1.5 font-bold text-stone-800 text-sm">
                      <Scale className="w-4 h-4 text-emerald-700" />
                      <span>{demand.quantityKg} kg {language === 'en' ? 'needed' : 'ആവശ്യമുണ്ട്'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-stone-600">
                      <IndianRupee className="w-3.5 h-3.5 text-amber-700" />
                      <span>₹{demand.minPricePerKg}–{demand.maxPricePerKg}/kg</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-stone-500">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      <span>{language === 'en' ? `Needed by: ${demand.neededBy}` : `തീയതി: ${demand.neededBy}`}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-200/70 flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-800 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    {matchesCount} {language === 'en' ? 'Matches' : 'യോജിപ്പുകൾ'}
                  </span>
                  <span className="text-stone-400 text-[11px] truncate max-w-[90px]">
                    {demand.buyerLocation.split(',')[0]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Matched Producers Section */}
      {currentDemand && (
        <div className="space-y-6 pt-2">
          <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Harvest Match™ Local Discovery
                </span>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-900 text-[10px] font-bold rounded-md">
                  5-Factor Audited
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold font-display text-stone-900 mt-1">
                {language === 'en'
                  ? `Producers Supplying ${currentDemand.quantityKg} kg ${currentDemand.product} in ${currentDemand.buyerLocation}`
                  : `${currentDemand.product} (${currentDemand.quantityKg} kg) നൽകാൻ തയ്യാറുള്ള കർഷകർ`}
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                {language === 'en'
                  ? `Target Budget: ₹${currentDemand.minPricePerKg}–₹${currentDemand.maxPricePerKg}/kg • Radius: within ${currentDemand.maxDistanceKm} km`
                  : `ബജറ്റ്: ₹${currentDemand.minPricePerKg}–₹${currentDemand.maxPricePerKg}/kg • പരിധി: ${currentDemand.maxDistanceKm} കി.മീ`}
              </p>
            </div>

            <button
              onClick={onOpenHeatmapTab}
              className="px-4 py-2 bg-white hover:bg-stone-100 border border-stone-300 text-stone-800 text-xs font-bold rounded-xl flex items-center gap-2 shadow-xs transition-colors self-start sm:self-auto min-h-[40px]"
            >
              <Layers className="w-4 h-4 text-emerald-700" />
              <span>{language === 'en' ? 'View Regional Heatmap' : 'വിള ലഭ്യത മാപ്പ്'}</span>
            </button>
          </div>

          {currentMatches.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-stone-200">
              <Sparkles className="w-10 h-10 text-stone-300 mx-auto mb-3" />
              <h4 className="font-bold text-stone-800 text-base">{t.noProducersFound}</h4>
              <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto mt-1.5">
                {t.noProducersDesc}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {currentMatches.map((match) => (
                <HarvestMatchCard
                  key={match.matchId}
                  match={match}
                  role="buyer"
                  language={language}
                  onViewBreakdown={onViewBreakdown}
                  onExpressInterest={onExpressInterest}
                  onOpenChat={onOpenChat}
                  onTrackLogistics={onTrackLogistics}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
