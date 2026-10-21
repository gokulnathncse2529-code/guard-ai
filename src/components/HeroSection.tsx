import React from 'react';
import { Search, MapPin, Building, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { TN_DISTRICTS, CollegeType } from '../types/noticeguard';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedDistrict: string;
  onDistrictChange: (d: string) => void;
  selectedType: string;
  onTypeChange: (t: string) => void;
  onExecuteSearch: () => void;
  onOpenAiAssistant: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  onSearchChange,
  selectedDistrict,
  onDistrictChange,
  selectedType,
  onTypeChange,
  onExecuteSearch,
  onOpenAiAssistant,
}) => {
  const quickCategories: { label: string; value: CollegeType | 'All' }[] = [
    { label: 'All Colleges', value: 'All' },
    { label: 'Engineering', value: 'Engineering' },
    { label: 'Arts & Science', value: 'Arts and Science' },
    { label: 'Polytechnic', value: 'Polytechnic' },
    { label: 'Medical', value: 'Medical' },
    { label: 'Management', value: 'Management' },
  ];

  return (
    <section className="relative bg-slate-900 text-white overflow-hidden border-b border-slate-800">
      {/* Background Campus Image with Measured Scrim */}
      <div className="absolute inset-0 z-0 opacity-25">
        <img
          src="/src/assets/images/hero_tn_campus_1792599212724.jpg"
          alt="Tamil Nadu University Campus Architecture"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-950/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <div className="max-w-3xl">
          {/* Unboxed breadcrumb / State Seal marker */}
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 mb-3 tracking-wide uppercase">
            <span>Tamil Nadu Unified Higher Education Notice Portal</span>
            <span aria-hidden="true">·</span>
            <span>Statewide Directory</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Public Records
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            Every College. Every Notice. <br />
            <span className="text-blue-400">One Platform.</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mb-8 leading-relaxed max-w-2xl">
            Access official semester exam timetables, urgent bulletins, placement drives,
            inter-college symposiums, and holiday notifications across Tamil Nadu’s
            institutions—instantly indexed with Gemini AI summarization.
          </p>
        </div>

        {/* Global Search and Filter Box */}
        <div className="bg-white rounded-xl p-3 sm:p-4 shadow-xl text-slate-900 border border-slate-200/80 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onExecuteSearch()}
                placeholder="Search college name, exam timetable, or symposium..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
              />
            </div>

            {/* District Selector */}
            <div className="md:col-span-3 relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={selectedDistrict}
                onChange={(e) => onDistrictChange(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white appearance-none transition-all truncate"
              >
                <option value="All">All Districts (38 TN)</option>
                {TN_DISTRICTS.map((dist) => (
                  <option key={dist} value={dist}>
                    {dist}
                  </option>
                ))}
              </select>
            </div>

            {/* Action Buttons */}
            <div className="md:col-span-3 flex items-center gap-2">
              <button
                onClick={onExecuteSearch}
                className="flex-1 py-2.5 px-4 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm flex items-center justify-center gap-1.5 whitespace-nowrap"
              >
                <span>Find Notices</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenAiAssistant}
                title="Ask NoticeGuard AI in Natural Language"
                className="py-2.5 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
              >
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Category Tabs (Interactive buttons) */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto text-xs pb-1 sm:pb-0">
            <span className="text-slate-400 font-medium whitespace-nowrap mr-1">Categories:</span>
            {quickCategories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => onTypeChange(cat.value)}
                className={`px-3 py-1 rounded-md font-medium whitespace-nowrap transition-colors ${
                  selectedType === cat.value
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* State Trust Indicators Strip */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl text-left border-t border-slate-800/80 pt-6">
          <div>
            <div className="text-2xl font-bold font-mono text-white tabular-nums">38</div>
            <div className="text-xs text-slate-400">Tamil Nadu Districts Supported</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-blue-400 tabular-nums">100%</div>
            <div className="text-xs text-slate-400">Verified Official Circulars</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">6</div>
            <div className="text-xs text-slate-400">Notice Categories & Timetables</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-amber-400 tabular-nums">Gemini</div>
            <div className="text-xs text-slate-400">AI Notice Simplification</div>
          </div>
        </div>
      </div>
    </section>
  );
};
