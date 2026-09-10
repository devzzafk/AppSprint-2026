import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Map, Layers, TrendingUp, Users, Scale, IndianRupee, Sparkles, ChevronRight, Info } from 'lucide-react';
import { RegionalHarvestZone, Language } from '../types';
import { REGIONAL_HARVEST_ZONES } from '../data/mockData';
import { TRANSLATIONS } from '../utils/translations';

interface Props {
  language?: Language;
  onSelectZoneCrop?: (crop: string, district: string) => void;
}

export const HarvestHeatmap: React.FC<Props> = ({ language = 'en', onSelectZoneCrop }) => {
  const [selectedZone, setSelectedZone] = useState<RegionalHarvestZone>(REGIONAL_HARVEST_ZONES[0]);
  const [selectedCropFilter, setSelectedCropFilter] = useState<string>('All');
  const t = TRANSLATIONS[language];

  const crops = ['All', 'Tomato', 'Tapioca', 'Banana', 'Spices', 'Vegetables'];

  const filteredZones = REGIONAL_HARVEST_ZONES.filter((z) => {
    if (selectedCropFilter === 'All') return true;
    return z.dominantCrop.toLowerCase().includes(selectedCropFilter.toLowerCase());
  });

  const getIntensityBadge = (intensity: RegionalHarvestZone['harvestIntensity']) => {
    switch (intensity) {
      case 'Peak Harvest':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'High Supply':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Moderate':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'High Demand Deficit':
        return 'bg-rose-100 text-rose-900 border-rose-300';
      default:
        return 'bg-stone-100 text-stone-700';
    }
  };

  return (
    <div className="bg-white border border-stone-200/90 rounded-3xl overflow-hidden shadow-sm space-y-6 p-6 sm:p-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0F281E] via-[#16382A] to-[#0A1F17] text-white p-6 sm:p-7 rounded-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <Layers className="w-4 h-4 text-amber-400" />
              <span>{t.heatmapTitle}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black font-display mt-1 text-white">
              {language === 'en' ? 'Peak Harvest Zones & Regional Surplus Map' : 'പ്രാദേശിക വിള ലഭ്യത മാപ്പ്'}
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 mt-1">
              {t.heatmapSubtitle}
            </p>
          </div>

          {/* Commodity Filters */}
          <div className="flex flex-wrap items-center gap-1.5 bg-black/20 p-1.5 rounded-xl border border-white/10 self-start lg:self-center">
            {crops.map((crop) => (
              <button
                key={crop}
                onClick={() => setSelectedCropFilter(crop)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedCropFilter === crop
                    ? 'bg-emerald-600 text-white shadow-xs ring-1 ring-emerald-400/30'
                    : 'text-stone-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {crop === 'All' ? t.allCrops : crop}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Map Visualizer Canvas */}
        <div className="lg:col-span-2 relative bg-stone-50 border border-stone-200 rounded-2xl p-6 min-h-[380px] flex flex-col justify-between overflow-hidden">
          {/* Top Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 z-10">
            <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-xl border border-stone-200 shadow-xs">
              <Map className="w-4 h-4 text-emerald-700" />
              <span>{language === 'en' ? 'Southern Agri Corridor • 5 Key Production Hubs' : '5 പ്രധാന കാർഷിക മേഖലകൾ'}</span>
            </span>
            <span className="text-xs font-semibold text-stone-500 bg-white px-3 py-1.5 rounded-xl border border-stone-200 shadow-xs">
              {language === 'en' ? 'Live Telemetry Synced' : 'തത്സമയം അപ്ഡേറ്റ് ചെയ്തത്'}
            </span>
          </div>

          {/* Regional Heatmap Canvas */}
          <div className="relative my-8 h-[240px] flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 600 240">
              <path
                d="M50,180 C150,120 200,60 300,100 C400,140 480,40 550,110"
                fill="none"
                stroke="#16382A"
                strokeWidth="3"
                strokeDasharray="6 6"
              />
              <path
                d="M80,210 C180,160 250,110 350,150 C450,180 500,90 580,140"
                fill="none"
                stroke="#D97736"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
            </svg>

            {/* Interactive Heatmap Nodes */}
            <div className="relative w-full h-full max-w-lg">
              {filteredZones.map((zone, idx) => {
                const isSelected = selectedZone.id === zone.id;
                const positions = [
                  { left: '24%', top: '65%' },
                  { left: '40%', top: '55%' },
                  { left: '60%', top: '35%' },
                  { left: '76%', top: '48%' },
                  { left: '80%', top: '18%' },
                ];
                const pos = positions[idx % positions.length];

                return (
                  <motion.div
                    key={zone.id}
                    className="absolute cursor-pointer -translate-x-1/2 -translate-y-1/2 z-20 group"
                    style={{ left: pos.left, top: pos.top }}
                    onClick={() => setSelectedZone(zone)}
                    whileHover={{ scale: 1.08 }}
                  >
                    <div
                      className="absolute -inset-3 rounded-full opacity-35 animate-harvest-pulse pointer-events-none"
                      style={{ backgroundColor: zone.colorHex }}
                    />

                    <div
                      className={`relative px-3.5 py-2 rounded-2xl border-2 flex items-center gap-2 shadow-md transition-all ${
                        isSelected
                          ? 'bg-[#0F281E] text-white border-emerald-400 scale-105 ring-4 ring-emerald-500/20'
                          : 'bg-white text-stone-900 border-stone-200 hover:border-emerald-600'
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: zone.colorHex }}
                      />
                      <div className="text-left">
                        <div className="text-xs font-black font-display leading-tight">
                          {zone.district}
                        </div>
                        <div className={`text-[10px] ${isSelected ? 'text-emerald-300' : 'text-stone-500'}`}>
                          {zone.dominantCrop.split('&')[0]}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center justify-between text-xs text-stone-600 bg-white p-3 rounded-xl border border-stone-200 z-10 gap-3">
            <span className="font-bold text-stone-800 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-emerald-700" />
              <span>{language === 'en' ? 'Harvest Intensity:' : 'വിള തീവ്രത:'}</span>
            </span>
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-700" />
                <span>{t.peakHarvest}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span>{t.highSupply}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500" />
                <span>{t.deficit}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Zone Detail Inspector Card */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                  {language === 'en' ? 'Selected Agricultural Hub' : 'തിരഞ്ഞെടുത്ത മേഖല'}
                </span>
                <h4 className="text-xl font-bold font-display text-stone-900 mt-1">
                  {selectedZone.district}
                </h4>
                <p className="text-xs text-stone-600 mt-0.5">{selectedZone.zoneName}</p>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getIntensityBadge(selectedZone.harvestIntensity)}`}>
                {selectedZone.harvestIntensity}
              </span>
            </div>

            {/* Metrics */}
            <div className="space-y-3 pt-2">
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-[10px] font-bold text-stone-500 uppercase block">
                  {language === 'en' ? 'Current Dominant Crops' : 'പ്രധാന വിളകൾ'}
                </span>
                <div className="font-bold text-emerald-950 text-sm mt-1 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>{selectedZone.dominantCrop}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200">
                  <span className="text-[10px] text-emerald-800 uppercase font-bold block">
                    {language === 'en' ? 'Surplus Volume' : 'ലഭ്യമായ അധിക വിള'}
                  </span>
                  <div className="text-base font-black font-display text-emerald-950 flex items-center gap-1 mt-1">
                    <Scale className="w-4 h-4 text-emerald-700" />
                    <span>{(selectedZone.surplusKg / 1000).toFixed(1)}k kg</span>
                  </div>
                  <span className="text-[10px] text-stone-500 mt-0.5 block">{language === 'en' ? 'Ready at farmgate' : 'ഫാമിൽ ലഭ്യമാണ്'}</span>
                </div>

                <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200">
                  <span className="text-[10px] text-amber-800 uppercase font-bold block">
                    {language === 'en' ? 'Benchmark Price' : 'വിപണി നിരക്ക്'}
                  </span>
                  <div className="text-base font-black font-display text-amber-950 flex items-center gap-0.5 mt-1">
                    <IndianRupee className="w-4 h-4 text-amber-600" />
                    <span>{selectedZone.avgPricePerKg}</span>
                    <span className="text-[10px] font-normal text-stone-600">/kg</span>
                  </div>
                  <span className="text-[10px] text-stone-500 mt-0.5 block">{language === 'en' ? 'Direct rate' : 'നേരിട്ടുള്ള നിരക്ക്'}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-emerald-700 shrink-0" />
                  <div>
                    <strong className="text-stone-900 block font-bold">{selectedZone.activeProducers} Farms</strong>
                    <span className="text-[10px] text-stone-500">{language === 'en' ? 'Supplying' : 'ഉത്പാദകർ'}</span>
                  </div>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center gap-2.5">
                  <TrendingUp className="w-4 h-4 text-amber-600 shrink-0" />
                  <div>
                    <strong className="text-stone-900 block font-bold">{selectedZone.activeBuyerDemands} Demands</strong>
                    <span className="text-[10px] text-stone-500">{language === 'en' ? 'Buyer orders' : 'ഓർഡറുകൾ'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action button */}
          <div className="pt-2 border-t border-stone-100">
            <button
              onClick={() => {
                if (onSelectZoneCrop) {
                  onSelectZoneCrop(selectedZone.dominantCrop.split('&')[0].trim(), selectedZone.district);
                }
              }}
              className="w-full px-5 py-3 bg-emerald-700 hover:bg-emerald-600 text-white text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs min-h-[44px]"
            >
              <span>{language === 'en' ? `Explore Demands in ${selectedZone.district}` : `${selectedZone.district} ലെ ആവശ്യങ്ങൾ കാണുക`}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
