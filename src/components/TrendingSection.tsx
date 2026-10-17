import React, { useState } from 'react';
import { TrendingUp, ArrowUpRight, Flame, BarChart2 } from 'lucide-react';
import { Article } from '../types/news';

interface TrendingSectionProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const TrendingSection: React.FC<TrendingSectionProps> = ({
  articles,
  onSelectArticle,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filterTabs = [
    { id: 'all', label: 'Fastest Rising' },
    { id: 'india', label: 'Trending in India' },
    { id: 'global', label: 'Trending Globally' },
    { id: 'tech', label: 'Technology & AI' },
    { id: 'policy', label: 'Policy & Judiciary' },
  ];

  let filtered = [...articles];
  if (activeFilter === 'india') {
    filtered = filtered.filter((a) => a.region === 'india');
  } else if (activeFilter === 'global') {
    filtered = filtered.filter((a) => a.region === 'world');
  } else if (activeFilter === 'tech') {
    filtered = filtered.filter((a) => a.category.includes('Tech') || a.category.includes('Space'));
  } else if (activeFilter === 'policy') {
    filtered = filtered.filter((a) => a.category.includes('Judiciary') || a.category.includes('Politics'));
  }

  // Sort transparently by views / editorial salience
  const topList = filtered.slice(0, 5);

  return (
    <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/90 dark:border-stone-800 p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 font-tabular">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            Salience & Momentum
          </div>
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 font-editorial mt-0.5">
            Trending Now — Multi-Source Coverage
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Ranked transparently by verified cross-outlet coverage volume and reader dwell time.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-1 p-1 bg-stone-100 dark:bg-stone-800 rounded-lg text-xs">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                activeFilter === tab.id
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Ranked List with Clean Typography */}
      <div className="divide-y divide-stone-100 dark:divide-stone-800 mt-2">
        {topList.map((story, index) => (
          <div
            key={story.id}
            onClick={() => onSelectArticle(story)}
            className="py-3.5 flex items-start gap-4 group cursor-pointer hover:bg-stone-50/50 dark:hover:bg-stone-800/30 px-2 -mx-2 rounded-lg transition-colors"
          >
            {/* Number Rank */}
            <span className="text-2xl font-bold font-editorial text-stone-300 dark:text-stone-700 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors w-6 text-right font-tabular">
              0{index + 1}
            </span>

            <div className="flex-1">
              <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-1 font-tabular">
                <span className="font-semibold text-stone-700 dark:text-stone-300">{story.category}</span>
                <span aria-hidden="true">·</span>
                <span>{story.publisher}</span>
                <span aria-hidden="true">·</span>
                <span>{story.sourcesCount} verified sources</span>
              </div>

              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                {story.title}
              </h3>
            </div>

            <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-stone-800 dark:group-hover:text-stone-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0 mt-1" />
          </div>
        ))}
      </div>
    </div>
  );
};
