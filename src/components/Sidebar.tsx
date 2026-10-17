import React from 'react';
import {
  Home,
  Flag,
  Globe,
  Landmark,
  TrendingUp,
  Cpu,
  Sparkles,
  GraduationCap,
  Leaf,
  Shield,
  Layers,
  HeartPulse,
  Trophy,
  Award,
  FileText,
  Bookmark,
  History,
  Megaphone,
  ChevronLeft,
  ChevronRight,
  X,
  Languages,
} from 'lucide-react';
import { CATEGORIES } from '../data/newsDatabase';
import { Region, LanguageCode } from '../types/news';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  currentRegion: Region;
  onSelectRegion: (region: Region) => void;
  activeView: string;
  onSelectView: (view: string) => void;
  bookmarksCount: number;
  historyCount: number;
  languageMode?: LanguageCode;
  onSelectLanguageMode?: (mode: LanguageCode) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onToggle,
  mobileOpen = false,
  onCloseMobile,
  selectedCategory,
  onSelectCategory,
  currentRegion,
  onSelectRegion,
  activeView,
  onSelectView,
  bookmarksCount,
  historyCount,
  languageMode = 'en',
  onSelectLanguageMode,
}) => {
  const mainNavItems = [
    { id: 'home', label: 'Editorial Lead', icon: Home },
    { id: 'movements', label: 'Protests & Movements', icon: Megaphone, badge: 'Live', badgeColor: 'bg-rose-500 text-white' },
    { id: 'india_focus', label: 'India Priority Desk', icon: Flag, region: 'india' as Region },
    { id: 'world_focus', label: 'World Affairs & Geopolitics', icon: Globe, region: 'world' as Region },
    { id: 'exams', label: 'Aspirants Hub (UPSC/SSC)', icon: GraduationCap },
    { id: 'briefings', label: 'Daily Briefings', icon: FileText },
    { id: 'time_explorer', label: 'Time & Archive Explorer', icon: History },
  ];

  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case 'protests-and-public-movements':
        return Megaphone;
      case 'indian-politics':
        return Landmark;
      case 'government-policies-and-schemes':
        return FileText;
      case 'parliament-and-judiciary':
        return Landmark;
      case 'economy-and-finance':
        return TrendingUp;
      case 'international-relations':
        return Globe;
      case 'defence-and-national-security':
        return Shield;
      case 'science-and-space':
        return Sparkles;
      case 'artificial-intelligence-and-technology':
        return Cpu;
      case 'education-and-examinations':
        return GraduationCap;
      case 'environment-and-climate':
        return Leaf;
      case 'health-and-medicine':
        return HeartPulse;
      case 'sports':
        return Trophy;
      case 'awards-and-honours':
        return Award;
      default:
        return Layers;
    }
  };

  const handleNavClick = (item: typeof mainNavItems[0]) => {
    if (item.region) {
      onSelectRegion(item.region);
      onSelectView('home');
      onSelectCategory('all');
    } else {
      onSelectView(item.id);
    }
    onCloseMobile?.();
  };

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between">
      {/* Top Header inside mobile sidebar */}
      <div className="lg:hidden p-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
            PB
          </div>
          <span className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
            PulseBrief News
          </span>
        </div>
        <button
          onClick={onCloseMobile}
          className="p-1.5 text-stone-500 hover:text-stone-900 dark:hover:text-white rounded-lg"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-3 space-y-6 overflow-y-auto flex-1">
        
        {/* Core Editorial Desks */}
        <div>
          <div className={`px-2 pb-2 text-[10px] font-bold uppercase tracking-wider text-stone-400 font-mono ${!isOpen && 'lg:hidden'}`}>
            Intelligence Desks
          </div>

          <nav className="space-y-1">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                (item.region && currentRegion === item.region && activeView === 'home' && selectedCategory === 'all') ||
                (!item.region && activeView === item.id);

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-semibold shadow-xs'
                      : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800/60'
                  }`}
                  title={item.label}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-stone-500'}`} />
                    <span className={`truncate ${!isOpen && 'lg:hidden'}`}>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded-full font-bold shrink-0 ${item.badgeColor || 'bg-stone-200 text-stone-700'} ${!isOpen && 'lg:hidden'}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* 20 Curated News Categories */}
        <div>
          <div className={`px-2 pb-2 text-[10px] font-bold uppercase tracking-wider text-stone-400 font-mono flex items-center justify-between ${!isOpen && 'lg:hidden'}`}>
            <span>Subject Categories</span>
            <span className="text-[9px] text-stone-400">20 Topics</span>
          </div>

          <div className="space-y-0.5">
            {CATEGORIES.map((cat) => {
              const Icon = getCategoryIcon(cat.slug);
              const isSelected = selectedCategory === cat.slug;

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    onSelectCategory(cat.slug);
                    onSelectView('home');
                    onCloseMobile?.();
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                    isSelected
                      ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-medium'
                      : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800/60'
                  }`}
                  title={cat.name}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <Icon className="w-3.5 h-3.5 shrink-0 opacity-70" />
                    <span className={`truncate text-[11px] ${!isOpen && 'lg:hidden'}`}>{cat.name}</span>
                  </div>
                  <span className={`text-[10px] opacity-60 font-mono shrink-0 ml-1 ${!isOpen && 'lg:hidden'}`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Sidebar Footer with Language Switch & Collapse Toggle */}
      <div className="p-3 border-t border-stone-200 dark:border-stone-800 space-y-2">
        {/* Language switch on sidebar */}
        <div className={`p-2 bg-stone-100 dark:bg-stone-900 rounded-xl ${!isOpen && 'lg:hidden'}`}>
          <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 mb-1.5">
            <span className="flex items-center gap-1">
              <Languages className="w-3 h-3 text-indigo-500" />
              <span>Language Desk</span>
            </span>
            <span className="font-bold text-stone-700 dark:text-stone-300 uppercase">{languageMode}</span>
          </div>
          <div className="grid grid-cols-3 gap-1 text-[10px] font-semibold">
            <button
              onClick={() => onSelectLanguageMode?.('en')}
              className={`py-1 rounded text-center transition-colors ${
                languageMode === 'en'
                  ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-xs font-bold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => onSelectLanguageMode?.('hi')}
              className={`py-1 rounded text-center transition-colors ${
                languageMode === 'hi'
                  ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-xs font-bold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              हिन्दी
            </button>
            <button
              onClick={() => onSelectLanguageMode?.('bilingual')}
              className={`py-1 rounded text-center transition-colors ${
                languageMode === 'bilingual'
                  ? 'bg-white dark:bg-stone-800 text-indigo-600 dark:text-indigo-300 shadow-xs font-bold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              द्विभाषी
            </button>
          </div>
        </div>

        {/* Desktop Collapse Button */}
        <button
          onClick={onToggle}
          className="hidden lg:flex w-full items-center justify-center p-2 rounded-xl text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          title={isOpen ? 'Collapse Navigation' : 'Expand Navigation'}
        >
          {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>

    </div>
  );

  return (
    <>
      {/* 1. Mobile Backdrop Overlay when mobileOpen is true */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="lg:hidden fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        />
      )}

      {/* 2. Mobile Drawer (< lg) */}
      <aside
        className={`lg:hidden fixed top-0 bottom-0 left-0 z-50 w-72 max-w-[85vw] bg-white dark:bg-[#12141A] border-r border-stone-200 dark:border-stone-800 shadow-2xl transition-transform duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* 3. Desktop Sticky Sidebar (>= lg) */}
      <aside
        className={`hidden lg:flex sticky top-24 z-30 h-[calc(100vh-7rem)] bg-white/70 dark:bg-[#12141A]/70 backdrop-blur-md border-r border-stone-200 dark:border-stone-800/80 transition-all duration-300 flex-col shrink-0 ${
          isOpen ? 'w-64' : 'w-16'
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
};
