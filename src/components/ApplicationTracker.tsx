import React, { useState } from 'react';
import {
  Send,
  ExternalLink,
  CheckCircle2,
  Clock,
  Building,
  FileCheck2,
  ChevronDown,
  AlertTriangle,
  Info,
  Edit3,
  Calendar,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { GovernmentScheme, ApplicationStatusType, UserApplicationRecord } from '../types';
import { StorageService } from '../services/storageService';

interface ApplicationTrackerProps {
  schemes: GovernmentScheme[];
  selectedScheme: GovernmentScheme;
  onSelectScheme: (scheme: GovernmentScheme) => void;
  onOpenDocuments: (scheme: GovernmentScheme) => void;
  onOpenAiExplainer: (scheme: GovernmentScheme) => void;
}

const STATUS_PIPELINE: {
  status: ApplicationStatusType;
  label: string;
  description: string;
  badgeColor: string;
}[] = [
  {
    status: 'Not Started',
    label: 'Not Started',
    description: 'You have not yet begun preparing or reviewing the scheme requirements.',
    badgeColor: 'bg-slate-100 text-slate-700 border-slate-200'
  },
  {
    status: 'Application Guidance Viewed',
    label: 'Guidance Viewed',
    description: 'You have reviewed official steps, required documents, and eligibility rules.',
    badgeColor: 'bg-blue-50 text-blue-800 border-blue-200'
  },
  {
    status: 'Ready to Apply',
    label: 'Ready to Apply',
    description: 'All mandatory documents are organized and verified. Prepared for portal submission.',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200'
  },
  {
    status: 'Application Submitted — Demo',
    label: 'Submitted (Demo)',
    description: 'Simulated submission via official portal or Common Service Centre (CSC).',
    badgeColor: 'bg-purple-50 text-purple-800 border-purple-200'
  },
  {
    status: 'Under Review — Demo',
    label: 'Under Review (Demo)',
    description: 'Simulated scrutiny by District Nodal Officer or Tahsildar revenue office.',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200'
  },
  {
    status: 'Completed — Demo',
    label: 'Completed / Sanctioned (Demo)',
    description: 'Simulated completion with Direct Benefit Transfer (DBT) or entitlement approval.',
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
  }
];

export const ApplicationTracker: React.FC<ApplicationTrackerProps> = ({
  schemes,
  selectedScheme,
  onSelectScheme,
  onOpenDocuments,
  onOpenAiExplainer
}) => {
  const [records, setRecords] = useState<Record<string, UserApplicationRecord>>(
    StorageService.getApplicationRecords()
  );
  const [editingNotes, setEditingNotes] = useState(false);
  const [notesInput, setNotesInput] = useState('');

  const currentRecord: UserApplicationRecord = records[selectedScheme.id] || {
    schemeId: selectedScheme.id,
    status: 'Application Guidance Viewed',
    applicationReferenceNumber: `CG-DEMO-${Math.floor(1000 + Math.random() * 9000)}`,
    updatedAt: new Date().toISOString(),
    notes: 'Viewed official guidance on CivicGuide platform.'
  };

  const currentStatusIndex = STATUS_PIPELINE.findIndex((p) => p.status === currentRecord.status);

  const handleUpdateStatus = (newStatus: ApplicationStatusType) => {
    const updated: UserApplicationRecord = {
      ...currentRecord,
      status: newStatus,
      updatedAt: new Date().toISOString()
    };
    StorageService.saveApplicationRecord(updated);
    setRecords(StorageService.getApplicationRecords());
  };

  const handleSaveNotes = () => {
    const updated: UserApplicationRecord = {
      ...currentRecord,
      notes: notesInput,
      updatedAt: new Date().toISOString()
    };
    StorageService.saveApplicationRecord(updated);
    setRecords(StorageService.getApplicationRecords());
    setEditingNotes(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-[32px] p-6 sm:p-8 shadow-xs border border-[#e2dcd0]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8ede9] text-[#4a5d4e] text-xs font-semibold mb-2">
              <Send className="w-3.5 h-3.5 text-[#4a5d4e]" />
              <span>Official Guidance & Process Simulation</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#4a5d4e] tracking-tight">
              Application Information & Status Tracker
            </h1>
            <p className="text-xs text-[#737067] mt-1">
              Follow official departmental steps and track your personal application milestones.
            </p>
          </div>

          {/* Scheme Switcher */}
          <div className="sm:w-80">
            <label className="block text-[11px] font-bold text-[#737067] uppercase tracking-wider mb-1">
              Select Scheme:
            </label>
            <div className="relative">
              <select
                value={selectedScheme.id}
                onChange={(e) => {
                  const target = schemes.find((s) => s.id === e.target.value);
                  if (target) onSelectScheme(target);
                }}
                className="w-full bg-[#fdfcf9] border border-[#e2dcd0] rounded-xl px-3 py-2 text-xs sm:text-sm font-medium text-[#2c2c2c] focus:outline-none focus:ring-2 focus:ring-[#8ca38f] appearance-none pr-8 truncate"
              >
                {schemes.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-[#737067] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Demo Status Tracker Milestone Card */}
      <div className="bg-white rounded-[28px] p-6 sm:p-8 shadow-xs border border-[#e2dcd0] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#e2dcd0]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#737067] uppercase tracking-wider">
                Simulated Application Tracker
              </span>
              <span className="text-[10px] font-bold bg-[#fbf5f0] text-[#c87a53] px-2 py-0.5 rounded-full border border-[#f0ded5]">
                Demo MVP
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#2c2c2c] mt-1">
              Current Status:{' '}
              <span className="text-[#4a5d4e]">{currentRecord.status}</span>
            </h2>
            <div className="text-xs text-[#737067] mt-1 flex items-center gap-3">
              <span>Ref ID: <strong className="font-mono text-[#2c2c2c]">{currentRecord.applicationReferenceNumber}</strong></span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#8ca38f]" />
                Updated {new Date(currentRecord.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenDocuments(selectedScheme)}
              className="px-3.5 py-1.5 bg-[#f4f1ea] hover:bg-[#edeae1] text-[#4a5d4e] text-xs font-medium rounded-full flex items-center gap-1.5 transition"
            >
              <FileCheck2 className="w-3.5 h-3.5 text-[#8ca38f]" />
              <span>Check Documents</span>
            </button>
            <button
              onClick={() => onOpenAiExplainer(selectedScheme)}
              className="px-3.5 py-1.5 bg-[#fbf5f0] hover:bg-[#f5e6de] text-[#c87a53] border border-[#f0ded5] text-xs font-medium rounded-full flex items-center gap-1.5 transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#c87a53]" />
              <span>AI Walkthrough</span>
            </button>
          </div>
        </div>

        {/* Interactive Stepper Pipeline */}
        <div>
          <div className="text-xs font-bold text-[#4a5d4e] mb-3">
            Update Your Application Stage (Click any milestone to simulate progress):
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {STATUS_PIPELINE.map((pipe, idx) => {
              const isSelected = pipe.status === currentRecord.status;
              const isPast = idx < currentStatusIndex;

              return (
                <button
                  key={pipe.status}
                  onClick={() => handleUpdateStatus(pipe.status)}
                  className={`p-3.5 rounded-2xl border text-left transition flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#4a5d4e] bg-[#e8ede9] ring-2 ring-[#4a5d4e]/20'
                      : isPast
                      ? 'border-[#8ca38f] bg-[#e8ede9]/40'
                      : 'border-[#e2dcd0] hover:border-[#8ca38f] bg-[#f9f7f2]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-[#737067]">
                      Phase {idx + 1}
                    </span>
                    {isSelected || isPast ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#4a5d4e]" />
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border border-[#d2ddd4]" />
                    )}
                  </div>
                  <div className="font-bold text-xs text-[#2c2c2c] leading-tight">
                    {pipe.label}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Milestone Description & Citizen Notes */}
        <div className="p-4 sm:p-5 bg-[#f9f7f2] rounded-2xl border border-[#e2dcd0] flex flex-col sm:flex-row items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-bold text-[#4a5d4e]">
              Stage Explanation:
            </div>
            <p className="text-xs text-[#5c5953] leading-relaxed">
              {STATUS_PIPELINE[currentStatusIndex]?.description || ''}
            </p>
            {currentRecord.notes && (
              <div className="pt-2 text-xs text-[#2c2c2c]">
                <strong>Citizen Log:</strong> <em>"{currentRecord.notes}"</em>
              </div>
            )}
          </div>

          <div className="shrink-0">
            {!editingNotes ? (
              <button
                onClick={() => {
                  setNotesInput(currentRecord.notes || '');
                  setEditingNotes(true);
                }}
                className="text-xs font-semibold text-[#c87a53] hover:text-[#b56b46] flex items-center gap-1"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{currentRecord.notes ? 'Edit Personal Log' : 'Add Note'}</span>
              </button>
            ) : (
              <div className="space-y-2 w-64">
                <textarea
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
                  placeholder="e.g. Visited CSC on Monday. Verified biometric."
                  className="w-full text-xs p-2.5 border border-[#e2dcd0] rounded-xl bg-white text-[#2c2c2c] focus:outline-none focus:ring-1 focus:ring-[#8ca38f]"
                  rows={2}
                />
                <div className="flex items-center gap-2 justify-end">
                  <button
                    onClick={() => setEditingNotes(false)}
                    className="text-xs text-[#737067] hover:text-[#2c2c2c]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveNotes}
                    className="px-3 py-1 bg-[#4a5d4e] text-white rounded-full text-xs font-medium"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Important Disclaimer Notice */}
        <div className="p-4 bg-[#fbf5f0] border border-[#f0ded5] rounded-2xl text-[11px] text-[#737067] flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-[#c87a53] shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-[#c87a53]">MVP Demonstration Notice:</strong> This application tracker operates using local browser storage for student demonstration purposes. It is not connected to live official government registries. Actual submission status must be verified on the official department portal.
          </div>
        </div>
      </div>

      {/* Official Application Guidance Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Step-by-Step Procedure */}
        <div className="lg:col-span-2 bg-white rounded-[28px] p-6 sm:p-8 shadow-xs border border-[#e2dcd0] space-y-6">
          <div>
            <h3 className="text-base font-serif font-bold text-[#4a5d4e] mb-1">
              Official Application Steps ({selectedScheme.applicationGuidance.applicationMethod})
            </h3>
            <p className="text-xs text-[#737067]">
              Authorized steps published by {selectedScheme.ministry}.
            </p>
          </div>

          <div className="space-y-3">
            {selectedScheme.applicationGuidance.steps.map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3.5 p-4 bg-[#f9f7f2] rounded-2xl border border-[#e2dcd0]"
              >
                <div className="w-6 h-6 rounded-full bg-[#4a5d4e] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <div className="text-xs text-[#5c5953] leading-relaxed font-medium">
                  {step}
                </div>
              </div>
            ))}
          </div>

          {/* Important Instructions & Precautions */}
          <div className="pt-4 border-t border-[#e2dcd0]">
            <h4 className="text-xs font-bold text-[#4a5d4e] uppercase tracking-wider mb-2.5">
              Important Instructions & Warnings:
            </h4>
            <ul className="space-y-2 text-xs text-[#737067]">
              {selectedScheme.applicationGuidance.importantInstructions.map((inst, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#c87a53] font-bold shrink-0">⚠️</span>
                  <span>{inst}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right 1 Col: Department Metadata & Portal Card */}
        <div className="space-y-4">
          <div className="bg-[#4a5d4e] text-white rounded-[28px] p-6 sm:p-8 shadow-sm border border-[#3d4d40] space-y-5">
            <h3 className="text-xs font-bold text-[#8ca38f] uppercase tracking-wider">
              Official Access Portal
            </h3>

            <div>
              <div className="text-xs text-[#e8ede9]/80">Designated Portal:</div>
              <div className="text-sm font-serif font-bold text-white mt-1">
                {selectedScheme.applicationGuidance.officialPortalName}
              </div>
            </div>

            <div>
              <div className="text-xs text-[#e8ede9]/80">Application Fee:</div>
              <div className="text-sm font-serif font-bold text-[#fcfbf7] mt-1">
                {selectedScheme.applicationGuidance.fee}
              </div>
            </div>

            <div>
              <div className="text-xs text-[#e8ede9]/80">Expected Processing Time:</div>
              <div className="text-sm font-medium text-[#fcfbf7] mt-1">
                {selectedScheme.applicationGuidance.processingTimeline}
              </div>
            </div>

            <div>
              <div className="text-xs text-[#e8ede9]/80">Nodal Helpline:</div>
              <div className="text-sm font-serif font-bold text-[#fcfbf7] mt-1 flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-[#8ca38f]" />
                <span>{selectedScheme.applicationGuidance.helpline}</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={selectedScheme.applicationGuidance.officialPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-[#c87a53] hover:bg-[#b56b46] text-white rounded-full text-xs font-medium flex items-center justify-center gap-2 shadow-xs transition"
              >
                <span>Visit Official Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <p className="text-[10px] text-[#e8ede9]/70 text-center mt-2">
                External government link opens in new tab
              </p>
            </div>
          </div>

          <div className="bg-[#e8ede9] border border-[#d2ddd4] rounded-[24px] p-5 sm:p-6 text-[#4a5d4e] text-xs space-y-2">
            <strong className="block font-bold">Need Help Navigating?</strong>
            <p className="text-[#4a5d4e]/90 leading-relaxed">
              If you don't have internet access or a personal computer, visit your nearest <strong>Common Service Centre (CSC)</strong> or Village Panchayat Digital Service Kiosk where village level entrepreneurs assist citizens for nominal statutory fees.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
