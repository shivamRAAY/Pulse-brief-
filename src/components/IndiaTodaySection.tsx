import React from 'react';
import { ArrowRight, Bookmark, Sparkles, MapPin, CheckCircle2, ChevronRight, FileText } from 'lucide-react';
import { Article, LanguageCode } from '../types/news';

interface IndiaTodaySectionProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (id: string) => void;
  languageMode?: LanguageCode;
}

export const IndiaTodaySection: React.FC<IndiaTodaySectionProps> = ({
  articles,
  onSelectArticle,
  isBookmarked,
  onToggleBookmark,
  languageMode = 'en',
}) => {
  const isHindi = languageMode === 'hi';
  const isBilingual = languageMode === 'bilingual';

  const indiaArticles = articles.filter((a) => a.region === 'india' || !a.region);
  const featuredIndia = indiaArticles[0];
  const secondaryIndia = indiaArticles.slice(1, 3);
  const wireIndia = indiaArticles.slice(3, 7);

  const getTitle = (art?: Article) => {
    if (!art) return '';
    if (isHindi && art.hindiTitle) return art.hindiTitle;
    return art.title;
  };

  const getSummary = (art?: Article) => {
    if (!art) return '';
    if (isHindi && art.hindiSummary) return art.hindiSummary;
    return art.summary;
  };

  if (!featuredIndia) return null;

  return (
    <section className="w-full bg-[#FBF9F5] dark:bg-[#121316] text-[#12110F] dark:text-[#F3EFE9] transition-colors py-8 border-t border-stone-300/80 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b-2 border-stone-900 dark:border-stone-700 pb-3">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-indigo-900 dark:text-indigo-400 font-bold">
              PRIORITY NATIONAL DESK · INDIA TODAY
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-stone-950 dark:text-stone-50 mt-0.5">
              Sovereign Affairs, Policy & Strategic Growth
            </h2>
          </div>

          <div className="text-xs font-mono text-stone-500">
            {indiaArticles.length} Verified Reports · New Delhi, Bengaluru, Sriharikota
          </div>
        </div>

        {/* Varied Editorial Grid: 3 Distinct Column Styles */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Featured In-Depth Indian Dispatch (5 cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-[#181B21] border border-stone-300/90 dark:border-stone-800 p-5 rounded-sm space-y-4 shadow-xs">
            <div className="flex items-center justify-between text-xs font-mono text-stone-500">
              <span className="font-semibold text-stone-900 dark:text-stone-200 uppercase">{featuredIndia.category}</span>
              <span>{featuredIndia.publisher}</span>
            </div>

            {featuredIndia.imageUrl && (
              <div
                onClick={() => onSelectArticle(featuredIndia)}
                className="w-full aspect-[16/10] overflow-hidden rounded-xs bg-stone-100 dark:bg-stone-900 cursor-pointer group"
              >
                <img
                  src={featuredIndia.imageUrl}
                  alt={featuredIndia.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            )}

            <div className="space-y-2">
              <h3
                onClick={() => onSelectArticle(featuredIndia)}
                className="text-xl sm:text-2xl font-serif font-bold text-stone-950 dark:text-stone-50 hover:text-indigo-900 dark:hover:text-indigo-300 cursor-pointer transition-colors leading-snug"
              >
                {getTitle(featuredIndia)}
              </h3>

              {isBilingual && featuredIndia.hindiTitle && (
                <p className="text-sm font-hindi text-stone-600 dark:text-stone-300">
                  {featuredIndia.hindiTitle}
                </p>
              )}

              <p className="text-sm font-serif text-stone-700 dark:text-stone-300 leading-relaxed">
                {getSummary(featuredIndia)}
              </p>
            </div>

            <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs font-mono">
              <button
                onClick={() => onSelectArticle(featuredIndia)}
                className="font-bold text-stone-900 dark:text-stone-200 hover:text-indigo-800 transition-colors flex items-center gap-1"
              >
                <span>Read Full Coverage</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onToggleBookmark(featuredIndia.id)}
                className="p-1.5 hover:bg-stone-100 dark:hover:bg-stone-800 rounded transition-colors text-stone-600 dark:text-stone-400"
                title="Save story"
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked(featuredIndia.id) ? 'fill-indigo-900 text-indigo-900 dark:fill-indigo-400' : ''}`} />
              </button>
            </div>
          </div>

          {/* Column 2: Analytical Focus & Commentary Cards (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {secondaryIndia.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectArticle(item)}
                className="bg-white dark:bg-[#181B21] border border-stone-300/90 dark:border-stone-800 p-4 rounded-sm hover:border-stone-900 dark:hover:border-stone-600 cursor-pointer transition-all space-y-2.5"
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-stone-500">
                  <span className="uppercase font-semibold text-indigo-900 dark:text-indigo-400">{item.category}</span>
                  <span>{item.readingTimeMinutes} min read</span>
                </div>

                <h4 className="text-base font-serif font-bold text-stone-950 dark:text-stone-100 hover:text-indigo-900 dark:hover:text-indigo-300 transition-colors leading-snug">
                  {getTitle(item)}
                </h4>

                <p className="text-xs font-serif text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                  {getSummary(item)}
                </p>

                {item.whyItMatters && (
                  <div className="p-2.5 bg-stone-50 dark:bg-stone-900/60 border-l-2 border-stone-900 dark:border-stone-400 text-xs font-serif italic text-stone-700 dark:text-stone-300">
                    “{item.whyItMatters}”
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Column 3: High-Yield Policy & Legislative Feed (3 cols) */}
          <div className="lg:col-span-3 bg-[#FAF8F4] dark:bg-[#15171D] border border-stone-300/80 dark:border-stone-800 p-4 rounded-sm space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 pb-2 border-b border-stone-200 dark:border-stone-800">
              NATIONAL GAZETTE & WIRE
            </div>

            <div className="divide-y divide-stone-200 dark:divide-stone-800/80 space-y-2.5">
              {wireIndia.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectArticle(item)}
                  className="pt-2.5 group cursor-pointer space-y-1"
                >
                  <div className="text-[10px] font-mono text-stone-500">
                    {item.publisher} · {item.category}
                  </div>
                  <h5 className="text-xs font-serif font-bold text-stone-900 dark:text-stone-100 group-hover:text-indigo-900 dark:group-hover:text-indigo-300 transition-colors leading-snug">
                    {getTitle(item)}
                  </h5>
                </div>
              ))}
            </div>

            <div className="pt-2 text-[11px] font-mono text-stone-500">
              Synced with Lok Sabha, Rajya Sabha & PIB Feeds
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
