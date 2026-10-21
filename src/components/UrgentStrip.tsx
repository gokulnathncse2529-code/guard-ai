import React from 'react';
import { AlertCircle, ChevronRight, BellRing } from 'lucide-react';
import { Notice } from '../types/noticeguard';

interface UrgentStripProps {
  urgentNotices: Notice[];
  onSelectNotice: (notice: Notice) => void;
}

export const UrgentStrip: React.FC<UrgentStripProps> = ({
  urgentNotices,
  onSelectNotice,
}) => {
  if (urgentNotices.length === 0) return null;

  const topNotice = urgentNotices[0];

  return (
    <div className="bg-amber-50 border-y border-amber-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="flex items-center gap-1 font-bold text-amber-900 uppercase tracking-wider shrink-0 bg-amber-100 px-2 py-0.5 rounded">
              <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
              Urgent Bulletin
            </span>
            <span className="text-amber-800 font-medium truncate">
              <strong className="text-amber-950 font-semibold">[{topNotice.collegeName}]:</strong>{' '}
              {topNotice.title}
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
            <span className="text-amber-700 text-[11px]">
              {topNotice.publishedDate}
            </span>
            <button
              onClick={() => onSelectNotice(topNotice)}
              className="text-amber-900 font-semibold hover:text-amber-950 underline flex items-center gap-0.5 hover:gap-1 transition-all"
            >
              <span>Read Notice</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
