import React, { useState } from 'react';
import { Bookmark, Share2, Sparkles, Clock, CheckCircle2, MapPin, Megaphone, Check } from 'lucide-react';
import { Article, LanguageCode } from '../types/news';

interface ArticleCardProps {
  article: Article;
  onSelect: (article: Article) => void;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
  size?: 'featured' | 'standard' | 'compact';
  languageMode?: LanguageCode;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onSelect,
  isBookmarked,
  onToggleBookmark,
  size = 'standard',
  languageMode = 'en',
}) => {
  const [imageError, setImageError] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(article.sourceUrl || `${window.location.origin}/article/${article.slug}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleBookmark(article.id);
  };

  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const isHindi = languageMode === 'hi';
  const isBilingual = languageMode === 'bilingual';

  const displayTitle = isHindi && article.hindiTitle ? article.hindiTitle : article.title;
  const displaySummary = isHindi && article.hindiSummary ? article.hindiSummary : article.summary;

  const isProtest = article.isProtestMovement || article.category === 'Protests & Movements';

  return (
    <article
      onClick={() => onSelect(article)}
      className="group bg-white dark:bg-[#15181F] rounded-[22px] border border-stone-200/90 dark:border-stone-800/90 overflow-hidden hover:border-stone-300 dark:hover:border-stone-700 transition-all cursor-pointer flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
    >
      {/* Thumbnail with Overlay */}
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100 dark:bg-stone-800">
        {!imageError ? (
          <img
            src={article.imageUrl}
            alt={article.title}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-stone-900 text-stone-300">
            <span className="text-xs font-serif uppercase tracking-widest text-indigo-400 font-bold mb-1">
              PulseBrief Editorial Wire
            </span>
            <span className="text-sm font-semibold text-stone-100 line-clamp-2">
              {displayTitle}
            </span>
          </div>
        )}

        {/* Scrim Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {/* Priority or Protest Tag */}
          {isProtest ? (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-500/90 text-white backdrop-blur-md font-mono flex items-center gap-1">
              <Megaphone className="w-2.5 h-2.5" />
              <span>{article.protestDetails?.status || 'Movement'}</span>
            </span>
          ) : article.priority === 'breaking' ? (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-600 text-white font-mono">
              Breaking
            </span>
          ) : article.priority === 'developing' ? (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-white font-mono">
              Developing
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-stone-900/80 text-stone-200 backdrop-blur-md font-mono">
              {article.region === 'india' ? 'India' : 'World'}
            </span>
          )}

          {article.isLiveUpdate && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/90 text-white backdrop-blur-md font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>Live Ingest</span>
            </span>
          )}
        </div>

        {/* Location Pin for Protests */}
        {article.protestDetails?.location && (
          <div className="absolute bottom-2.5 left-3 text-white text-[11px] font-mono flex items-center gap-1 drop-shadow-md">
            <MapPin className="w-3 h-3 text-rose-400" />
            <span>{article.protestDetails.location.cityDistrict}, {article.protestDetails.location.state}</span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Zero-Pill Unboxed Metadata Bar */}
          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-2 font-mono">
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>{formattedDate}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readingTimeMinutes}m read</span>
          </div>

          <h3 className="text-base font-bold font-serif text-stone-900 dark:text-stone-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug">
            {displayTitle}
          </h3>

          {/* Bilingual Secondary Subtitle */}
          {isBilingual && article.hindiTitle && (
            <div className="mt-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 font-sans line-clamp-1">
              {article.hindiTitle}
            </div>
          )}

          <p className="text-xs text-stone-600 dark:text-stone-300 mt-2 line-clamp-2 leading-relaxed">
            {displaySummary}
          </p>

          {/* Exam Relevance Tag */}
          {article.examRelevance?.paperMapping && (
            <div className="mt-3 flex items-center gap-1.5 text-[11px] font-mono text-stone-500 dark:text-stone-400">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              <span className="truncate">{article.examRelevance.paperMapping}</span>
            </div>
          )}
        </div>

        {/* Card Action Footer */}
        <div className="flex items-center justify-between pt-4 mt-4 border-t border-stone-100 dark:border-stone-800/80 text-xs font-mono text-stone-500">
          <span className="truncate max-w-[170px] text-[11px]">{article.publisher}</span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleBookmark}
              className={`p-1.5 rounded-lg transition-colors ${
                isBookmarked
                  ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40'
                  : 'text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
              }`}
              title={isBookmarked ? 'Remove Bookmark' : 'Save Article'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={handleShare}
              className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title="Copy link"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

      </div>
    </article>
  );
};
