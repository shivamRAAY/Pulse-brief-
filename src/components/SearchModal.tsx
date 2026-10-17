import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, ArrowRight, Tag, Filter, CheckCircle2 } from 'lucide-react';
import { Article, Region } from '../types/news';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  articles,
  onSelectArticle,
}) => {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Supreme Court constitution bench',
    'Gaganyaan ISRO mission',
    'Semiconductor fab Dholera',
    'Thar renewable energy',
    'IMEC logistics charter',
  ]);
  const [selectedRegion, setSelectedRegion] = useState<Region>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter against real indexed news data
  const trimmed = query.trim().toLowerCase();
  let results: Article[] = [];

  if (trimmed) {
    results = articles.filter((a) => {
      const matchText =
        a.title.toLowerCase().includes(trimmed) ||
        a.summary.toLowerCase().includes(trimmed) ||
        a.publisher.toLowerCase().includes(trimmed) ||
        a.tags.some((t) => t.toLowerCase().includes(trimmed)) ||
        a.examRelevance.keyTerms.some((k) => k.toLowerCase().includes(trimmed)) ||
        a.category.toLowerCase().includes(trimmed);

      const matchRegion = selectedRegion === 'all' || a.region === selectedRegion;
      const matchCat = selectedCategory === 'all' || a.category.toLowerCase().includes(selectedCategory.toLowerCase());

      return matchText && matchRegion && matchCat;
    });
  }

  const handleExecuteQuery = (text: string) => {
    setQuery(text);
    if (!recentSearches.includes(text)) {
      setRecentSearches((prev) => [text, ...prev.slice(0, 4)]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex justify-center p-4 sm:p-8 animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden my-auto max-h-[85vh] flex flex-col">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search verified news, Supreme Court rulings, ISRO missions, schemes..."
            className="flex-1 bg-transparent text-sm sm:text-base text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs text-stone-500 bg-stone-100 dark:bg-stone-800 rounded font-tabular"
          >
            ESC
          </button>
        </div>

        {/* Quick Filter Bar */}
        <div className="px-4 py-2 bg-stone-50 dark:bg-stone-900/60 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-stone-400">Geography:</span>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value as Region)}
              className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-2 py-0.5 rounded text-stone-700 dark:text-stone-300 font-medium"
            >
              <option value="all">All</option>
              <option value="india">India Only</option>
              <option value="world">World Only</option>
            </select>
          </div>

          <div className="text-stone-400 font-tabular">
            {trimmed ? `${results.length} matches` : 'Indexed across verified archives'}
          </div>
        </div>

        {/* Search Body Content */}
        <div className="overflow-y-auto p-4 flex-1 space-y-4">
          
          {/* Recent & Suggested Searches when empty */}
          {!trimmed && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-400 uppercase tracking-wider font-tabular mb-2">
                <Clock className="w-3.5 h-3.5" />
                <span>Popular & Recent Inquiries</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {recentSearches.map((topic, i) => (
                  <button
                    key={i}
                    onClick={() => handleExecuteQuery(topic)}
                    className="px-3 py-1.5 bg-stone-100 dark:bg-stone-800/80 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-lg text-xs transition-colors text-left"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results List */}
          {trimmed && results.length > 0 && (
            <div className="divide-y divide-stone-100 dark:divide-stone-800">
              {results.map((article) => {
                const dateStr = new Date(article.publishedAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                });
                return (
                  <div
                    key={article.id}
                    onClick={() => {
                      onSelectArticle(article);
                      onClose();
                    }}
                    className="py-3 px-2 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-800/50 cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-2 text-[11px] text-stone-400 font-tabular mb-1">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">{article.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{article.publisher}</span>
                      <span aria-hidden="true">·</span>
                      <span>{dateStr}</span>
                    </div>
                    <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 leading-snug">
                      {article.title}
                    </h4>
                    <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1 mt-1">
                      {article.summary}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {/* No results state */}
          {trimmed && results.length === 0 && (
            <div className="py-12 text-center text-stone-400">
              <p className="text-sm font-medium text-stone-700 dark:text-stone-300">
                No matching verified reporting found for "{query}"
              </p>
              <p className="text-xs mt-1 text-stone-400">
                Try searching broad terms like "ISRO", "Supreme Court", "Solar", "Semiconductor", or "RBI".
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
