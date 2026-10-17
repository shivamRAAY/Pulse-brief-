import React, { useState } from 'react';
import { Calendar, Clock, Filter, ArrowRight, RotateCcw, Globe } from 'lucide-react';
import { TimeFilterPreset, Region } from '../types/news';

interface TimeExplorerProps {
  activePreset: TimeFilterPreset;
  onSelectPreset: (preset: TimeFilterPreset) => void;
  startDate: string;
  endDate: string;
  onSetCustomRange: (start: string, end: string) => void;
  timezone: 'IST' | 'UTC' | 'LOCAL';
  onToggleTimezone: (tz: 'IST' | 'UTC' | 'LOCAL') => void;
  selectedRegion: Region;
  onSelectRegion: (reg: Region) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  categories: { id: string; name: string; slug: string }[];
  resultCount: number;
}

export const TimeExplorer: React.FC<TimeExplorerProps> = ({
  activePreset,
  onSelectPreset,
  startDate,
  endDate,
  onSetCustomRange,
  timezone,
  onToggleTimezone,
  selectedRegion,
  onSelectRegion,
  selectedCategory,
  onSelectCategory,
  categories,
  resultCount,
}) => {
  const [customStart, setCustomStart] = useState<string>(startDate || '2026-10-01');
  const [customEnd, setCustomEnd] = useState<string>(endDate || '2026-10-16');

  const presets: { id: TimeFilterPreset; label: string; desc: string }[] = [
    { id: 'latest', label: 'Latest Feeds', desc: 'Real-time ingested' },
    { id: 'today', label: 'Today', desc: 'Past 24 hours' },
    { id: 'yesterday', label: 'Yesterday', desc: 'Previous 24-48 hours' },
    { id: 'last_7_days', label: 'Last 7 Days', desc: 'Weekly briefing scope' },
    { id: 'last_30_days', label: 'Last 30 Days', desc: 'Monthly revision scope' },
    { id: 'this_month', label: 'This Month (Oct 2026)', desc: 'Current calendar month' },
    { id: 'last_month', label: 'Last Month (Sep 2026)', desc: 'Prior calendar month' },
    { id: 'this_year', label: 'This Year (2026)', desc: 'Full annual archive' },
    { id: 'prev_year', label: 'Previous Year (2025)', desc: 'Historical archive' },
    { id: 'custom', label: 'Custom Date Range', desc: 'Specific date bracket' },
  ];

  const handleApplyCustom = (e: React.FormEvent) => {
    e.preventDefault();
    onSelectPreset('custom');
    onSetCustomRange(customStart, customEnd);
  };

  const handleReset = () => {
    onSelectPreset('latest');
    onSelectRegion('all');
    onSelectCategory('all');
  };

  return (
    <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 p-5 shadow-xs">
      {/* Header with Timezone Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
        <div>
          <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>Time-Based News Explorer</span>
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
            Retrieve verified historical reporting by precise publication window and editorial relevance.
          </p>
        </div>

        {/* Timezone Segmented Control */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-stone-500 font-medium flex items-center gap-1">
            <Globe className="w-3.5 h-3.5" />
            Timezone:
          </span>
          <div className="flex p-0.5 bg-stone-100 dark:bg-stone-800 rounded-lg text-xs font-tabular">
            {(['IST', 'UTC', 'LOCAL'] as const).map((tz) => (
              <button
                key={tz}
                onClick={() => onToggleTimezone(tz)}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  timezone === tz
                    ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs'
                    : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
              >
                {tz}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Preset Pills / Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 my-4">
        {presets.map((preset) => {
          const isSelected = activePreset === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => onSelectPreset(preset.id)}
              className={`p-2.5 rounded-lg text-left transition-all border text-xs ${
                isSelected
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-400 dark:border-indigo-600 text-indigo-950 dark:text-indigo-200 shadow-xs font-semibold'
                  : 'bg-stone-50 dark:bg-stone-800/40 border-stone-200/80 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <div className="font-medium truncate">{preset.label}</div>
              <div className="text-[10px] text-stone-400 dark:text-stone-500 truncate mt-0.5">
                {preset.desc}
              </div>
            </button>
          );
        })}
      </div>

      {/* Custom Date Range Pickers (Visible when custom selected or expandable) */}
      {activePreset === 'custom' && (
        <form onSubmit={handleApplyCustom} className="p-4 bg-stone-50 dark:bg-stone-800/60 rounded-lg border border-stone-200 dark:border-stone-700 mb-4 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-stone-600 dark:text-stone-400">Start Date:</span>
            <input
              type="date"
              value={customStart}
              onChange={(e) => setCustomStart(e.target.value)}
              className="px-3 py-1.5 text-xs bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-md text-stone-900 dark:text-stone-100 font-tabular"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-stone-600 dark:text-stone-400">End Date:</span>
            <input
              type="date"
              value={customEnd}
              onChange={(e) => setCustomEnd(e.target.value)}
              className="px-3 py-1.5 text-xs bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-md text-stone-900 dark:text-stone-100 font-tabular"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-1.5 bg-indigo-600 text-white rounded-md text-xs font-medium hover:bg-indigo-700 transition-colors"
          >
            Apply Range
          </button>
        </form>
      )}

      {/* Auxiliary Combinatorial Filters (Geography + Category) */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-100 dark:border-stone-800/60 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-stone-500 font-medium flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter by:
          </span>

          {/* Region Filter */}
          <select
            value={selectedRegion}
            onChange={(e) => onSelectRegion(e.target.value as Region)}
            className="px-2.5 py-1 bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-md text-stone-800 dark:text-stone-200 font-medium"
          >
            <option value="all">All Geographies</option>
            <option value="india">India Only (Primary)</option>
            <option value="world">World Only (International)</option>
          </select>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => onSelectCategory(e.target.value)}
            className="px-2.5 py-1 bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-md text-stone-800 dark:text-stone-200 font-medium"
          >
            <option value="all">All 20 Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>

          {(selectedCategory !== 'all' || selectedRegion !== 'all' || activePreset !== 'latest') && (
            <button
              onClick={handleReset}
              className="text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 flex items-center gap-1 underline underline-offset-2"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          )}
        </div>

        {/* Real result counter */}
        <div className="text-stone-500 font-tabular">
          Showing <span className="font-semibold text-stone-900 dark:text-stone-100">{resultCount}</span> verified stories
        </div>
      </div>
    </div>
  );
};
