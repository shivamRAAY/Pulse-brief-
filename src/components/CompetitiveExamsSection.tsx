import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  Download,
  Filter,
  FileCheck,
  ChevronRight,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { Article, ExamCategory, PracticeQuizQuestion } from '../types/news';
import { PRACTICE_QUIZ_QUESTIONS } from '../data/newsDatabase';

interface CompetitiveExamsSectionProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const CompetitiveExamsSection: React.FC<CompetitiveExamsSectionProps> = ({
  articles,
  onSelectArticle,
}) => {
  const [selectedExam, setSelectedExam] = useState<ExamCategory | 'All'>('All');
  const [activeTab, setActiveTab] = useState<'study_cards' | 'quiz' | 'compilation'>('study_cards');
  
  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState<Record<string, boolean>>({});

  const examsList: (ExamCategory | 'All')[] = ['All', 'UPSC', 'State PCS', 'Banking', 'SSC', 'General Awareness'];

  const filteredArticles = articles.filter((a) => {
    if (selectedExam === 'All') return true;
    return a.examRelevance?.exams?.includes(selectedExam);
  });

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    setShowResults((prev) => ({ ...prev, [questionId]: true }));
  };

  const handleExportNotes = () => {
    const notesContent = filteredArticles
      .map(
        (a, i) => `=== ${i + 1}. ${a.title} ===
Category: ${a.category} | Exam Relevance: ${a.examRelevance.exams.join(', ')}
Paper Mapping: ${a.examRelevance.paperMapping || 'N/A'}

[WHAT HAPPENED]
${a.summary}

[WHY IT MATTERS]
${a.whyItMatters}

[KEY FACTS TO REMEMBER]
${a.keyFacts.map((f) => `• ${f}`).join('\n')}

[STATIC GK ANCHOR]
${a.examRelevance.staticGkConnection}

[POTENTIAL EXAM QUESTION]
${a.examRelevance.potentialQuestion}

[SOURCE]
${a.publisher} (${a.sourceUrl})
\n------------------------------------------------------------\n`
      )
      .join('\n');

    const blob = new Blob([notesContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `PulseBrief_Current_Affairs_${selectedExam}_Revision_Notes.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-stone-950 text-white rounded-2xl p-6 sm:p-8 border border-indigo-900/50 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-indigo-300 text-xs font-semibold tracking-wider uppercase font-tabular mb-2">
              <GraduationCap className="w-4 h-4" />
              <span>Aspirant Revision & Learning Hub</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-editorial leading-tight">
              Current Affairs for Indian Competitive Examinations
            </h1>
            <p className="text-stone-300 text-xs sm:text-sm mt-2 leading-relaxed">
              Targeted high-yield study cards, static GK linkages, syllabus mapping (GS Paper I–IV), and exam-standard practice questions.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleExportNotes}
              className="px-4 py-2.5 bg-white text-indigo-950 hover:bg-stone-100 rounded-lg text-xs font-bold flex items-center gap-2 transition-colors shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Export Revision Notes (.md)</span>
            </button>
          </div>
        </div>

        {/* Exam Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 mt-6 pt-6 border-t border-indigo-800/60">
          <span className="text-xs text-indigo-200 font-medium mr-2">Target Exam:</span>
          {examsList.map((exam) => (
            <button
              key={exam}
              onClick={() => setSelectedExam(exam)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                selectedExam === exam
                  ? 'bg-indigo-500 text-white font-semibold'
                  : 'bg-indigo-950/70 text-indigo-200 hover:bg-indigo-900/80'
              }`}
            >
              {exam}
            </button>
          ))}
        </div>
      </div>

      {/* Main Tabs (Study Cards vs Practice Quiz) */}
      <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('study_cards')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'study_cards'
                ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            Exam Study Cards ({filteredArticles.length})
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'quiz'
                ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Practice Quizzes & MCQs ({PRACTICE_QUIZ_QUESTIONS.length})</span>
          </button>
        </div>

        <div className="text-xs text-stone-500 font-tabular hidden sm:block">
          Syllabus-Aligned Analysis
        </div>
      </div>

      {/* Tab 1: Exam Study Cards */}
      {activeTab === 'study_cards' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200/90 dark:border-stone-800 p-6 flex flex-col justify-between shadow-xs"
            >
              <div>
                {/* Header Metadata */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-100 dark:border-stone-800 text-xs font-tabular">
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                    {article.examRelevance.paperMapping || article.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-stone-500">
                    {article.examRelevance.exams.map((e) => (
                      <span key={e} className="px-1.5 py-0.5 bg-stone-100 dark:bg-stone-800 rounded text-[10px]">
                        {e}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Title */}
                <h3
                  onClick={() => onSelectArticle(article)}
                  className="text-base font-bold text-stone-900 dark:text-stone-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mt-3 cursor-pointer leading-snug"
                >
                  {article.title}
                </h3>

                {/* Structured Exam Study Blocks */}
                <div className="mt-4 space-y-3 text-xs leading-relaxed">
                  <div>
                    <span className="font-bold text-stone-900 dark:text-stone-200">What Happened: </span>
                    <span className="text-stone-600 dark:text-stone-400">{article.summary}</span>
                  </div>

                  <div>
                    <span className="font-bold text-stone-900 dark:text-stone-200">Why It Matters: </span>
                    <span className="text-stone-600 dark:text-stone-400">{article.whyItMatters}</span>
                  </div>

                  <div className="p-3 bg-stone-50 dark:bg-stone-800/60 rounded-lg border border-stone-200/70 dark:border-stone-750">
                    <div className="font-bold text-indigo-900 dark:text-indigo-300 mb-1 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      Static GK Linkage:
                    </div>
                    <div className="text-stone-700 dark:text-stone-300">{article.examRelevance.staticGkConnection}</div>
                  </div>

                  <div className="p-3 bg-amber-50/60 dark:bg-amber-950/20 rounded-lg border border-amber-200/60 dark:border-amber-900/40">
                    <div className="font-bold text-amber-900 dark:text-amber-300 mb-1">
                      Probable Examination Question:
                    </div>
                    <div className="text-stone-800 dark:text-stone-200 italic font-editorial text-sm">
                      "{article.examRelevance.potentialQuestion}"
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-stone-100 dark:border-stone-800 text-xs">
                <span className="text-stone-400 truncate max-w-[200px]">Source: {article.publisher}</span>
                <button
                  onClick={() => onSelectArticle(article)}
                  className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                >
                  <span>Open Full Article & AI Notes</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Interactive Practice Quiz */}
      {activeTab === 'quiz' && (
        <div className="space-y-6">
          <div className="bg-stone-50 dark:bg-stone-900/60 rounded-xl p-4 border border-stone-200 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400 flex items-center justify-between">
            <span>
              Real examination-grade practice MCQs derived from verified current affairs developments.
            </span>
            <span className="font-tabular font-semibold text-indigo-600 dark:text-indigo-400">
              Immediate Explanation Feedback
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {PRACTICE_QUIZ_QUESTIONS.map((q, qIndex) => {
              const selectedIdx = quizAnswers[q.id];
              const isAnswered = selectedIdx !== undefined;
              const isCorrect = selectedIdx === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200/90 dark:border-stone-800 p-6 shadow-xs"
                >
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-100 dark:border-stone-800 text-xs font-tabular">
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">
                      QUESTION {qIndex + 1} · {q.exam}
                    </span>
                    <span className="text-stone-400">{q.staticTopic}</span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100 whitespace-pre-line leading-relaxed">
                    {q.question}
                  </h3>

                  {/* Options */}
                  <div className="mt-4 space-y-2">
                    {q.options.map((opt, optIndex) => {
                      let btnStyle =
                        'bg-stone-50 dark:bg-stone-800/60 border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:bg-stone-100';

                      if (isAnswered) {
                        if (optIndex === q.correctIndex) {
                          btnStyle =
                            'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold';
                        } else if (optIndex === selectedIdx) {
                          btnStyle =
                            'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-200 line-through';
                        }
                      }

                      return (
                        <button
                          key={optIndex}
                          disabled={isAnswered}
                          onClick={() => handleSelectOption(q.id, optIndex)}
                          className={`w-full text-left p-3 rounded-lg border text-xs transition-colors flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {isAnswered && optIndex === q.correctIndex && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation Block */}
                  {isAnswered && (
                    <div className="mt-4 p-4 bg-stone-50 dark:bg-stone-800/50 rounded-lg border border-stone-200 dark:border-stone-700 text-xs leading-relaxed animate-in fade-in duration-300">
                      <div className="font-bold mb-1 text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                        {isCorrect ? (
                          <span className="text-emerald-600 dark:text-emerald-400">✓ Correct Answer!</span>
                        ) : (
                          <span className="text-rose-600 dark:text-rose-400">✗ Incorrect. Review Explanation:</span>
                        )}
                      </div>
                      <p className="text-stone-700 dark:text-stone-300">{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
