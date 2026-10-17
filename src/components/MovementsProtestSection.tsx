import React, { useState } from 'react';
import {
  Megaphone,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Users,
  ShieldAlert,
  FileText,
  ChevronRight,
  ExternalLink,
  Sparkles,
  Info,
  Calendar,
  Languages,
} from 'lucide-react';
import { Article, LanguageCode, ProtestCategory } from '../types/news';

interface MovementsProtestSectionProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  languageMode?: LanguageCode;
}

export const MovementsProtestSection: React.FC<MovementsProtestSectionProps> = ({
  articles,
  onSelectArticle,
  languageMode = 'en',
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Filter for articles that are movements or in the protests category
  const movementArticles = articles.filter(
    (a) => a.isProtestMovement || a.category === 'Protests & Movements'
  );

  const statuses = [
    'all',
    'Active Demonstration',
    'Peaceful March',
    'Under Negotiation',
    'Court / Tribunal Review',
  ];

  const categories = [
    'all',
    'Labour & Employment',
    'Regional Movements',
    'Farmers & Agriculture',
    'Civil Liberties',
  ];

  let filtered = movementArticles;
  if (selectedStatus !== 'all') {
    filtered = filtered.filter((m) => m.protestDetails?.status === selectedStatus);
  }
  if (selectedCategory !== 'all') {
    filtered = filtered.filter((m) => m.protestDetails?.category === selectedCategory);
  }

  const getStatusBadgeClass = (status?: string) => {
    switch (status) {
      case 'Active Demonstration':
        return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20';
      case 'Peaceful March':
        return 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20';
      case 'Under Negotiation':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      default:
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
    }
  };

  const isHindi = languageMode === 'hi';
  const isBilingual = languageMode === 'bilingual';

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Editorial Section Masthead */}
      <div className="bg-gradient-to-br from-[#12141A] via-[#181C24] to-[#12141A] text-white rounded-[24px] p-6 sm:p-8 border border-white/10 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400 font-mono">
              Constitutional Rights & Public Movement Tracker
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif tracking-tight text-white leading-tight">
            Protests, Strikes & Democratic Public Movements
          </h1>

          <p className="text-sm text-stone-300 mt-2 leading-relaxed font-sans">
            Continuous verifiable intelligence on citizen rallies, trade union strikes, farmer assemblies, and civic dialogue across India. Grounded in civil liberties jurisprudence and administrative fact-checking.
          </p>

          {/* Constitutional Law Anchor Box */}
          <div className="mt-5 p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-stone-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 backdrop-blur-md">
            <div className="flex items-start gap-2.5">
              <Scale className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-amber-300">Constitutional Mandate:</span>{' '}
                <span>
                  Article 19(1)(b) guarantees freedom of peaceful assembly without arms, subject to reasonable restrictions in the interests of sovereignty, integrity of India, or public order under Article 19(3).
                </span>
              </div>
            </div>
            <div className="shrink-0 text-[11px] font-mono text-stone-400 bg-stone-900/60 px-2.5 py-1 rounded border border-white/5">
              UPSC GS Paper II
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Tab Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200 dark:border-stone-800">
        
        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-stone-400 font-medium mr-1 shrink-0">Status:</span>
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-colors ${
                selectedStatus === st
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              {st === 'all' ? 'All Movements' : st}
            </button>
          ))}
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-stone-400 font-medium shrink-0">Domain:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1.5 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-800 dark:text-stone-200 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="all">All Domains</option>
            {categories
              .filter((c) => c !== 'all')
              .map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Movements Grid / Dossier View */}
      <div className="space-y-6">
        {filtered.map((article) => {
          const details = article.protestDetails;
          const isExpanded = expandedId === article.id;
          const displayTitle = isHindi && article.hindiTitle ? article.hindiTitle : article.title;
          const displaySummary = isHindi && article.hindiSummary ? article.hindiSummary : article.summary;

          return (
            <div
              key={article.id}
              className="bg-white dark:bg-[#161920] rounded-[24px] border border-stone-200/90 dark:border-stone-800 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-stone-300 dark:hover:border-stone-700 transition-all overflow-hidden"
            >
              <div className="p-5 sm:p-7">
                
                {/* Movement Meta Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getStatusBadgeClass(
                        details?.status
                      )}`}
                    >
                      {details?.status || 'Active Monitoring'}
                    </span>
                    <span className="text-xs text-stone-500 dark:text-stone-400 font-mono">
                      {details?.category || article.category}
                    </span>
                  </div>

                  {details?.location && (
                    <div className="flex items-center gap-1.5 text-xs text-stone-600 dark:text-stone-400 font-mono">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" />
                      <span>{details.location.cityDistrict}, {details.location.state}</span>
                    </div>
                  )}
                </div>

                {/* Title & Headline */}
                <h3
                  onClick={() => onSelectArticle(article)}
                  className="text-xl sm:text-2xl font-bold font-serif text-stone-900 dark:text-stone-100 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition-colors leading-snug"
                >
                  {displayTitle}
                </h3>

                {/* Bilingual subtitle when in bilingual mode */}
                {isBilingual && article.hindiTitle && (
                  <div className="mt-1 text-sm font-medium text-indigo-600 dark:text-indigo-400 font-sans">
                    {article.hindiTitle}
                  </div>
                )}

                <p className="text-sm text-stone-600 dark:text-stone-300 mt-2 leading-relaxed">
                  {displaySummary}
                </p>

                {/* Key Metrics / Snapshot Row */}
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-y border-stone-100 dark:border-stone-800/80 text-xs">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase tracking-wider block font-mono">
                      Key Movement / Coalition
                    </span>
                    <span className="font-semibold text-stone-800 dark:text-stone-200 line-clamp-1 mt-0.5">
                      {details?.movementName || article.publisher}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase tracking-wider block font-mono">
                      Estimated Turnout
                    </span>
                    <span className="font-semibold text-stone-800 dark:text-stone-200 mt-0.5 block">
                      {details?.turnoutEstimate || 'Tens of Thousands'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase tracking-wider block font-mono">
                      Legal / Security Status
                    </span>
                    <span className="font-semibold text-stone-800 dark:text-stone-200 line-clamp-1 mt-0.5">
                      {details?.policeResponseOrLegalStatus?.slice(0, 32) || 'Peaceful Under Monitoring'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase tracking-wider block font-mono">
                      Primary Forum
                    </span>
                    <span className="font-semibold text-stone-800 dark:text-stone-200 mt-0.5 block">
                      {details?.partiesInvolved?.[0] || 'Civic Coalition'}
                    </span>
                  </div>
                </div>

                {/* Collapsible Deep Dossier Accordion */}
                {isExpanded && (
                  <div className="mt-5 space-y-5 animate-in slide-in-from-top-2 duration-200">
                    
                    {/* Demands Checklist */}
                    {details?.demands && details.demands.length > 0 && (
                      <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/60 dark:border-stone-800">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider font-mono mb-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />
                          <span>Core Charter of Demands</span>
                        </div>
                        <ul className="space-y-1.5 text-xs text-stone-700 dark:text-stone-300">
                          {((isHindi && details.demandsHi) ? details.demandsHi : details.demands).map((demand, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                              <span>{demand}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Government & Authority Response */}
                    {details?.officialResponse && (
                      <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs">
                        <span className="font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider font-mono block mb-1">
                          Official Authority & Ministry Response:
                        </span>
                        <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                          {(isHindi && details.officialResponseHi) ? details.officialResponseHi : details.officialResponse}
                        </p>
                      </div>
                    )}

                    {/* Civil Liberties & Legal Analysis Grid */}
                    {details?.civilLibertiesAnalysis && (
                      <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200/60 dark:border-indigo-900/40 text-xs space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-indigo-900 dark:text-indigo-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
                            <Scale className="w-3.5 h-3.5 text-indigo-500" />
                            Civil Liberties & Constitutional Precedent Analysis
                          </span>
                          <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-mono font-bold">
                            {details.civilLibertiesAnalysis.examRelevance}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-stone-700 dark:text-stone-300 pt-1">
                          <div>
                            <span className="font-semibold block text-stone-900 dark:text-stone-100">
                              Constitutional Articles & Guarantees:
                            </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {details.civilLibertiesAnalysis.constitutionalArticles.map((art, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-0.5 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 rounded border border-stone-200 dark:border-stone-700 text-[11px]"
                                >
                                  {art}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <span className="font-semibold block text-stone-900 dark:text-stone-100">
                              Governing Law & Precedents:
                            </span>
                            <p className="text-[11px] mt-1 text-stone-600 dark:text-stone-400 leading-snug">
                              {details.civilLibertiesAnalysis.precedentsAndDoctrine}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Impact on Transit & Services */}
                    {details?.impactSummary && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                        <div className="p-3 rounded-lg bg-stone-100 dark:bg-stone-800/60">
                          <span className="text-[10px] uppercase tracking-wider text-stone-400 font-mono block">
                            Transit Impact
                          </span>
                          <span className="font-medium text-stone-700 dark:text-stone-300 text-[11px] mt-0.5 block">
                            {details.impactSummary.transitImpact}
                          </span>
                        </div>
                        <div className="p-3 rounded-lg bg-stone-100 dark:bg-stone-800/60">
                          <span className="text-[10px] uppercase tracking-wider text-stone-400 font-mono block">
                            Economic Effect
                          </span>
                          <span className="font-medium text-stone-700 dark:text-stone-300 text-[11px] mt-0.5 block">
                            {details.impactSummary.economicImpact}
                          </span>
                        </div>
                        <div className="p-3 rounded-lg bg-stone-100 dark:bg-stone-800/60">
                          <span className="text-[10px] uppercase tracking-wider text-stone-400 font-mono block">
                            Public Services
                          </span>
                          <span className="font-medium text-stone-700 dark:text-stone-300 text-[11px] mt-0.5 block">
                            {details.impactSummary.publicServices}
                          </span>
                        </div>
                      </div>
                    )}

                  </div>
                )}

                {/* Card Action Footer */}
                <div className="mt-4 flex items-center justify-between pt-3 border-t border-stone-100 dark:border-stone-800/60 text-xs">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : article.id)}
                    className="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1 transition-colors"
                  >
                    <span>{isExpanded ? 'Hide Intelligence Dossier' : 'Inspect Demands & Civil Liberties Dossier'}</span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                  </button>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onSelectArticle(article)}
                      className="px-3 py-1.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-xl font-semibold hover:bg-stone-800 transition-colors flex items-center gap-1.5"
                    >
                      <span>Full Coverage & Timeline</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="p-12 text-center bg-white dark:bg-[#161920] rounded-[24px] border border-stone-200 dark:border-stone-800">
            <Megaphone className="w-8 h-8 text-stone-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">
              No movement dispatches match the selected filter.
            </p>
            <button
              onClick={() => {
                setSelectedStatus('all');
                setSelectedCategory('all');
              }}
              className="mt-3 px-4 py-1.5 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 rounded-xl text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
