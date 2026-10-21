import React, { useState } from 'react';
import {
  GraduationCap,
  AlertCircle,
  Briefcase,
  Sparkles,
  CalendarDays,
  Bell,
  Search,
  MapPin,
  ExternalLink,
  Phone,
  Mail,
  ShieldCheck,
  ArrowLeft,
  Building2,
  Calendar,
} from 'lucide-react';
import { College, Notice, NoticeCategory, NOTICE_CATEGORIES_META } from '../types/noticeguard';
import { NoticeCard } from './NoticeCard';

interface CollegeNoticeBoardProps {
  college: College;
  notices: Notice[];
  onBack: () => void;
  onOpenNotice: (notice: Notice) => void;
}

export const CollegeNoticeBoard: React.FC<CollegeNoticeBoardProps> = ({
  college,
  notices,
  onBack,
  onOpenNotice,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<NoticeCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const collegeNotices = notices.filter((n) => n.collegeId === college.id);

  // Filter notices for this college
  const filteredNotices = collegeNotices.filter((n) => {
    if (selectedCategory !== 'all' && n.category !== selectedCategory) {
      return false;
    }
    if (dateFilter && n.publishedDate < dateFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        n.title.toLowerCase().includes(q) ||
        n.summary.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q) ||
        n.department.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const categories: { key: NoticeCategory | 'all'; label: string; icon: any }[] = [
    { key: 'all', label: 'All Notices', icon: Bell },
    { key: 'examination', label: 'Examination', icon: GraduationCap },
    { key: 'urgent', label: 'Urgent Bulletins', icon: AlertCircle },
    { key: 'placement', label: 'Placement & Careers', icon: Briefcase },
    { key: 'events_symposium', label: 'Events & Symposium', icon: Sparkles },
    { key: 'holidays', label: 'Holidays', icon: CalendarDays },
    { key: 'general', label: 'General Notices', icon: Bell },
  ];

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-700 transition-colors mb-4 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to All Tamil Nadu Colleges</span>
        </button>

        {/* College Header Profile Card */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs mb-8">
          <div className="relative h-48 sm:h-64 bg-slate-900">
            <img
              src={college.image}
              alt={college.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-white">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-blue-300 font-semibold mb-1">
                  <span>TNEA Code: {college.code}</span>
                  <span aria-hidden="true">·</span>
                  <span>{college.type}</span>
                  <span aria-hidden="true">·</span>
                  <span>{college.category}</span>
                </div>
                <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                  {college.name}
                </h1>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded bg-emerald-500/90 text-white backdrop-blur-xs">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {college.status === 'verified' ? 'Verified Official Board' : 'Demonstration Record'}
                </span>
              </div>
            </div>
          </div>

          {/* Profile metadata bar */}
          <div className="p-4 sm:p-6 bg-white border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-1 text-slate-800 font-medium">
                <MapPin className="w-4 h-4 text-slate-400" />
                {college.district} ({college.address})
              </span>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <span className="text-slate-700">
                {college.affiliation}
              </span>
              {college.accreditation && (
                <>
                  <span aria-hidden="true" className="hidden sm:inline">·</span>
                  <span className="text-blue-800 font-medium">
                    {college.accreditation}
                  </span>
                </>
              )}
            </div>

            <div className="flex items-center gap-4">
              {college.contactPhone && (
                <span className="flex items-center gap-1 font-mono">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  {college.contactPhone}
                </span>
              )}
              <a
                href={college.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 font-semibold text-blue-700 hover:text-blue-800 underline"
              >
                <span>Visit College Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Section Navigation Tabs & Search Toolbar */}
        <div className="bg-white rounded-xl border border-slate-200 p-3 sm:p-4 shadow-xs mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* 6 Category Tabs (Interactive buttons) */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 text-xs font-medium">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const count =
                  cat.key === 'all'
                    ? collegeNotices.length
                    : collegeNotices.filter((n) => n.category === cat.key).length;

                return (
                  <button
                    key={cat.key}
                    onClick={() => setSelectedCategory(cat.key)}
                    className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                      selectedCategory === cat.key
                        ? 'bg-blue-700 text-white font-semibold shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        selectedCategory === cat.key
                          ? 'bg-blue-800 text-blue-100'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Keyword search in this college */}
            <div className="relative min-w-[220px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search in this college..."
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Notices Grid */}
        {filteredNotices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotices.map((notice) => (
              <NoticeCard
                key={notice.id}
                notice={notice}
                onOpenDetail={onOpenNotice}
                showCollegeName={false}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center max-w-lg mx-auto my-8">
            <Building2 className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-slate-900 mb-1">
              No notices published in this section yet
            </h4>
            <p className="text-xs text-slate-500">
              {selectedCategory === 'all'
                ? 'This college does not have any active notices.'
                : `There are currently no circulars published under the "${selectedCategory}" category for this college.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
