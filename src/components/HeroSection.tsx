import React, { useState } from 'react';
import { ArrowRight, Bookmark, Share2, Sparkles, Clock, CheckCircle2, Globe2, Eye, Compass } from 'lucide-react';
import { Article, LanguageCode } from '../types/news';
import { GlobeHero3D } from './GlobeHero3D';

interface HeroSectionProps {
  leadStory: Article;
  supportingStories: Article[];
  onSelectArticle: (article: Article) => void;
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (id: string) => void;
  currentRegion: 'india' | 'world' | 'all';
  languageMode?: LanguageCode;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  leadStory,
  supportingStories,
  onSelectArticle,
  isBookmarked,
  onToggleBookmark,
  currentRegion,
  languageMode = 'en',
}) => {
  const [viewMode, setViewMode] = useState<'visual' | 'radar'>('visual');

  if (!leadStory) return null;

  const leadDate = new Date(leadStory.publishedAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const isHindi = languageMode === 'hi';
  const isBilingual = languageMode === 'bilingual';

  const leadTitle = isHindi && leadStory.hindiTitle ? leadStory.hindiTitle : leadStory.title;
  const leadSummary = isHindi && leadStory.hindiSummary ? leadStory.hindiSummary : (leadStory.subtitle || leadStory.summary);
  const leadWhyItMatters = isHindi && leadStory.hindiWhyItMatters ? leadStory.hindiWhyItMatters : leadStory.whyItMatters;

  return (
    <section className="mb-10 space-y-6">
      
      {/* Editorial Section Masthead Flag */}
      <div className="flex items-center justify-between pb-2 border-b border-stone-200/80 dark:border-stone-800">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest text-stone-900 dark:text-stone-100 font-serif">
            Front Page Dossier · Verified Editorial Lead
          </span>
        </div>

        {/* 3D Radar vs Documentary Photo Switcher */}
        <div className="flex items-center p-0.5 bg-stone-100 dark:bg-stone-800/80 rounded-lg text-xs">
          <button
            onClick={() => setViewMode('visual')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all flex items-center gap-1 ${
              viewMode === 'visual'
                ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs'
                : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            <Eye className="w-3 h-3" />
            <span>Documentary View</span>
          </button>
          <button
            onClick={() => setViewMode('radar')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all flex items-center gap-1 ${
              viewMode === 'radar'
                ? 'bg-white dark:bg-stone-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            <Compass className="w-3 h-3 text-indigo-500" />
            <span>3D Geospatial Radar</span>
          </button>
        </div>
      </div>

      {/* Main Hero Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* LEAD STORY CARD (7 Columns) - Large, High-Contrast Editorial Canvas */}
        <div
          onClick={() => onSelectArticle(leadStory)}
          className="lg:col-span-7 bg-white dark:bg-[#15181F] rounded-[24px] border border-stone-200/90 dark:border-stone-800/90 overflow-hidden cursor-pointer hover:border-stone-300 dark:hover:border-stone-700 transition-all flex flex-col justify-between group shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
        >
          {/* Visual Presentation Area: 3D Globe or Documentary Photo */}
          {viewMode === 'radar' ? (
            <div className="h-80 sm:h-96 w-full relative bg-[#0B0D11] overflow-hidden">
              <GlobeHero3D region={currentRegion} className="w-full h-full" />
              <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-stone-950/80 backdrop-blur-md rounded-lg text-white text-[11px] font-mono border border-white/10 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Geospatial Radar · Telemetry Active</span>
              </div>
            </div>
          ) : (
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-900">
              <img
                src={leadStory.imageUrl}
                alt={leadStory.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent" />

              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-2.5 py-1 bg-rose-600 text-white text-[11px] font-bold tracking-wider rounded font-mono uppercase">
                  LEAD REPORT
                </span>
                <span className="px-2.5 py-1 bg-stone-900/80 backdrop-blur-md text-stone-200 text-[11px] rounded flex items-center gap-1 font-mono">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  Accredited Bureau
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center gap-2 text-xs text-stone-300 font-mono">
                  <span className="font-semibold text-indigo-300">{leadStory.category}</span>
                  <span>·</span>
                  <span>{leadDate}</span>
                  <span>·</span>
                  <span>{leadStory.readingTimeMinutes} min read</span>
                </div>
              </div>
            </div>
          )}

          {/* Lead Story Content */}
          <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold mb-1.5">
                National Priority Desk · New Delhi
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-[28px] font-bold text-stone-900 dark:text-stone-50 font-serif leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {leadTitle}
              </h1>

              {isBilingual && leadStory.hindiTitle && (
                <p className="text-base font-semibold text-indigo-600 dark:text-indigo-400 mt-2 font-sans">
                  {leadStory.hindiTitle}
                </p>
              )}

              <p className="text-sm text-stone-600 dark:text-stone-300 mt-3 leading-relaxed font-sans">
                {leadSummary}
              </p>

              {/* Why It Matters Box */}
              {leadWhyItMatters && (
                <div className="mt-4 p-4 bg-stone-50 dark:bg-stone-800/50 rounded-xl border border-stone-200/80 dark:border-stone-800 text-xs">
                  <span className="font-bold text-stone-900 dark:text-stone-100 font-mono">
                    {isHindi ? 'यह क्यों महत्वपूर्ण है: ' : 'Why It Matters: '}
                  </span>
                  <span className="text-stone-600 dark:text-stone-300 leading-relaxed">
                    {leadWhyItMatters}
                  </span>
                </div>
              )}
            </div>

            {/* Lead Story Footer Actions */}
            <div className="flex items-center justify-between pt-5 mt-5 border-t border-stone-100 dark:border-stone-800/80 text-xs">
              <div className="text-stone-500 font-mono text-[11px] truncate max-w-[280px]">
                Reported by {leadStory.publisher}
              </div>

              <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => onToggleBookmark(leadStory.id)}
                  className={`p-2 rounded-xl transition-colors ${
                    isBookmarked(leadStory.id)
                      ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40'
                      : 'text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
                  }`}
                  title={isBookmarked(leadStory.id) ? 'Remove Bookmark' : 'Bookmark Lead Story'}
                >
                  <Bookmark className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onSelectArticle(leadStory)}
                  className="px-3.5 py-1.5 bg-[#12141A] dark:bg-stone-100 text-white dark:text-stone-900 rounded-xl font-semibold flex items-center gap-1.5 hover:bg-stone-800 transition-colors text-xs"
                >
                  <span>Full Intelligence</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* SUPPORTING STORIES (5 Columns) - Varied Editorial Styles */}
        <div className="lg:col-span-5 flex flex-col gap-4 justify-between">
          
          {/* Card 1: Warm Ivory Special Feature Story (Different visual texture!) */}
          {supportingStories[0] && (
            <div
              onClick={() => onSelectArticle(supportingStories[0])}
              className="p-5 sm:p-6 rounded-[22px] bg-[#FCFBF8] dark:bg-[#1A1D24] border border-amber-200/70 dark:border-amber-500/20 shadow-xs cursor-pointer hover:border-amber-300 dark:hover:border-amber-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider mb-2">
                  <span className="text-amber-700 dark:text-amber-400 font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Crucial Analysis
                  </span>
                  <span className="text-stone-400 font-mono">
                    {supportingStories[0].category}
                  </span>
                </div>

                <h3 className="text-lg font-bold font-serif text-stone-900 dark:text-stone-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                  {isHindi && supportingStories[0].hindiTitle ? supportingStories[0].hindiTitle : supportingStories[0].title}
                </h3>

                <p className="text-xs text-stone-600 dark:text-stone-300 mt-2 line-clamp-3 leading-relaxed">
                  {isHindi && supportingStories[0].hindiSummary ? supportingStories[0].hindiSummary : supportingStories[0].summary}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 mt-3 border-t border-amber-200/50 dark:border-stone-800 text-[11px] font-mono text-stone-500">
                <span>{supportingStories[0].publisher}</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                  Read Analysis →
                </span>
              </div>
            </div>
          )}

          {/* Cards 2 & 3: High-Density Horizontal Wire Briefs */}
          <div className="space-y-3">
            {supportingStories.slice(1, 3).map((story, idx) => {
              const storyTitle = isHindi && story.hindiTitle ? story.hindiTitle : story.title;
              return (
                <div
                  key={story.id}
                  onClick={() => onSelectArticle(story)}
                  className="p-4 rounded-[20px] bg-white dark:bg-[#15181F] border border-stone-200/90 dark:border-stone-800/90 hover:border-stone-300 dark:hover:border-stone-700 transition-all cursor-pointer group shadow-xs"
                >
                  <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-stone-400 mb-1">
                    <span className="font-bold text-stone-600 dark:text-stone-300 font-serif">#{idx + 2}</span>
                    <span>·</span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-medium">{story.category}</span>
                    <span>·</span>
                    <span>{story.readingTimeMinutes}m read</span>
                  </div>

                  <h4 className="text-sm font-bold font-serif text-stone-900 dark:text-stone-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug line-clamp-2">
                    {storyTitle}
                  </h4>

                  <div className="flex items-center justify-between mt-2 text-[11px] text-stone-500 font-mono">
                    <span className="truncate max-w-[200px]">{story.publisher}</span>
                    <span className="text-stone-400">{new Date(story.publishedAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

    </section>
  );
};
