import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Award, MapPin, IndianRupee, Clock, Scale, Sparkles, ChevronRight } from 'lucide-react';
import { HarvestMatchResult, Language } from '../types';

interface Props {
  match: HarvestMatchResult | null;
  onClose: () => void;
  onExpressInterest?: (match: HarvestMatchResult) => void;
  role: 'producer' | 'buyer';
  language?: Language;
}

export const HarvestMatchBreakdownModal: React.FC<Props> = ({
  match,
  onClose,
  onExpressInterest,
  role,
  language = 'en',
}) => {
  if (!match) return null;

  const { breakdown, demand, supply, score, distanceKm } = match;
  const isEn = language === 'en';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-xl bg-white border border-stone-200 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="bg-[#0F281E] text-white p-6 relative">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 text-stone-300 hover:text-white rounded-full hover:bg-white/10 transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Harvest Match™ Multi-Factor Engine</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display mt-1 text-white">
              {isEn ? 'Transparent 5-Factor Match Audit' : 'മാച്ച് സ്കോർ വിശകലനം'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-1">
              {isEn
                ? 'Automated algorithmic alignment between buyer requirement and farmgate supply.'
                : 'ആവശ്യക്കാരും കർഷകരും തമ്മിലുള്ള അനുയോജ്യത പരിശോധിച്ച വിവരങ്ങൾ.'}
            </p>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto space-y-6">
            {/* Score Hero Card */}
            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                  {isEn ? 'Overall Match Score' : 'മൊത്തം സ്കോർ'}
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl font-black font-display text-emerald-950">{score}%</span>
                  <span className="text-sm font-bold text-emerald-700">
                    {score >= 90
                      ? (isEn ? 'Top Local Fit' : 'ഏറ്റവും മികച്ചത്')
                      : score >= 75
                      ? (isEn ? 'Strong Match' : 'നല്ല യോജിപ്പ്')
                      : (isEn ? 'Viable Match' : 'സാധ്യതയുള്ളത്')}
                  </span>
                </div>
                <p className="text-xs text-stone-600 mt-1">
                  Connecting <strong className="text-stone-900">{supply.producerName}</strong> {isEn ? 'with' : 'നൽകുന്നത്'} <strong className="text-stone-900">{demand.buyerOrg}</strong>
                </p>
              </div>

              <div className="w-18 h-18 rounded-2xl bg-emerald-100 border-2 border-emerald-500/40 flex flex-col items-center justify-center text-emerald-950 shadow-inner shrink-0">
                <Award className="w-7 h-7 text-emerald-800" />
                <span className="text-xs font-black mt-0.5">{score}/100</span>
              </div>
            </div>

            {/* Quick Comparison Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
                <div className="text-stone-500 font-bold uppercase text-[10px]">
                  {isEn ? 'Buyer Requisition' : 'വാങ്ങുന്നയാളുടെ ആവശ്യം'}
                </div>
                <div className="font-bold text-stone-900 text-sm mt-1">{demand.quantityKg} kg {demand.product}</div>
                <div className="text-stone-600 mt-0.5">Budget: ₹{demand.minPricePerKg}–{demand.maxPricePerKg}/kg</div>
                <div className="text-stone-600">Needed by: {demand.neededBy}</div>
              </div>

              <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200">
                <div className="text-emerald-800 font-bold uppercase text-[10px]">
                  {isEn ? 'Producer Supply' : 'കർഷകന്റെ ലഭ്യത'}
                </div>
                <div className="font-bold text-stone-900 text-sm mt-1">{supply.availableKg} kg available</div>
                <div className="text-stone-600 mt-0.5">Farmgate: ₹{supply.pricePerKg}/kg</div>
                <div className="text-emerald-800 font-semibold">Ready: {supply.availableFrom}</div>
              </div>
            </div>

            {/* 5 Factors Breakdown */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-600">
                {isEn ? 'Verified Factor Weights' : 'ഘടകങ്ങളുടെ വിശദാംശങ്ങൾ'}
              </h3>

              {/* 1. Product (35%) */}
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div className="flex items-center justify-between text-xs mb-1.5 font-bold text-stone-800">
                  <span>1. {isEn ? 'Crop & Variety Match (35%)' : 'വിള അനുയോജ്യത (35%)'}</span>
                  <span>{breakdown.product.score} / {breakdown.product.max} pts</span>
                </div>
                <div className="w-full bg-stone-200 rounded-full h-2 mb-1.5 overflow-hidden">
                  <div
                    className="bg-emerald-700 h-2 rounded-full"
                    style={{ width: `${(breakdown.product.score / breakdown.product.max) * 100}%` }}
                  />
                </div>
                <p className="text-[11px] text-stone-600 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  {breakdown.product.detail}
                </p>
              </div>

              {/* 2. Quantity (20%) */}
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div className="flex items-center justify-between text-xs mb-1.5 font-bold text-stone-800">
                  <span>2. {isEn ? 'Volume & Order Size (20%)' : 'അളവ് അനുയോജ്യത (20%)'}</span>
                  <span>{breakdown.quantity.score} / {breakdown.quantity.max} pts</span>
                </div>
                <div className="w-full bg-stone-200 rounded-full h-2 mb-1.5 overflow-hidden">
                  <div
                    className="bg-amber-600 h-2 rounded-full"
                    style={{ width: `${(breakdown.quantity.score / breakdown.quantity.max) * 100}%` }}
                  />
                </div>
                <p className="text-[11px] text-stone-600 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  {breakdown.quantity.detail}
                </p>
              </div>

              {/* 3. Location (20%) */}
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div className="flex items-center justify-between text-xs mb-1.5 font-bold text-stone-800">
                  <span>3. {isEn ? 'Transit Radius & Proximity (20%)' : 'ദൂരം (20%)'}</span>
                  <span>{breakdown.location.score} / {breakdown.location.max} pts</span>
                </div>
                <div className="w-full bg-stone-200 rounded-full h-2 mb-1.5 overflow-hidden">
                  <div
                    className="bg-emerald-700 h-2 rounded-full"
                    style={{ width: `${(breakdown.location.score / breakdown.location.max) * 100}%` }}
                  />
                </div>
                <p className="text-[11px] text-stone-600 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  {breakdown.location.detail} ({distanceKm} km transit)
                </p>
              </div>

              {/* 4. Price (15%) */}
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div className="flex items-center justify-between text-xs mb-1.5 font-bold text-stone-800">
                  <span>4. {isEn ? 'Farmgate Price Tolerance (15%)' : 'വില പൊരുത്തം (15%)'}</span>
                  <span>{breakdown.price.score} / {breakdown.price.max} pts</span>
                </div>
                <div className="w-full bg-stone-200 rounded-full h-2 mb-1.5 overflow-hidden">
                  <div
                    className="bg-emerald-700 h-2 rounded-full"
                    style={{ width: `${(breakdown.price.score / breakdown.price.max) * 100}%` }}
                  />
                </div>
                <p className="text-[11px] text-stone-600 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  {breakdown.price.detail}
                </p>
              </div>

              {/* 5. Availability (10%) */}
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div className="flex items-center justify-between text-xs mb-1.5 font-bold text-stone-800">
                  <span>5. {isEn ? 'Harvest Freshness Timeline (10%)' : 'ലഭ്യതാ സമയം (10%)'}</span>
                  <span>{breakdown.availability.score} / {breakdown.availability.max} pts</span>
                </div>
                <div className="w-full bg-stone-200 rounded-full h-2 mb-1.5 overflow-hidden">
                  <div
                    className="bg-emerald-700 h-2 rounded-full"
                    style={{ width: `${(breakdown.availability.score / breakdown.availability.max) * 100}%` }}
                  />
                </div>
                <p className="text-[11px] text-stone-600 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  {breakdown.availability.detail}
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-5 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs sm:text-sm font-bold text-stone-600 hover:text-stone-900 rounded-xl hover:bg-stone-200/60 transition-colors"
            >
              {isEn ? 'Close' : 'അടയ്ക്കുക'}
            </button>

            {onExpressInterest && (
              <button
                onClick={() => {
                  onExpressInterest(match);
                  onClose();
                }}
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center gap-2 shadow-xs"
              >
                <span>{isEn ? 'Connect & Lock Deal' : 'ബന്ധപ്പെടുക'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
