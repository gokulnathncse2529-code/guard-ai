import React from 'react';
import {
  FileText,
  Paperclip,
  Sparkles,
  Calendar,
  AlertCircle,
  Eye,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { Notice, NOTICE_CATEGORIES_META } from '../types/noticeguard';

interface NoticeCardProps {
  notice: Notice;
  onOpenDetail: (notice: Notice) => void;
  onOpenCollege?: (collegeId: string) => void;
  showCollegeName?: boolean;
}

export const NoticeCard: React.FC<NoticeCardProps> = ({
  notice,
  onOpenDetail,
  onOpenCollege,
  showCollegeName = true,
}) => {
  const categoryMeta = NOTICE_CATEGORIES_META[notice.category] || {
    label: notice.category,
  };

  return (
    <div
      onClick={() => onOpenDetail(notice)}
      className="group cursor-pointer bg-white rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all p-5 flex flex-col justify-between"
    >
      <div>
        {/* Unboxed Metadata Line with typographic separators */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 mb-2">
          <span className="font-semibold text-blue-700">{categoryMeta.label}</span>
          <span aria-hidden="true">·</span>
          <span>{notice.district}</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono tabular-nums">{notice.publishedDate}</span>
          {notice.isUrgent && (
            <>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-amber-700 flex items-center gap-0.5">
                <AlertCircle className="w-3 h-3 text-amber-600 inline" />
                Urgent
              </span>
            </>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2 mb-2 leading-snug">
          {notice.title}
        </h3>

        {/* College Name kicker if applicable */}
        {showCollegeName && (
          <div
            onClick={(e) => {
              if (onOpenCollege) {
                e.stopPropagation();
                onOpenCollege(notice.collegeId);
              }
            }}
            className="text-xs font-medium text-slate-700 hover:text-blue-800 transition-colors mb-2.5 flex items-center gap-1"
          >
            <span>{notice.collegeName}</span>
          </div>
        )}

        {/* Summary text */}
        <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed">
          {notice.summary}
        </p>

        {/* AI Quick Highlights Box if available */}
        {notice.aiSummary && (
          <div className="bg-slate-50 rounded-lg p-2.5 mb-4 border border-slate-100 text-xs text-slate-700">
            <div className="flex items-center gap-1 font-semibold text-blue-800 mb-1">
              <Sparkles className="w-3 h-3 text-blue-600" />
              <span>AI Summary</span>
            </div>
            <p className="line-clamp-2 leading-relaxed text-slate-600">
              {notice.aiSummary}
            </p>
          </div>
        )}
      </div>

      {/* Card Footer: Attachments, Views & Action */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-3">
          {notice.attachments && notice.attachments.length > 0 ? (
            <span className="flex items-center gap-1 text-slate-700 font-medium">
              <Paperclip className="w-3.5 h-3.5 text-slate-400" />
              <span>{notice.attachments.length} Circular Attachment{notice.attachments.length > 1 ? 's' : ''}</span>
            </span>
          ) : (
            <span>Official Web Notice</span>
          )}
          <span className="hidden sm:inline" aria-hidden="true">·</span>
          <span className="hidden sm:inline font-mono tabular-nums">{notice.viewCount} views</span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetail(notice);
          }}
          className="text-blue-700 font-semibold group-hover:text-blue-800 flex items-center gap-1 hover:underline"
        >
          <span>View Notice</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
