import React, { useEffect, useRef, useState } from 'react';
import {
  Megaphone,
  MapPin,
  Clock,
  CheckCircle2,
  Scale,
  Users,
  FileText,
  ChevronRight,
  ExternalLink,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Article, LanguageCode, ProtestCategory } from '../types/news';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedMovementsTimelineProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  languageMode?: LanguageCode;
}

export const AnimatedMovementsTimeline: React.FC<AnimatedMovementsTimelineProps> = ({
  articles,
  onSelectArticle,
  languageMode = 'en',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const movementArticles = articles.filter(
    (a) => a.isProtestMovement || a.category === 'Protests & Movements'
  );

  const isHindi = languageMode === 'hi';
  const isBilingual = languageMode === 'bilingual';

  let filtered = movementArticles;
  if (selectedStatus !== 'all') {
    filtered = filtered.filter((m) => m.protestDetails?.status === selectedStatus);
  }

  // GSAP ScrollTrigger: Progressively draw the vertical timeline line as reader scrolls
  useEffect(() => {
    if (!containerRef.current || !timelineLineRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Draw timeline vertical line down
      gsap.fromTo(
        timelineLineRef.current,
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            end: 'bottom 25%',
            scrub: 1,
          },
        }
      );

      // 2. Event nodes reveal
      if (containerRef.current) {
        const nodes = containerRef.current.querySelectorAll('.timeline-event-node');
        nodes.forEach((node) => {
        gsap.fromTo(
          node,
          { opacity: 0.4, x: -15 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: node,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [filtered]);

  return (
    <section
      ref={containerRef}
      className="w-full py-16 bg-[#FAF6EE] dark:bg-[#141311] text-[#12110F] dark:text-[#FAF6EE] transition-colors border-t border-[#2B2621]/30 dark:border-stone-800 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Masthead (Matching Reference Image 3 & 7: "COMMUNICATIONS TIMELINE") */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-[#12110F] dark:border-stone-700 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Megaphone className="w-3.5 h-3.5 text-rose-600" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-rose-700 dark:text-rose-400">
                SCENE FIVE // COMMUNICATIONS TIMELINE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-headline uppercase tracking-tight">
              Protests, Strikes & Democratic Public Movements
            </h2>
            <p className="text-xs sm:text-sm font-editorial text-[#2B2621]/80 dark:text-stone-300 mt-1">
              Chronological verified timeline of trade union strikes, farmer assemblies, student agitations, and constitutional dialogue.
            </p>
          </div>

          {/* Status Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-mono">
            <span className="text-[#2B2621]/60 dark:text-stone-400 mr-1">STATUS:</span>
            {['all', 'Active Demonstration', 'Peaceful March', 'Under Negotiation'].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-2.5 py-1 rounded text-[11px] font-bold uppercase transition-colors ${
                  selectedStatus === st
                    ? 'bg-[#12110F] text-[#FAF6EE] dark:bg-[#FAF6EE] dark:text-[#12110F]'
                    : 'border border-[#2B2621]/30 dark:border-stone-700 hover:bg-black/5'
                }`}
              >
                {st === 'all' ? 'ALL' : st}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Layout */}
        <div className="relative pl-6 sm:pl-10">
          
          {/* Vertical Progressive Animated Line (Ref Image 3: vertical line with node diamonds) */}
          <div
            ref={timelineLineRef}
            className="absolute left-2.5 sm:left-4 top-2 bottom-6 w-[2px] bg-[#12110F] dark:bg-stone-600 origin-top"
          />

          {/* Event Nodes */}
          <div className="space-y-8">
            {filtered.map((item, idx) => {
              const details = item.protestDetails;
              const isExpanded = expandedId === item.id;
              const title = isHindi && item.hindiTitle ? item.hindiTitle : item.title;
              const summary = isHindi && item.hindiSummary ? item.hindiSummary : item.summary;

              return (
                <div
                  key={item.id}
                  className="timeline-event-node relative pl-6 sm:pl-8 group"
                >
                  {/* Timeline Node Icon on the line */}
                  <div className="absolute -left-[19px] sm:-left-[22px] top-4 w-4 h-4 rounded-full border-2 border-[#12110F] dark:border-stone-500 bg-white dark:bg-[#12110F] flex items-center justify-center shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                  </div>

                  {/* Event Broadsheet Card */}
                  <div className="border-2 border-[#12110F] dark:border-stone-700 bg-white dark:bg-[#1A1916] p-5 sm:p-7 shadow-[4px_4px_0px_#12110F] dark:shadow-[4px_4px_0px_#FAF6EE] transition-all">
                    
                    {/* Event Meta Line */}
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider">
                          [{details?.status || 'Active Monitoring'}]
                        </span>
                        <span className="text-[#2B2621]/60 dark:text-stone-400">
                          {details?.category || item.category}
                        </span>
                      </div>

                      {details?.location && (
                        <span className="flex items-center gap-1 text-[11px] text-[#2B2621]/70 dark:text-stone-400 font-mono">
                          <MapPin className="w-3 h-3 text-rose-500" />
                          <span>{details.location.cityDistrict}, {details.location.state}</span>
                        </span>
                      )}
                    </div>

                    {/* Headline */}
                    <h3
                      onClick={() => onSelectArticle(item)}
                      className="text-xl sm:text-2xl font-black font-headline uppercase leading-tight cursor-pointer hover:text-indigo-800 dark:hover:text-indigo-400 transition-colors"
                    >
                      {title}
                    </h3>

                    {/* Bilingual Hindi headline */}
                    {isBilingual && item.hindiTitle && (
                      <div className="text-sm font-bold text-indigo-800 dark:text-indigo-400 font-hindi mt-1">
                        {item.hindiTitle}
                      </div>
                    )}

                    <p className="text-xs sm:text-sm font-editorial leading-relaxed text-[#2B2621]/90 dark:text-stone-300 mt-2">
                      {summary}
                    </p>

                    {/* Key Movement Data Row */}
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 py-2.5 border-y border-[#2B2621]/20 dark:border-stone-800 text-[11px] font-mono">
                      <div>
                        <span className="text-[#2B2621]/50 dark:text-stone-400 block text-[9px] uppercase">COALITION</span>
                        <span className="font-bold truncate block">{details?.movementName || item.publisher}</span>
                      </div>
                      <div>
                        <span className="text-[#2B2621]/50 dark:text-stone-400 block text-[9px] uppercase">PARTICIPANTS</span>
                        <span className="font-bold block">{details?.turnoutEstimate || 'Tens of Thousands'}</span>
                      </div>
                      <div>
                        <span className="text-[#2B2621]/50 dark:text-stone-400 block text-[9px] uppercase">LEGAL STATUS</span>
                        <span className="font-bold truncate block">{details?.policeResponseOrLegalStatus?.slice(0, 24) || 'Monitored'}</span>
                      </div>
                      <div>
                        <span className="text-[#2B2621]/50 dark:text-stone-400 block text-[9px] uppercase">STARTED</span>
                        <span className="font-bold block">{details?.startDate || 'Recent'}</span>
                      </div>
                    </div>

                    {/* Expanded Demands & Constitutional Analysis Accordion */}
                    {isExpanded && (
                      <div className="mt-4 p-4 bg-[#F4EFEA] dark:bg-[#12110F] border border-[#2B2621]/30 dark:border-stone-700 space-y-4 animate-in fade-in duration-200">
                        {details?.demands && (
                          <div>
                            <span className="text-xs font-mono font-bold uppercase block mb-1 text-indigo-900 dark:text-indigo-400">
                              Core Demands:
                            </span>
                            <ul className="space-y-1 text-xs font-editorial">
                              {(isHindi && details.demandsHi ? details.demandsHi : details.demands).map((d, i) => (
                                <li key={i} className="flex items-start gap-1.5">
                                  <span className="font-mono text-indigo-600 font-bold">▪</span>
                                  <span>{d}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {details?.civilLibertiesAnalysis && (
                          <div className="p-3 bg-white dark:bg-[#1A1916] border border-[#2B2621]/20 dark:border-stone-800 text-xs font-mono space-y-1">
                            <div className="font-bold text-rose-800 dark:text-rose-400 uppercase flex items-center gap-1">
                              <Scale className="w-3.5 h-3.5" />
                              <span>Constitutional Safeguards (UPSC GS II):</span>
                            </div>
                            <div className="text-[#2B2621]/80 dark:text-stone-300 font-editorial">
                              {details.civilLibertiesAnalysis.constitutionalArticles.join(' · ')}
                            </div>
                            <div className="text-[10px] text-stone-500">
                              {details.civilLibertiesAnalysis.precedentsAndDoctrine}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Card Actions */}
                    <div className="flex items-center justify-between pt-3 mt-3 text-xs font-mono">
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : item.id)}
                        className="font-bold text-indigo-800 dark:text-indigo-400 hover:underline flex items-center gap-1"
                      >
                        <span>{isExpanded ? '[-] HIDE DEMANDS' : '[+] INSPECT DEMANDS & LEGAL ANALYSIS'}</span>
                      </button>

                      <button
                        onClick={() => onSelectArticle(item)}
                        className="font-bold hover:underline flex items-center gap-1"
                      >
                        <span>FULL DOSSIER →</span>
                      </button>
                    </div>

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
