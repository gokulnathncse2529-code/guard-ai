import React from 'react';
import { MapPin, Building2, ExternalLink, ArrowRight, ShieldCheck } from 'lucide-react';
import { College } from '../types/noticeguard';

interface FeaturedCollegesProps {
  colleges: College[];
  onSelectCollege: (collegeId: string) => void;
  onViewDirectory: () => void;
}

export const FeaturedColleges: React.FC<FeaturedCollegesProps> = ({
  colleges,
  onSelectCollege,
  onViewDirectory,
}) => {
  // Take top 4 featured colleges
  const featured = colleges.slice(0, 4);

  return (
    <section className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-700 mb-1">
              Institutional Network
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Popular Tamil Nadu Colleges
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Select an institution to inspect its dedicated real-time notice board and exam schedules.
            </p>
          </div>

          <button
            onClick={onViewDirectory}
            className="text-sm font-semibold text-blue-700 hover:text-blue-800 flex items-center gap-1.5 self-start sm:self-auto hover:gap-2 transition-all"
          >
            <span>Explore All 38 Districts</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((col) => (
            <div
              key={col.id}
              onClick={() => onSelectCollege(col.id)}
              className="group cursor-pointer bg-slate-50 hover:bg-white rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden"
            >
              {/* College Campus Photo */}
              <div className="relative h-40 overflow-hidden bg-slate-100">
                <img
                  src={col.image}
                  alt={col.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <span className="font-semibold px-2 py-0.5 rounded bg-black/40 backdrop-blur-xs">
                    Code: {col.code}
                  </span>
                  <span className="text-[11px] font-mono tabular-nums bg-blue-700/80 px-2 py-0.5 rounded">
                    {col.noticeCount} Notices
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  {/* Unboxed Metadata Line */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5">
                    <span className="font-medium text-slate-700 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {col.district}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{col.type}</span>
                  </div>

                  <h3 className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2 text-base mb-2">
                    {col.name}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                    {col.affiliation}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1 text-emerald-700 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {col.status === 'verified' ? 'Verified Board' : 'Demonstration'}
                  </span>
                  <span className="text-blue-700 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    Open Board
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
