import React, { useState } from 'react';
import {
  X,
  Check,
  User,
  MapPin,
  Briefcase,
  GraduationCap,
  IndianRupee,
  Home,
  Users,
  Sparkles
} from 'lucide-react';
import { CitizenProfile, OccupationType, IncomeCategory, AreaType, GenderType } from '../types';
import { INDIAN_STATES } from '../data/schemes';
import { SAMPLE_PERSONAS } from '../services/storageService';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: CitizenProfile;
  onSaveProfile: (newProfile: CitizenProfile) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile
}) => {
  const [formData, setFormData] = useState<CitizenProfile>({ ...profile });
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleApplyPersona = (key: string) => {
    const persona = SAMPLE_PERSONAS[key];
    if (persona) {
      setFormData({ ...persona, lastUpdated: new Date().toISOString() });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.age || formData.age < 1 || formData.age > 120) {
      setErrorMsg('Please enter a valid age between 1 and 120.');
      return;
    }
    if (!formData.state) {
      setErrorMsg('Please select your state.');
      return;
    }

    setErrorMsg(null);
    const updated: CitizenProfile = {
      ...formData,
      lastUpdated: new Date().toISOString()
    };
    onSaveProfile(updated);
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#2c2c2c]/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#fcfbf7] rounded-[32px] shadow-2xl max-w-2xl w-full border border-[#e2dcd0] overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-[#4a5d4e] text-white px-6 sm:px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#3a493d] flex items-center justify-center text-[#8ca38f]">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-serif font-bold text-white">Citizen Profile</h2>
              <p className="text-xs text-[#e8ede9]/90">
                Used strictly for offline eligibility calculations. Stored locally in your browser.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#e8ede9]/80 hover:text-white p-1 rounded-full transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Persona Selector for Testing */}
        <div className="bg-[#f4f1ea] border-b border-[#e2dcd0] px-6 sm:px-8 py-3.5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#4a5d4e]">
              <Sparkles className="w-3.5 h-3.5 text-[#c87a53]" />
              <span>Quick Demo Personas (1-Click Test):</span>
            </div>
            <span className="text-[11px] text-[#737067]">Select any realistic role</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'student', label: '🎓 College Student (21)', desc: 'Education & Skill schemes' },
              { id: 'farmer', label: '🌾 Small Farmer (44)', desc: 'PM-KISAN, Agriculture' },
              { id: 'artisan', label: '🛠️ Traditional Artisan (38)', desc: 'PM Vishwakarma & Credit' },
              { id: 'senior', label: '👵 Senior Citizen (64)', desc: 'Pension & Healthcare' },
              { id: 'entrepreneur', label: '💼 Self-Employed (29)', desc: 'Mudra Loan & Stand-Up' }
            ].map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => handleApplyPersona(p.id)}
                className="px-3 py-1 text-xs font-medium rounded-full bg-white hover:bg-[#edeae1] border border-[#e2dcd0] text-[#4a5d4e] transition shadow-xs"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 max-h-[72vh] overflow-y-auto">
          {errorMsg && (
            <div className="p-3.5 bg-[#fbf5f0] border border-[#f0ded5] text-[#c87a53] text-xs rounded-xl font-medium">
              {errorMsg}
            </div>
          )}

          {showSuccessToast && (
            <div className="p-3.5 bg-[#e8ede9] border border-[#8ca38f]/40 text-[#4a5d4e] text-xs font-medium rounded-xl flex items-center gap-2">
              <Check className="w-4 h-4 text-[#4a5d4e]" />
              Profile updated and saved locally in browser!
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name (Optional) */}
            <div>
              <label className="block text-xs font-semibold text-[#5c5953] mb-1.5">
                Citizen Name (Optional)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.fullName || ''}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Ananya Sharma"
                  className="w-full text-xs sm:text-sm border border-[#e2dcd0] rounded-xl px-3.5 py-2.5 text-[#2c2c2c] bg-white focus:outline-none focus:ring-2 focus:ring-[#8ca38f]"
                />
              </div>
            </div>

            {/* Age */}
            <div>
              <label className="block text-xs font-semibold text-[#5c5953] mb-1.5">
                Age (Years) <span className="text-[#c87a53]">*</span>
              </label>
              <input
                type="number"
                min="1"
                max="115"
                required
                value={formData.age || ''}
                onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
                placeholder="e.g. 22"
                className="w-full text-xs sm:text-sm border border-[#e2dcd0] rounded-xl px-3.5 py-2.5 text-[#2c2c2c] bg-white focus:outline-none focus:ring-2 focus:ring-[#8ca38f]"
              />
            </div>

            {/* State */}
            <div>
              <label className="block text-xs font-semibold text-[#5c5953] mb-1.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#8ca38f]" />
                <span>State / UT</span> <span className="text-[#c87a53]">*</span>
              </label>
              <select
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full text-xs sm:text-sm border border-[#e2dcd0] rounded-xl px-3.5 py-2.5 text-[#2c2c2c] bg-white focus:outline-none focus:ring-2 focus:ring-[#8ca38f]"
              >
                {INDIAN_STATES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-xs font-semibold text-[#5c5953] mb-1.5 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#8ca38f]" />
                <span>Gender</span>
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value as GenderType })}
                className="w-full text-xs sm:text-sm border border-[#e2dcd0] rounded-xl px-3.5 py-2.5 text-[#2c2c2c] bg-white focus:outline-none focus:ring-2 focus:ring-[#8ca38f]"
              >
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
                <option value="all">Prefer not to say</option>
              </select>
            </div>

            {/* Occupation */}
            <div>
              <label className="block text-xs font-semibold text-[#5c5953] mb-1.5 flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-[#8ca38f]" />
                <span>Occupation / Livelihood</span> <span className="text-[#c87a53]">*</span>
              </label>
              <select
                value={formData.occupation}
                onChange={(e) => {
                  const occ = e.target.value as OccupationType;
                  setFormData({
                    ...formData,
                    occupation: occ,
                    isStudent: occ === 'student'
                  });
                }}
                className="w-full text-xs sm:text-sm border border-[#e2dcd0] rounded-xl px-3.5 py-2.5 text-[#2c2c2c] bg-white focus:outline-none focus:ring-2 focus:ring-[#8ca38f]"
              >
                <option value="student">Student (School / College)</option>
                <option value="farmer">Farmer / Agriculturalist</option>
                <option value="artisan">Artisan / Traditional Craftsman</option>
                <option value="self_employed">Self-Employed / Shopkeeper / Trader</option>
                <option value="daily_wage">Daily Wage / Gig Worker / Vendor</option>
                <option value="salaried">Salaried Employee (Private / Formal)</option>
                <option value="unemployed">Unemployed / Job Seeker</option>
                <option value="senior_citizen">Senior Citizen / Retired</option>
                <option value="homemaker">Homemaker</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Income Category */}
            <div>
              <label className="block text-xs font-semibold text-[#5c5953] mb-1.5 flex items-center gap-1">
                <IndianRupee className="w-3.5 h-3.5 text-[#8ca38f]" />
                <span>Annual Household Income</span> <span className="text-[#c87a53]">*</span>
              </label>
              <select
                value={formData.incomeCategory}
                onChange={(e) =>
                  setFormData({ ...formData, incomeCategory: e.target.value as IncomeCategory })
                }
                className="w-full text-xs sm:text-sm border border-[#e2dcd0] rounded-xl px-3.5 py-2.5 text-[#2c2c2c] bg-white focus:outline-none focus:ring-2 focus:ring-[#8ca38f]"
              >
                <option value="below_1_5l">Below ₹1.5 Lakh / year (EWS / Low Income)</option>
                <option value="1_5l_to_3l">₹1.5 Lakh – ₹3 Lakh / year</option>
                <option value="3l_to_8l">₹3 Lakh – ₹8 Lakh / year (Middle Income)</option>
                <option value="above_8l">Above ₹8 Lakh / year</option>
              </select>
            </div>

            {/* Area (Rural / Urban) */}
            <div>
              <label className="block text-xs font-semibold text-[#5c5953] mb-1.5 flex items-center gap-1">
                <Home className="w-3.5 h-3.5 text-[#8ca38f]" />
                <span>Residence Area</span>
              </label>
              <select
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value as AreaType })}
                className="w-full text-xs sm:text-sm border border-[#e2dcd0] rounded-xl px-3.5 py-2.5 text-[#2c2c2c] bg-white focus:outline-none focus:ring-2 focus:ring-[#8ca38f]"
              >
                <option value="urban">Urban (City / Town)</option>
                <option value="rural">Rural (Village / Gram Panchayat)</option>
                <option value="semi_urban">Semi-Urban (Town Periphery)</option>
              </select>
            </div>

            {/* Category / Caste */}
            <div>
              <label className="block text-xs font-semibold text-[#5c5953] mb-1.5">
                Social Category (for Quota Schemes)
              </label>
              <select
                value={formData.casteCategory || 'general'}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    casteCategory: e.target.value as 'general' | 'obc' | 'sc' | 'st' | 'minority'
                  })
                }
                className="w-full text-xs sm:text-sm border border-[#e2dcd0] rounded-xl px-3.5 py-2.5 text-[#2c2c2c] bg-white focus:outline-none focus:ring-2 focus:ring-[#8ca38f]"
              >
                <option value="general">General / Unreserved</option>
                <option value="obc">OBC (Other Backward Classes)</option>
                <option value="sc">SC (Scheduled Caste)</option>
                <option value="st">ST (Scheduled Tribe)</option>
                <option value="minority">Minority Community</option>
              </select>
            </div>
          </div>

          {/* Toggles for Special Status */}
          <div className="pt-3 border-t border-[#e2dcd0] space-y-2.5">
            <div className="text-xs font-semibold text-[#5c5953]">Special Eligibility Flags:</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <label className="flex items-center gap-2.5 p-3 bg-white hover:bg-[#f9f7f2] rounded-xl border border-[#e2dcd0] cursor-pointer text-xs text-[#2c2c2c] transition">
                <input
                  type="checkbox"
                  checked={formData.isStudent}
                  onChange={(e) => setFormData({ ...formData, isStudent: e.target.checked })}
                  className="rounded text-[#4a5d4e] focus:ring-[#8ca38f]"
                />
                <GraduationCap className="w-4 h-4 text-[#4a5d4e] shrink-0" />
                <span>Enrolled Student</span>
              </label>

              <label className="flex items-center gap-2.5 p-3 bg-white hover:bg-[#f9f7f2] rounded-xl border border-[#e2dcd0] cursor-pointer text-xs text-[#2c2c2c] transition">
                <input
                  type="checkbox"
                  checked={formData.hasBPLCard}
                  onChange={(e) => setFormData({ ...formData, hasBPLCard: e.target.checked })}
                  className="rounded text-[#4a5d4e] focus:ring-[#8ca38f]"
                />
                <span>Ration / BPL Card Holder</span>
              </label>

              <label className="flex items-center gap-2.5 p-3 bg-white hover:bg-[#f9f7f2] rounded-xl border border-[#e2dcd0] cursor-pointer text-xs text-[#2c2c2c] transition">
                <input
                  type="checkbox"
                  checked={formData.isDifferentlyAbled}
                  onChange={(e) => setFormData({ ...formData, isDifferentlyAbled: e.target.checked })}
                  className="rounded text-[#4a5d4e] focus:ring-[#8ca38f]"
                />
                <span>Differently Abled (PwD)</span>
              </label>
            </div>
          </div>

          {/* Privacy Note */}
          <div className="p-3.5 bg-[#f4f1ea] rounded-2xl text-[11px] text-[#737067] border border-[#e2dcd0] leading-relaxed">
            🛡️ <strong>Privacy Protection:</strong> No Aadhaar number, phone number, or sensitive documents are requested. Your information remains strictly within your browser's local storage.
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-[#e2dcd0] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-[#737067] hover:text-[#2c2c2c] bg-white hover:bg-[#edeae1] border border-[#e2dcd0] rounded-full transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-medium text-white bg-[#4a5d4e] hover:bg-[#3d4d40] rounded-full shadow-xs transition flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              Save Profile & Update Schemes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
