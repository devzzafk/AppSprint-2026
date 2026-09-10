import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Plus, Mic, Sparkles, MapPin, IndianRupee, Scale, Calendar, AlertCircle } from 'lucide-react';
import { SupplyItem, Language } from '../types';
import { VoiceAssistantModal } from './VoiceAssistantModal';
import { TRANSLATIONS } from '../utils/translations';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAddSupply: (supply: Omit<SupplyItem, 'id' | 'status'>) => void;
  producerName: string;
  producerId: string;
  defaultLocation: string;
  isOffline: boolean;
  language?: Language;
}

const POPULAR_CROPS = [
  { name: 'Tomato', category: 'Vegetables' as const, defaultPrice: 32, img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&auto=format&fit=crop&q=80' },
  { name: 'Nendran Banana', category: 'Fruits' as const, defaultPrice: 48, img: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&auto=format&fit=crop&q=80' },
  { name: 'Tapioca (Kappa)', category: 'Tubers' as const, defaultPrice: 24, img: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=400&auto=format&fit=crop&q=80' },
  { name: 'Green Chilli', category: 'Vegetables' as const, defaultPrice: 65, img: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=400&auto=format&fit=crop&q=80' },
  { name: 'Ladies Finger (Okra)', category: 'Vegetables' as const, defaultPrice: 28, img: 'https://images.unsplash.com/photo-1425543103986-22abb7d7e8d2?w=400&auto=format&fit=crop&q=80' },
  { name: 'Cardamom (Green)', category: 'Spices' as const, defaultPrice: 1200, img: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=400&auto=format&fit=crop&q=80' },
];

export const AddSupplyModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onAddSupply,
  producerName,
  producerId,
  defaultLocation,
  isOffline,
  language = 'en',
}) => {
  const [product, setProduct] = useState('Tomato');
  const [category, setCategory] = useState<'Vegetables' | 'Fruits' | 'Tubers' | 'Spices' | 'Plantations'>('Vegetables');
  const [quantityKg, setQuantityKg] = useState<number>(500);
  const [pricePerKg, setPricePerKg] = useState<number>(32);
  const [availableFrom, setAvailableFrom] = useState('Tomorrow');
  const [qualityGrade, setQualityGrade] = useState<'Grade A (Export/Premium)' | 'Grade B (Standard)' | 'Organic Certified'>('Grade A (Export/Premium)');
  const [location, setLocation] = useState(defaultLocation || 'Nedumangad, Thiruvananthapuram');
  const [notes, setNotes] = useState('Fresh morning harvest, uniform grading, natural pesticide-free practice.');
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);

  const t = TRANSLATIONS[language];
  const isEn = language === 'en';

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedCrop = POPULAR_CROPS.find((c) => c.name.toLowerCase() === product.toLowerCase());
    const imageUrl = selectedCrop
      ? selectedCrop.img
      : 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=400&auto=format&fit=crop&q=80';

    onAddSupply({
      producerId,
      producerName,
      producerLocation: location,
      coordinates: { lat: 8.6012 + (Math.random() - 0.5) * 0.05, lng: 77.0019 + (Math.random() - 0.5) * 0.05 },
      product,
      category,
      quantityKg,
      availableKg: quantityKg,
      pricePerKg,
      availableFrom,
      harvestDate: 'Fresh harvest',
      qualityGrade,
      imageUrl,
      notes,
    });

    onClose();
  };

  return (
    <>
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

            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{isEn ? 'Direct Farmgate Listing' : 'ഫാംഗേറ്റ് ലിസ്റ്റിംഗ്'}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold font-display mt-1 text-white">
              {isEn ? 'Register Farm Harvest Lot' : 'വിളവ് ലിസ്റ്റ് ചെയ്യുക'}
            </h2>

            <p className="text-xs sm:text-sm text-stone-300 mt-1">
              {isEn
                ? 'Your lot is immediately matched with active buyer demands within regional transit range.'
                : 'നിങ്ങളുടെ വിളവെടുപ്പ് പ്രാദേശിക ആവശ്യക്കാരുമായി ഉടൻ ബന്ധിപ്പിക്കുന്നു.'}
            </p>

            <div className="mt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsVoiceOpen(true)}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-colors"
              >
                <Mic className="w-4 h-4 text-amber-300" />
                <span>{t.voiceAssist}</span>
              </button>

              {isOffline && (
                <span className="text-xs text-amber-300 bg-amber-950/60 px-3 py-1 rounded-lg border border-amber-500/30 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {isEn ? 'Offline Mode Active' : 'ഓഫ്‌ലൈൻ മോഡ്'}
                </span>
              )}
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto">
            {/* Fast Crop Selectors */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block mb-2">
                {isEn ? 'Popular Crops (One-Tap Select)' : 'ജനപ്രിയ വിളകൾ'}
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {POPULAR_CROPS.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => {
                      setProduct(c.name);
                      setCategory(c.category);
                      setPricePerKg(c.defaultPrice);
                    }}
                    className={`p-2 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      product.toLowerCase() === c.name.toLowerCase()
                        ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-600/30'
                        : 'bg-stone-50 border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    <img
                      src={c.img}
                      alt={c.name}
                      className="w-10 h-10 rounded-lg object-cover border border-stone-200"
                    />
                    <span className="text-[10px] font-bold text-stone-800 leading-tight truncate w-full">
                      {c.name.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  {isEn ? 'Crop / Commodity Name' : 'വിളയുടെ പേര്'}
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
                  <span>{isEn ? 'Quantity Available (kg)' : 'ലഭ്യമായ അളവ് (കിലോഗ്രാം)'}</span>
                </label>
                <input
                  type="number"
                  min="10"
                  step="5"
                  value={quantityKg}
                  onChange={(e) => setQuantityKg(Number(e.target.value))}
                  required
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm font-semibold text-stone-900"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1 flex items-center gap-1">
                  <IndianRupee className="w-3.5 h-3.5 text-amber-700" />
                  <span>{isEn ? 'Farmgate Price (₹/kg)' : 'കിലോയ്ക്ക് വില (രൂപ)'}</span>
                </label>
                <input
                  type="number"
                  min="1"
                  step="0.5"
                  value={pricePerKg}
                  onChange={(e) => setPricePerKg(Number(e.target.value))}
                  required
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm font-semibold text-stone-900"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-stone-500" />
                  <span>{isEn ? 'Harvest Ready Date' : 'ലഭ്യമായ സമയം'}</span>
                </label>
                <input
                  type="text"
                  value={availableFrom}
                  onChange={(e) => setAvailableFrom(e.target.value)}
                  placeholder="e.g. Ready today, Tomorrow, Friday"
                  required
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm font-semibold text-stone-900"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  {isEn ? 'Quality Grade' : 'ഗുണനിലവാര ഗ്രേഡ്'}
                </label>
                <select
                  value={qualityGrade}
                  onChange={(e) => setQualityGrade(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm font-semibold text-stone-900"
                >
                  <option value="Grade A (Export/Premium)">Grade A (Export/Premium)</option>
                  <option value="Grade B (Standard)">Grade B (Standard)</option>
                  <option value="Organic Certified">Organic Certified</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1 flex items-center gap-1 text-xs">
                <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                <span>{isEn ? 'Farmgate Location' : 'സ്ഥലം'}</span>
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm font-semibold text-stone-900"
              />
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1 text-xs">
                {isEn ? 'Batch Notes / Farming Practices' : 'കുറിപ്പുകൾ'}
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 text-xs text-stone-900"
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
                className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-md ring-1 ring-emerald-500/30 flex items-center gap-2 min-h-[42px]"
              >
                <Plus className="w-4 h-4" />
                <span>{isEn ? 'Publish Harvest Lot' : 'വിള പ്രസിദ്ധീകരിക്കുക'}</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      {isVoiceOpen && (
        <VoiceAssistantModal
          isOpen={isVoiceOpen}
          onClose={() => setIsVoiceOpen(false)}
          language={language}
          onListingExtracted={(extracted) => {
            setProduct(extracted.product);
            setQuantityKg(extracted.quantityKg);
            setPricePerKg(extracted.pricePerKg);
            setAvailableFrom(extracted.availableFrom);
            setLocation(extracted.location);
          }}
        />
      )}
    </>
  );
};
