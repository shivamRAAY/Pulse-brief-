import React from 'react';
import {
  Radio,
  Play,
  Pause,
  Zap,
  ArrowRight,
  ShieldCheck,
  Megaphone,
} from 'lucide-react';
import { Article, PriorityTier } from '../types/news';
import { LiveConnectionState } from '../hooks/useRealTimeNews';

interface LiveDashboardHeroProps {
  articles: Article[];
  connectionState: LiveConnectionState;
  autoInsert: boolean;
  onToggleAutoInsert: () => void;
  incomingCount: number;
  onFlushBuffer: () => void;
  lastSyncTime: string;
  onSelectArticle: (article: Article) => void;
  onSimulateBreaking: () => void;
  onOpenTestDiagnostics: () => void;
}

export const LiveDashboardHero: React.FC<LiveDashboardHeroProps> = ({
  articles,
  connectionState,
  autoInsert,
  onToggleAutoInsert,
  incomingCount,
  onFlushBuffer,
  lastSyncTime,
  onSelectArticle,
  onSimulateBreaking,
  onOpenTestDiagnostics,
}) => {
  // Most recent breaking or developing wire story
  const breakingStory = articles.find((a) => a.priority === 'breaking') || articles[0];
  const recentWires = articles.slice(0, 4);

  return (
    <div className="space-y-4">
      
      {/* Editorial Live Wire Banner (Sleek, High-End Publication Aesthetic) */}
      <div className="bg-[#121419] text-white rounded-[22px] p-4 sm:p-5 border border-white/10 shadow-sm relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Left: Live Connection Beacon & Breaking Wire Headline */}
        <div className="flex items-start sm:items-center gap-3.5 min-w-0 flex-1">
          <div className="flex items-center gap-2 shrink-0">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400 font-mono">
              CONTINUOUS WIRE
            </span>
          </div>

          <div className="h-4 w-px bg-white/20 hidden sm:block shrink-0" />

          {/* Breaking Lead Snippet */}
          {breakingStory && (
            <div
              onClick={() => onSelectArticle(breakingStory)}
              className="min-w-0 cursor-pointer group flex items-center gap-2"
            >
              <span className="text-xs sm:text-sm font-medium text-stone-200 group-hover:text-white transition-colors truncate">
                {breakingStory.title}
              </span>
              <span className="text-[10px] text-stone-400 font-mono shrink-0 hidden lg:inline">
                ({breakingStory.publisher})
              </span>
            </div>
          )}
        </div>

        {/* Right: Controls & Diagnostics Link */}
        <div className="flex items-center gap-3 text-xs shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-white/10">
          
          {/* Pause / Resume Feed */}
          <button
            onClick={onToggleAutoInsert}
            className={`px-2.5 py-1 rounded-lg border font-mono text-[11px] font-semibold flex items-center gap-1.5 transition-colors ${
              autoInsert
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                : 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
            }`}
            title={autoInsert ? 'Pause automatic feed updates' : 'Resume automatic feed updates'}
          >
            {autoInsert ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span>{autoInsert ? 'Stream LIVE' : 'Stream PAUSED'}</span>
          </button>

          {/* New buffer items notice if paused */}
          {incomingCount > 0 && (
            <button
              onClick={onFlushBuffer}
              className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-[11px] font-bold font-mono animate-bounce"
            >
              +{incomingCount} New Wire Stories
            </button>
          )}

          {/* Live Ingestion Test Flash Trigger */}
          <button
            onClick={onSimulateBreaking}
            className="px-2 py-1 bg-white/10 hover:bg-white/20 text-stone-300 rounded-lg text-[11px] font-mono flex items-center gap-1 transition-colors"
            title="Inject simulated real-time wire dispatch"
          >
            <Zap className="w-3 h-3 text-amber-400" />
            <span>Test Wire</span>
          </button>

          {/* Diagnostics Modal Trigger */}
          <button
            onClick={onOpenTestDiagnostics}
            className="text-[11px] text-stone-400 hover:text-white underline font-mono ml-1"
          >
            Providers Status
          </button>
        </div>

      </div>

      {/* Horizontal Multi-Wire Ticker: 4 recent dispatches */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {recentWires.map((wire, idx) => (
          <div
            key={wire.id}
            onClick={() => onSelectArticle(wire)}
            className="p-3 bg-white dark:bg-[#161922] rounded-xl border border-stone-200/80 dark:border-stone-800/80 hover:border-indigo-400/60 dark:hover:border-indigo-500/40 cursor-pointer transition-all group shadow-xs"
          >
            <div className="flex items-center justify-between text-[10px] font-mono text-stone-400 mb-1">
              <span className="font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                {wire.category.split(' ')[0]}
              </span>
              <span>{wire.publisher.split('/')[0].slice(0, 16)}</span>
            </div>
            <h4 className="text-xs font-semibold text-stone-800 dark:text-stone-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug">
              {wire.title}
            </h4>
          </div>
        ))}
      </div>

    </div>
  );
};
