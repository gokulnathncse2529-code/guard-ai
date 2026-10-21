import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Search,
  ArrowRight,
  Loader2,
  HelpCircle,
  FileText,
  Calendar,
  Building,
} from 'lucide-react';
import { Notice } from '../types/noticeguard';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  notices: Notice[];
  onSelectNotice: (notice: Notice) => void;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  notices,
  onSelectNotice,
}) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [matchedNotices, setMatchedNotices] = useState<Notice[]>([]);

  if (!isOpen) return null;

  const quickPrompts = [
    'When is the K.S.R. College exam timetable scheduled?',
    'Any CSE technical symposiums in Namakkal district?',
    'What are the Deepavali holiday dates for Tamil Nadu colleges?',
    'Which companies are coming for placements and what are the CGPA criteria?',
    'Anna University semester exam timetable notifications',
  ];

  const handleAskAi = async (textToSearch: string) => {
    if (!textToSearch.trim()) return;
    setLoading(true);
    setAiAnswer(null);
    setMatchedNotices([]);

    try {
      const res = await fetch('/api/ai/natural-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: textToSearch }),
      });
      const data = await res.json();
      if (data.success) {
        setAiAnswer(data.answer);
        if (Array.isArray(data.matchedNoticeIds) && data.matchedNoticeIds.length > 0) {
          const matched = notices.filter((n) => data.matchedNoticeIds.includes(n.id));
          setMatchedNotices(matched);
        } else {
          // Fallback keyword matching
          const q = textToSearch.toLowerCase();
          const fallback = notices.filter(
            (n) =>
              n.title.toLowerCase().includes(q) ||
              n.collegeName.toLowerCase().includes(q) ||
              n.district.toLowerCase().includes(q) ||
              n.category.toLowerCase().includes(q)
          );
          setMatchedNotices(fallback.slice(0, 4));
        }
      }
    } catch (err) {
      console.error('Failed to run AI search:', err);
      setAiAnswer('NoticeGuard AI encountered a network error while answering. Displaying standard results.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-700 text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                NoticeGuard AI Assistant
              </h3>
              <p className="text-xs text-blue-200">
                Natural-language discovery & official circular answers across Tamil Nadu
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-blue-200 hover:text-white rounded-md hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input Bar */}
        <div className="p-6 border-b border-slate-100 bg-slate-50">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAskAi(query);
            }}
            className="flex items-center gap-2"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask in plain language (e.g. 'CSE symposiums in Namakkal' or 'Anna university exam schedule')..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-xs"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="px-4 py-2.5 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shrink-0 shadow-sm"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>Ask AI</span>
            </button>
          </form>

          {/* Quick Prompts */}
          <div className="mt-3">
            <span className="text-[11px] font-semibold uppercase text-slate-400 tracking-wider mr-2">
              Try asking:
            </span>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuery(p);
                    handleAskAi(p);
                  }}
                  className="text-xs bg-white hover:bg-blue-50 hover:text-blue-700 text-slate-600 px-2.5 py-1 rounded-md border border-slate-200 transition-colors text-left"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Body content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {loading && (
            <div className="py-12 text-center text-slate-500 space-y-3">
              <Loader2 className="w-8 h-8 text-blue-700 animate-spin mx-auto" />
              <div className="text-sm font-medium text-slate-700">
                Searching official Tamil Nadu college notices with Gemini AI...
              </div>
              <div className="text-xs text-slate-400">
                Cross-referencing verified circulars and timetables
              </div>
            </div>
          )}

          {!loading && aiAnswer && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-4">
                <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900 uppercase tracking-wider mb-2">
                  <Sparkles className="w-4 h-4 text-blue-700" />
                  <span>AI Answer</span>
                </div>
                <p className="text-sm text-slate-800 leading-relaxed font-normal">
                  {aiAnswer}
                </p>
              </div>

              {matchedNotices.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Relevant Official Circulars ({matchedNotices.length})
                  </h4>
                  <div className="space-y-3">
                    {matchedNotices.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          onSelectNotice(n);
                          onClose();
                        }}
                        className="p-3.5 bg-slate-50 hover:bg-blue-50/60 rounded-xl border border-slate-200 hover:border-blue-400 transition-all cursor-pointer flex items-center justify-between group"
                      >
                        <div className="mr-3">
                          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                            <span className="font-semibold text-blue-700">{n.category}</span>
                            <span aria-hidden="true">·</span>
                            <span>{n.collegeName}</span>
                            <span aria-hidden="true">·</span>
                            <span className="font-mono">{n.publishedDate}</span>
                          </div>
                          <div className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-1">
                            {n.title}
                          </div>
                        </div>

                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-700 group-hover:translate-x-0.5 transition-transform shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {!loading && !aiAnswer && (
            <div className="py-8 text-center text-slate-500 max-w-md mx-auto">
              <HelpCircle className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-slate-800 mb-1">
                Ask any question about Tamil Nadu college notices
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Type your query above or click any sample prompt to get verified answers
                from Anna University, K.S.R., PSG Tech, and colleges across Tamil Nadu.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-400">
          <span>Powered by Gemini 3.8 Flash · Server-side Verified</span>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 bg-white border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-100 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
