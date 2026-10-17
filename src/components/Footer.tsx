import React from 'react';
import { ShieldCheck, Globe, BookOpen, ExternalLink } from 'lucide-react';

interface FooterProps {
  onOpenCredibility: () => void;
  onSelectCategory: (cat: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenCredibility,
  onSelectCategory,
}) => {
  return (
    <footer className="mt-20 border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 py-12 text-stone-600 dark:text-stone-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-xs">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                PB
              </div>
              <span className="text-base font-bold text-stone-900 dark:text-stone-100 font-editorial">
                PulseBrief
              </span>
            </div>
            <p className="text-stone-500 leading-relaxed">
              India First. World In Focus.
              <br />
              High-yield current affairs, verified reporting, and competitive exam intelligence.
            </p>
          </div>

          {/* Quick Categories */}
          <div className="space-y-2">
            <h5 className="font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider text-[11px] font-tabular">
              Priority Desks
            </h5>
            <ul className="space-y-1.5 text-stone-500">
              <li>
                <button
                  onClick={() => onSelectCategory('parliament-and-judiciary')}
                  className="hover:text-stone-900 dark:hover:text-stone-200 transition-colors"
                >
                  Parliament & Judiciary
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('science-and-space')}
                  className="hover:text-stone-900 dark:hover:text-stone-200 transition-colors"
                >
                  Science, Space & ISRO
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('economy-and-finance')}
                  className="hover:text-stone-900 dark:hover:text-stone-200 transition-colors"
                >
                  Economy & Monetary Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('artificial-intelligence-and-technology')}
                  className="hover:text-stone-900 dark:hover:text-stone-200 transition-colors"
                >
                  AI Mission & Semiconductor
                </button>
              </li>
            </ul>
          </div>

          {/* Aspirant Hub */}
          <div className="space-y-2">
            <h5 className="font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider text-[11px] font-tabular">
              Aspirants & Exams
            </h5>
            <ul className="space-y-1.5 text-stone-500">
              <li>UPSC Civil Services (GS I-IV)</li>
              <li>State Public Service Commissions (PCS)</li>
              <li>Banking Exams (RBI / SBI / IBPS)</li>
              <li>Static GK & Constitutional Precedents</li>
              <li>Government Welfare Schemes Compendium</li>
            </ul>
          </div>

          {/* Integrity & Attribution */}
          <div className="space-y-2">
            <h5 className="font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider text-[11px] font-tabular">
              Trust & Standards
            </h5>
            <ul className="space-y-1.5 text-stone-500">
              <li>
                <button
                  onClick={onOpenCredibility}
                  className="hover:text-stone-900 dark:hover:text-stone-200 transition-colors flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-medium"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verification Charter</span>
                </button>
              </li>
              <li>Official PIB & Gazette Attribution</li>
              <li>Non-Partisan Editorial Principles</li>
              <li>Zero Speculation Policy</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400 font-tabular">
          <div>
            © 2026 PulseBrief Intelligence. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>IST (UTC+05:30)</span>
            <span>Indian & Global Affairs</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
