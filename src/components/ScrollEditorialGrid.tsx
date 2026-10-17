import React, { useEffect, useRef } from 'react';
import { Bookmark, Share2, Sparkles, ExternalLink, ArrowRight, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Article, LanguageCode } from '../types/news';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollEditorialGridProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (id: string) => void;
  languageMode?: LanguageCode;
}

export const ScrollEditorialGrid: React.FC<ScrollEditorialGridProps> = ({
  articles,
  onSelectArticle,
  isBookmarked,
  onToggleBookmark,
  languageMode = 'en',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLHRElement>(null);

  const isHindi = languageMode === 'hi';

  useEffect(() => {
    if (!containerRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Animate the thin divider drawing across
      if (dividerRef.current) {
        gsap.fromTo(
          dividerRef.current,
          { scaleX: 0, transformOrigin: 'center center' },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 85%',
              end: 'top 40%',
              scrub: true,
            },
          }
        );
      }

      // Parallax differential scroll for the 3 transformation panels
      if (card1Ref.current) {
        gsap.fromTo(
          card1Ref.current,
          { y: 30, opacity: 0.8 },
          {
            y: -15,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
              end: 'bottom 25%',
              scrub: 1,
            },
          }
        );
      }

      if (card2Ref.current) {
        gsap.fromTo(
          card2Ref.current,
          { y: 50, opacity: 0.75 },
          {
            y: -25,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 70%',
              end: 'bottom 20%',
              scrub: 1.2,
            },
          }
        );
      }

      if (card3Ref.current) {
        gsap.fromTo(
          card3Ref.current,
          { y: 70, opacity: 0.7 },
          {
            y: -35,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 65%',
              end: 'bottom 15%',
              scrub: 1.5,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const featureStory = articles[1] || articles[0];
  const storyTwo = articles[2] || articles[0];
  const storyThree = articles[3] || articles[0];

  return (
    <section
      ref={containerRef}
      className="w-full py-12 border-t border-[#2B2621]/30 dark:border-stone-800 bg-[#FAF6EE] dark:bg-[#161513] text-[#12110F] dark:text-[#FAF6EE] transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Retro Editorial Label */}
        <div className="flex items-center justify-between pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-900 dark:text-indigo-400">
              SECTION 02 // DYNAMIC EDITORIAL SPREAD
            </span>
          </div>
          <span className="text-[11px] font-mono text-[#2B2621]/60 dark:text-stone-400 uppercase tracking-widest">
            NATIONAL JURISPRUDENCE & INDUSTRIAL SOVEREIGNTY
          </span>
        </div>

        {/* Animated Divider Rule */}
        <hr
          ref={dividerRef}
          className="border-0 h-[2px] bg-[#12110F] dark:bg-stone-700 mb-8"
        />

        {/* The Transformed Asymmetric 3-Story Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* SPREAD CARD 1: Large Featured Analytical Story (Cols 1-6) */}
          <div
            ref={card1Ref}
            onClick={() => onSelectArticle(featureStory)}
            className="lg:col-span-6 border-2 border-[#12110F] dark:border-stone-700 bg-white dark:bg-[#1A1916] p-6 sm:p-8 flex flex-col justify-between cursor-pointer group shadow-[4px_4px_0px_#12110F] dark:shadow-[4px_4px_0px_#FAF6EE] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform"
          >
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-[#2B2621]/60 dark:text-stone-400 mb-2">
                <span className="font-bold text-indigo-800 dark:text-indigo-400">
                  {featureStory.category}
                </span>
                <span>DISPATCH #{featureStory.id.slice(-4).toUpperCase()}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black font-headline uppercase leading-tight group-hover:text-indigo-800 dark:group-hover:text-indigo-400 transition-colors">
                {isHindi && featureStory.hindiTitle ? featureStory.hindiTitle : featureStory.title}
              </h3>

              {featureStory.imageUrl && (
                <div className="my-5 relative aspect-[16/9] border border-[#12110F] dark:border-stone-700 overflow-hidden bg-stone-900">
                  <img
                    src={featureStory.imageUrl}
                    alt={featureStory.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover contrast-110 group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 bg-black/80 text-white text-[9px] font-mono px-2 py-0.5 rounded-xs">
                    ARCHIVE RECORD // VERIFIED
                  </div>
                </div>
              )}

              <p className="text-sm font-editorial leading-relaxed text-[#2B2621]/90 dark:text-stone-300">
                {isHindi && featureStory.hindiSummary ? featureStory.hindiSummary : featureStory.summary}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 mt-6 border-t border-[#2B2621]/20 dark:border-stone-800 text-xs font-mono">
              <span className="text-[#2B2621]/60 dark:text-stone-400 truncate max-w-[200px]">{featureStory.publisher}</span>
              <span className="font-bold text-indigo-700 dark:text-indigo-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                EXAMINE SPREAD →
              </span>
            </div>
          </div>

          {/* SPREAD CARDS 2 & 3: Compact Side-by-Side or Stacked Panels (Cols 7-12) */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-6">
            
            {/* Card 2: Deep Law / Governance */}
            <div
              ref={card2Ref}
              onClick={() => onSelectArticle(storyTwo)}
              className="border-2 border-[#12110F] dark:border-stone-700 bg-white dark:bg-[#1A1916] p-6 flex flex-col justify-between cursor-pointer group shadow-[4px_4px_0px_#12110F] dark:shadow-[4px_4px_0px_#FAF6EE] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform flex-1"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-emerald-800 dark:text-emerald-400 font-bold mb-1">
                  <span>{storyTwo.category}</span>
                  <span className="text-[#2B2621]/60 dark:text-stone-400 font-normal">
                    {new Date(storyTwo.publishedAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                  </span>
                </div>

                <h4 className="text-xl font-black font-headline uppercase leading-snug group-hover:text-indigo-800 dark:group-hover:text-indigo-400 transition-colors">
                  {isHindi && storyTwo.hindiTitle ? storyTwo.hindiTitle : storyTwo.title}
                </h4>

                <p className="text-xs font-editorial mt-2 leading-relaxed text-[#2B2621]/80 dark:text-stone-300 line-clamp-3">
                  {isHindi && storyTwo.hindiSummary ? storyTwo.hindiSummary : storyTwo.summary}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 mt-4 border-t border-[#2B2621]/20 dark:border-stone-800 text-xs font-mono">
                <span className="text-[11px] text-[#2B2621]/60 dark:text-stone-400">{storyTwo.publisher}</span>
                <span className="font-bold text-indigo-700 dark:text-indigo-400">READ DOSSIER →</span>
              </div>
            </div>

            {/* Card 3: International / Economy */}
            <div
              ref={card3Ref}
              onClick={() => onSelectArticle(storyThree)}
              className="border-2 border-[#12110F] dark:border-stone-700 bg-white dark:bg-[#1A1916] p-6 flex flex-col justify-between cursor-pointer group shadow-[4px_4px_0px_#12110F] dark:shadow-[4px_4px_0px_#FAF6EE] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform flex-1"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-amber-800 dark:text-amber-400 font-bold mb-1">
                  <span>{storyThree.category}</span>
                  <span className="text-[#2B2621]/60 dark:text-stone-400 font-normal">
                    {new Date(storyThree.publishedAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                  </span>
                </div>

                <h4 className="text-xl font-black font-headline uppercase leading-snug group-hover:text-indigo-800 dark:group-hover:text-indigo-400 transition-colors">
                  {isHindi && storyThree.hindiTitle ? storyThree.hindiTitle : storyThree.title}
                </h4>

                <p className="text-xs font-editorial mt-2 leading-relaxed text-[#2B2621]/80 dark:text-stone-300 line-clamp-3">
                  {isHindi && storyThree.hindiSummary ? storyThree.hindiSummary : storyThree.summary}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 mt-4 border-t border-[#2B2621]/20 dark:border-stone-800 text-xs font-mono">
                <span className="text-[11px] text-[#2B2621]/60 dark:text-stone-400">{storyThree.publisher}</span>
                <span className="font-bold text-indigo-700 dark:text-indigo-400">READ DOSSIER →</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
