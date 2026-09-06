import React, { useState } from 'react';
import {
  FileCheck2,
  CheckCircle2,
  Clock,
  RotateCcw,
  ShieldCheck,
  ChevronDown,
  Info,
  Building,
  Sparkles,
  Send,
  Check
} from 'lucide-react';
import { GovernmentScheme } from '../types';
import { StorageService } from '../services/storageService';

interface DocumentsChecklistProps {
  schemes: GovernmentScheme[];
  selectedScheme: GovernmentScheme;
  onSelectScheme: (scheme: GovernmentScheme) => void;
  onNavigateToApply: (scheme: GovernmentScheme) => void;
}

export const DocumentsChecklist: React.FC<DocumentsChecklistProps> = ({
  schemes,
  selectedScheme,
  onSelectScheme,
  onNavigateToApply
}) => {
  const [docStatusMap, setDocStatusMap] = useState(StorageService.getDocumentStatusMap());

  const currentSchemeDocs = docStatusMap[selectedScheme.id] || {};

  // Calculate stats
  const totalDocs = selectedScheme.requiredDocuments.length;
  const availableCount = selectedScheme.requiredDocuments.filter(
    (doc) => currentSchemeDocs[doc.id] === 'available'
  ).length;
  const mandatoryDocs = selectedScheme.requiredDocuments.filter((d) => d.mandatory);
  const mandatoryAvailableCount = mandatoryDocs.filter(
    (doc) => currentSchemeDocs[doc.id] === 'available'
  ).length;

  const percentage = totalDocs > 0 ? Math.round((availableCount / totalDocs) * 100) : 0;
  const isReady = mandatoryDocs.length > 0 && mandatoryAvailableCount === mandatoryDocs.length;

  const handleToggleStatus = (docId: string, current: 'available' | 'pending' | undefined) => {
    const nextStatus = current === 'available' ? 'pending' : 'available';
    StorageService.saveDocumentStatus(selectedScheme.id, docId, nextStatus);
    setDocStatusMap(StorageService.getDocumentStatusMap());
  };

  const handleMarkAllAvailable = () => {
    selectedScheme.requiredDocuments.forEach((doc) => {
      StorageService.saveDocumentStatus(selectedScheme.id, doc.id, 'available');
    });
    setDocStatusMap(StorageService.getDocumentStatusMap());
  };

  const handleResetChecklist = () => {
    StorageService.resetSchemeDocuments(selectedScheme.id);
    setDocStatusMap(StorageService.getDocumentStatusMap());
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-[32px] p-6 sm:p-8 shadow-xs border border-[#e2dcd0]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8ede9] text-[#4a5d4e] text-xs font-semibold mb-2 border border-[#d2ddd4]">
              <FileCheck2 className="w-3.5 h-3.5 text-[#4a5d4e]" />
              <span>Offline Readiness Tracker</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#4a5d4e] tracking-tight">
              Required Documents Checklist
            </h1>
            <p className="text-xs text-[#737067] mt-1">
              Track your paperwork readiness before applying. Changes are saved automatically in your browser.
            </p>
          </div>

          {/* Scheme Switcher Dropdown */}
          <div className="sm:w-80">
            <label className="block text-[11px] font-bold text-[#737067] uppercase tracking-wider mb-1">
              Select Scheme to Check:
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

      {/* Progress Card */}
      <div className="bg-[#4a5d4e] text-white rounded-[28px] p-6 sm:p-8 shadow-md border border-[#3d4d40]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <span className="text-xs font-bold text-[#8ca38f] uppercase tracking-wider">
              {selectedScheme.category} Scheme
            </span>
            <h2 className="text-lg sm:text-xl font-serif font-bold mt-1 text-white">
              {selectedScheme.name}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-2xl font-serif font-bold text-[#fcfbf7]">{percentage}%</div>
              <div className="text-xs text-[#e8ede9]/80">
                {availableCount} of {totalDocs} Documents Ready
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#3a493d] h-2.5 rounded-full overflow-hidden mb-5">
          <div
            className="bg-[#c87a53] h-full transition-all duration-300 ease-out rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Readiness Status Notification */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-[#5c6f60]">
          <div className="flex items-center gap-2 text-xs">
            {isReady ? (
              <span className="inline-flex items-center gap-1.5 text-white font-medium bg-[#3a493d] border border-[#8ca38f]/50 px-3 py-1.5 rounded-full">
                <CheckCircle2 className="w-4 h-4 text-[#8ca38f]" />
                All mandatory documents available! You are ready to apply.
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-[#fcfbf7] font-medium bg-[#3a493d] border border-[#8ca38f]/40 px-3 py-1.5 rounded-full">
                <Clock className="w-4 h-4 text-[#c87a53]" />
                {mandatoryDocs.length - mandatoryAvailableCount} mandatory documents still pending.
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleMarkAllAvailable}
              className="px-3.5 py-1.5 bg-[#3a493d] hover:bg-[#2e3b31] text-[#fcfbf7] text-xs font-medium rounded-full border border-[#5c6f60] transition"
            >
              Mark All as Available
            </button>
            <button
              onClick={handleResetChecklist}
              className="px-3.5 py-1.5 bg-[#3a493d] hover:bg-[#2e3b31] text-[#e8ede9] text-xs font-medium rounded-full border border-[#5c6f60] transition flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Documents List */}
      <div className="bg-white rounded-[28px] shadow-xs border border-[#e2dcd0] overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-[#e2dcd0] bg-[#f9f7f2] flex items-center justify-between">
          <h3 className="text-sm font-serif font-bold text-[#4a5d4e]">
            Document Inventory ({selectedScheme.requiredDocuments.length} Items)
          </h3>
          <span className="text-xs text-[#737067]">
            Click on any document card to toggle status
          </span>
        </div>

        <div className="divide-y divide-[#e2dcd0]">
          {selectedScheme.requiredDocuments.map((doc) => {
            const status = currentSchemeDocs[doc.id] || 'pending';
            const isAvailable = status === 'available';

            return (
              <div
                key={doc.id}
                onClick={() => handleToggleStatus(doc.id, status)}
                className={`p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer transition ${
                  isAvailable ? 'bg-[#e8ede9]/25 hover:bg-[#e8ede9]/50' : 'hover:bg-[#fbfbf9]'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  {/* Status Checkbox / Icon */}
                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition ${
                      isAvailable
                        ? 'bg-[#4a5d4e] text-white shadow-xs'
                        : 'border-2 border-[#e2dcd0] bg-white text-transparent'
                    }`}
                  >
                    <Check className="w-4 h-4" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4
                        className={`text-sm font-serif font-bold ${
                          isAvailable ? 'text-[#4a5d4e]' : 'text-[#2c2c2c]'
                        }`}
                      >
                        {doc.name}
                      </h4>
                      {doc.mandatory ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#fbf5f0] text-[#c87a53] border border-[#f0ded5]">
                          Mandatory
                        </span>
                      ) : (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-[#f4f1ea] text-[#737067]">
                          Optional / Conditional
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-[#737067] mt-1.5 leading-relaxed">
                      {doc.description}
                    </p>

                    {doc.issuingAuthority && (
                      <div className="mt-2.5 text-[11px] text-[#737067] flex items-center gap-1.5">
                        <Building className="w-3 h-3 text-[#8ca38f]" />
                        <span>Issuing Office: <strong className="text-[#5c5953]">{doc.issuingAuthority}</strong></span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Status Badge */}
                <div className="shrink-0 text-right">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${
                      isAvailable
                        ? 'bg-[#e8ede9] text-[#4a5d4e]'
                        : 'bg-[#fbf5f0] text-[#c87a53] border border-[#f0ded5]'
                    }`}
                  >
                    {isAvailable ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#4a5d4e]" />
                        <span>Available</span>
                      </>
                    ) : (
                      <>
                        <Clock className="w-3.5 h-3.5 text-[#c87a53]" />
                        <span>Pending</span>
                      </>
                    )}
                  </span>
                  <div className="text-[10px] text-[#737067] mt-1.5">Tap to toggle</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Guidance */}
        <div className="p-5 sm:p-6 bg-[#f9f7f2] border-t border-[#e2dcd0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-[#5c5953]">
            <ShieldCheck className="w-4 h-4 text-[#4a5d4e] shrink-0" />
            <span>
              <strong>Privacy Assurance:</strong> CivicGuide does not ask for or store uploaded copies of any personal identity documents.
            </span>
          </div>

          <button
            onClick={() => onNavigateToApply(selectedScheme)}
            className="px-4 py-2.5 bg-[#c87a53] hover:bg-[#b56b46] text-white rounded-full text-xs font-medium shadow-xs transition flex items-center justify-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Proceed to Application Guidance</span>
          </button>
        </div>
      </div>
    </div>
  );
};
