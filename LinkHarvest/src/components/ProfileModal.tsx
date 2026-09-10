import React, { useState, useRef } from 'react';
import {
  X,
  User,
  MapPin,
  Building2,
  Phone,
  Wheat,
  Camera,
  CheckCircle2,
  Save,
  Trash2,
  Upload,
} from 'lucide-react';
import { UserProfile, UserRole, Language } from '../types';
import { UserAvatar } from './UserAvatar';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onSaveProfile: (updatedProfile: UserProfile) => void;
  language: Language;
}

const KERALA_DISTRICTS = [
  'Thiruvananthapuram',
  'Kollam',
  'Pathanamthitta',
  'Alappuzha',
  'Kottayam',
  'Idukki',
  'Ernakulam',
  'Thrissur',
  'Palakkad',
  'Malappuram',
  'Kozhikode',
  'Wayanad',
  'Kannur',
  'Kasaragod',
];

export const ProfileModal: React.FC<Props> = ({
  isOpen,
  onClose,
  currentUser,
  onSaveProfile,
  language,
}) => {
  const [name, setName] = useState(currentUser.name);
  const [role, setRole] = useState<UserRole>(currentUser.role);
  const [phone, setPhone] = useState(currentUser.phone);
  const [district, setDistrict] = useState(
    currentUser.location.split(',')[0].trim() || 'Wayanad'
  );
  const [organization, setOrganization] = useState(currentUser.organization || '');
  const [primaryCrops, setPrimaryCrops] = useState(
    currentUser.primaryCrops || 'Robusta Coffee, Banana, Pepper'
  );
  const [bio, setBio] = useState(currentUser.bio || '');
  const [avatar, setAvatar] = useState(currentUser.avatar || '');
  const [savedAlert, setSavedAlert] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const isEn = language === 'en';

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatar(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      ...currentUser,
      name: name.trim() || 'User',
      role,
      phone: phone.trim() || '+91 98470 00000',
      location: `${district}, Kerala`,
      organization:
        organization.trim() ||
        (role === 'producer' ? `${name.trim()}'s Farm` : `${name.trim()} Trading`),
      primaryCrops: primaryCrops.trim(),
      bio: bio.trim(),
      avatar: avatar.trim(),
      verified: true,
    };

    onSaveProfile(updated);
    setSavedAlert(true);
    setTimeout(() => {
      setSavedAlert(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#FAFDF7] rounded-3xl shadow-2xl border-2 border-[#B8DC9F] overflow-hidden my-8">
        {/* Header - Screen 4 Profile Header */}
        <div className="bg-[#2E6116] text-white px-6 py-5 flex items-center justify-between border-b border-[#4E9A28]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#4E9A28] flex items-center justify-center text-white shadow-xs">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">
                {isEn ? 'My Profile' : 'എന്റെ പ്രൊഫൈൽ'}
              </h2>
              <p className="text-xs text-[#C5E8A7]">
                {isEn ? 'Edit personal information & photo' : 'വിവരങ്ങൾ മാറ്റം വരുത്തുക'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Gallery Photo Upload Box (No stock/cheesy AI avatars) */}
          <div className="p-4 bg-white rounded-2xl border-2 border-dashed border-[#B8DC9F] flex items-center gap-4">
            <UserAvatar avatar={avatar} name={name || 'User'} size="xl" />

            <div className="flex-1 space-y-2">
              <div className="text-xs font-bold text-[#224A12]">
                {isEn ? 'Profile Photo from Gallery' : 'ഗാലറിയിൽ നിന്നുള്ള ചിത്രം'}
              </div>
              <p className="text-[11px] text-stone-500 leading-tight">
                {isEn
                  ? 'Upload a real photo from your device, or clear to use initials'
                  : 'നിങ്ങളുടെ ഫോണിലെ ഗാലറിയിൽ നിന്ന് ഫോട്ടോ ചേർക്കൂ'}
              </p>

              <div className="flex items-center gap-2 pt-1">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3.5 py-1.5 rounded-full bg-[#EAF5E1] hover:bg-[#DDF0D0] text-[#224A12] border border-[#A4D685] text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Upload Photo' : 'ഫോട്ടോ അപ്‌ലോഡ്'}</span>
                </button>

                {avatar && (
                  <button
                    type="button"
                    onClick={() => setAvatar('')}
                    className="p-1.5 rounded-full text-red-600 hover:bg-red-50 border border-red-200 transition-colors cursor-pointer"
                    title={isEn ? 'Remove photo' : 'ഫോട്ടോ ഒഴിവാക്കുക'}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Role Segmented Pill */}
          <div>
            <label className="text-[11px] font-bold text-stone-600 ml-3 mb-1 block">
              {isEn ? 'Current Account Role :' : 'അക്കൗണ്ട് തരം :'}
            </label>
            <div className="bg-[#EAE4D7] p-1 rounded-full flex">
              <button
                type="button"
                onClick={() => setRole('producer')}
                className={`flex-1 py-2 text-xs font-bold rounded-full transition-all cursor-pointer ${
                  role === 'producer'
                    ? 'bg-[#4E9A28] text-white shadow-xs'
                    : 'text-stone-700'
                }`}
              >
                {isEn ? 'Farmer / Producer' : 'കർഷകൻ (Producer)'}
              </button>
              <button
                type="button"
                onClick={() => setRole('buyer')}
                className={`flex-1 py-2 text-xs font-bold rounded-full transition-all cursor-pointer ${
                  role === 'buyer'
                    ? 'bg-[#4E9A28] text-white shadow-xs'
                    : 'text-stone-700'
                }`}
              >
                {isEn ? 'Commercial Buyer' : 'വ്യാപാരി (Buyer)'}
              </button>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="text-[11px] font-bold text-stone-600 ml-3 mb-1 block">
              {isEn ? 'Full Name :' : 'പേര് :'}
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-4 w-7 h-7 rounded-full bg-[#EAF5E1] flex items-center justify-center text-[#2E6116]">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-full border-2 border-[#B8DC9F] bg-white pl-13 pr-4 py-3 text-xs sm:text-sm font-semibold text-stone-800 focus:outline-hidden focus:border-[#4E9A28] shadow-2xs"
                required
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="text-[11px] font-bold text-stone-600 ml-3 mb-1 block">
              {isEn ? 'Phone Number :' : 'ഫോൺ നമ്പർ :'}
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-4 w-7 h-7 rounded-full bg-[#EAF5E1] flex items-center justify-center text-[#2E6116]">
                <Phone className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-full border-2 border-[#B8DC9F] bg-white pl-13 pr-4 py-3 text-xs sm:text-sm font-semibold text-stone-800 focus:outline-hidden focus:border-[#4E9A28] shadow-2xs"
                required
              />
            </div>
          </div>

          {/* District & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-stone-600 ml-3 mb-1 block">
                {isEn ? 'District :' : 'ജില്ല :'}
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-4 w-7 h-7 rounded-full bg-[#EAF5E1] flex items-center justify-center text-[#2E6116]">
                  <MapPin className="w-4 h-4" />
                </div>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full rounded-full border-2 border-[#B8DC9F] bg-white pl-13 pr-4 py-3 text-xs sm:text-sm font-semibold text-stone-800 focus:outline-hidden focus:border-[#4E9A28] shadow-2xs appearance-none"
                >
                  {KERALA_DISTRICTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-stone-600 ml-3 mb-1 block">
                {role === 'producer'
                  ? isEn ? 'Farm Name :' : 'കൃഷിത്തോട്ടം :'
                  : isEn ? 'Business Name :' : 'സ്ഥാപനം :'}
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-4 w-7 h-7 rounded-full bg-[#EAF5E1] flex items-center justify-center text-[#2E6116]">
                  <Building2 className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder={role === 'producer' ? 'Green Valley Farm' : 'Malabar Foods'}
                  className="w-full rounded-full border-2 border-[#B8DC9F] bg-white pl-13 pr-4 py-3 text-xs sm:text-sm font-semibold text-stone-800 focus:outline-hidden focus:border-[#4E9A28] shadow-2xs"
                />
              </div>
            </div>
          </div>

          {/* Primary Crops / Procurement Needs */}
          <div>
            <label className="text-[11px] font-bold text-stone-600 ml-3 mb-1 block">
              {role === 'producer'
                ? isEn ? 'Primary Harvest Crops :' : 'പ്രധാന വിളകൾ :'
                : isEn ? 'Required Produce :' : 'ആവശ്യമുള്ള ഉൽപ്പന്നങ്ങൾ :'}
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-4 w-7 h-7 rounded-full bg-[#EAF5E1] flex items-center justify-center text-[#2E6116]">
                <Wheat className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={primaryCrops}
                onChange={(e) => setPrimaryCrops(e.target.value)}
                placeholder="Robusta Coffee, Cardamom, Bananas"
                className="w-full rounded-full border-2 border-[#B8DC9F] bg-white pl-13 pr-4 py-3 text-xs sm:text-sm font-semibold text-stone-800 focus:outline-hidden focus:border-[#4E9A28] shadow-2xs"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full rounded-full bg-[#4E9A28] hover:bg-[#428721] text-white font-black py-3.5 px-6 shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>
                {savedAlert
                  ? isEn ? 'Saved Successfully!' : 'സേവ് ചെയ്തു!'
                  : isEn ? 'Save Profile' : 'പ്രൊഫൈൽ സേവ് ചെയ്യുക'}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
