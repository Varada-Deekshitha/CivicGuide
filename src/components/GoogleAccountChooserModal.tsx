import React, { useState } from 'react';
import {
  X,
  UserPlus,
  ArrowRight,
  ShieldCheck,
  Check,
  Trash2,
  AlertCircle,
  Plus
} from 'lucide-react';
import { GoogleAccount, UserAccount } from '../types';
import { StorageService } from '../services/storageService';

export const GoogleLogoIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      fill="#EA4335"
    />
  </svg>
);

interface GoogleAccountChooserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAccount: (account: GoogleAccount) => void;
  onAccountsChange?: () => void;
}

export const GoogleAccountChooserModal: React.FC<GoogleAccountChooserModalProps> = ({
  isOpen,
  onClose,
  onSelectAccount,
  onAccountsChange
}) => {
  const [accounts, setAccounts] = useState<GoogleAccount[]>(() => StorageService.getGoogleAccounts());
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAccountClick = (account: GoogleAccount) => {
    setSelectedAccountId(account.id);
    setIsSigningIn(true);
    setTimeout(() => {
      onSelectAccount(account);
    }, 450);
  };

  const handleAddNewAccount = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const email = newEmail.trim().toLowerCase();
    const name = newName.trim();

    if (!email || !name) {
      setError('Please provide your name and Google email.');
      return;
    }

    if (!email.includes('@')) {
      setError('Please provide a valid Google account email.');
      return;
    }

    const newAccount: GoogleAccount = {
      id: `google_${Date.now()}`,
      email,
      name,
      givenName: name.split(' ')[0],
      familyName: name.split(' ').slice(1).join(' ') || undefined
    };

    StorageService.addGoogleAccount(newAccount);
    const updated = StorageService.getGoogleAccounts();
    setAccounts(updated);
    if (onAccountsChange) onAccountsChange();
    setIsAddingNew(false);
    setNewName('');
    setNewEmail('');

    // Automatically sign in with newly added account
    handleAccountClick(newAccount);
  };

  const handleRemoveAccount = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    StorageService.removeGoogleAccount(id);
    const updated = StorageService.getGoogleAccounts();
    setAccounts(updated);
    if (onAccountsChange) onAccountsChange();
  };

  return (
    <div className="fixed inset-0 z-60 bg-[#202124]/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full border border-[#dadce0] overflow-hidden my-auto flex flex-col font-sans text-[#202124] animate-in zoom-in-95 duration-150">
        {/* Google Header */}
        <div className="pt-8 pb-4 px-6 text-center relative border-b border-[#f1f3f4]">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-[#5f6368] hover:text-[#202124] hover:bg-[#f1f3f4] rounded-full transition cursor-pointer"
            title="Cancel"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex justify-center mb-3">
            <GoogleLogoIcon className="w-8 h-8" />
          </div>

          <h3 className="text-xl font-medium text-[#202124] tracking-tight">
            Choose an account
          </h3>
          <p className="text-sm text-[#5f6368] mt-1">
            to continue to <span className="font-semibold text-[#1a73e8]">CivicGuide</span>
          </p>

          {/* Tester Helper Badge */}
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f8f9fa] border border-[#e8eaed] text-[11px] text-[#5f6368]">
            <span>Multiple Google accounts detected ({accounts.length})</span>
          </div>
        </div>

        {/* Account List */}
        <div className="p-4 sm:p-6 space-y-1 divide-y divide-[#f1f3f4] max-h-[50vh] overflow-y-auto">
          {error && (
            <div className="mb-3 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {accounts.map((account) => {
            const isSelected = selectedAccountId === account.id;
            return (
              <div
                key={account.id}
                onClick={() => !isSigningIn && handleAccountClick(account)}
                className={`w-full py-3 px-3.5 rounded-xl flex items-center justify-between gap-3 text-left transition cursor-pointer group ${
                  isSelected
                    ? 'bg-[#e8f0fe] border border-[#d2e3fc]'
                    : 'hover:bg-[#f8f9fa]'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  {account.picture ? (
                    <img
                      src={account.picture}
                      alt={account.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover border border-[#dadce0] shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#1a73e8] text-white font-medium flex items-center justify-center text-sm uppercase shrink-0 shadow-xs">
                      {account.name.charAt(0)}
                    </div>
                  )}

                  <div className="min-w-0">
                    <div className="text-sm font-medium text-[#202124] truncate group-hover:text-[#1a73e8] transition">
                      {account.name}
                    </div>
                    <div className="text-xs text-[#5f6368] truncate">
                      {account.email}
                    </div>
                    <div className="text-[10px] text-[#1e8e3e] font-medium mt-0.5 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1e8e3e] inline-block"></span>
                      <span>Google Account verified</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {isSelected ? (
                    <div className="flex items-center gap-1.5 text-xs text-[#1a73e8] font-medium">
                      <div className="w-3.5 h-3.5 border-2 border-[#1a73e8] border-t-transparent rounded-full animate-spin"></div>
                      <span className="hidden sm:inline">Signing in...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <ArrowRight className="w-4 h-4 text-[#5f6368] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition" />
                      {accounts.length > 1 && (
                        <button
                          type="button"
                          onClick={(e) => handleRemoveAccount(e, account.id)}
                          className="p-1 text-[#9aa0a6] hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Remove from list"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Use Another Account Option */}
          {!isAddingNew ? (
            <button
              type="button"
              onClick={() => setIsAddingNew(true)}
              className="w-full py-3 px-3.5 rounded-xl flex items-center gap-3.5 text-left text-sm font-medium text-[#202124] hover:bg-[#f8f9fa] transition cursor-pointer group mt-2"
            >
              <div className="w-10 h-10 rounded-full border border-[#dadce0] bg-white text-[#5f6368] flex items-center justify-center group-hover:border-[#1a73e8] group-hover:text-[#1a73e8] transition shrink-0">
                <UserPlus className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-[#202124] group-hover:text-[#1a73e8] transition">
                  Use another account
                </div>
                <div className="text-xs text-[#5f6368]">
                  Add a different Google account
                </div>
              </div>
              <Plus className="w-4 h-4 text-[#5f6368] group-hover:text-[#1a73e8] transition" />
            </button>
          ) : (
            <form onSubmit={handleAddNewAccount} className="pt-4 space-y-3">
              <div className="text-xs font-semibold text-[#1a73e8] flex items-center gap-1.5">
                <GoogleLogoIcon className="w-3.5 h-3.5" />
                <span>Add Google Account</span>
              </div>
              <div>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Full Name (e.g. Priyadarshini Iyer)"
                  className="w-full px-3 py-2 bg-white border border-[#dadce0] rounded-xl text-xs text-[#202124] focus:outline-hidden focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8]"
                />
              </div>
              <div>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="name@gmail.com"
                  className="w-full px-3 py-2 bg-white border border-[#dadce0] rounded-xl text-xs text-[#202124] focus:outline-hidden focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8]"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="px-3 py-1.5 text-xs text-[#5f6368] hover:bg-[#f1f3f4] rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#1a73e8] hover:bg-[#1557b0] text-white text-xs font-medium rounded-lg shadow-xs transition flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Continue with this account</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Google Security & Privacy Notice Footer */}
        <div className="px-6 py-4 bg-[#f8f9fa] border-t border-[#e8eaed] text-[11px] text-[#5f6368] leading-relaxed">
          <div className="flex items-start gap-2 mb-2">
            <ShieldCheck className="w-4 h-4 text-[#1e8e3e] shrink-0 mt-0.5" />
            <span>
              To continue, Google will share your name, email address, language preference, and profile picture with CivicGuide.
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] pt-1 text-[#1a73e8]">
            <span className="hover:underline cursor-pointer">CivicGuide Privacy Policy</span>
            <span className="hover:underline cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </div>
  );
};
