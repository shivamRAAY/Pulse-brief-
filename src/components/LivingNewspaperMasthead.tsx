import React, { useState, useEffect } from 'react';
import {
  Bookmark,
  Search,
  Moon,
  Sun,
  ShieldCheck,
  Megaphone,
  Menu,
  X,
  Radio,
  Clock,
  Compass,
  Sparkles,
} from 'lucide-react';
import { Region, LanguageCode } from '../types/news';

interface LivingNewspaperMastheadProps {
  currentRegion: Region;
  onSelectRegion: (region: Region) => void;
  languageMode: LanguageCode;
  onSelectLanguageMode: (mode: LanguageCode) => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  bookmarksCount: number;
  onOpenBookmarks: () => void;
  onOpenSearch: () => void;
  onOpenCredibility: () => void;
  onOpenDiagnostics?: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  liveStatusText?: string;
  incomingCount?: number;
  onFlushBuffer?: () => void;
}

export const LivingNewspaperMasthead: React.FC<LivingNewspaperMastheadProps> = ({
  currentRegion,
  onSelectRegion,
  languageMode,
  onSelectLanguageMode,
  activeTab,
  onSelectTab,
  bookmarksCount,
  onOpenBookmarks,
  onOpenSearch,
  onOpenCredibility,
  onOpenDiagnostics,
  theme,
  onToggleTheme,
  liveStatusText = 'LIVE WIRE CONNECTED',
  incomingCount = 0,
  onFlushBuffer,
}) => {
  const [dateStr, setDateStr] = useState<string>('SATURDAY, OCTOBER 17, 2026');
  const [istTime, setIstTime] = useState<string>('12:00 IST');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      };
      const formattedDate = new Intl.DateTimeFormat('en-IN', options).format(now);
      setDateStr(formattedDate.toUpperCase());

      const timeOpts: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      };
      setIstTime(`${new Intl.DateTimeFormat('en-IN', timeOpts).format(now)} IST`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000 * 30);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'home', label: 'Front Page', hindiLabel: 'मुख्य पृष्ठ' },
    { id: 'india', label: 'India Today', hindiLabel: 'भारत विशेष' },
    { id: 'world', label: 'World Briefing', hindiLabel: 'विश्व घटनाक्रम' },
    { id: 'movements', label: 'Protests & Movements', hindiLabel: 'आंदोलन एवं प्रदर्शन', isAccent: true },
    { id: 'trending', label: 'Trending', hindiLabel: 'ट्रेंडिंग' },
    { id: 'exams', label: 'Current Affairs for Exams', hindiLabel: 'परीक्षा विशेषांक' },
    { id: 'time_explorer', label: 'Archive & Timeline', hindiLabel: 'अभिलेखागार' },
  ];

  return (
    <header className="relative w-full border-b border-stone-300/80 dark:border-stone-800 bg-[#FBF9F5] dark:bg-[#121316] text-[#12110F] dark:text-[#F3EFE9] transition-colors select-none">
      
      {/* 1. TOP EDITORIAL META BAR (Clean, unboxed typography with typographic separators) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 border-b border-stone-200/90 dark:border-stone-800/80 flex flex-wrap items-center justify-between text-[11px] font-mono tracking-wider">
        
        {/* Left: Dateline & Bureau */}
        <div className="flex items-center gap-2 text-stone-600 dark:text-stone-400">
          <span className="font-semibold text-stone-900 dark:text-stone-200">{dateStr}</span>
          <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
          <span>NEW DELHI BUREAU</span>
          <span aria-hidden="true" className="text-stone-300 dark:text-stone-700 hidden sm:inline">·</span>
          <span className="hidden sm:inline font-tabular">{istTime}</span>
          <span aria-hidden="true" className="text-stone-300 dark:text-stone-700 hidden md:inline">·</span>
          <span className="hidden md:inline">Vol. IV, No. 290</span>
        </div>

        {/* Center: Live News Sync Indicator */}
        <div className="flex items-center gap-2 text-[10px]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
          </span>
          <span className="font-bold tracking-widest text-emerald-800 dark:text-emerald-400">
            {liveStatusText}
          </span>

          {incomingCount > 0 && (
            <button
              onClick={onFlushBuffer}
              className="ml-2 px-2 py-0.5 bg-rose-600 hover:bg-rose-700 text-white rounded text-[10px] font-bold animate-pulse"
              title="New stories ingested"
            >
              +{incomingCount} NEW
            </button>
          )}
        </div>

        {/* Right: Language Selector & Theme Toggle */}
        <div className="flex items-center gap-3">
          {/* Language Selector: EN / हिन्दी / Bilingual */}
          <div className="flex items-center border border-stone-300 dark:border-stone-700 rounded-sm overflow-hidden text-[11px] bg-white dark:bg-stone-900">
            <button
              onClick={() => onSelectLanguageMode('en')}
              className={`px-2 py-0.5 font-semibold transition-colors ${
                languageMode === 'en'
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
              title="Read in English"
            >
              EN
            </button>
            <button
              onClick={() => onSelectLanguageMode('hi')}
              className={`px-2 py-0.5 font-semibold border-l border-stone-300 dark:border-stone-700 transition-colors ${
                languageMode === 'hi'
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
              title="हिन्दी में पढ़ें"
            >
              हिन्दी
            </button>
            <button
              onClick={() => onSelectLanguageMode('bilingual')}
              className={`px-2 py-0.5 font-semibold border-l border-stone-300 dark:border-stone-700 transition-colors hidden sm:inline ${
                languageMode === 'bilingual'
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
              title="Dual English & Hindi view"
            >
              DUAL
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-1 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors"
            title={theme === 'dark' ? 'Switch to Warm Ivory' : 'Switch to Charcoal'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* 2. MAIN EDITORIAL NEWSPAPER MASTHEAD */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 text-center relative">
        <div className="flex flex-col items-center justify-center">
          
          {/* Subtle Top Kicker */}
          <div className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-stone-500 dark:text-stone-400 uppercase mb-1">
            THE LIVING NEWSPAPER OF RECORD
          </div>

          {/* The Distinctive Brand Wordmark */}
          <div
            onClick={() => {
              onSelectTab('home');
              onSelectRegion('india');
            }}
            className="cursor-pointer group flex flex-col items-center"
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-black tracking-tight text-stone-950 dark:text-stone-50 transition-transform group-hover:scale-[1.005]">
              PulseBrief
            </h1>
            <div className="w-24 sm:w-36 h-[2px] bg-stone-900 dark:bg-stone-200 mt-1 mb-1.5 transition-all group-hover:w-48" />
          </div>

          {/* Tagline */}
          <p className="text-xs sm:text-sm font-serif italic text-stone-700 dark:text-stone-300 tracking-wide max-w-xl">
            “India First. World In Focus. Verified Intelligence for a Democratic Republic.”
          </p>
        </div>

        {/* Side Accents on Large Screens */}
        <div className="hidden lg:flex flex-col absolute left-8 top-1/2 -translate-y-1/2 text-left text-[11px] font-mono text-stone-500 dark:text-stone-400">
          <span className="font-semibold text-stone-800 dark:text-stone-200">EDITORIAL DESK</span>
          <span>PIB & Parliament Wire</span>
          <span>ISRO & Strategic Affairs</span>
        </div>

        <div className="hidden lg:flex flex-col absolute right-8 top-1/2 -translate-y-1/2 text-right text-[11px] font-mono text-stone-500 dark:text-stone-400">
          <span className="font-semibold text-stone-800 dark:text-stone-200">ASPIRANTS SPECIAL</span>
          <span>GS Paper Syllabus Linkage</span>
          <span>Civil Liberties Tracking</span>
        </div>
      </div>

      {/* 3. STRUCTURED EDITORIAL BROADSHEET RULES & CONCISE NAVIGATION */}
      <div className="border-t-2 border-b border-stone-900 dark:border-stone-700">
        <div className="border-t border-stone-300 dark:border-stone-800 py-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Main Editorial Sections Navigation */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2 text-xs font-serif font-medium tracking-wide overflow-x-auto scrollbar-none py-1">
            {navItems.map((item) => {
              const isActive =
                (item.id === 'india' && activeTab === 'home' && currentRegion === 'india') ||
                (item.id === 'world' && activeTab === 'home' && currentRegion === 'world') ||
                activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'india') {
                      onSelectRegion('india');
                      onSelectTab('home');
                    } else if (item.id === 'world') {
                      onSelectRegion('world');
                      onSelectTab('home');
                    } else {
                      onSelectTab(item.id);
                    }
                  }}
                  className={`px-3 py-1 transition-colors whitespace-nowrap rounded-sm ${
                    isActive
                      ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-semibold'
                      : item.isAccent
                      ? 'text-rose-800 dark:text-rose-400 font-semibold hover:bg-rose-50 dark:hover:bg-rose-950/30'
                      : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800/60'
                  }`}
                >
                  {languageMode === 'hi' ? item.hindiLabel : item.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center py-1">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="px-2.5 py-1 text-xs font-mono font-semibold flex items-center gap-1.5 border border-stone-300 dark:border-stone-700 rounded bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200"
            >
              <Menu className="w-3.5 h-3.5" />
              <span>SECTIONS</span>
            </button>
          </div>

          {/* Quick Action Tools: Search, Dossier (Bookmarks), Sources Registry, Diagnostics */}
          <div className="flex items-center gap-3 text-xs font-mono shrink-0 py-1">
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-1 text-stone-700 dark:text-stone-300 hover:text-indigo-800 dark:hover:text-indigo-400 transition-colors font-medium"
              title="Search stories (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">SEARCH</span>
            </button>

            <button
              onClick={onOpenBookmarks}
              className="flex items-center gap-1 text-stone-700 dark:text-stone-300 hover:text-indigo-800 dark:hover:text-indigo-400 transition-colors font-medium relative"
              title="Saved reading list"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">DOSSIER</span>
              {bookmarksCount > 0 && (
                <span className="px-1.5 py-0.2 text-[10px] bg-indigo-900 text-white rounded font-bold">
                  {bookmarksCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenCredibility}
              className="hidden sm:flex items-center gap-1 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 transition-colors"
              title="Verified news sources"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SOURCES</span>
            </button>

            {onOpenDiagnostics && (
              <button
                onClick={onOpenDiagnostics}
                className="hidden lg:flex items-center gap-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 transition-colors"
                title="System Ingestion Diagnostics"
              >
                <Radio className="w-3 h-3 text-emerald-500" />
                <span className="text-[10px]">WIRE MONITOR</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Dropdown Menu for Sections */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-stone-200 dark:border-stone-800 bg-[#FBF9F5] dark:bg-[#121316] p-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'india') {
                    onSelectRegion('india');
                    onSelectTab('home');
                  } else if (item.id === 'world') {
                    onSelectRegion('world');
                    onSelectTab('home');
                  } else {
                    onSelectTab(item.id);
                  }
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm font-serif rounded hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors flex items-center justify-between"
              >
                <span>{languageMode === 'hi' ? item.hindiLabel : item.label}</span>
                {item.isAccent && <span className="text-xs font-mono text-rose-600">Active</span>}
              </button>
            ))}
          </div>
        )}
      </div>

    </header>
  );
};
