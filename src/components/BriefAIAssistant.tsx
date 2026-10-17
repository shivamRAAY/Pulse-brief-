import React, { useState } from 'react';
import {
  Sparkles,
  Languages,
  BookOpen,
  HelpCircle,
  Clock,
  Layers,
  Send,
  Loader2,
  CheckCircle2,
  FileText,
  Copy,
  Check,
} from 'lucide-react';
import { Article } from '../types/news';

interface BriefAIAssistantProps {
  article: Article;
}

export const BriefAIAssistant: React.FC<BriefAIAssistantProps> = ({ article }) => {
  const [activeMode, setActiveMode] = useState<string>('english');
  const [loading, setLoading] = useState<boolean>(false);
  const [responseContent, setResponseContent] = useState<string>('');
  const [customQuery, setCustomQuery] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [attribution, setAttribution] = useState<string>('');

  const modes = [
    { id: 'english', label: 'Simple English', icon: FileText },
    { id: 'hindi', label: 'सरल हिंदी (Hindi)', icon: Languages },
    { id: 'hinglish', label: 'Hinglish Explainer', icon: Languages },
    { id: 'exam_mcq', label: 'Exam MCQs', icon: HelpCircle },
    { id: 'flashcards', label: 'Revision Flashcards', icon: BookOpen },
    { id: 'timeline', label: 'Event Timeline', icon: Clock },
  ];

  const fetchAIAnalysis = async (modeToFetch: string, queryText?: string) => {
    setLoading(true);
    setResponseContent('');
    try {
      const res = await fetch('/api/ai/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          articleId: article.id,
          mode: modeToFetch,
          customQuestion: queryText,
        }),
      });

      const data = await res.json();
      setResponseContent(data.content || 'Analysis unavailable');
      setAttribution(`Source Grounding: ${data.source || article.publisher} · Model: ${data.generatedBy}`);
    } catch (err) {
      console.error('Failed to fetch AI analysis:', err);
      setResponseContent('Unable to connect to Brief AI server. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMode = (modeId: string) => {
    setActiveMode(modeId);
    fetchAIAnalysis(modeId);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuery.trim()) return;
    setActiveMode('custom');
    fetchAIAnalysis('custom', customQuery.trim());
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(responseContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Pre-load default english summary when opened
  React.useEffect(() => {
    fetchAIAnalysis('english');
  }, [article.id]);

  return (
    <div className="bg-stone-50 dark:bg-stone-900/70 rounded-2xl border border-stone-200 dark:border-stone-800 p-5 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 dark:bg-indigo-500 text-white flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5 font-editorial">
              Brief AI — News Intelligence Assistant
            </h3>
            <p className="text-[11px] text-stone-500 dark:text-stone-400">
              Grounded strictly in verified reporting · Zero speculation
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[11px] text-stone-500 font-tabular">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          <span>Source-Verified</span>
        </div>
      </div>

      {/* Mode Buttons */}
      <div className="flex flex-wrap gap-1.5 my-3.5">
        {modes.map((m) => {
          const Icon = m.icon;
          const isSelected = activeMode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => handleSelectMode(m.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-750'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{m.label}</span>
            </button>
          );
        })}
      </div>

      {/* Output Content Area */}
      <div className="bg-white dark:bg-stone-950 rounded-xl border border-stone-200 dark:border-stone-800 p-4.5 min-h-[160px] relative">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10 text-stone-400">
            <Loader2 className="w-6 h-6 animate-spin text-indigo-600 dark:text-indigo-400 mb-2" />
            <span className="text-xs">Generating source-grounded analysis...</span>
          </div>
        ) : (
          <div className="text-xs leading-relaxed text-stone-800 dark:text-stone-200 space-y-3 whitespace-pre-line font-sans">
            {responseContent}

            {/* Attribution Note */}
            {attribution && (
              <div className="pt-3 mt-3 border-t border-stone-100 dark:border-stone-800/80 text-[11px] text-stone-400 font-tabular">
                {attribution}
              </div>
            )}
          </div>
        )}

        {/* Copy Button */}
        {!loading && responseContent && (
          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 p-1.5 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 rounded-md transition-colors"
            title="Copy notes"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>

      {/* Ask Reader Question Input */}
      <form onSubmit={handleCustomSubmit} className="mt-3 flex items-center gap-2">
        <input
          type="text"
          value={customQuery}
          onChange={(e) => setCustomQuery(e.target.value)}
          placeholder="Ask Brief AI about this development (e.g. 'What is the constitutional basis?')..."
          className="flex-1 px-3.5 py-2 text-xs bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
        <button
          type="submit"
          disabled={loading || !customQuery.trim()}
          className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg text-xs font-medium flex items-center gap-1 transition-colors"
        >
          <span>Ask</span>
          <Send className="w-3 h-3" />
        </button>
      </form>
    </div>
  );
};
