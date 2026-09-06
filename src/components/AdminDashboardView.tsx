import React, { useState } from 'react';
import {
  ShieldCheck,
  Plus,
  Trash2,
  Edit3,
  Search,
  Building,
  CheckCircle2,
  Users,
  FileText,
  Layers,
  ArrowRight,
  Sparkles,
  RefreshCw,
  ExternalLink,
  Eye,
  AlertCircle,
  Megaphone
} from 'lucide-react';
import { GovernmentScheme, SchemeCategory, UserAccount, OccupationType, UserApplicationRecord } from '../types';
import { StorageService } from '../services/storageService';

interface AdminDashboardViewProps {
  schemes: GovernmentScheme[];
  currentUser: UserAccount | null;
  onRefreshSchemes: () => void;
  onPreviewScheme: (scheme: GovernmentScheme) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  schemes,
  currentUser,
  onRefreshSchemes,
  onPreviewScheme
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'schemes' | 'applications' | 'broadcast'>('schemes');

  // Add Scheme Modal state
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [formName, setFormName] = useState('');
  const [formMinistry, setFormMinistry] = useState('');
  const [formLevel, setFormLevel] = useState<'Central' | 'State' | 'Central & State'>('Central');
  const [formCategory, setFormCategory] = useState<SchemeCategory>('Social Welfare');
  const [formShortDesc, setFormShortDesc] = useState('');
  const [formFullDesc, setFormFullDesc] = useState('');
  const [formBenefits, setFormBenefits] = useState('');
  const [formEligibility, setFormEligibility] = useState('');
  const [formPortalName, setFormPortalName] = useState('');
  const [formPortalUrl, setFormPortalUrl] = useState('');
  const [formHelpline, setFormHelpline] = useState('1800-11-2026');

  const [notification, setNotification] = useState<string | null>(null);

  // Broadcast banner state
  const [announcement, setAnnouncement] = useState<string>(() => {
    return localStorage.getItem('civicguide_broadcast') || 'Special Citizen Enrollment Drive: Camps scheduled at Tehsil headquarters this week.';
  });
  const [announcementInput, setAnnouncementInput] = useState(announcement);

  // Application records from storage
  const [applications, setApplications] = useState<Record<string, UserApplicationRecord>>(() => StorageService.getApplicationRecords());

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const filteredSchemes = schemes.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.ministry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === 'all' || s.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  const handleDeleteScheme = (schemeId: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove scheme: "${name}"?`)) {
      StorageService.deleteScheme(schemeId);
      onRefreshSchemes();
      showToast(`Removed scheme: ${name}`);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all schemes back to the standard national catalog?')) {
      StorageService.resetSchemesToDefault();
      onRefreshSchemes();
      showToast('Catalog restored to default national schemes.');
    }
  };

  const handleSaveNewScheme = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formMinistry.trim() || !formShortDesc.trim()) {
      alert('Please fill out the scheme title, ministry, and short summary.');
      return;
    }

    const benefitsArray = formBenefits
      .split('\n')
      .map((b) => b.trim())
      .filter(Boolean);

    const newScheme: GovernmentScheme = {
      id: `scheme-${Date.now()}`,
      name: formName.trim(),
      shortDescription: formShortDesc.trim(),
      fullDescription: formFullDesc.trim() || formShortDesc.trim(),
      ministry: formMinistry.trim(),
      level: formLevel,
      category: formCategory,
      targetBeneficiaries: 'Citizens meeting prescribed category criteria',
      mainBenefits:
        benefitsArray.length > 0
          ? benefitsArray
          : ['Direct benefit transfer or subsidized welfare assistance'],
      basicEligibilitySummary:
        formEligibility.trim() || 'Eligible citizens holding valid residency and identity proof.',
      eligibilityRules: {
        allowedStates: ['All']
      },
      requiredDocuments: [
        {
          id: 'aadhaar-doc',
          name: 'Aadhaar Identity Card',
          description: 'UIDAI biometric identity card with mobile verification',
          mandatory: true,
          issuingAuthority: 'UIDAI'
        },
        {
          id: 'residence-doc',
          name: 'Resident / Domicile Certificate',
          description: 'Proof of state residency',
          mandatory: true,
          issuingAuthority: 'Revenue Authority'
        }
      ],
      applicationGuidance: {
        applicationMethod: 'Online',
        officialPortalName: formPortalName.trim() || 'Official National Portal',
        officialPortalUrl: formPortalUrl.trim() || 'https://www.india.gov.in',
        steps: [
          'Visit the official portal link',
          'Register with Aadhaar and enter personal details',
          'Upload required verified documentation',
          'Submit application and save acknowledgment reference number'
        ],
        importantInstructions: [
          'Ensure bank account is Aadhaar seeded for Direct Benefit Transfer',
          'Keep active mobile number accessible for OTP verification'
        ],
        processingTimeline: '15 to 30 working days',
        fee: 'Nil / Free of Cost',
        nodalDepartment: formMinistry.trim(),
        helpline: formHelpline.trim()
      },
      tags: [formCategory.toLowerCase(), formLevel.toLowerCase()],
      isDemo: true
    };

    StorageService.saveScheme(newScheme);
    onRefreshSchemes();
    setAddModalOpen(false);
    showToast(`Successfully published new scheme: "${newScheme.name}"`);

    // Reset form
    setFormName('');
    setFormMinistry('');
    setFormShortDesc('');
    setFormFullDesc('');
    setFormBenefits('');
    setFormEligibility('');
  };

  const handleUpdateApplicationStatus = (
    schemeId: string,
    newStatus: any
  ) => {
    const current = StorageService.getApplicationRecords();
    if (current[schemeId]) {
      const updated = {
        ...current[schemeId],
        status: newStatus,
        updatedAt: new Date().toISOString()
      };
      StorageService.saveApplicationRecord(updated);
      setApplications(StorageService.getApplicationRecords());
      showToast(`Updated application status for scheme: ${schemeId}`);
    }
  };

  const handleSaveBroadcast = () => {
    localStorage.setItem('civicguide_broadcast', announcementInput);
    setAnnouncement(announcementInput);
    showToast('Published public citizen announcement banner!');
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#4a5d4e] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs sm:text-sm border border-[#3a493d] animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-4 h-4 text-[#8ca38f]" />
          <span>{notification}</span>
        </div>
      )}

      {/* Admin Header Banner */}
      <section className="rounded-[32px] bg-[#4a5d4e] text-white p-6 sm:p-8 lg:p-10 border border-[#3d4d40] shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3a493d] text-[#e8ede9] border border-[#8ca38f]/40 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#8ca38f]" />
            <span>Authorized Officer Control Console</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight">
            Government Scheme Administration & Operations
          </h1>

          <p className="text-xs sm:text-sm text-[#e8ede9]/90 leading-relaxed max-w-2xl">
            Logged in as <span className="font-semibold text-white">{currentUser?.fullName || 'Nodal Officer'}</span> ({currentUser?.email}). Publish new welfare schemes, manage existing benefit parameters, review citizen application telemetry, and broadcast public advisories.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setAddModalOpen(true)}
              className="px-5 py-2.5 bg-[#c87a53] hover:bg-[#b56b46] text-white text-xs sm:text-sm font-medium rounded-full shadow-xs transition flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Publish New Scheme</span>
            </button>

            <button
              onClick={handleResetDefaults}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-[#e8ede9] text-xs font-medium rounded-full border border-white/20 transition flex items-center gap-1.5"
              title="Reset catalog"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset to National Defaults</span>
            </button>
          </div>
        </div>
      </section>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#e2dcd0] shadow-xs">
          <div className="flex items-center justify-between text-[#737067] mb-1">
            <span className="text-xs font-medium uppercase tracking-wider">Published Schemes</span>
            <Layers className="w-4 h-4 text-[#4a5d4e]" />
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-[#4a5d4e]">
            {schemes.length}
          </div>
          <p className="text-[11px] text-[#737067] mt-1">Active in discovery directory</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#e2dcd0] shadow-xs">
          <div className="flex items-center justify-between text-[#737067] mb-1">
            <span className="text-xs font-medium uppercase tracking-wider">Central Schemes</span>
            <Building className="w-4 h-4 text-[#c87a53]" />
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-[#c87a53]">
            {schemes.filter((s) => s.level.includes('Central')).length}
          </div>
          <p className="text-[11px] text-[#737067] mt-1">Pan-India beneficiary schemes</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#e2dcd0] shadow-xs">
          <div className="flex items-center justify-between text-[#737067] mb-1">
            <span className="text-xs font-medium uppercase tracking-wider">Registered Citizens</span>
            <Users className="w-4 h-4 text-[#8ca38f]" />
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-[#2c2c2c]">
            {StorageService.getUsers().length}
          </div>
          <p className="text-[11px] text-[#737067] mt-1">Accounts in local registry</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#e2dcd0] shadow-xs">
          <div className="flex items-center justify-between text-[#737067] mb-1">
            <span className="text-xs font-medium uppercase tracking-wider">Tracked Applications</span>
            <FileText className="w-4 h-4 text-[#4a5d4e]" />
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-[#4a5d4e]">
            {Object.keys(applications).length}
          </div>
          <p className="text-[11px] text-[#737067] mt-1">Citizen submissions logged</p>
        </div>
      </div>

      {/* Tabs for Admin View */}
      <div className="flex border-b border-[#e2dcd0] gap-2">
        <button
          onClick={() => setActiveTab('schemes')}
          className={`pb-3 px-4 text-xs sm:text-sm font-medium transition ${
            activeTab === 'schemes'
              ? 'border-b-2 border-[#4a5d4e] text-[#4a5d4e] font-bold'
              : 'text-[#737067] hover:text-[#2c2c2c]'
          }`}
        >
          Scheme Catalog Management ({schemes.length})
        </button>

        <button
          onClick={() => setActiveTab('applications')}
          className={`pb-3 px-4 text-xs sm:text-sm font-medium transition ${
            activeTab === 'applications'
              ? 'border-b-2 border-[#4a5d4e] text-[#4a5d4e] font-bold'
              : 'text-[#737067] hover:text-[#2c2c2c]'
          }`}
        >
          Citizen Applications Telemetry ({Object.keys(applications).length})
        </button>

        <button
          onClick={() => setActiveTab('broadcast')}
          className={`pb-3 px-4 text-xs sm:text-sm font-medium transition ${
            activeTab === 'broadcast'
              ? 'border-b-2 border-[#4a5d4e] text-[#4a5d4e] font-bold'
              : 'text-[#737067] hover:text-[#2c2c2c]'
          }`}
        >
          Public Citizen Broadcasts
        </button>
      </div>

      {/* TAB 1: Scheme Catalog */}
      {activeTab === 'schemes' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="p-4 bg-white rounded-2xl border border-[#e2dcd0] flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-[#8ca38f] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search scheme name, ministry..."
                className="w-full pl-9 pr-3 py-1.5 bg-[#f4f1ea] border border-[#e2dcd0] rounded-xl text-xs text-[#2c2c2c] focus:outline-hidden"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-1.5 bg-[#f4f1ea] border border-[#e2dcd0] rounded-xl text-xs text-[#2c2c2c] focus:outline-hidden"
              >
                <option value="all">All Categories</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Education">Education</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Employment">Employment</option>
                <option value="Housing">Housing</option>
                <option value="Financial Assistance">Financial Assistance</option>
                <option value="Women & Child Welfare">Women & Child</option>
                <option value="Social Welfare">Social Welfare</option>
              </select>

              <button
                onClick={() => setAddModalOpen(true)}
                className="px-4 py-1.5 bg-[#4a5d4e] hover:bg-[#3d4d40] text-white text-xs font-medium rounded-full transition flex items-center gap-1.5 shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Scheme</span>
              </button>
            </div>
          </div>

          {/* Schemes Table */}
          <div className="bg-white rounded-2xl border border-[#e2dcd0] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#f4f1ea] text-[#737067] border-b border-[#e2dcd0] uppercase font-semibold text-[10px] tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Scheme Title & Ministry</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Jurisdiction</th>
                    <th className="px-4 py-3">Entitlements</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2dcd0]">
                  {filteredSchemes.map((scheme) => (
                    <tr key={scheme.id} className="hover:bg-[#fcfbf7] transition">
                      <td className="px-4 py-3">
                        <div className="font-semibold text-[#2c2c2c]">{scheme.name}</div>
                        <div className="text-[11px] text-[#737067]">{scheme.ministry}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#f4f1ea] text-[#4a5d4e] border border-[#e2dcd0] text-[10px] font-medium">
                          {scheme.category}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs text-[#5c5953]">{scheme.level}</span>
                      </td>
                      <td className="px-4 py-3 text-[#737067] max-w-xs truncate">
                        {scheme.mainBenefits[0] || 'Direct benefit'}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onPreviewScheme(scheme)}
                            className="p-1.5 rounded-lg text-[#4a5d4e] hover:bg-[#edeae1] transition"
                            title="Preview Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteScheme(scheme.id, scheme.name)}
                            className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition"
                            title="Delete Scheme"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredSchemes.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-xs text-[#737067]">
                        No schemes matched your search criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Applications Telemetry */}
      {activeTab === 'applications' && (
        <div className="bg-white rounded-2xl border border-[#e2dcd0] p-6 shadow-xs space-y-4">
          <div>
            <h2 className="text-lg font-serif font-bold text-[#4a5d4e]">
              Citizen Application Status Telemetry
            </h2>
            <p className="text-xs text-[#737067]">
              Review application filings and update review status for citizen tracking.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#f4f1ea] text-[#737067] border-b border-[#e2dcd0] uppercase font-semibold text-[10px] tracking-wider">
                <tr>
                  <th className="px-4 py-3">Scheme ID</th>
                  <th className="px-4 py-3">Reference Number</th>
                  <th className="px-4 py-3">Last Updated</th>
                  <th className="px-4 py-3">Current Status</th>
                  <th className="px-4 py-3 text-right">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2dcd0]">
                {(Object.entries(applications) as [string, UserApplicationRecord][]).map(([schemeId, record]) => (
                  <tr key={schemeId} className="hover:bg-[#fcfbf7]">
                    <td className="px-4 py-3 font-semibold text-[#2c2c2c]">{schemeId}</td>
                    <td className="px-4 py-3 font-mono text-[11px] text-[#4a5d4e]">
                      {record.applicationReferenceNumber}
                    </td>
                    <td className="px-4 py-3 text-[#737067]">
                      {new Date(record.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#e8ede9] text-[#4a5d4e] border border-[#d2ddd4]">
                        {record.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <select
                        value={record.status}
                        onChange={(e) => handleUpdateApplicationStatus(schemeId, e.target.value)}
                        className="px-2 py-1 bg-[#f4f1ea] border border-[#e2dcd0] rounded-lg text-[11px] text-[#2c2c2c]"
                      >
                        <option value="Ready to Apply">Ready to Apply</option>
                        <option value="Application Submitted — Demo">Application Submitted</option>
                        <option value="Under Review — Demo">Under Review</option>
                        <option value="Completed — Demo">Approved & Completed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Public Broadcasts */}
      {activeTab === 'broadcast' && (
        <div className="bg-white rounded-2xl border border-[#e2dcd0] p-6 shadow-xs space-y-4 max-w-2xl">
          <div>
            <h2 className="text-lg font-serif font-bold text-[#4a5d4e]">
              Publish Citizen Broadcast Announcement
            </h2>
            <p className="text-xs text-[#737067]">
              This notification banner is broadcast at the top of the portal for all visiting citizens.
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-[#5c5953]">Announcement Text</label>
            <textarea
              rows={3}
              value={announcementInput}
              onChange={(e) => setAnnouncementInput(e.target.value)}
              placeholder="e.g. Special Citizen Enrollment Drive: Camps scheduled at Tehsil headquarters this week."
              className="w-full p-3 bg-[#fcfbf7] border border-[#e2dcd0] rounded-xl text-xs text-[#2c2c2c] focus:outline-hidden"
            />
          </div>

          <button
            onClick={handleSaveBroadcast}
            className="px-5 py-2.5 bg-[#4a5d4e] hover:bg-[#3d4d40] text-white text-xs font-medium rounded-full shadow-xs transition flex items-center gap-1.5"
          >
            <Megaphone className="w-3.5 h-3.5" />
            <span>Publish Announcement</span>
          </button>
        </div>
      )}

      {/* MODAL: Add New Scheme */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#2c2c2c]/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-[#fcfbf7] rounded-[32px] shadow-2xl max-w-2xl w-full border border-[#e2dcd0] overflow-hidden my-auto flex flex-col max-h-[90vh]">
            <div className="bg-[#4a5d4e] text-white px-6 py-4 flex items-center justify-between border-b border-[#3d4d40]">
              <h3 className="font-serif font-bold text-lg text-white">Publish New Public Scheme</h3>
              <button
                onClick={() => setAddModalOpen(false)}
                className="text-[#e8ede9]/80 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveNewScheme} className="p-6 space-y-4 overflow-y-auto text-xs">
              <div>
                <label className="block font-semibold text-[#5c5953] mb-1">
                  Scheme Official Name *
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. PM Surya Ghar: Muft Bijli Yojana"
                  className="w-full px-3 py-2 bg-white border border-[#e2dcd0] rounded-xl text-xs text-[#2c2c2c]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-[#5c5953] mb-1">Ministry / Dept *</label>
                  <input
                    type="text"
                    required
                    value={formMinistry}
                    onChange={(e) => setFormMinistry(e.target.value)}
                    placeholder="Ministry of New & Renewable Energy"
                    className="w-full px-3 py-2 bg-white border border-[#e2dcd0] rounded-xl text-xs text-[#2c2c2c]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#5c5953] mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as SchemeCategory)}
                    className="w-full px-3 py-2 bg-white border border-[#e2dcd0] rounded-xl text-xs text-[#2c2c2c]"
                  >
                    <option value="Social Welfare">Social Welfare</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Education">Education</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Employment">Employment</option>
                    <option value="Housing">Housing</option>
                    <option value="Financial Assistance">Financial Assistance</option>
                    <option value="Women & Child Welfare">Women & Child</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#5c5953] mb-1">Jurisdiction</label>
                  <select
                    value={formLevel}
                    onChange={(e) => setFormLevel(e.target.value as any)}
                    className="w-full px-3 py-2 bg-white border border-[#e2dcd0] rounded-xl text-xs text-[#2c2c2c]"
                  >
                    <option value="Central">Central</option>
                    <option value="State">State</option>
                    <option value="Central & State">Central & State</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#5c5953] mb-1">
                  Short Summary (Citizen Friendly) *
                </label>
                <input
                  type="text"
                  required
                  value={formShortDesc}
                  onChange={(e) => setFormShortDesc(e.target.value)}
                  placeholder="Provides up to 300 units of free electricity per month for 1 crore households via rooftop solar."
                  className="w-full px-3 py-2 bg-white border border-[#e2dcd0] rounded-xl text-xs text-[#2c2c2c]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#5c5953] mb-1">
                  Key Citizen Entitlements & Benefits (one per line)
                </label>
                <textarea
                  rows={3}
                  value={formBenefits}
                  onChange={(e) => setFormBenefits(e.target.value)}
                  placeholder="₹78,000 direct subsidy for rooftop solar installation&#10;Up to 300 units of free electricity each month&#10;Concessional low-interest collateral free bank loan"
                  className="w-full px-3 py-2 bg-white border border-[#e2dcd0] rounded-xl text-xs text-[#2c2c2c]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#5c5953] mb-1">
                  Eligibility Criteria Summary
                </label>
                <input
                  type="text"
                  value={formEligibility}
                  onChange={(e) => setFormEligibility(e.target.value)}
                  placeholder="Indian citizen with suitable roof space and active grid electricity connection."
                  className="w-full px-3 py-2 bg-white border border-[#e2dcd0] rounded-xl text-xs text-[#2c2c2c]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#5c5953] mb-1">Official Portal URL</label>
                  <input
                    type="url"
                    value={formPortalUrl}
                    onChange={(e) => setFormPortalUrl(e.target.value)}
                    placeholder="https://pmsuryaghar.gov.in"
                    className="w-full px-3 py-2 bg-white border border-[#e2dcd0] rounded-xl text-xs text-[#2c2c2c]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#5c5953] mb-1">Helpline Phone</label>
                  <input
                    type="text"
                    value={formHelpline}
                    onChange={(e) => setFormHelpline(e.target.value)}
                    placeholder="15555"
                    className="w-full px-3 py-2 bg-white border border-[#e2dcd0] rounded-xl text-xs text-[#2c2c2c]"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#e2dcd0]">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-[#e2dcd0] text-[#5c5953] hover:bg-[#edeae1]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#4a5d4e] hover:bg-[#3d4d40] text-white rounded-full font-medium"
                >
                  Publish to Public Portal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
