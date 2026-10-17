import React, { useState } from 'react';
import {
  X,
  Bookmark,
  Share2,
  ExternalLink,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  BookOpen,
  Volume2,
  VolumeX,
  Languages,
  Scale,
  MapPin,
  Megaphone,
  Check,
} from 'lucide-react';
import { Article, LanguageCode } from '../types/news';
import { BriefAIAssistant } from './BriefAIAssistant';

interface ArticleDetailModalProps {
  article: Article;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  relatedArticles?: Article[];
  onSelectRelated?: (article: Article) => void;
  initialLanguageMode?: LanguageCode;
}

export const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({
  article,
  onClose,
  isBookmarked,
  onToggleBookmark,
  relatedArticles = [],
  onSelectRelated,
  initialLanguageMode = 'en',
}) => {
  const [langMode, setLangMode] = useState<LanguageCode>(initialLanguageMode);
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(article.sourceUrl || window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pubDate = new Date(article.publishedAt).toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const isHindi = langMode === 'hi';
  const isBilingual = langMode === 'bilingual';

  const title = isHindi && article.hindiTitle ? article.hindiTitle : article.title;
  const subtitle = isHindi && article.hindiSubtitle ? article.hindiSubtitle : article.subtitle;
  const summary = isHindi && article.hindiSummary ? article.hindiSummary : article.summary;
  const content = isHindi && article.hindiContent ? article.hindiContent : article.content;
  const whyItMatters = isHindi && article.hindiWhyItMatters ? article.hindiWhyItMatters : article.whyItMatters;
  const keyFacts = isHindi && article.hindiKeyFacts ? article.hindiKeyFacts : article.keyFacts;

  const protest = article.protestDetails;
  const isProtest = article.isProtestMovement || article.category === 'Protests & Movements';

  // Text to Speech playback
  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const textToRead = `${title}. ${summary}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = isHindi ? 'hi-IN' : 'en-IN';
      utterance.rate = 0.95;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-xs flex justify-center p-2 sm:p-6 md:p-10 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white dark:bg-[#12141A] rounded-[28px] border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col">
        
        {/* Sticky Top Bar within Modal */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-5 sm:px-7 py-3.5 bg-white/95 dark:bg-[#12141A]/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2 text-xs font-mono text-stone-500">
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">{article.category}</span>
            <span>·</span>
            <span>{article.readingTimeMinutes} min</span>
            <span>·</span>
            <span className="hidden sm:flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" /> Verified
            </span>
          </div>

          <div className="flex items-center gap-2">
            
            {/* Modal Language Switcher */}
            <div className="flex items-center bg-stone-100 dark:bg-stone-800 rounded-lg p-0.5 text-[11px] font-semibold">
              <button
                onClick={() => setLangMode('en')}
                className={`px-2 py-0.5 rounded transition-all ${
                  langMode === 'en'
                    ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLangMode('hi')}
                className={`px-2 py-0.5 rounded transition-all ${
                  langMode === 'hi'
                    ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                हिन्दी
              </button>
              <button
                onClick={() => setLangMode('bilingual')}
                className={`px-2 py-0.5 rounded transition-all ${
                  langMode === 'bilingual'
                    ? 'bg-white dark:bg-stone-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                Dual
              </button>
            </div>

            {/* Audio Speech */}
            <button
              onClick={toggleSpeech}
              className={`p-2 rounded-xl transition-colors ${
                isSpeaking
                  ? 'bg-indigo-600 text-white animate-pulse'
                  : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
              title={isSpeaking ? 'Stop reading' : 'Listen to article'}
            >
              {isSpeaking ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Bookmark */}
            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`p-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors ${
                isBookmarked ? 'text-indigo-600 dark:text-indigo-400' : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
              title={isBookmarked ? 'Saved to Bookmarks' : 'Save article'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="p-2 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors relative"
              title="Share article link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors ml-1"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-5 sm:p-8 space-y-7">
          
          {/* Header Zone */}
          <div className="space-y-3">
            {/* Tagline & Movement badge */}
            <div className="flex flex-wrap items-center gap-2">
              {isProtest ? (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 flex items-center gap-1">
                  <Megaphone className="w-3 h-3" />
                  <span>{protest?.status || 'Protest & Movement'}</span>
                </span>
              ) : (
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono">
                  {article.region === 'india' ? 'India Priority' : 'World Focus'} · {article.category}
                </span>
              )}

              {protest?.location && (
                <span className="text-xs text-stone-500 font-mono flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-rose-500" />
                  {protest.location.cityDistrict}, {protest.location.state}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-stone-900 dark:text-stone-50 leading-tight">
              {title}
            </h1>

            {/* Bilingual headline if enabled */}
            {isBilingual && article.hindiTitle && (
              <h2 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 font-sans">
                {article.hindiTitle}
              </h2>
            )}

            {subtitle && (
              <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 font-sans leading-relaxed">
                {subtitle}
              </p>
            )}

            {/* Byline & Verified Attribution Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-100 dark:border-stone-800 text-xs font-mono text-stone-500">
              <div>
                Published by <span className="font-semibold text-stone-800 dark:text-stone-200">{article.publisher}</span> · {pubDate}
              </div>
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
              >
                <span>View Original Wire Record</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Lead Image */}
          {article.imageUrl && (
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
              <img
                src={article.imageUrl}
                alt={article.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Dedicated Protests & Movements Dossier if applicable */}
          {protest && (
            <div className="p-5 sm:p-6 rounded-2xl bg-stone-50 dark:bg-[#161922] border border-stone-200 dark:border-stone-800 space-y-4">
              <div className="flex items-center gap-2">
                <Megaphone className="w-4 h-4 text-rose-500" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 font-mono">
                  Democratic Movement & Legal Precedent Dossier
                </h3>
              </div>

              {/* Demands */}
              {protest.demands && (
                <div>
                  <span className="text-xs font-bold text-stone-800 dark:text-stone-200 font-mono uppercase block mb-1.5">
                    {isHindi ? 'मुख्य मांगें (Core Demands):' : 'Key Demands:'}
                  </span>
                  <ul className="space-y-1.5 text-xs text-stone-700 dark:text-stone-300">
                    {(isHindi && protest.demandsHi ? protest.demandsHi : protest.demands).map((d, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Authority Response */}
              {protest.officialResponse && (
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs">
                  <span className="font-bold text-amber-800 dark:text-amber-400 font-mono uppercase block mb-1">
                    {isHindi ? 'सरकारी एवं प्रशासनिक प्रतिक्रिया:' : 'Government & Authority Response:'}
                  </span>
                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                    {isHindi && protest.officialResponseHi ? protest.officialResponseHi : protest.officialResponse}
                  </p>
                </div>
              )}

              {/* Constitutional Analysis */}
              {protest.civilLibertiesAnalysis && (
                <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/40 text-xs space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-indigo-900 dark:text-indigo-300 font-mono uppercase">
                    <Scale className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Constitutional Safeguards & Examination Relevance (UPSC GS II)</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {protest.civilLibertiesAnalysis.constitutionalArticles.map((art, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-white dark:bg-stone-800 rounded border border-stone-200 dark:border-stone-700 font-mono text-[11px]">
                        {art}
                      </span>
                    ))}
                  </div>
                  <p className="text-stone-600 dark:text-stone-400 text-[11px] leading-relaxed pt-1">
                    {protest.civilLibertiesAnalysis.precedentsAndDoctrine}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Why It Matters Callout */}
          {whyItMatters && (
            <div className="p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/30">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 font-mono block mb-1">
                {isHindi ? 'यह देश एवं परीक्षा के लिए क्यों महत्वपूर्ण है:' : 'Why This Story Matters:'}
              </span>
              <p className="text-sm text-stone-800 dark:text-stone-200 leading-relaxed font-sans">
                {whyItMatters}
              </p>
            </div>
          )}

          {/* Key Facts Checklist */}
          {keyFacts && keyFacts.length > 0 && (
            <div className="p-5 rounded-2xl bg-stone-50 dark:bg-[#161920] border border-stone-200 dark:border-stone-800">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 font-mono block mb-3">
                {isHindi ? 'सत्यापित मुख्य तथ्य (Key Facts):' : 'Verified Essential Facts:'}
              </span>
              <ul className="space-y-2 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                {keyFacts.map((fact, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Full Narrative Content */}
          <div className="prose dark:prose-invert max-w-none text-stone-800 dark:text-stone-200 text-sm sm:text-base leading-relaxed space-y-4 font-sans whitespace-pre-line">
            {content}
          </div>

          {/* Competitive Examination Syllabus & Static GK Box */}
          {article.examRelevance && (
            <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50/50 to-stone-50 dark:from-indigo-950/20 dark:to-stone-900 border border-indigo-200/70 dark:border-indigo-900/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-900 dark:text-indigo-300 font-mono flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-indigo-500" />
                  Aspirants Examination Intelligence Dossier
                </span>
                <span className="text-[11px] font-mono font-bold text-indigo-600 dark:text-indigo-400">
                  {article.examRelevance.paperMapping}
                </span>
              </div>

              <div className="text-xs space-y-2 text-stone-700 dark:text-stone-300">
                <div>
                  <span className="font-semibold text-stone-900 dark:text-stone-100">Probable Question: </span>
                  <span>{article.examRelevance.potentialQuestion}</span>
                </div>
                <div>
                  <span className="font-semibold text-stone-900 dark:text-stone-100">Static GK Connection: </span>
                  <span>{article.examRelevance.staticGkConnection}</span>
                </div>
                {article.examRelevance.keyTerms && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {article.examRelevance.keyTerms.map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 rounded border border-stone-200 dark:border-stone-700 font-mono text-[11px]">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Brief AI Interactive Current Affairs Panel */}
          <div className="pt-4 border-t border-stone-200 dark:border-stone-800">
            <BriefAIAssistant article={article} />
          </div>

          {/* Related Stories */}
          {relatedArticles.length > 0 && (
            <div className="pt-6 border-t border-stone-200 dark:border-stone-800">
              <h4 className="text-sm font-bold font-serif text-stone-900 dark:text-stone-100 mb-4">
                Related Intelligence from Desk
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedArticles.slice(0, 3).map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectRelated?.(rel)}
                    className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-indigo-500 cursor-pointer transition-colors"
                  >
                    <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block mb-1">
                      {rel.category}
                    </span>
                    <h5 className="text-xs font-bold text-stone-900 dark:text-stone-100 line-clamp-2 leading-snug">
                      {isHindi && rel.hindiTitle ? rel.hindiTitle : rel.title}
                    </h5>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
