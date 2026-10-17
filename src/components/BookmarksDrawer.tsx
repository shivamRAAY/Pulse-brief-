import React, { useState } from 'react';
import { X, Bookmark, Trash2, History, ExternalLink, ArrowRight } from 'lucide-react';
import { Article } from '../types/news';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: string[];
  history: { articleId: string; readAt: string }[];
  allArticles: Article[];
  onSelectArticle: (article: Article) => void;
  onRemoveBookmark: (articleId: string) => void;
  onClearHistory: () => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  bookmarks,
  history,
  allArticles,
  onSelectArticle,
  onRemoveBookmark,
  onClearHistory,
}) => {
  const [activeTab, setActiveTab] = useState<'saved' | 'history'>('saved');

  if (!isOpen) return null;

  const bookmarkedArticles = allArticles.filter((a) => bookmarks.includes(a.id));
  const historyArticles = history
    .map((h) => {
      const art = allArticles.find((a) => a.id === h.articleId);
      return art ? { article: art, readAt: h.readAt } : null;
    })
    .filter(Boolean) as { article: Article; readAt: string }[];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-white dark:bg-stone-900 h-full shadow-2xl flex flex-col border-l border-stone-200 dark:border-stone-800">
        
        {/* Drawer Header */}
        <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 font-editorial">
              Your Library & Reading History
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex p-2 bg-stone-50 dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 text-xs">
          <button
            onClick={() => setActiveTab('saved')}
            className={`flex-1 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === 'saved'
                ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-xs'
                : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            Saved Articles ({bookmarkedArticles.length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === 'history'
                ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-xs'
                : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            Recent History ({historyArticles.length})
          </button>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {activeTab === 'saved' ? (
            bookmarkedArticles.length > 0 ? (
              bookmarkedArticles.map((art) => (
                <div
                  key={art.id}
                  onClick={() => {
                    onSelectArticle(art);
                    onClose();
                  }}
                  className="p-3.5 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-200/80 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 cursor-pointer transition-all flex items-start justify-between gap-3 group"
                >
                  <div className="flex-1">
                    <div className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold font-tabular">
                      {art.category}
                    </div>
                    <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 line-clamp-2 mt-1">
                      {art.title}
                    </h4>
                    <div className="text-[10px] text-stone-400 font-tabular mt-1.5">
                      {art.publisher} · {art.readingTimeMinutes} min read
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveBookmark(art.id);
                    }}
                    className="p-1.5 text-stone-400 hover:text-rose-600 rounded"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            ) : (
              <div className="py-16 text-center text-stone-400 text-xs">
                <Bookmark className="w-8 h-8 mx-auto mb-2 text-stone-300 dark:text-stone-700" />
                <p>No saved articles yet.</p>
                <p className="mt-1">Click the bookmark icon on any article to save it for revision.</p>
              </div>
            )
          ) : historyArticles.length > 0 ? (
            <div className="space-y-3">
              <div className="flex justify-end">
                <button
                  onClick={onClearHistory}
                  className="text-[11px] text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Clear History
                </button>
              </div>
              {historyArticles.map(({ article: art, readAt }, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    onSelectArticle(art);
                    onClose();
                  }}
                  className="p-3 bg-stone-50 dark:bg-stone-800/40 rounded-lg border border-stone-200/60 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 cursor-pointer transition-all"
                >
                  <div className="text-[10px] text-stone-400 font-tabular">
                    Read {new Date(readAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 line-clamp-2 mt-0.5">
                    {art.title}
                  </h4>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center text-stone-400 text-xs">
              <History className="w-8 h-8 mx-auto mb-2 text-stone-300 dark:text-stone-700" />
              <p>Your reading history is clean.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
