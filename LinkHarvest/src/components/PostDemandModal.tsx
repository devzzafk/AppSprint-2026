import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Send, MapPin, IndianRupee, Scale, Clock, Sparkles, Navigation } from 'lucide-react';
import { DemandItem, Language } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onPostDemand: (demand: Omit<DemandItem, 'id' | 'status' | 'createdAt'>) => void;
  buyerName: string;
  buyerOrg: string;
  buyerId: string;
  defaultLocation: string;
  isOffline: boolean;
  language?: Language;
}

const COMMON_DEMANDS = [
  { product: 'Tomato', category: 'Vegetables' as const, minPrice: 30, maxPrice: 35, defaultKg: 500 },
  { product: 'Nendran Banana', category: 'Fruits' as const, minPrice: 45, maxPrice: 52, defaultKg: 400 },
  { product: 'Tapioca (Kappa)', category: 'Tubers' as const, minPrice: 22, maxPrice: 26, defaultKg: 1000 },
  { product: 'Ladies Finger (Okra)', category: 'Vegetables' as const, minPrice: 25, maxPrice: 30, defaultKg: 250 },
  { product: 'Green Chilli', category: 'Vegetables' as const, minPrice: 60, maxPrice: 70, defaultKg: 100 },
];

export const PostDemandModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onPostDemand,
  buyerName,
  buyerOrg,
  buyerId,
  defaultLocation,
  isOffline,
  language = 'en',
}) => {
  const [product, setProduct] = useState('Tomato');
  const [category, setCategory] = useState<'Vegetables' | 'Fruits' | 'Tubers' | 'Spices' | 'Plantations'>('Vegetables');
  const [quantityKg, setQuantityKg] = useState<number>(500);
  const [minPrice, setMinPrice] = useState<number>(30);
  const [maxPrice, setMaxPrice] = useState<number>(35);
  const [neededBy, setNeededBy] = useState('Friday');
  const [urgency, setUrgency] = useState<'urgent' | 'standard' | 'flexible'>('urgent');
  const [maxDistanceKm, setMaxDistanceKm] = useState<number>(20);
  const [location, setLocation] = useState(defaultLocation || 'Kowdiar, Thiruvananthapuram');

  const isEn = language === 'en';

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPostDemand({
      buyerId,
      buyerName,
      buyerOrg,
      buyerLocation: location,
      coordinates: { lat: 8.5241 + (Math.random() - 0.5) * 0.05, lng: 76.9558 + (Math.random() - 0.5) * 0.05 },
      product,
      category,
      quantityKg,
      minPricePerKg: minPrice,
      maxPricePerKg: maxPrice,
      neededBy,
      urgency,
      maxDistanceKm,
    });
    onClose();
  };

  const handleApplyPreset = (item: typeof COMMON_DEMANDS[0]) => {
    setProduct(item.product);
    setCategory(item.category as any);
    setMinPrice(item.minPrice);
    setMaxPrice(item.maxPrice);
    setQuantityKg(item.defaultKg);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-xl bg-white border border-stone-200 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="bg-[#0F281E] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-stone-300 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{isEn ? 'Demand-Driven Procurement' : 'ആവശ്യം രജിസ്റ്റർ ചെയ്യുക'}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold font-display mt-1 text-white">
            {isEn ? 'Broadcast Demand Requirement' : 'വിള ആവശ്യകത രേഖപ്പെടുത്തുക'}
          </h2>

          <p className="text-xs sm:text-sm text-stone-300 mt-1">
            {isEn
              ? 'Don’t search endlessly through listings. Post what you need and LinkHarvest instantly matches candidate local growers.'
              : 'നിങ്ങൾക്ക് ആവശ്യമുള്ള വിളകൾ രേഖപ്പെടുത്തുക. സമീപത്തുള്ള കർഷകരെ ലിങ്ക് ഹാർവെസ്റ്റ് കണ്ടെത്തും.'}
          </p>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto">
          {/* Quick Presets */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block mb-2">
              {isEn ? 'Quick Presets (Common Kitchen Requisitions)' : 'സാധാരണ ആവശ്യങ്ങൾ'}
            </label>
            <div className="flex flex-wrap gap-2">
              {COMMON_DEMANDS.map((item) => (
                <button
                  key={item.product}
                  type="button"
                  onClick={() => handleApplyPreset(item)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                    product === item.product
                      ? 'bg-amber-100 border-amber-500 text-amber-900 ring-2 ring-amber-400/20'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-stone-400'
                  }`}
                >
                  {item.product} ({item.defaultKg} kg @ ₹{item.minPrice}-{item.maxPrice})
                </button>
              ))}
            </div>
          </div>

          {/* Core Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-stone-700 block mb-1">
                {isEn ? 'Crop / Produce Needed' : 'ആവശ്യമുള്ള വിള'}
              </label>
              <input
                type="text"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm font-semibold text-stone-900"
              />
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">
                {isEn ? 'Category' : 'വിഭാഗം'}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm font-semibold text-stone-900"
              >
                <option value="Vegetables">Vegetables (പച്ചക്കറികൾ)</option>
                <option value="Fruits">Fruits (പഴങ്ങൾ)</option>
                <option value="Tubers">Tubers (കിഴങ്ങുവർഗ്ഗങ്ങൾ)</option>
                <option value="Spices">Spices (സുഗന്ധവ്യഞ്ജനങ്ങൾ)</option>
                <option value="Plantations">Plantations (തോട്ടവിളകൾ)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1 flex items-center gap-1">
                <Scale className="w-3.5 h-3.5 text-emerald-700" />
                <span>{isEn ? 'Quantity Needed (kg)' : 'ആവശ്യമായ അളവ് (കിലോ)'}</span>
              </label>
              <input
                type="number"
                min="10"
                step="10"
                value={quantityKg}
                onChange={(e) => setQuantityKg(Number(e.target.value))}
                required
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm font-semibold text-stone-900"
              />
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-stone-500" />
                <span>{isEn ? 'Required By Date / Day' : 'ആവശ്യമായ തീയതി'}</span>
              </label>
              <input
                type="text"
                value={neededBy}
                onChange={(e) => setNeededBy(e.target.value)}
                placeholder="e.g. Friday, Tomorrow morning"
                required
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm font-semibold text-stone-900"
              />
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1 flex items-center gap-1">
                <IndianRupee className="w-3.5 h-3.5 text-amber-700" />
                <span>{isEn ? 'Target Price Range (₹/kg)' : 'വില പരിധി (₹/കിലോ)'}</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  required
                  className="w-1/2 px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-sm font-semibold"
                />
                <span className="text-stone-400 font-bold">–</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  required
                  className="w-1/2 px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-sm font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1 flex items-center gap-1">
                <Navigation className="w-3.5 h-3.5 text-emerald-700" />
                <span>{isEn ? 'Max Farmgate Radius (km)' : 'പരമാവധി ദൂരം (കി.മീ)'}</span>
              </label>
              <input
                type="number"
                min="5"
                max="100"
                value={maxDistanceKm}
                onChange={(e) => setMaxDistanceKm(Number(e.target.value))}
                required
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm font-semibold text-stone-900"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-stone-700 block mb-1 flex items-center gap-1 text-xs">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              <span>{isEn ? 'Delivery Location / Kitchen Receiving Bay' : 'ഡെലിവറി സ്ഥലം'}</span>
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm font-semibold text-stone-900"
            />
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs sm:text-sm font-bold text-stone-600 hover:text-stone-900 rounded-xl hover:bg-stone-100 transition-colors"
            >
              {isEn ? 'Cancel' : 'റദ്ദാക്കുക'}
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-md ring-1 ring-amber-400/30 flex items-center gap-2 min-h-[42px]"
            >
              <Send className="w-4 h-4" />
              <span>{isEn ? 'Broadcast Requirement to Farmers' : 'ആവശ്യം പോസ്റ്റ് ചെയ്യുക'}</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
