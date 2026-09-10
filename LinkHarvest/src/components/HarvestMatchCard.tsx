import React from 'react';
import {
  Award,
  MapPin,
  IndianRupee,
  Scale,
  Clock,
  MessageSquare,
  Truck,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { HarvestMatchResult, Language } from '../types';
import { TRANSLATIONS } from '../utils/translations';

interface Props {
  match: HarvestMatchResult;
  role: 'producer' | 'buyer';
  language?: Language;
  onViewBreakdown: (match: HarvestMatchResult) => void;
  onExpressInterest: (match: HarvestMatchResult) => void;
  onOpenChat: (match: HarvestMatchResult) => void;
  onTrackLogistics?: (match: HarvestMatchResult) => void;
}

export const HarvestMatchCard: React.FC<Props> = ({
  match,
  role,
  language = 'en',
  onViewBreakdown,
  onExpressInterest,
  onOpenChat,
  onTrackLogistics,
}) => {
  const { score, supply, demand, distanceKm, buyerExpressedInterest, producerAccepted, dealStatus } = match;
  const t = TRANSLATIONS[language];

  const isHighMatch = score >= 90;
  const isGoodMatch = score >= 75 && score < 90;

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-stone-200/90 shadow-sm hover:shadow-lg hover:border-emerald-500/40 transition-all duration-200 flex flex-col justify-between overflow-hidden group">
      {/* Top Card Section */}
      <div className="p-5 sm:p-6 space-y-4">
        {/* Header: Photo, Name, Proximity, and Score Pill */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="relative shrink-0">
              <img
                src={supply.imageUrl}
                alt={supply.product}
                className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl object-cover border border-stone-200 shadow-xs"
              />
              <span className="absolute -bottom-1 -right-1 px-2 py-0.5 bg-[#0F281E] text-emerald-300 text-[10px] font-bold rounded-md uppercase tracking-wider shadow-xs">
                {supply.product}
              </span>
            </div>

            <div className="min-w-0">
              <h4 className="font-display font-bold text-stone-900 text-base sm:text-lg leading-snug truncate">
                {role === 'buyer' ? supply.producerName : demand.buyerOrg}
              </h4>
              <p className="text-xs text-stone-500 flex items-center gap-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span className="truncate">
                  {role === 'buyer' ? supply.producerLocation : demand.buyerLocation}
                </span>
                <span className="font-semibold text-emerald-800 shrink-0">
                  • {distanceKm} km {t.distanceAway}
                </span>
              </p>
            </div>
          </div>

          {/* Match Score Capsule */}
          <button
            onClick={() => onViewBreakdown(match)}
            className={`flex flex-col items-center justify-center px-3 py-2 rounded-xl border transition-all hover:scale-105 shrink-0 ${
              isHighMatch
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-xs'
                : isGoodMatch
                ? 'bg-amber-50 border-amber-300 text-amber-900 shadow-xs'
                : 'bg-stone-50 border-stone-200 text-stone-700'
            }`}
            title="Click to view full 5-Factor Match Audit"
          >
            <div className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-lg sm:text-xl font-black font-display tracking-tight leading-none">
                {score}%
              </span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider mt-0.5 text-stone-600 flex items-center gap-0.5">
              {t.matchScore} <ArrowUpRight className="w-2.5 h-2.5" />
            </span>
          </button>
        </div>

        {/* Specifications Grid */}
        <div className="grid grid-cols-3 gap-2.5 bg-stone-50/90 p-3 rounded-xl border border-stone-200/70 text-xs">
          <div>
            <span className="text-[11px] text-stone-500 font-medium block">
              {t.availableKg}
            </span>
            <div className="font-display font-bold text-stone-900 text-sm flex items-center gap-1 mt-0.5">
              <Scale className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              {supply.availableKg} kg
            </div>
          </div>

          <div>
            <span className="text-[11px] text-stone-500 font-medium block">
              {t.farmgatePrice}
            </span>
            <div className="font-display font-bold text-stone-900 text-sm flex items-center gap-0.5 mt-0.5">
              <IndianRupee className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              {supply.pricePerKg}/kg
            </div>
          </div>

          <div>
            <span className="text-[11px] text-stone-500 font-medium block">
              {t.timeline}
            </span>
            <div className="font-display font-bold text-stone-900 text-sm flex items-center gap-1 mt-0.5 truncate">
              <Clock className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
              <span className="truncate">{supply.availableFrom}</span>
            </div>
          </div>
        </div>

        {/* Match breakdown preview */}
        <div className="flex items-center justify-between text-xs text-stone-600 bg-white px-3 py-2 rounded-xl border border-stone-200/80">
          <span className="truncate text-[11px] sm:text-xs">
            <strong className="text-stone-800 font-semibold">Match breakdown: </strong>
            {match.breakdown.product.score}/35 crop • {match.breakdown.quantity.score}/20 vol • {match.breakdown.location.score}/20 dist
          </span>
          <button
            onClick={() => onViewBreakdown(match)}
            className="text-emerald-700 font-bold hover:underline shrink-0 text-xs ml-2"
          >
            {t.whyScore}
          </button>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-4 sm:p-5 bg-stone-50/60 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          {buyerExpressedInterest ? (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {language === 'en' ? 'Connection Linked' : 'ബന്ധം സ്ഥിരീകരിച്ചു'}
            </span>
          ) : (
            <span className="text-xs text-stone-500">
              {language === 'en' ? 'Verified Quality Batch' : 'പരിശോധിച്ച ഗുണനിലവാരം'}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenChat(match)}
            className="px-3.5 py-2 bg-white hover:bg-stone-100 text-stone-800 text-xs font-bold rounded-xl border border-stone-300 transition-all flex items-center gap-1.5 shadow-xs min-h-[38px]"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
            <span>{t.chatAndDeal}</span>
          </button>

          {onTrackLogistics && (
            <button
              onClick={() => onTrackLogistics(match)}
              className="px-3.5 py-2 bg-[#0F281E] hover:bg-emerald-900 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-xs min-h-[38px]"
            >
              <Truck className="w-3.5 h-3.5 text-emerald-300" />
              <span className="hidden sm:inline">{t.trackDispatch}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
