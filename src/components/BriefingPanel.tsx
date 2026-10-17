import React, { useState } from 'react';
import { ExternalLink, CheckCircle2, ChevronRight, Bookmark } from 'lucide-react';
import { BriefingItem } from '../types/news';

interface BriefingPanelProps {
  indiaBriefings: BriefingItem[];
  worldBriefings: BriefingItem[];
  onOpenArticleByTitle?: (title: string) => void;
}

export const BriefingPanel: React.FC<BriefingPanelProps> = ({
  indiaBriefings,
  worldBriefings,
  onOpenArticleByTitle,
}) => {
  const [activeTab, setActiveTab] = useState<'india' | 'world'>('india');

  const currentItems = activeTab === 'india' ? indiaBriefings : worldBriefings;

  return (
    <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/90 dark:border-stone-800 p-6 shadow-xs">
      {/* Header and Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-tabular">
            Executive Briefing
          </div>
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 font-editorial mt-0.5">
            {activeTab === 'india' ? 'India Today — National Digest' : 'World Briefing — Strategic Affairs'}
          </h2>
        </div>

        {/* Segmented Tab Control */}
        <div className="flex p-1 bg-stone-100 dark:bg-stone-800 rounded-lg text-xs">
          <button
            onClick={() => setActiveTab('india')}
            className={`px-3.5 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === 'india'
                ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            India Digest ({indiaBriefings.length})
          </button>
          <button
            onClick={() => setActiveTab('world')}
            className={`px-3.5 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === 'world'
                ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            World Digest ({worldBriefings.length})
          </button>
        </div>
      </div>

      {/* Briefings List */}
      <div className="divide-y divide-stone-100 dark:divide-stone-800 mt-2">
        {currentItems.map((item, index) => (
          <div
            key={item.id}
            className="py-4 first:pt-3 last:pb-1 group hover:bg-stone-50/50 dark:hover:bg-stone-800/30 px-2 -mx-2 rounded-lg transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                {/* Zero-Pill Unboxed Metadata */}
                <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-1 font-tabular">
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400">{item.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.publisher}</span>
                  {item.badge && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">{item.badge}</span>
                    </>
                  )}
                </div>

                <h3
                  onClick={() => onOpenArticleByTitle?.(item.title)}
                  className="text-sm font-bold text-stone-900 dark:text-stone-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 cursor-pointer transition-colors leading-snug"
                >
                  {item.title}
                </h3>

                <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              {/* Source Link */}
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                title="Open primary publisher source"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
