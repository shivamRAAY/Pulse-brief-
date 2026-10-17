import React, { useEffect, useRef } from 'react';
import { Bookmark, Share2, Sparkles, ExternalLink, BookOpen, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Article, LanguageCode } from '../types/news';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface CinematicLeadStoryProps {
  article: Article;
  onSelectArticle: (article: Article) => void;
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (id: string) => void;
  languageMode?: LanguageCode;
}

export const CinematicLeadStory: React.FC<CinematicLeadStoryProps> = ({
  article,
  onSelectArticle,
  isBookmarked,
  onToggleBookmark,
  languageMode = 'en',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageBoxRef = useRef<HTMLDivElement>(null);
  const contentBoxRef = useRef<HTMLDivElement>(null);

  const isHindi = languageMode === 'hi';
  const displayTitle = isHindi && article.hindiTitle ? article.hindiTitle : article.title;
  const displaySummary = isHindi && article.hindiSummary ? article.hindiSummary : article.summary;

  useEffect(() => {
    if (!containerRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Image expansion and scale on scroll into view
      if (imageBoxRef.current) {
        gsap.fromTo(
          imageBoxRef.current,
          { scale: 0.94, opacity: 0.8 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              end: 'top 30%',
              scrub: 1,
            },
          }
        );
      }

      // Controlled sequence for headline and summary
      if (contentBoxRef.current) {
        gsap.fromTo(
          contentBoxRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full py-14 bg-[#F4EFEA] dark:bg-[#12110F] text-[#12110F] dark:text-[#FAF6EE] transition-colors border-t border-[#2B2621]/30 dark:border-stone-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Stamp */}
        <div className="flex items-center justify-between pb-3 border-b border-[#2B2621]/20 dark:border-stone-800 mb-8 text-xs font-mono">
          <span className="font-bold uppercase tracking-widest text-indigo-900 dark:text-indigo-400">
            SCENE FOUR // CINEMATIC EDITORIAL FEATURE
          </span>
          <span className="text-[#2B2621]/60 dark:text-stone-400 uppercase tracking-widest">
            {article.category} · SPECIAL BUREAU INVESTIGATION
          </span>
        </div>

        {/* Cinematic Expanded Frame */}
        <div className="border-4 border-[#12110F] dark:border-stone-700 bg-white dark:bg-[#1A1916] p-6 sm:p-10 shadow-[8px_8px_0px_#12110F] dark:shadow-[8px_8px_0px_#FAF6EE]">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Expanding News Photograph (Cols 1-7) */}
            <div
              ref={imageBoxRef}
              className="lg:col-span-7 relative aspect-[16/10] border-2 border-[#12110F] dark:border-stone-700 overflow-hidden bg-stone-900 shadow-md group cursor-pointer"
              onClick={() => onSelectArticle(article)}
            >
              <img
                src={article.imageUrl}
                alt={article.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              <div className="absolute top-4 left-4 bg-black/80 text-white text-[10px] font-mono px-2.5 py-1 rounded border border-white/20">
                DOCUMENTARY EYE // {article.publisher}
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-mono flex items-center justify-between">
                <span>{new Date(article.publishedAt).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}</span>
                <span className="text-emerald-400 flex items-center gap-1 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> VERIFIED
                </span>
              </div>
            </div>

            {/* Right: Sequential Content & Intelligence Dossier (Cols 8-12) */}
            <div ref={contentBoxRef} className="lg:col-span-5 space-y-4">
              
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#2B2621]/60 dark:text-stone-400 font-bold">
                POLICY & CONSTITUTIONAL SIGNIFICANCE
              </div>

              <h2
                onClick={() => onSelectArticle(article)}
                className="text-2xl sm:text-3xl font-black font-headline uppercase leading-tight cursor-pointer hover:text-indigo-900 dark:hover:text-indigo-300 transition-colors"
              >
                {displayTitle}
              </h2>

              <p className="text-sm font-editorial leading-relaxed text-[#2B2621]/90 dark:text-stone-300">
                {displaySummary}
              </p>

              {/* Why It Matters Callout */}
              {article.whyItMatters && (
                <div className="p-4 bg-stone-100 dark:bg-stone-900 border-l-4 border-indigo-700 dark:border-indigo-400 text-xs font-editorial text-[#2B2621] dark:text-stone-200">
                  <span className="font-bold font-mono uppercase block text-[10px] text-indigo-800 dark:text-indigo-300 mb-1">
                    WHY THIS STORY MATTERS:
                  </span>
                  <span>{article.whyItMatters}</span>
                </div>
              )}

              {/* Actions & Related Timeline Button */}
              <div className="pt-4 flex items-center justify-between border-t border-[#2B2621]/20 dark:border-stone-800 text-xs font-mono">
                <button
                  onClick={() => onToggleBookmark(article.id)}
                  className={`px-3 py-1.5 border border-[#12110F] dark:border-stone-700 font-bold text-[11px] rounded transition-colors ${
                    isBookmarked(article.id)
                      ? 'bg-[#12110F] text-white dark:bg-[#FAF6EE] dark:text-[#12110F]'
                      : 'hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <Bookmark className="w-3 h-3 inline mr-1" />
                  <span>{isBookmarked(article.id) ? 'SAVED' : 'SAVE TO ARCHIVE'}</span>
                </button>

                <button
                  onClick={() => onSelectArticle(article)}
                  className="font-bold text-indigo-800 dark:text-indigo-400 hover:underline flex items-center gap-1"
                >
                  <span>READ FULL REPORT</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
