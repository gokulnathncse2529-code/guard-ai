import React from 'react';
import { GraduationCap, ShieldCheck, Mail, Phone, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: 'home' | 'directory' | 'notices' | 'admin' | 'college-portal') => void;
  onOpenRegister: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenRegister }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand & Mission */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white">
              <div className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center font-bold">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-base tracking-tight text-white">
                NoticeGuard AI
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Every College. Every Notice. One Platform. Centralized, verified notice board
              for higher education institutions across all 38 districts of Tamil Nadu.
            </p>
            <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Public Demonstration & Verification Registry</span>
            </div>
          </div>

          {/* Col 2: Institutional Links */}
          <div>
            <h4 className="font-bold uppercase tracking-wider text-slate-200 mb-3 text-xs">
              Statewide Coverage
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('directory')}
                  className="hover:text-white transition-colors"
                >
                  Tamil Nadu College Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('notices')}
                  className="hover:text-white transition-colors"
                >
                  Autonomous Exam Timetables
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('notices')}
                  className="hover:text-white transition-colors"
                >
                  Campus Placement Bulletins
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('notices')}
                  className="hover:text-white transition-colors"
                >
                  Inter-College Symposiums & Fests
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Institutional Administration */}
          <div>
            <h4 className="font-bold uppercase tracking-wider text-slate-200 mb-3 text-xs">
              College Administration
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={onOpenRegister}
                  className="hover:text-white transition-colors"
                >
                  Register New Institution
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('college-portal')}
                  className="hover:text-white transition-colors"
                >
                  Authorized Notice Desk
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('admin')}
                  className="hover:text-white transition-colors"
                >
                  Platform Moderation Console
                </button>
              </li>
              <li>
                <span className="text-slate-500">
                  Role-based circular verification
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Public Disclaimer & Info */}
          <div className="space-y-2">
            <h4 className="font-bold uppercase tracking-wider text-slate-200 mb-3 text-xs">
              Notice Verification Notice
            </h4>
            <p className="text-slate-400 leading-relaxed">
              Official circulars and timetables displayed are mirrored directly from registered colleges
              and verified public archives. Always check institutional college seals for official confirmation.
            </p>
            <div className="pt-2 text-slate-500 font-mono text-[11px]">
              TNEA · Anna University · DOTE TN · UGC Recognized
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} NoticeGuard AI – Tamil Nadu Unified College Notice Board. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Powered by Google Gemini 3.8 Flash</span>
            <span aria-hidden="true">·</span>
            <span>Chennai · Coimbatore · Namakkal · Madurai · Tiruchirappalli</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
