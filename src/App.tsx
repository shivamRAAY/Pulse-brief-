import React, { useState, useEffect } from 'react';
import { LivingNewspaperMasthead } from './components/LivingNewspaperMasthead';
import { FrontPageEditorialGrid } from './components/FrontPageEditorialGrid';
import { IndiaTodaySection } from './components/IndiaTodaySection';
import { WorldBriefingSection } from './components/WorldBriefingSection';
import { MovementsProtestSection } from './components/MovementsProtestSection';
import { CompetitiveExamsSection } from './components/CompetitiveExamsSection';
import { BriefingPanel } from './components/BriefingPanel';
import { TrendingSection } from './components/TrendingSection';
import { TimeExplorer } from './components/TimeExplorer';
import { ArticleCard } from './components/ArticleCard';
import { ArticleDetailModal } from './components/ArticleDetailModal';
import { SearchModal } from './components/SearchModal';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { SourcesCredibilityModal } from './components/SourcesCredibilityModal';
import { IngestionDiagnosticsModal } from './components/IngestionDiagnosticsModal';
import { Footer } from './components/Footer';
import { Sidebar } from './components/Sidebar';

import { ARTICLES_DATABASE, BRIEFING_ITEMS, CATEGORIES } from './data/newsDatabase';
import { Article, Region, TimeFilterPreset, PriorityTier, LanguageCode } from './types/news';
import { useRealTimeNews } from './hooks/useRealTimeNews';
import {
  Radio,
  Sparkles,
  Volume2,
  VolumeX,
  Megaphone,
  Home,
  GraduationCap,
  Search,
  Menu,
  Clock,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export default function App() {
  // Theme state: 'light' (Warm Ivory Paper) | 'dark' (Charcoal & Ink)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('pulsebrief_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Language state: 'en' | 'hi' | 'bilingual'
  const [languageMode, setLanguageMode] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem('pulsebrief_lang') as LanguageCode;
    return saved === 'hi' || saved === 'bilingual' ? saved : 'en';
  });

  // Navigation & View state
  const [activeTab, setActiveTab] = useState<string>('home');
  const [currentRegion, setCurrentRegion] = useState<Region>('india');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');

  // Slide-out Drawer state for Desks / Categories
  const [sidebarDrawerOpen, setSidebarDrawerOpen] = useState<boolean>(false);

  // Time Explorer state
  const [timePreset, setTimePreset] = useState<TimeFilterPreset>('latest');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [timezone, setTimezone] = useState<'IST' | 'UTC' | 'LOCAL'>('IST');

  // Bookmarks & History state
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('pulsebrief_bookmarks');
      return saved ? JSON.parse(saved) : ['pb-2026-isro-gaganyaan-orbital', 'pb-2026-protest-port-workers-strike'];
    } catch {
      return ['pb-2026-isro-gaganyaan-orbital'];
    }
  });

  const [readingHistory, setReadingHistory] = useState<{ articleId: string; readAt: string }[]>(() => {
    try {
      const saved = localStorage.getItem('pulsebrief_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Real-Time Live News Hook (SSE, Background Ingestion, XML feeds, Audio)
  const {
    articles,
    incomingBuffer,
    flushBuffer,
    connectionState,
    lastSyncTime,
    autoInsert,
    toggleAutoInsert,
    soundEnabled,
    setSoundEnabled,
    providers,
    notificationToast,
    triggerManualPoll,
    simulateBreakingWire,
  } = useRealTimeNews(ARTICLES_DATABASE);

  // Modal states
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [bookmarksOpen, setBookmarksOpen] = useState<boolean>(false);
  const [credibilityOpen, setCredibilityOpen] = useState<boolean>(false);
  const [diagnosticsOpen, setDiagnosticsOpen] = useState<boolean>(false);

  // Apply Theme class to document root
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('pulsebrief_theme', theme);
  }, [theme]);

  // Persist Language Mode
  useEffect(() => {
    localStorage.setItem('pulsebrief_lang', languageMode);
  }, [languageMode]);

  // Persist Bookmarks
  useEffect(() => {
    localStorage.setItem('pulsebrief_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Persist Reading History
  useEffect(() => {
    localStorage.setItem('pulsebrief_history', JSON.stringify(readingHistory));
  }, [readingHistory]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleToggleBookmark = (id: string) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
    setReadingHistory((prev) => [
      { articleId: article.id, readAt: new Date().toISOString() },
      ...prev.filter((h) => h.articleId !== article.id).slice(0, 20),
    ]);
  };

  const handleOpenArticleByTitle = (title: string) => {
    const art = articles.find(
      (a) =>
        a.title.toLowerCase().includes(title.toLowerCase().slice(0, 20)) ||
        title.toLowerCase().includes(a.title.toLowerCase().slice(0, 20)) ||
        (a.hindiTitle && a.hindiTitle.includes(title.slice(0, 15)))
    );
    if (art) {
      handleSelectArticle(art);
    }
  };

  // Filter Articles according to active state
  let filteredArticles = [...articles];

  // 1. Region Filter
  if (currentRegion !== 'all') {
    filteredArticles = filteredArticles.filter((a) => a.region === currentRegion);
  }

  // 2. Category Filter
  if (selectedCategory !== 'all') {
    filteredArticles = filteredArticles.filter(
      (a) =>
        a.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').includes(selectedCategory) ||
        selectedCategory.includes(a.category.toLowerCase().replace(/[^a-z0-9]+/g, '-'))
    );
  }

  // 3. Priority Tier Filter
  if (selectedPriority !== 'all') {
    filteredArticles = filteredArticles.filter((a) => a.priority === selectedPriority);
  }

  // 4. Time Filter
  if (timePreset !== 'latest') {
    filteredArticles = filteredArticles.filter((article) => {
      const pubDate = new Date(article.publishedAt);
      const articleTime = pubDate.getTime();
      const anchorTime = new Date().getTime();
      const diffDays = (anchorTime - articleTime) / (1000 * 60 * 60 * 24);

      switch (timePreset) {
        case 'today':
          return diffDays >= 0 && diffDays <= 1.2;
        case 'yesterday':
          return diffDays > 1.0 && diffDays <= 2.2;
        case 'last_7_days':
          return diffDays >= 0 && diffDays <= 7;
        case 'last_30_days':
          return diffDays >= 0 && diffDays <= 30;
        case 'this_month':
          return pubDate.getFullYear() === 2026 && pubDate.getMonth() === 9;
        case 'last_month':
          return pubDate.getFullYear() === 2026 && pubDate.getMonth() === 8;
        case 'this_year':
          return pubDate.getFullYear() === 2026;
        case 'prev_year':
          return pubDate.getFullYear() === 2025;
        case 'custom': {
          if (!startDate && !endDate) return true;
          const s = startDate ? new Date(startDate).getTime() : 0;
          const e = endDate ? new Date(endDate).getTime() : Number.MAX_SAFE_INTEGER;
          return articleTime >= s && articleTime <= e;
        }
        default:
          return true;
      }
    });
  }

  const leadStory = filteredArticles[0] || articles[0];
  const supportingStories = filteredArticles.slice(1, 4);
  const latestNews = [...articles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const selectedCategoryObj = CATEGORIES.find((c) => c.slug === selectedCategory);

  return (
    <div className="min-h-screen bg-[#FBF9F5] dark:bg-[#121316] text-[#12110F] dark:text-[#F3EFE9] font-sans transition-colors selection:bg-indigo-900 selection:text-white">
      
      {/* Real-Time Live Notification Toast */}
      {notificationToast && (
        <div className="fixed top-20 right-6 z-50 max-w-sm bg-stone-900 text-white p-4 rounded-sm shadow-2xl border-l-4 border-indigo-500 animate-in slide-in-from-top-4 duration-300 flex items-start gap-3">
          <div className="w-8 h-8 rounded-xs bg-indigo-900 flex items-center justify-center shrink-0">
            <Radio className="w-4 h-4 text-indigo-300 animate-pulse" />
          </div>
          <div className="flex-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 font-mono">
              LIVE WIRE DISPATCH · {notificationToast.category}
            </div>
            <div className="text-xs font-serif font-bold leading-snug mt-0.5 line-clamp-2">
              {notificationToast.title}
            </div>
          </div>
        </div>
      )}

      {/* Main Living Newspaper Container */}
      <div className="w-full flex flex-col">
        
        {/* 1. THE REFINED LIVING NEWSPAPER MASTHEAD */}
        <LivingNewspaperMasthead
          currentRegion={currentRegion}
          onSelectRegion={(reg) => {
            setCurrentRegion(reg);
            setSelectedCategory('all');
            setActiveTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          languageMode={languageMode}
          onSelectLanguageMode={setLanguageMode}
          activeTab={activeTab}
          onSelectTab={(tab) => {
            if (tab === 'diagnostics') {
              setDiagnosticsOpen(true);
            } else {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          bookmarksCount={bookmarks.length}
          onOpenBookmarks={() => setBookmarksOpen(true)}
          onOpenSearch={() => setSearchOpen(true)}
          onOpenCredibility={() => setCredibilityOpen(true)}
          onOpenDiagnostics={() => setDiagnosticsOpen(true)}
          theme={theme}
          onToggleTheme={toggleTheme}
          liveStatusText={connectionState === 'connected' ? 'LIVE WIRE CONNECTED' : 'SYNCHRONIZING'}
          incomingCount={incomingBuffer.length}
          onFlushBuffer={flushBuffer}
        />

        {/* 2. LIVE BREAKING WIRE TICKER & FAST-REFRESH CONTROLS */}
        <div className="border-b border-stone-200/90 dark:border-stone-800 bg-white dark:bg-[#15181E] py-2 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            
            {/* Left: Ticker Headline */}
            <div className="flex items-center gap-3 overflow-hidden flex-1">
              <span className="font-bold text-rose-700 dark:text-rose-400 shrink-0 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-ping" />
                <span>CONTINUOUS WIRE</span>
              </span>
              <span className="text-stone-300 dark:text-stone-700">|</span>
              <div className="truncate text-stone-700 dark:text-stone-300 font-serif text-sm">
                <span
                  onClick={() => handleSelectArticle(latestNews[0])}
                  className="cursor-pointer hover:underline"
                >
                  {latestNews[0]?.title}
                </span>
              </div>
            </div>

            {/* Right: Audio Chime & Manual Wire Poll */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setSoundEnabled((prev) => !prev)}
                className={`flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded transition-colors ${
                  soundEnabled
                    ? 'text-indigo-900 dark:text-indigo-400 font-semibold'
                    : 'text-stone-400 hover:text-stone-600'
                }`}
                title={soundEnabled ? 'Wire audio active' : 'Wire audio muted'}
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span>{soundEnabled ? 'CHIME ON' : 'MUTED'}</span>
              </button>

              <button
                onClick={() => setSidebarDrawerOpen(true)}
                className="text-[11px] font-mono text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-white flex items-center gap-1 border-l border-stone-200 dark:border-stone-700 pl-3"
              >
                <Menu className="w-3.5 h-3.5" />
                <span>DESKS & TOPICS</span>
              </button>
            </div>

          </div>
        </div>

        {/* 3. DYNAMIC CONTENT VIEWPORT */}
        <main className="w-full flex-1">
          
          {/* VIEW 1: THE LIVING NEWSPAPER HOMEPAGE */}
          {activeTab === 'home' && (
            <div className="space-y-0">
              
              {/* Category Breadcrumb if user is filtering */}
              {selectedCategory !== 'all' && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                  <div className="p-4 bg-white dark:bg-[#161920] border border-stone-300 dark:border-stone-800 rounded-sm flex items-center justify-between">
                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider text-indigo-900 dark:text-indigo-400 font-semibold">
                        CURATED EDITORIAL DESK
                      </div>
                      <h2 className="text-xl font-serif font-bold text-stone-950 dark:text-stone-100">
                        {selectedCategoryObj?.name || 'Selected Desk'}
                      </h2>
                      <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
                        {selectedCategoryObj?.description}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className="px-3 py-1.5 text-xs font-mono font-semibold bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 rounded-xs"
                    >
                      View All Front-Page Desks
                    </button>
                  </div>
                </div>
              )}

              {/* 1. FRONT PAGE EDITORIAL GRID (Large Lead Story + Compact Latest News Column) */}
              <FrontPageEditorialGrid
                leadStory={leadStory}
                subStories={supportingStories}
                latestNews={latestNews}
                onSelectArticle={handleSelectArticle}
                isBookmarked={(id) => bookmarks.includes(id)}
                onToggleBookmark={handleToggleBookmark}
                languageMode={languageMode}
                onOpenLiveWire={() => {
                  setTimePreset('latest');
                  setSelectedCategory('all');
                  window.scrollTo({ top: 300, behavior: 'smooth' });
                }}
              />

              {/* 2. INDIA TODAY SECTION (Priority National Affairs, Law, Governance, ISRO) */}
              <IndiaTodaySection
                articles={articles}
                onSelectArticle={handleSelectArticle}
                isBookmarked={(id) => bookmarks.includes(id)}
                onToggleBookmark={handleToggleBookmark}
                languageMode={languageMode}
              />

              {/* 3. WORLD BRIEFING SECTION (Geopolitics, Treaties + Subtle 3D Globe Radar) */}
              <WorldBriefingSection
                articles={articles}
                onSelectArticle={handleSelectArticle}
                isBookmarked={(id) => bookmarks.includes(id)}
                onToggleBookmark={handleToggleBookmark}
                languageMode={languageMode}
              />

              {/* 4. PROTESTS & PUBLIC MOVEMENTS (Democratic Assemblies, Civil Liberties & Constitutional Law) */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-stone-300/80 dark:border-stone-800">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b-2 border-stone-900 dark:border-stone-700 pb-3 mb-6">
                  <div>
                    <div className="text-xs font-mono uppercase tracking-widest text-rose-700 dark:text-rose-400 font-bold flex items-center gap-1.5">
                      <Megaphone className="w-3.5 h-3.5" />
                      <span>PUBLIC MOVEMENTS & CIVIL LIBERTIES</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-stone-950 dark:text-stone-50 mt-0.5">
                      Ongoing Demonstrations, Strikes & Constitutional Rights
                    </h2>
                  </div>

                  <button
                    onClick={() => {
                      setActiveTab('movements');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-3.5 py-1.5 bg-rose-700 hover:bg-rose-800 text-white rounded-xs text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto"
                  >
                    <span>Full Movements Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <MovementsProtestSection
                  articles={articles}
                  onSelectArticle={handleSelectArticle}
                  languageMode={languageMode}
                />
              </div>

              {/* 5. SPLIT INTELLIGENCE: TRENDING SIGNALS & EXECUTIVE BRIEFINGS */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-stone-300/80 dark:border-stone-800">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                  
                  {/* Executive Briefings */}
                  <BriefingPanel
                    indiaBriefings={BRIEFING_ITEMS.filter((b) => b.region === 'india')}
                    worldBriefings={BRIEFING_ITEMS.filter((b) => b.region === 'world')}
                    onOpenArticleByTitle={handleOpenArticleByTitle}
                  />

                  {/* Trending Signals */}
                  <TrendingSection
                    articles={articles}
                    onSelectArticle={handleSelectArticle}
                  />

                </div>
              </div>

              {/* 6. CURRENT AFFAIRS FOR COMPETITIVE EXAMS (UPSC CSE, State PCS, SSC) */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-stone-300/80 dark:border-stone-800">
                <CompetitiveExamsSection
                  articles={articles}
                  onSelectArticle={handleSelectArticle}
                />
              </div>

            </div>
          )}

          {/* VIEW 2: DEDICATED PROTESTS & PUBLIC MOVEMENTS TRACKER */}
          {activeTab === 'movements' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <MovementsProtestSection
                articles={articles}
                onSelectArticle={handleSelectArticle}
                languageMode={languageMode}
              />
            </div>
          )}

          {/* VIEW 3: DEDICATED ASPIRANTS EXAMS DOSSIER */}
          {activeTab === 'exams' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <CompetitiveExamsSection
                articles={articles}
                onSelectArticle={handleSelectArticle}
              />
            </div>
          )}

          {/* VIEW 4: DAILY EXECUTIVE BRIEFINGS */}
          {activeTab === 'briefings' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
              <div className="bg-white dark:bg-[#161920] border border-stone-300 dark:border-stone-800 p-6 rounded-sm">
                <div className="text-xs font-mono uppercase tracking-wider text-indigo-900 dark:text-indigo-400 font-bold">
                  EXECUTIVE DIGESTS & BULLETINS
                </div>
                <h1 className="text-2xl sm:text-3xl font-serif font-black text-stone-950 dark:text-stone-50 mt-1">
                  National & International Daily Intelligence Briefings
                </h1>
                <p className="text-sm font-serif text-stone-600 dark:text-stone-400 mt-2 leading-relaxed">
                  Morning and evening digests cross-verified against official gazettes, press bureaus, and ministerial spokespersons.
                </p>
              </div>

              <BriefingPanel
                indiaBriefings={BRIEFING_ITEMS.filter((b) => b.region === 'india')}
                worldBriefings={BRIEFING_ITEMS.filter((b) => b.region === 'world')}
                onOpenArticleByTitle={handleOpenArticleByTitle}
              />
            </div>
          )}

          {/* VIEW 5: TIME-BASED NEWS EXPLORER & ARCHIVE */}
          {activeTab === 'time_explorer' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
              <TimeExplorer
                activePreset={timePreset}
                onSelectPreset={setTimePreset}
                startDate={startDate}
                endDate={endDate}
                onSetCustomRange={(start, end) => {
                  setStartDate(start);
                  setEndDate(end);
                }}
                timezone={timezone}
                onToggleTimezone={setTimezone}
                selectedRegion={currentRegion}
                onSelectRegion={setCurrentRegion}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                categories={CATEGORIES}
                resultCount={filteredArticles.length}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                {filteredArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onSelect={handleSelectArticle}
                    isBookmarked={bookmarks.includes(article.id)}
                    onToggleBookmark={handleToggleBookmark}
                    languageMode={languageMode}
                  />
                ))}
              </div>
            </div>
          )}

          {/* VIEW 6: TRENDING SECTION DEDICATED */}
          {activeTab === 'trending' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <TrendingSection
                articles={articles}
                onSelectArticle={handleSelectArticle}
              />
            </div>
          )}

        </main>

        {/* 4. FOOTER */}
        <Footer
          onOpenCredibility={() => setCredibilityOpen(true)}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setActiveTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

      </div>

      {/* SIDEBAR SLIDE-OUT DRAWER FOR TOPIC EXPLORATION */}
      <Sidebar
        isOpen={sidebarDrawerOpen}
        onToggle={() => setSidebarDrawerOpen(!sidebarDrawerOpen)}
        mobileOpen={sidebarDrawerOpen}
        onCloseMobile={() => setSidebarDrawerOpen(false)}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setActiveTab('home');
          setSidebarDrawerOpen(false);
        }}
        currentRegion={currentRegion}
        onSelectRegion={(reg) => {
          setCurrentRegion(reg);
          setActiveTab('home');
          setSidebarDrawerOpen(false);
        }}
        activeView={activeTab}
        onSelectView={(v) => {
          if (v === 'diagnostics') {
            setDiagnosticsOpen(true);
          } else {
            setActiveTab(v);
          }
          setSidebarDrawerOpen(false);
        }}
        bookmarksCount={bookmarks.length}
        historyCount={readingHistory.length}
        languageMode={languageMode}
        onSelectLanguageMode={setLanguageMode}
      />

      {/* MOBILE STICKY BOTTOM BAR */}
      <nav className="md:hidden fixed bottom-3 left-4 right-4 z-40 bg-stone-950/90 text-stone-200 backdrop-blur-xl border border-white/10 rounded-xl px-3 py-2 flex items-center justify-around shadow-2xl">
        <button
          onClick={() => {
            setActiveTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors ${
            activeTab === 'home' ? 'text-stone-100 font-bold' : 'text-stone-400'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Front Page</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('movements');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors ${
            activeTab === 'movements' ? 'text-rose-400 font-bold' : 'text-stone-400'
          }`}
        >
          <Megaphone className="w-4 h-4" />
          <span>Movements</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('exams');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors ${
            activeTab === 'exams' ? 'text-stone-100 font-bold' : 'text-stone-400'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Exams</span>
        </button>

        <button
          onClick={() => setSearchOpen(true)}
          className="flex flex-col items-center gap-0.5 text-[10px] font-medium text-stone-400 hover:text-white"
        >
          <Search className="w-4 h-4" />
          <span>Search</span>
        </button>

        <button
          onClick={() => setSidebarDrawerOpen(true)}
          className="flex flex-col items-center gap-0.5 text-[10px] font-medium text-stone-400 hover:text-white"
        >
          <Menu className="w-4 h-4" />
          <span>Desks</span>
        </button>
      </nav>

      {/* Modals & Overlays */}
      {selectedArticle && (
        <ArticleDetailModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
          isBookmarked={bookmarks.includes(selectedArticle.id)}
          onToggleBookmark={handleToggleBookmark}
          relatedArticles={articles.filter(
            (a) => a.id !== selectedArticle.id && a.category === selectedArticle.category
          )}
          onSelectRelated={handleSelectArticle}
          initialLanguageMode={languageMode}
        />
      )}

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        articles={articles}
        onSelectArticle={handleSelectArticle}
      />

      <BookmarksDrawer
        isOpen={bookmarksOpen}
        onClose={() => setBookmarksOpen(false)}
        bookmarks={bookmarks}
        history={readingHistory}
        allArticles={articles}
        onSelectArticle={handleSelectArticle}
        onRemoveBookmark={handleToggleBookmark}
        onClearHistory={() => setReadingHistory([])}
      />

      <SourcesCredibilityModal
        isOpen={credibilityOpen}
        onClose={() => setCredibilityOpen(false)}
      />

      <IngestionDiagnosticsModal
        isOpen={diagnosticsOpen}
        onClose={() => setDiagnosticsOpen(false)}
        providers={providers}
        onTriggerManualPoll={triggerManualPoll}
        onSimulateBreaking={simulateBreakingWire}
      />

    </div>
  );
}
