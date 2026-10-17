import React, { useState } from 'react';
import { ArrowRight, Globe, Globe2, Bookmark, Sparkles, MapPin, Eye, Compass } from 'lucide-react';
import { Article, LanguageCode } from '../types/news';
import { GlobeHero3D } from './GlobeHero3D';

interface WorldBriefingSectionProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (id: string) => void;
  languageMode?: LanguageCode;
}

export const WorldBriefingSection: React.FC<WorldBriefingSectionProps> = ({
  articles,
  onSelectArticle,
  isBookmarked,
  onToggleBookmark,
  languageMode = 'en',
}) => {
  const [showGlobeRadar, setShowGlobeRadar] = useState<boolean>(false);
  const isHindi = languageMode === 'hi';
  const isBilingual = languageMode === 'bilingual';

  const worldArticles = articles.filter((a) => a.region === 'world');
  const mainWorldStory = worldArticles[0] || articles[1];
  const sideWorldStories = worldArticles.slice(1, 4);

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

  if (!mainWorldStory) return null;

  return (
    <section className="w-full bg-[#FBF9F5] dark:bg-[#121316] text-[#12110F] dark:text-[#F3EFE9] transition-colors py-8 border-t border-stone-300/80 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b-2 border-stone-900 dark:border-stone-700 pb-3">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-indigo-900 dark:text-indigo-400 font-bold flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />
              <span>INTERNATIONAL AFFAIRS · WORLD IN FOCUS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-stone-950 dark:text-stone-50 mt-0.5">
              Geopolitics, Multilateral Treaties & Global Markets
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowGlobeRadar(!showGlobeRadar)}
              className={`px-3 py-1.5 text-xs font-mono font-semibold rounded-sm border transition-colors flex items-center gap-1.5 ${
                showGlobeRadar
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 border-stone-900'
                  : 'bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <Globe2 className="w-3.5 h-3.5 text-indigo-700 dark:text-indigo-400" />
              <span>{showGlobeRadar ? 'HIDE 3D RADAR' : 'EXPLORE 3D RADAR'}</span>
            </button>
          </div>
        </div>

        {/* Optional 3D Geospatial Globe Radar */}
        {showGlobeRadar && (
          <div className="w-full h-80 sm:h-96 rounded-sm bg-stone-950 border border-stone-800 overflow-hidden relative shadow-lg animate-in fade-in duration-300">
            <div className="absolute top-3 left-4 z-10 text-white text-xs font-mono">
              <span className="font-bold tracking-wider text-indigo-400">GEOSPATIAL INTELLIGENCE RADAR</span>
              <p className="text-[11px] text-stone-400 mt-0.5">Interactive diplomatic & maritime nodes</p>
            </div>
            <GlobeHero3D region="world" className="w-full h-full" />
          </div>
        )}

        {/* Editorial Grid: Main World Story + Split Side Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main International Feature (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-[#181B21] border border-stone-300/90 dark:border-stone-800 p-6 rounded-sm space-y-4 shadow-xs">
            <div className="flex items-center justify-between text-xs font-mono text-stone-500">
              <span className="uppercase font-semibold text-stone-900 dark:text-stone-200">{mainWorldStory.category}</span>
              <span>{mainWorldStory.publisher} · {mainWorldStory.readingTimeMinutes} MIN READ</span>
            </div>

            {mainWorldStory.imageUrl && (
              <div
                onClick={() => onSelectArticle(mainWorldStory)}
                className="w-full aspect-[16/10] overflow-hidden rounded-xs bg-stone-100 dark:bg-stone-900 cursor-pointer group"
              >
                <img
                  src={mainWorldStory.imageUrl}
                  alt={mainWorldStory.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            )}

            <div className="space-y-2">
              <h3
                onClick={() => onSelectArticle(mainWorldStory)}
                className="text-2xl sm:text-3xl font-serif font-black text-stone-950 dark:text-stone-50 hover:text-indigo-900 dark:hover:text-indigo-300 cursor-pointer transition-colors leading-tight"
              >
                {getTitle(mainWorldStory)}
              </h3>

              {isBilingual && mainWorldStory.hindiTitle && (
                <p className="text-base font-hindi text-stone-700 dark:text-stone-300">
                  {mainWorldStory.hindiTitle}
                </p>
              )}

              <p className="text-sm font-serif text-stone-700 dark:text-stone-300 leading-relaxed">
                {getSummary(mainWorldStory)}
              </p>
            </div>

            <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs font-mono">
              <button
                onClick={() => onSelectArticle(mainWorldStory)}
                className="font-bold text-stone-900 dark:text-stone-200 hover:text-indigo-800 transition-colors flex items-center gap-1"
              >
                <span>Read Diplomatic Analysis</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onToggleBookmark(mainWorldStory.id)}
                className="p-1.5 hover:bg-stone-100 dark:hover:bg-stone-800 rounded transition-colors text-stone-600 dark:text-stone-400"
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked(mainWorldStory.id) ? 'fill-indigo-900 text-indigo-900 dark:fill-indigo-400' : ''}`} />
              </button>
            </div>
          </div>

          {/* Side International Dispatches (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {sideWorldStories.map((story) => (
              <div
                key={story.id}
                onClick={() => onSelectArticle(story)}
                className="bg-white dark:bg-[#181B21] border border-stone-300/80 dark:border-stone-800 p-4 rounded-sm hover:border-stone-900 dark:hover:border-stone-600 cursor-pointer transition-all space-y-2"
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-stone-500">
                  <span className="uppercase font-semibold text-indigo-900 dark:text-indigo-400">{story.category}</span>
                  <span>{story.publisher}</span>
                </div>

                <h4 className="text-base font-serif font-bold text-stone-900 dark:text-stone-100 hover:text-indigo-900 dark:hover:text-indigo-300 transition-colors leading-snug">
                  {getTitle(story)}
                </h4>

                <p className="text-xs font-serif text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                  {getSummary(story)}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800 text-[11px] font-mono text-stone-500">
                  <span>{story.readingTimeMinutes} min read</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-200">Read Dispatch →</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
