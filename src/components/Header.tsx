import React, { useState, useEffect } from 'react';
import {
  Search,
  Bookmark,
  Moon,
  Sun,
  ShieldCheck,
  Megaphone,
  Menu,
  Languages,
  Zap,
} from 'lucide-react';
import { Region, LanguageCode } from '../types/news';

interface HeaderProps {
  currentRegion: Region;
  onSelectRegion: (region: Region) => void;
  onOpenSearch: () => void;
  onOpenBookmarks: () => void;
  onOpenCredibility: () => void;
  bookmarksCount: number;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  languageMode?: LanguageCode;
  onSelectLanguageMode?: (mode: LanguageCode) => void;
  onToggleMobileSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRegion,
  onSelectRegion,
  onOpenSearch,
  onOpenBookmarks,
  onOpenCredibility,
  bookmarksCount,
  theme,
  onToggleTheme,
  activeTab,
  onSelectTab,
  languageMode = 'en',
  onSelectLanguageMode,
  onToggleMobileSidebar,
}) => {
  const [istTime, setIstTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      };
      const formatted = new Intl.DateTimeFormat('en-IN', options).format(now);
      setIstTime(`${formatted} IST`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000 * 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0E1015]/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 transition-colors">
      
      {/* Editorial Top Utility Bar: Edition date, IST Time, Live Stream Status */}
      <div className="hidden sm:flex items-center justify-between px-4 sm:px-6 lg:px-8 py-1 bg-stone-50/80 dark:bg-[#13161C]/80 border-b border-stone-200/50 dark:border-stone-800/50 text-[11px] font-mono text-stone-500 dark:text-stone-400">
        <div className="flex items-center gap-3">
          <span className="font-bold text-stone-700 dark:text-stone-300">NEW DELHI EDITION</span>
          <span>·</span>
          <span>{istTime || 'Oct 16, 2026 IST'}</span>
          <span>·</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            LIVE TELEMETRY SYNCED
          </span>
        </div>

        {/* Language Switcher Dropdown / Segmented Toggle */}
        <div className="flex items-center gap-1.5">
          <Languages className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-stone-400">Language:</span>
          <div className="flex items-center bg-stone-200/60 dark:bg-stone-800/80 rounded-md p-0.5">
            <button
              onClick={() => onSelectLanguageMode?.('en')}
              className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all ${
                languageMode === 'en'
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              English
            </button>
            <button
              onClick={() => onSelectLanguageMode?.('hi')}
              className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all ${
                languageMode === 'hi'
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              हिन्दी
            </button>
            <button
              onClick={() => onSelectLanguageMode?.('bilingual')}
              className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all ${
                languageMode === 'bilingual'
                  ? 'bg-white dark:bg-stone-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
              title="Dual English & Hindi View"
            >
              द्विभाषी (Bilingual)
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left Zone: Hamburger for Mobile + Wordmark + Region Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* Mobile Sidebar Hamburger Button */}
          <button
            onClick={onToggleMobileSidebar}
            className="lg:hidden p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Brand Wordmark */}
          <button
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-800 text-white flex items-center justify-center font-bold text-sm tracking-tighter shadow-sm font-serif">
              PB
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100 font-serif">
                PulseBrief
              </span>
              <span className="hidden sm:block text-[9px] uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-mono font-semibold -mt-1">
                India First · World In Focus
              </span>
            </div>
          </button>

          {/* Region Segmented Switcher (Desktop) */}
          <div className="hidden xl:flex items-center p-0.5 bg-stone-100 dark:bg-stone-900 rounded-lg border border-stone-200 dark:border-stone-800 text-xs ml-2">
            <button
              onClick={() => onSelectRegion('india')}
              className={`px-2.5 py-1 font-medium rounded-md transition-colors ${
                currentRegion === 'india'
                  ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              India First
            </button>
            <button
              onClick={() => onSelectRegion('world')}
              className={`px-2.5 py-1 font-medium rounded-md transition-colors ${
                currentRegion === 'world'
                  ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              World Focus
            </button>
            <button
              onClick={() => onSelectRegion('all')}
              className={`px-2 py-1 font-medium rounded-md transition-colors ${
                currentRegion === 'all'
                  ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              All
            </button>
          </div>
        </div>

        {/* Center Zone: Editorial Nav Links */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-stone-600 dark:text-stone-300">
          <button
            onClick={() => onSelectTab('home')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-stone-900 dark:hover:text-white ${
              activeTab === 'home' ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : ''
            }`}
          >
            Editorial Lead
          </button>
          
          {/* Dedicated Protests & Movements Tab */}
          <button
            onClick={() => onSelectTab('movements')}
            className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 hover:text-stone-900 dark:hover:text-white ${
              activeTab === 'movements'
                ? 'text-rose-600 dark:text-rose-400 font-semibold'
                : 'text-stone-700 dark:text-stone-300'
            }`}
          >
            <Megaphone className="w-3.5 h-3.5 text-rose-500" />
            <span>Movements & Protests</span>
          </button>

          <button
            onClick={() => onSelectTab('exams')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-stone-900 dark:hover:text-white ${
              activeTab === 'exams' ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : ''
            }`}
          >
            Aspirants Hub
          </button>

          <button
            onClick={() => onSelectTab('briefings')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-stone-900 dark:hover:text-white ${
              activeTab === 'briefings' ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : ''
            }`}
          >
            Daily Briefings
          </button>

          <button
            onClick={() => onSelectTab('time_explorer')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-stone-900 dark:hover:text-white ${
              activeTab === 'time_explorer' ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : ''
            }`}
          >
            Time Explorer
          </button>

          <button
            onClick={onOpenCredibility}
            className="transition-colors whitespace-nowrap shrink-0 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 flex items-center gap-1 text-xs"
            title="Editorial Verification Standards"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Sources</span>
          </button>
        </nav>

        {/* Right Zone: Search, Bookmarks, Theme, Live Wire Monitor */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* Mobile Language Button if top bar hidden */}
          <button
            onClick={() => {
              const next: LanguageCode = languageMode === 'en' ? 'hi' : languageMode === 'hi' ? 'bilingual' : 'en';
              onSelectLanguageMode?.(next);
            }}
            className="sm:hidden px-2 py-1 bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 rounded-lg text-xs font-semibold flex items-center gap-1"
            title="Toggle Language"
          >
            <Languages className="w-3 h-3 text-indigo-500" />
            <span>{languageMode === 'en' ? 'EN' : languageMode === 'hi' ? 'हि' : 'द्वि'}</span>
          </button>

          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            title="Search News (Ctrl/Cmd + K)"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Bookmarks Counter */}
          <button
            onClick={onOpenBookmarks}
            className="relative p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            title="Saved Articles"
            aria-label="Bookmarks"
          >
            <Bookmark className="w-4 h-4" />
            {bookmarksCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-indigo-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center font-mono">
                {bookmarksCount}
              </span>
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-700" />}
          </button>

          {/* Live Ingestion Diagnostics CTA */}
          <button
            onClick={() => onSelectTab('diagnostics')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#111315] hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 rounded-xl transition-all shadow-xs"
            title="Inspect Real RSS Feeds & Ingestion Latency"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400 dark:text-amber-600" />
            <span>Live Feeds</span>
          </button>
        </div>

      </div>
    </header>
  );
};
