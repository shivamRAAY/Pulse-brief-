import React from 'react';
import { X, ShieldCheck, CheckCircle2, AlertTriangle, ExternalLink, Scale, Building2 } from 'lucide-react';

interface SourcesCredibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SourcesCredibilityModal: React.FC<SourcesCredibilityModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex justify-center p-4 sm:p-8 animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden my-auto max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-editorial">
                Editorial Credibility & Verification Charter
              </h3>
              <p className="text-xs text-stone-500">
                PulseBrief Standards of Attribution & Factual Integrity
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-6 text-xs text-stone-700 dark:text-stone-300 leading-relaxed font-sans">
          
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 font-editorial">
              1. Primary Source Attribution
            </h4>
            <p>
              Every news card and intelligence briefing on PulseBrief provides direct, clickable attribution to the original publisher, official gazette, or primary reporting wire (e.g., Press Information Bureau - PIB, Supreme Court of India Registry, Reserve Bank of India, ISRO, Reuters, or The Hindu). We never reproduce proprietary paywalled text in full; instead, we provide verified editorial summaries and direct links to the publisher.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 font-editorial">
              2. Factual Distinction vs Speculation
            </h4>
            <p>
              PulseBrief strictly segregates verified official communiqués, gazette notifications, and judicial rulings from analytical commentary. When reports are developing or contradictory between agencies, our intelligence engine explicitly tags the story status as <em>Developing</em> or <em>Analysis</em>.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 font-editorial">
              3. Verification Badges Explained
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-stone-50 dark:bg-stone-800/60 rounded-lg border border-stone-200 dark:border-stone-700">
                <div className="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Official Release</span>
                </div>
                <div className="text-[11px] text-stone-500">
                  Direct government notifications, gazettes, Supreme Court orders, or official space agency bulletins.
                </div>
              </div>

              <div className="p-3 bg-stone-50 dark:bg-stone-800/60 rounded-lg border border-stone-200 dark:border-stone-700">
                <div className="flex items-center gap-1.5 font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                  <Building2 className="w-4 h-4" />
                  <span>Multi-Source Verified</span>
                </div>
                <div className="text-[11px] text-stone-500">
                  Cross-verified by 3+ independent journalistic wire agencies and accredited press correspondents.
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 font-editorial">
              4. Corrections & Transparent Retractions
            </h4>
            <p>
              If a news organization or government ministry amends a prior statistical estimate or statement, PulseBrief logs a timestamped update on the article's detail page, preserving the historical provenance.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
