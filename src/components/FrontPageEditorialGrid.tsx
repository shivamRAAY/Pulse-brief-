import React, { useState } from 'react';
import {
  Bookmark,
  Share2,
  Sparkles,
  ExternalLink,
  Clock,
  Radio,
  ArrowRight,
  CheckCircle2,
  Volume2,
  Layers,
} from 'lucide-react';
import { Article, LanguageCode } from '../types/news';

interface FrontPageEditorialGridProps {
  leadStory: Article;
  subStories: Article[];
  latestNews: Article[];
  onSelectArticle: (article: Article) => void;
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (id: string) => void;
  languageMode?: LanguageCode;
  onOpenLiveWire?: () => void;
}

export const FrontPageEditorialGrid: React.FC<FrontPageEditorialGridProps> = ({
  leadStory,
  subStories,
  latestNews,
  onSelectArticle,
  isBookmarked,
  onToggleBookmark,
  languageMode = 'en',
  onOpenLiveWire,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const isHindi = languageMode === 'hi';
  const isBilingual = languageMode === 'bilingual';

  const getTitle = (art: Article) => {
    if (isHindi && art.hindiTitle) return art.hindiTitle;
    return art.title;
  };

  const getSummary = (art: Article) => {
    if (isHindi && art.hindiSummary) return art.hindiSummary;
    return art.subtitle || art.summary;
  };

  const handleShare = (e: React.MouseEvent, art: Article) => {
    e.stopPropagation();
    navigator.clipboard?.writeText?.(window.location.origin + '#' + art.id);
    setCopiedId(art.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className="w-full bg-[#FBF9F5] dark:bg-[#121316] text-[#12110F] dark:text-[#F3EFE9] transition-colors py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Asymmetrical Broadsheet Grid: 8 Cols Lead + 4 Cols Latest Wire */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* ========================================================
              LEFT COLUMN: THE LEAD STORY & FEATURED ANALYSES (Cols 1-8)
             ======================================================== */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Lead Story Container */}
            <article className="border-b border-stone-300 dark:border-stone-800 pb-8 space-y-4">
              
              {/* Editorial Kicker & Unboxed Metadata */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-stone-600 dark:text-stone-400 border-b border-stone-200 dark:border-stone-800/80 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
                  <span className="font-semibold uppercase tracking-widest text-stone-900 dark:text-stone-100">
                    LEAD EDITORIAL DISPATCH
                  </span>
                  <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
                  <span className="uppercase text-stone-600 dark:text-stone-400">{leadStory.category}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span>{leadStory.publisher}</span>
                  <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
                  <span>{leadStory.readingTimeMinutes} MIN READ</span>
                </div>
              </div>

              {/* Grand Serif Headline */}
              <h2
                onClick={() => onSelectArticle(leadStory)}
                className="text-3xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight leading-[1.12] text-stone-950 dark:text-stone-50 cursor-pointer hover:text-indigo-900 dark:hover:text-indigo-300 transition-colors"
              >
                {getTitle(leadStory)}
              </h2>

              {/* Bilingual Secondary Headline if dual mode is active */}
              {isBilingual && leadStory.hindiTitle && (
                <p className="text-lg sm:text-xl font-hindi font-semibold text-stone-700 dark:text-stone-300 leading-snug">
                  {leadStory.hindiTitle}
                </p>
              )}

              {/* High-Fidelity News Photography */}
              <div
                onClick={() => onSelectArticle(leadStory)}
                className="group relative w-full aspect-[16/9] sm:aspect-[16/10] overflow-hidden bg-stone-100 dark:bg-stone-900 border border-stone-300/80 dark:border-stone-800 rounded-sm cursor-pointer shadow-xs"
              >
                <img
                  src={leadStory.imageUrl}
                  alt={leadStory.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-white text-xs">
                  <span className="text-[11px] font-mono opacity-90 truncate max-w-[80%]">
                    {leadStory.category} · Verified Intelligence Dossier
                  </span>
                  <span className="text-[11px] font-mono opacity-80 shrink-0">
                    Photo: {leadStory.publisher}
                  </span>
                </div>
              </div>

              {/* Editorial Summary & Context */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
                <div className="md:col-span-8 space-y-3">
                  <p className="text-base sm:text-lg font-serif leading-relaxed text-stone-800 dark:text-stone-200">
                    {getSummary(leadStory)}
                  </p>
                  
                  {leadStory.keyFacts && leadStory.keyFacts.length > 0 && (
                    <div className="pt-2">
                      <div className="text-xs font-mono uppercase tracking-wider text-stone-500 font-semibold mb-1.5">
                        Key Strategic Signals
                      </div>
                      <ul className="space-y-1 text-sm font-serif text-stone-700 dark:text-stone-300 list-disc list-inside">
                        {leadStory.keyFacts.slice(0, 3).map((point: string, idx: number) => (
                          <li key={idx} className="leading-normal">
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Analytical Pullout: Why It Matters */}
                <div className="md:col-span-4 bg-white dark:bg-[#1A1D23] p-4 border-l-2 border-indigo-900 dark:border-indigo-400 border-y border-r border-stone-200 dark:border-stone-800 rounded-sm space-y-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-indigo-900 dark:text-indigo-400 font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Why It Matters</span>
                  </div>
                  <p className="text-xs sm:text-sm font-serif text-stone-700 dark:text-stone-300 leading-relaxed italic">
                    “{isHindi && leadStory.hindiWhyItMatters ? leadStory.hindiWhyItMatters : leadStory.whyItMatters}”
                  </p>
                </div>
              </div>

              {/* Editorial Action Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-200 dark:border-stone-800 text-xs font-mono">
                <button
                  onClick={() => onSelectArticle(leadStory)}
                  className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white font-semibold rounded-sm transition-colors flex items-center gap-2"
                >
                  <span>READ FULL INTELLIGENCE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onToggleBookmark(leadStory.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm border transition-colors ${
                      isBookmarked(leadStory.id)
                        ? 'border-indigo-800 bg-indigo-50 text-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-300'
                        : 'border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>{isBookmarked(leadStory.id) ? 'SAVED' : 'SAVE TO DOSSIER'}</span>
                  </button>

                  <button
                    onClick={(e) => handleShare(e, leadStory)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{copiedId === leadStory.id ? 'COPIED!' : 'SHARE'}</span>
                  </button>
                </div>
              </div>

            </article>

            {/* Sub-Lead Stories Split Grid (Varied Editorial Cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {subStories.slice(0, 2).map((story) => (
                <div
                  key={story.id}
                  onClick={() => onSelectArticle(story)}
                  className="group cursor-pointer space-y-3 bg-white dark:bg-[#181B21] p-4 border border-stone-300/80 dark:border-stone-800 rounded-sm hover:border-stone-900 dark:hover:border-stone-600 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-stone-500">
                      <span className="uppercase font-semibold text-stone-800 dark:text-stone-200">{story.category}</span>
                      <span>{story.publisher}</span>
                    </div>

                    {story.imageUrl && (
                      <div className="w-full aspect-[16/10] overflow-hidden rounded-xs bg-stone-100 dark:bg-stone-900">
                        <img
                          src={story.imageUrl}
                          alt={story.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    )}

                    <h3 className="text-lg font-serif font-bold text-stone-950 dark:text-stone-100 group-hover:text-indigo-900 dark:group-hover:text-indigo-300 transition-colors leading-snug">
                      {getTitle(story)}
                    </h3>

                    <p className="text-xs sm:text-sm font-serif text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                      {getSummary(story)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-stone-200 dark:border-stone-800 text-xs font-mono text-stone-500">
                    <span>{story.readingTimeMinutes} min read</span>
                    <span className="text-stone-900 dark:text-stone-200 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      Read Dispatch →
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* ========================================================
              RIGHT COLUMN: LATEST NEWS COLUMN / LIVE WIRE (Cols 9-12)
             ======================================================== */}
          <aside className="lg:col-span-4 bg-white dark:bg-[#161920] border border-stone-300/90 dark:border-stone-800 rounded-sm p-4 sm:p-5 shadow-xs sticky top-4">
            
            {/* Header: Latest Dispatches */}
            <div className="flex items-center justify-between pb-3 border-b-2 border-stone-900 dark:border-stone-700 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-stone-950 dark:text-stone-50">
                  LATEST DISPATCHES
                </h3>
              </div>
              <span className="text-[10px] font-mono text-stone-500">
                REAL-TIME WIRE
              </span>
            </div>

            {/* Structured Editorial Timeline List */}
            <div className="divide-y divide-stone-200 dark:divide-stone-800/80 space-y-3">
              {latestNews.slice(0, 7).map((item, idx) => {
                const isBreaking = item.priority === 'breaking';

                return (
                  <div
                    key={item.id}
                    onClick={() => onSelectArticle(item)}
                    className="pt-3 group cursor-pointer space-y-1.5 transition-colors"
                  >
                    {/* Timestamp & Tag */}
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <div className="flex items-center gap-1.5">
                        {isBreaking ? (
                          <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                            ● BREAKING
                          </span>
                        ) : (
                          <span className="text-stone-500 dark:text-stone-400">
                            {idx === 0 ? 'Just now' : `${idx * 14 + 6}m ago`}
                          </span>
                        )}
                        <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
                        <span className="text-stone-600 dark:text-stone-400 font-medium truncate max-w-[120px]">
                          {item.publisher}
                        </span>
                      </div>

                      <span className="text-[10px] text-stone-400 uppercase">
                        {item.region === 'india' ? 'IND' : 'WLD'}
                      </span>
                    </div>

                    {/* Headline */}
                    <h4 className="text-sm font-serif font-bold text-stone-900 dark:text-stone-100 group-hover:text-indigo-900 dark:group-hover:text-indigo-400 transition-colors leading-snug line-clamp-2">
                      {getTitle(item)}
                    </h4>

                    {/* 1-Line Preview */}
                    <p className="text-xs font-serif text-stone-500 dark:text-stone-400 line-clamp-2 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="mt-4 pt-3 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs font-mono">
              <span className="text-stone-500">Auto-refresh every 60s</span>
              <button
                onClick={onOpenLiveWire}
                className="font-bold text-stone-900 dark:text-stone-200 hover:text-indigo-800 transition-colors flex items-center gap-1"
              >
                <span>Full Wire</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

          </aside>

        </div>
      </div>
    </section>
  );
};
