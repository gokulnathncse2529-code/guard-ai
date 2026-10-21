import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Download,
  ExternalLink,
  Calendar,
  Building,
  AlertCircle,
  FileText,
  Share2,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import { Notice, NOTICE_CATEGORIES_META } from '../types/noticeguard';

interface NoticeDetailModalProps {
  notice: Notice | null;
  onClose: () => void;
  onOpenCollege?: (collegeId: string) => void;
}

export const NoticeDetailModal: React.FC<NoticeDetailModalProps> = ({
  notice,
  onClose,
  onOpenCollege,
}) => {
  const [copied, setCopied] = useState(false);
  const [simplifying, setSimplifying] = useState(false);
  const [simplifiedText, setSimplifiedText] = useState<string | null>(
    notice?.simplifiedEnglish || null
  );

  if (!notice) return null;

  const categoryMeta = NOTICE_CATEGORIES_META[notice.category] || {
    label: notice.category,
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRequestSimplify = async () => {
    if (simplifiedText) return;
    setSimplifying(true);
    try {
      const res = await fetch('/api/ai/simplify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: notice.title,
          content: notice.content,
        }),
      });
      const data = await res.json();
      if (data.success && data.simplified) {
        setSimplifiedText(data.simplified);
      }
    } catch (err) {
      console.error('Failed to simplify notice:', err);
    } finally {
      setSimplifying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header Strip */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
            <span className="font-semibold text-blue-700">{categoryMeta.label}</span>
            <span aria-hidden="true">·</span>
            <span>{notice.district}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">{notice.publishedDate}</span>
            {notice.isUrgent && (
              <>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-amber-700 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Urgent
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              title="Copy share link"
              className="p-1.5 text-slate-500 hover:text-slate-800 rounded-md hover:bg-slate-200 transition-colors"
            >
              {copied ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <Share2 className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-500 hover:text-slate-800 rounded-md hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Title & College Details */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug mb-2">
              {notice.title}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-600">
              <button
                onClick={() => {
                  if (onOpenCollege) {
                    onOpenCollege(notice.collegeId);
                    onClose();
                  }
                }}
                className="font-semibold text-blue-700 hover:underline flex items-center gap-1"
              >
                <Building className="w-4 h-4" />
                <span>{notice.collegeName}</span>
              </button>
              <span aria-hidden="true">·</span>
              <span>Dept: {notice.department}</span>
              {notice.validTill && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-amber-800 font-medium font-mono tabular-nums">
                    Valid till: {notice.validTill}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Gemini AI Student Explainer Card */}
          <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900 uppercase tracking-wide">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Gemini AI Student Explainer</span>
              </div>
              {!simplifiedText && (
                <button
                  onClick={handleRequestSimplify}
                  disabled={simplifying}
                  className="px-2.5 py-1 text-xs font-semibold bg-blue-700 hover:bg-blue-800 text-white rounded-md transition-colors flex items-center gap-1 shadow-xs"
                >
                  {simplifying ? (
                    <>
                      <Loader2 className="w-3 h-3 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    'Simplify Notice'
                  )}
                </button>
              )}
            </div>

            {simplifiedText ? (
              <div className="text-xs sm:text-sm text-slate-700 space-y-2 whitespace-pre-line leading-relaxed">
                {simplifiedText}
              </div>
            ) : (
              <p className="text-xs text-slate-600">
                Click “Simplify Notice” to generate a 3-point breakdown in simple student-friendly
                English highlighting deadlines, prerequisites, and mandatory actions.
              </p>
            )}
          </div>

          {/* Official Full Content */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Official Notice Circular Text
            </h4>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs sm:text-sm text-slate-800 font-mono whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto">
              {notice.content}
            </div>
          </div>

          {/* Attachments Section */}
          {notice.attachments && notice.attachments.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Official Attachments & Documents
              </h4>
              <div className="space-y-2">
                {notice.attachments.map((att, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 truncate mr-3">
                      <FileText className="w-4 h-4 text-blue-700 shrink-0" />
                      <div className="truncate">
                        <div className="text-xs sm:text-sm font-semibold text-slate-900 truncate">
                          {att.name}
                        </div>
                        {att.size && (
                          <div className="text-[11px] text-slate-500 font-mono">
                            Size: {att.size}
                          </div>
                        )}
                      </div>
                    </div>

                    <a
                      href={att.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors flex items-center gap-1 shrink-0"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Source Verification Footer */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-2">
            <div>
              <span>Official Source: </span>
              <strong className="text-slate-800">{notice.officialSource}</strong>
            </div>
            <div className="font-mono tabular-nums">
              Audience: {notice.targetAudience}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
