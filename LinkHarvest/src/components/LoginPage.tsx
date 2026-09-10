import React, { useState, useRef } from 'react';
import {
  Sprout,
  Store,
  Phone,
  Lock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  MapPin,
  Building2,
  Wheat,
  User,
  Camera,
  Upload,
  Image as ImageIcon,
  X,
  Eye,
  EyeOff,
} from 'lucide-react';
import { UserRole, Language, UserProfile } from '../types';
import { TRANSLATIONS } from '../utils/translations';
import { GrassDecoration } from './GrassDecoration';
import { UserAvatar } from './UserAvatar';

interface Props {
  onLogin: (user: UserProfile, role: UserRole) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
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

export const LoginPage: React.FC<Props> = ({
  onLogin,
  language,
  onLanguageChange,
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>('signup');
  const [role, setRole] = useState<UserRole>('producer');

  // Sign up state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [organization, setOrganization] = useState('');
  const [district, setDistrict] = useState('Wayanad');
  const [primaryCrops, setPrimaryCrops] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [uploadedPhoto, setUploadedPhoto] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');

  // Login state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const isEn = language === 'en';
  const t = TRANSLATIONS[language];

  // Handle local gallery photo upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setFormError(isEn ? 'Image size should be less than 5MB' : 'ചിത്രത്തിന്റെ വലിപ്പം 5MB-യിൽ കുറവായിരിക്കണം');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedPhoto(event.target.result as string);
          setFormError('');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!name.trim()) {
      setFormError(isEn ? 'Please enter your full name' : 'ദയവായി നിങ്ങളുടെ പേര് നൽകുക');
      return;
    }
    if (!phone.trim()) {
      setFormError(isEn ? 'Please enter your phone number' : 'ദയവായി ഫോൺ നമ്പർ നൽകുക');
      return;
    }
    if (password && confirmPassword && password !== confirmPassword) {
      setFormError(isEn ? 'Passwords do not match' : 'പാസ്‌വേഡുകൾ പൊരുത്തപ്പെടുന്നില്ല');
      return;
    }

    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      role,
      phone: phone.trim(),
      organization: organization.trim() || (role === 'producer' ? `${name.trim()}'s Farm` : `${name.trim()} Trading`),
      location: `${district}, Kerala`,
      coordinates: { lat: 10.8505, lng: 76.2711 },
      rating: 5.0,
      verified: true,
      avatar: uploadedPhoto || '',
      primaryCrops: primaryCrops.trim() || (role === 'producer' ? 'Banana, Pepper, Tapioca' : 'Vegetables & Fruits'),
    };

    onLogin(newUser, role);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!loginIdentifier.trim()) {
      setFormError(isEn ? 'Please enter your Phone or Email' : 'ഫോൺ നമ്പർ നൽകുക');
      return;
    }

    // Attempt to recover existing profile or create seamless demo session
    let existingUser: UserProfile | null = null;
    try {
      const saved = localStorage.getItem('linkharvest_current_user');
      if (saved) {
        existingUser = JSON.parse(saved);
      }
    } catch {}

    const loggedUser: UserProfile = existingUser && existingUser.name ? existingUser : {
      id: `user-${Date.now()}`,
      name: loginIdentifier.includes('@') ? loginIdentifier.split('@')[0] : 'Devu Nair',
      role,
      phone: loginIdentifier,
      organization: role === 'producer' ? 'Lush Horizon Farms' : 'Kerala Produce Mart',
      location: 'Wayanad, Kerala',
      coordinates: { lat: 11.6854, lng: 76.1320 },
      rating: 4.9,
      verified: true,
      avatar: uploadedPhoto || '',
      primaryCrops: role === 'producer' ? 'Robusta Coffee, Banana, Ginger' : 'Commercial Buyer',
    };

    onLogin(loggedUser, role);
  };

  return (
    <div className="min-h-screen bg-[#F5F9F1] text-stone-900 flex flex-col justify-between relative overflow-x-hidden selection:bg-[#7BC253] selection:text-white">
      {/* Top Bar with Language & App Branding */}
      <header className="w-full max-w-xl mx-auto px-6 pt-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-2xl bg-[#4E9A28] text-white flex items-center justify-center shadow-md shadow-[#4E9A28]/20">
            <Sprout className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-lg tracking-tight text-[#2B5E16]">
            LinkHarvest
          </span>
        </div>

        <button
          type="button"
          onClick={() => onLanguageChange(language === 'en' ? 'ml' : 'en')}
          className="px-3 py-1.5 rounded-full bg-white border border-[#B8DC9F] text-xs font-bold text-[#2B5E16] hover:bg-[#EAF5E1] transition-all cursor-pointer shadow-2xs"
        >
          {language === 'en' ? 'മലയാളം (ML)' : 'English (EN)'}
        </button>
      </header>

      {/* Main Authentication Card */}
      <main className="w-full max-w-md mx-auto px-5 py-4 z-10 flex-1 flex flex-col justify-center">
        <div className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-black text-[#224A12] tracking-tight">
            {isEn ? 'Welcome to LinkHarvest' : 'ലിങ്ക് ഹാർവെസ്റ്റിലേക്ക് സ്വാഗതം'}
          </h1>
          <p className="text-xs sm:text-sm font-medium text-stone-600 mt-1">
            {isEn
              ? 'Reverse Harvest Demand & Direct Agricultural Marketplace'
              : 'കേരളത്തിലെ കർഷകർക്കും വ്യാപാരികൾക്കുമായുള്ള പ്ലാറ്റ്ഫോം'}
          </p>
        </div>

        {/* Dual Segmented Pill Toggle - Cloned directly from reference */}
        <div className="bg-[#EAE4D7] p-1 rounded-full flex max-w-xs mx-auto mb-6 shadow-inner">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setFormError('');
            }}
            className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-full transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-[#4E9A28] text-white shadow-sm'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setFormError('');
            }}
            className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-full transition-all cursor-pointer ${
              mode === 'signup'
                ? 'bg-[#4E9A28] text-white shadow-sm'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Role Segmented Selector */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <button
            type="button"
            onClick={() => setRole('producer')}
            className={`px-4 py-2 rounded-full text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer border ${
              role === 'producer'
                ? 'bg-[#2E6116] text-white border-[#2E6116] shadow-sm'
                : 'bg-white text-stone-700 border-[#C7E3B2] hover:bg-[#F2F8ED]'
            }`}
          >
            <Sprout className="w-3.5 h-3.5" />
            {isEn ? 'Farmer / Producer' : 'കർഷകൻ (Producer)'}
          </button>
          <button
            type="button"
            onClick={() => setRole('buyer')}
            className={`px-4 py-2 rounded-full text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer border ${
              role === 'buyer'
                ? 'bg-[#2E6116] text-white border-[#2E6116] shadow-sm'
                : 'bg-white text-stone-700 border-[#C7E3B2] hover:bg-[#F2F8ED]'
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            {isEn ? 'Commercial Buyer' : 'വ്യാപാരി (Buyer)'}
          </button>
        </div>

        {formError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-2xl text-center">
            {formError}
          </div>
        )}

        {/* MODE: SIGN UP FORM */}
        {mode === 'signup' ? (
          <form onSubmit={handleSignUpSubmit} className="space-y-3.5">
            {/* Gallery Photo Upload (NO DEFAULT AI AVATARS) */}
            <div className="bg-white/80 backdrop-blur-xs border-2 border-dashed border-[#B8DC9F] rounded-2xl p-3.5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <UserAvatar
                    avatar={uploadedPhoto}
                    name={name || 'User'}
                    size="lg"
                  />
                  {uploadedPhoto && (
                    <button
                      type="button"
                      onClick={() => setUploadedPhoto('')}
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-xs shadow-xs"
                      title="Remove photo"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#224A12]">
                    {isEn ? 'Profile Photo' : 'പ്രൊഫൈൽ ചിത്രം'}
                  </h4>
                  <p className="text-[11px] text-stone-500">
                    {isEn
                      ? 'Upload your real photo from your gallery'
                      : 'ഗാലറിയിൽ നിന്ന് ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യുക'}
                  </p>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
                id="gallery-file-upload"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-2 rounded-full bg-[#EAF5E1] border border-[#A4D685] text-[#224A12] text-xs font-bold hover:bg-[#DDF0D0] transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>{isEn ? 'Choose Photo' : 'ഫോട്ടോ തിരഞ്ഞെടുക്കൂ'}</span>
              </button>
            </div>

            {/* Name Input */}
            <div className="relative">
              <label className="text-[11px] font-bold text-stone-600 ml-4 mb-1 block">
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
                  placeholder={isEn ? 'e.g. Thomas Kurian' : 'നിങ്ങളുടെ പേര്'}
                  className="w-full rounded-full border-2 border-[#B8DC9F] bg-white pl-13 pr-5 py-3 text-xs sm:text-sm font-semibold text-stone-800 placeholder-stone-400 focus:outline-hidden focus:border-[#4E9A28] shadow-2xs"
                  required
                />
              </div>
            </div>

            {/* Phone / Email Input */}
            <div className="relative">
              <label className="text-[11px] font-bold text-stone-600 ml-4 mb-1 block">
                {isEn ? 'Phone Number or Email :' : 'ഫോൺ നമ്പർ / ഇമെയിൽ :'}
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-4 w-7 h-7 rounded-full bg-[#EAF5E1] flex items-center justify-center text-[#2E6116]">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={isEn ? '+91 98471 23456 or user@example.com' : '+91 98471 23456'}
                  className="w-full rounded-full border-2 border-[#B8DC9F] bg-white pl-13 pr-5 py-3 text-xs sm:text-sm font-semibold text-stone-800 placeholder-stone-400 focus:outline-hidden focus:border-[#4E9A28] shadow-2xs"
                  required
                />
              </div>
            </div>

            {/* District & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-stone-600 ml-4 mb-1 block">
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
                <label className="text-[11px] font-bold text-stone-600 ml-4 mb-1 block">
                  {role === 'producer'
                    ? isEn ? 'Farm Name :' : 'കൃഷിത്തോട്ടം :'
                    : isEn ? 'Business / Org :' : 'സ്ഥാപനം :'}
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-4 w-7 h-7 rounded-full bg-[#EAF5E1] flex items-center justify-center text-[#2E6116]">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder={role === 'producer' ? 'Green Valley Farm' : 'Malabar Bistro'}
                    className="w-full rounded-full border-2 border-[#B8DC9F] bg-white pl-13 pr-4 py-3 text-xs sm:text-sm font-semibold text-stone-800 placeholder-stone-400 focus:outline-hidden focus:border-[#4E9A28] shadow-2xs"
                  />
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div className="relative">
              <label className="text-[11px] font-bold text-stone-600 ml-4 mb-1 block">
                {isEn ? 'Password :' : 'പാസ്‌വേഡ് :'}
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-4 w-7 h-7 rounded-full bg-[#EAF5E1] flex items-center justify-center text-[#2E6116]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-full border-2 border-[#B8DC9F] bg-white pl-13 pr-12 py-3 text-xs sm:text-sm font-semibold text-stone-800 placeholder-stone-400 focus:outline-hidden focus:border-[#4E9A28] shadow-2xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-stone-400 hover:text-stone-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Sign Up Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full rounded-full bg-[#4E9A28] hover:bg-[#428721] text-white font-extrabold py-3.5 px-6 shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
              >
                <span>{isEn ? 'Sign Up' : 'രജിസ്റ്റർ ചെയ്യുക'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <p className="text-center text-xs text-stone-500 pt-1">
              {isEn ? 'Already have an account?' : 'ഇതിനകം അക്കൗണ്ട് ഉണ്ടോ?'}{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="font-bold text-[#2E6116] underline hover:text-[#4E9A28] cursor-pointer"
              >
                {isEn ? 'Login' : 'ലോഗിൻ ചെയ്യുക'}
              </button>
            </p>
          </form>
        ) : (
          /* MODE: LOGIN FORM - CLEAN ENGLISH AND MALAYALAM */
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {/* Email / Phone */}
            <div className="relative">
              <label className="text-[11px] font-bold text-stone-600 ml-4 mb-1 block">
                {isEn ? 'Email or Phone :' : 'ഇമെയിൽ അല്ലെങ്കിൽ ഫോൺ :'}
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-4 w-7 h-7 rounded-full bg-[#EAF5E1] flex items-center justify-center text-[#2E6116]">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  placeholder={isEn ? 'user@example.com or +91 98471 23456' : 'ഇമെയിൽ അല്ലെങ്കിൽ ഫോൺ നമ്പർ'}
                  className="w-full rounded-full border-2 border-[#B8DC9F] bg-white pl-13 pr-5 py-3.5 text-xs sm:text-sm font-semibold text-stone-800 placeholder-stone-400 focus:outline-hidden focus:border-[#4E9A28] shadow-2xs"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="relative">
              <label className="text-[11px] font-bold text-stone-600 ml-4 mb-1 block">
                {isEn ? 'Password :' : 'പാസ്‌വേഡ് :'}
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-4 w-7 h-7 rounded-full bg-[#EAF5E1] flex items-center justify-center text-[#2E6116]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-full border-2 border-[#B8DC9F] bg-white pl-13 pr-12 py-3.5 text-xs sm:text-sm font-semibold text-stone-800 placeholder-stone-400 focus:outline-hidden focus:border-[#4E9A28] shadow-2xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-stone-400 hover:text-stone-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs px-2 pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer text-stone-600 font-medium">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-[#B8DC9F] text-[#4E9A28] focus:ring-[#4E9A28]"
                />
                <span>{isEn ? 'Remember me' : 'ഓർത്തു വെക്കുക'}</span>
              </label>
              <button
                type="button"
                onClick={() => {
                  setLoginIdentifier('+91 98471 23456');
                  setLoginPassword('secret123');
                }}
                className="text-[#2E6116] hover:underline font-semibold"
              >
                {isEn ? 'Forgot Password?' : 'പാസ്‌വേഡ് മറന്നോ?'}
              </button>
            </div>

            {/* Login Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                className="w-full rounded-full bg-[#4E9A28] hover:bg-[#428721] text-white font-extrabold py-3.5 px-6 shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
              >
                <span>{isEn ? 'Login' : 'ലോഗിൻ'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <p className="text-center text-xs text-stone-500 pt-2">
              {isEn ? "Don't have an account?" : 'അക്കൗണ്ട് ഇല്ലേ?'}{' '}
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="font-bold text-[#2E6116] underline hover:text-[#4E9A28] cursor-pointer"
              >
                {isEn ? 'Sign Up' : 'ഇവിടെ രജിസ്റ്റർ ചെയ്യുക'}
              </button>
            </p>
          </form>
        )}
      </main>

      {/* Signature Lush Grass Blades Bottom Graphic from Pinterest Mockup */}
      <footer className="w-full mt-auto">
        <GrassDecoration height={85} />
      </footer>
    </div>
  );
};
