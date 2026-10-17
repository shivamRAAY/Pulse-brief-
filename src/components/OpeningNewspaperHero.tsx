import React, { useEffect, useRef, useState } from 'react';
import {
  Bookmark,
  Share2,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Clock,
  Radio,
  FileText,
  CornerDownRight,
  Maximize2,
  Compass,
  ArrowRight,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Article, LanguageCode } from '../types/news';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface OpeningNewspaperHeroProps {
  leadStory: Article;
  subStories: Article[];
  latestTransmissions: Article[];
  onSelectArticle: (article: Article) => void;
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (id: string) => void;
  languageMode?: LanguageCode;
  onOpenAiBriefing?: (article: Article) => void;
  onExpandArchive?: () => void;
}

export const OpeningNewspaperHero: React.FC<OpeningNewspaperHeroProps> = ({
  leadStory,
  subStories,
  latestTransmissions,
  onSelectArticle,
  isBookmarked,
  onToggleBookmark,
  languageMode = 'en',
  onOpenAiBriefing,
  onExpandArchive,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);
  const subColumnRef = useRef<HTMLDivElement>(null);
  const transmissionRailRef = useRef<HTMLDivElement>(null);
  const [imageHalftone, setImageHalftone] = useState<boolean>(true);

  const isHindi = languageMode === 'hi';
  const isBilingual = languageMode === 'bilingual';

  const leadTitle = isHindi && leadStory.hindiTitle ? leadStory.hindiTitle : leadStory.title;
  const leadSummary = isHindi && leadStory.hindiSummary ? leadStory.hindiSummary : (leadStory.subtitle || leadStory.summary);

  // GSAP ScrollTrigger scroll-driven choreography for Scene One
  useEffect(() => {
    if (!sectionRef.current) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Editorial Rule horizontal draw-in
      gsap.fromTo(
        '.scene-one-rule',
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            end: 'top 40%',
            scrub: 0.5,
          },
        }
      );

      // 2. Headline progressive reveal and depth
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current,
          { opacity: 0.85, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'top 30%',
              scrub: true,
            },
          }
        );
      }

      // 3. Main Image Frame subtle scale & parallax depth
      if (imageFrameRef.current) {
        gsap.fromTo(
          imageFrameRef.current,
          { scale: 0.98, y: 0 },
          {
            scale: 1,
            y: -10,
            ease: 'none',
            scrollTrigger: {
              trigger: imageFrameRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              scrub: 1,
            },
          }
        );
      }

      // 4. Sub-columns subtle stagger entrance
      if (subColumnRef.current) {
        gsap.fromTo(
          subColumnRef.current.children,
          { opacity: 0.7, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            ease: 'none',
            scrollTrigger: {
              trigger: subColumnRef.current,
              start: 'top 85%',
              end: 'top 50%',
              scrub: true,
            },
          }
        );
      }

      // 5. Right Transmissions rail sequential reveal
      if (transmissionRailRef.current) {
        gsap.fromTo(
          transmissionRailRef.current.querySelectorAll('.transmission-node'),
          { opacity: 0.5, x: 10 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.15,
            ease: 'none',
            scrollTrigger: {
              trigger: transmissionRailRef.current,
              start: 'top 90%',
              end: 'top 40%',
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#F4EFEA] dark:bg-[#12110F] text-[#12110F] dark:text-[#FAF6EE] pt-4 pb-12 transition-colors relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 3-Column Broadsheet Asymmetrical Grid (Matching Reference Image 1 & 2) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* ========================================================
              COLUMN 1: THE LEAD DISPATCH (Cols 1-7)
             ======================================================== */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            
            {/* Lead Category & Wire Telemetry */}
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-[#2B2621]/70 dark:text-stone-400 border-b border-[#2B2621]/20 dark:border-stone-800 pb-1.5">
              <span className="font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
                <span>LEAD FRONT-PAGE DISPATCH</span>
              </span>
              <span>{leadStory.category} · {leadStory.readingTimeMinutes} MIN READ</span>
            </div>

            {/* Giant Broadsheet Serif Headline (Matching Reference 1: "ARTIFICIAL ORBITS ESTABLISHED IN LOWER ATMOSPHERE") */}
            <h2
              ref={headlineRef}
              onClick={() => onSelectArticle(leadStory)}
              className="text-3xl sm:text-4xl md:text-5xl font-black font-headline tracking-tight leading-[1.08] cursor-pointer hover:text-indigo-900 dark:hover:text-indigo-300 transition-colors uppercase"
            >
              {leadTitle}
            </h2>

            {/* Bilingual Secondary Subtitle if enabled */}
            {isBilingual && leadStory.hindiTitle && (
              <h3 className="text-lg sm:text-xl font-bold text-indigo-900 dark:text-indigo-400 font-hindi mt-1">
                {leadStory.hindiTitle}
              </h3>
            )}

            {/* Subtitle / Executive Summary */}
            <p className="text-sm sm:text-base font-editorial leading-relaxed text-[#2B2621]/90 dark:text-stone-300">
              {leadSummary}
            </p>

            {/* LIVE SCAN DOCUMENTARY PHOTOGRAPHY FRAME (Matching Reference Image 1) */}
            <div
              ref={imageFrameRef}
              className="relative w-full aspect-[16/10] sm:aspect-[16/9] border-2 border-[#12110F] dark:border-stone-700 bg-stone-900 overflow-hidden shadow-[4px_4px_0px_#12110F] dark:shadow-[4px_4px_0px_#2B2621]"
            >
              {/* Image with Halftone Screen Option */}
              <img
                src={leadStory.imageUrl}
                alt={leadStory.title}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover transition-all ${
                  imageHalftone ? 'contrast-115 grayscale' : ''
                }`}
              />

              {/* Halftone / Dither overlay grid */}
              {imageHalftone && (
                <div
                  className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"
                  style={{
                    backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
                    backgroundSize: '3px 3px',
                  }}
                />
              )}

              {/* Top Left: [LIVE SCAN] telemetry overlay */}
              <div className="absolute top-3 left-3 bg-[#12110F]/90 text-[#FAF6EE] text-[10px] font-mono px-2 py-0.5 rounded-xs border border-white/20 flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>LIVE SCAN // SATELLITE TELEMETRY</span>
              </div>

              {/* Top Right: Telemetry coordinates indicator (Ref Image 1: [ ■ 0.00 ■ -330 ]) */}
              <div className="absolute top-3 right-3 bg-[#12110F]/90 text-stone-300 text-[10px] font-mono px-2 py-0.5 rounded-xs border border-white/20 hidden sm:flex items-center gap-2">
                <span>COORD: 13.7199° N</span>
                <span>■ 0.00 ■ -330</span>
              </div>

              {/* Bottom Overlay Bar */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3 text-white flex items-center justify-between text-xs font-mono">
                <span className="text-[11px] text-stone-300">SOURCE: {leadStory.publisher}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setImageHalftone(!imageHalftone);
                  }}
                  className="px-2 py-0.5 bg-white/20 hover:bg-white/30 rounded text-[10px] font-bold"
                  title="Toggle vintage newsprint halftone filter"
                >
                  {imageHalftone ? 'VIEW NATURAL COLOR' : 'VIEW PRINT HALFTONE'}
                </button>
              </div>
            </div>

            {/* RETRO-PRINT ACTION BAR (Matching Reference Image 1 Buttons: [Bookmark] [Read AI Briefing] [Expand Archive]) */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onToggleBookmark(leadStory.id)}
                  className={`px-3 py-1.5 border border-[#12110F] dark:border-stone-700 text-xs font-mono font-bold rounded-xs flex items-center gap-1.5 transition-all shadow-[2px_2px_0px_#12110F] dark:shadow-[2px_2px_0px_#FAF6EE] ${
                    isBookmarked(leadStory.id)
                      ? 'bg-[#12110F] text-white dark:bg-[#FAF6EE] dark:text-[#12110F]'
                      : 'bg-white dark:bg-[#1A1916] hover:bg-black/5'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{isBookmarked(leadStory.id) ? 'SAVED TO DOSSIER' : 'BOOKMARK'}</span>
                </button>

                <button
                  onClick={() => onOpenAiBriefing?.(leadStory)}
                  className="px-3 py-1.5 border border-[#12110F] dark:border-stone-700 bg-white dark:bg-[#1A1916] hover:bg-black/5 text-xs font-mono font-bold rounded-xs flex items-center gap-1.5 transition-all shadow-[2px_2px_0px_#12110F] dark:shadow-[2px_2px_0px_#FAF6EE]"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>READ AI BRIEFING</span>
                </button>
              </div>

              <button
                onClick={onExpandArchive}
                className="px-3 py-1.5 border border-[#12110F] dark:border-stone-700 bg-white dark:bg-[#1A1916] hover:bg-black/5 text-xs font-mono font-bold rounded-xs flex items-center gap-1.5 transition-all shadow-[2px_2px_0px_#12110F] dark:shadow-[2px_2px_0px_#FAF6EE]"
              >
                <Compass className="w-3.5 h-3.5 text-stone-600" />
                <span>EXPAND ARCHIVE</span>
              </button>
            </div>

            {/* Sub-headline beneath action buttons (Matching Ref Image 1: "NEURAL NETWORK SYNTHESIS ONLINE") */}
            <div className="pt-3 border-t border-[#2B2621]/20 dark:border-stone-800">
              <div
                onClick={() => onSelectArticle(subStories[0] || leadStory)}
                className="cursor-pointer group"
              >
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#2B2621]/60 dark:text-stone-400 block mb-0.5">
                  SECONDARY DISPATCH · {subStories[0]?.category || 'TECHNOLOGY'}
                </span>
                <h3 className="text-xl sm:text-2xl font-black font-headline uppercase group-hover:text-indigo-800 dark:group-hover:text-indigo-400 transition-colors">
                  {subStories[0]?.title || 'FIRST COMMERCIAL 28nm WAFER FAB INAUGURATED IN DHOLERA'}
                </h3>
                <p className="text-xs font-editorial mt-1 line-clamp-2 text-[#2B2621]/80 dark:text-stone-300">
                  {subStories[0]?.summary}
                </p>
              </div>
            </div>

          </div>

          {/* ========================================================
              COLUMN 2: SECONDARY EDITORIAL COLUMNS (Cols 8-9)
              (Matching Reference 1 Center Column with Column Rules)
             ======================================================== */}
          <div
            ref={subColumnRef}
            className="lg:col-span-2 lg:border-l lg:border-[#2B2621]/30 dark:lg:border-stone-800 lg:pl-6 space-y-6 flex flex-col justify-between"
          >
            {/* Story 1 in Center Column */}
            <div
              onClick={() => onSelectArticle(subStories[1] || leadStory)}
              className="cursor-pointer group pb-5 border-b border-[#2B2621]/20 dark:border-stone-800"
            >
              <span className="text-[9px] font-mono uppercase tracking-wider text-indigo-700 dark:text-indigo-400 font-bold block mb-1">
                NATIONAL SECURITY
              </span>
              <h4 className="text-base sm:text-lg font-black font-headline uppercase leading-tight group-hover:text-indigo-800 dark:group-hover:text-indigo-300 transition-colors">
                {subStories[1]?.title || 'PINAKA ROCKET SYSTEMS EXPORT CHARTER SIGNED'}
              </h4>
              <p className="text-xs font-editorial mt-2 text-[#2B2621]/80 dark:text-stone-300 line-clamp-4 leading-relaxed">
                {subStories[1]?.summary}
              </p>
              <div className="mt-2 text-[10px] font-mono text-[#2B2621]/60 dark:text-stone-400">
                {subStories[1]?.publisher}
              </div>
            </div>

            {/* Story 2 in Center Column (Matching Reference 1: "CLIMATE CORRIDORS ACTIVATED") */}
            <div
              onClick={() => onSelectArticle(subStories[2] || leadStory)}
              className="cursor-pointer group pb-5 border-b border-[#2B2621]/20 dark:border-stone-800"
            >
              <span className="text-[9px] font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold block mb-1">
                ENVIRONMENT & CLIMATE
              </span>
              <h4 className="text-base sm:text-lg font-black font-headline uppercase leading-tight group-hover:text-indigo-800 dark:group-hover:text-indigo-300 transition-colors">
                {subStories[2]?.title || 'THAR 10GW HYBRID SOLAR PARK SYNCHRONIZED'}
              </h4>
              <p className="text-xs font-editorial mt-2 text-[#2B2621]/80 dark:text-stone-300 line-clamp-4 leading-relaxed">
                {subStories[2]?.summary}
              </p>
              <div className="mt-2 text-[10px] font-mono text-[#2B2621]/60 dark:text-stone-400">
                {subStories[2]?.publisher}
              </div>
            </div>

            {/* Editorial Column Rule Decorative Box */}
            <div className="p-3 bg-black/5 dark:bg-white/5 border border-[#2B2621]/20 dark:border-stone-800 text-[10px] font-mono">
              <span className="font-bold uppercase block mb-1">EDITORIAL NOTE // REGISTRY</span>
              <span className="text-[#2B2621]/70 dark:text-stone-400">
                PulseBrief continuous ingestion cross-references 6 sovereign bureaus with 0% mock headlines.
              </span>
            </div>
          </div>

          {/* ========================================================
              COLUMN 3: LATEST TRANSMISSIONS RAIL (Cols 10-12)
              (Matching Reference Image 1 Right Column: "LATEST TRANSMISSIONS [x]")
             ======================================================== */}
          <div
            ref={transmissionRailRef}
            className="lg:col-span-3 lg:border-l lg:border-[#2B2621]/30 dark:lg:border-stone-800 lg:pl-6 space-y-4"
          >
            {/* Header: LATEST TRANSMISSIONS */}
            <div className="flex items-center justify-between border-b-2 border-[#12110F] dark:border-stone-700 pb-1.5">
              <h4 className="text-xs font-black font-mono tracking-widest uppercase">
                LATEST TRANSMISSIONS
              </h4>
              <span className="text-[10px] font-mono text-rose-600 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-ping" />
                LIVE
              </span>
            </div>

            {/* Wire Nodes Grid (Reference Image 1: Square wire blocks with tick marks) */}
            <div className="space-y-2.5">
              {latestTransmissions.slice(0, 5).map((trans, idx) => (
                <div
                  key={trans.id}
                  onClick={() => onSelectArticle(trans)}
                  className="transmission-node p-2.5 border border-[#2B2621]/30 dark:border-stone-800 bg-white/70 dark:bg-[#1A1916]/80 hover:border-[#12110F] dark:hover:border-stone-500 cursor-pointer transition-all shadow-[2px_2px_0px_rgba(0,0,0,0.05)] group"
                >
                  <div className="flex items-start justify-between gap-2 text-[10px] font-mono mb-1 text-[#2B2621]/70 dark:text-stone-400">
                    <span className="font-bold flex items-center gap-1">
                      <span className="border border-[#2B2621]/40 dark:border-stone-600 w-3 h-3 flex items-center justify-center text-[8px]">
                        {idx === 0 ? '✓' : idx + 1}
                      </span>
                      <span>WIRE #{String(idx + 1).padStart(2, '0')}</span>
                    </span>
                    <span className="text-indigo-700 dark:text-indigo-400 font-semibold truncate max-w-[90px]">
                      {trans.category.split(' ')[0]}
                    </span>
                  </div>

                  <h5 className="text-xs font-bold font-headline group-hover:text-indigo-800 dark:group-hover:text-indigo-300 transition-colors line-clamp-2 leading-snug">
                    {trans.title}
                  </h5>

                  <div className="mt-1 flex items-center justify-between text-[9px] font-mono text-[#2B2621]/60 dark:text-stone-400">
                    <span className="truncate max-w-[120px]">{trans.publisher}</span>
                    <span>{new Date(trans.publishedAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false })} IST</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Trans-Global Archive Badge */}
            <div
              onClick={onExpandArchive}
              className="p-3 border-2 border-dashed border-[#2B2621]/40 dark:border-stone-700 rounded text-center cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              <div className="text-[10px] font-mono font-bold tracking-widest uppercase">
                TRANS-GLOBAL ARCHIVE v4.8
              </div>
              <div className="text-[9px] font-mono text-[#2B2621]/70 dark:text-stone-400 mt-0.5">
                INDEXED REPOSITORY // 20 TOPICAL DESKS
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
