import React from 'react';
import {
  GraduationCap,
  Sparkles,
  Building2,
  FileText,
  ShieldCheck,
  PlusCircle,
  Search,
} from 'lucide-react';

interface NavbarProps {
  currentTab: 'home' | 'directory' | 'notices' | 'admin' | 'college-portal';
  onNavigate: (tab: 'home' | 'directory' | 'notices' | 'admin' | 'college-portal') => void;
  onOpenAiAssistant: () => void;
  onOpenRegister: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  onOpenAiAssistant,
  onOpenRegister,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single Brand element */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-700 text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-blue-800 transition-colors">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="whitespace-nowrap shrink-0">
              <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors">
                NoticeGuard AI
              </span>
            </div>
          </button>

          {/* Zone 2: 4-5 single-line clean navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => onNavigate('home')}
              className={`hover:text-blue-700 transition-colors whitespace-nowrap shrink-0 ${
                currentTab === 'home' ? 'text-blue-700 font-semibold' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('directory')}
              className={`hover:text-blue-700 transition-colors whitespace-nowrap shrink-0 ${
                currentTab === 'directory' ? 'text-blue-700 font-semibold' : ''
              }`}
            >
              College Directory
            </button>
            <button
              onClick={() => onNavigate('notices')}
              className={`hover:text-blue-700 transition-colors whitespace-nowrap shrink-0 ${
                currentTab === 'notices' ? 'text-blue-700 font-semibold' : ''
              }`}
            >
              All Notices
            </button>
            <button
              onClick={onOpenAiAssistant}
              className="flex items-center gap-1.5 text-blue-700 hover:text-blue-800 transition-colors whitespace-nowrap shrink-0 font-medium"
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>AI Assistant</span>
            </button>
            <button
              onClick={() => onNavigate('college-portal')}
              className={`hover:text-blue-700 transition-colors whitespace-nowrap shrink-0 ${
                currentTab === 'college-portal' ? 'text-blue-700 font-semibold' : ''
              }`}
            >
              College Admin
            </button>
            <button
              onClick={() => onNavigate('admin')}
              className={`hover:text-blue-700 transition-colors whitespace-nowrap shrink-0 text-slate-500 hover:text-slate-800 ${
                currentTab === 'admin' ? 'text-blue-700 font-semibold' : ''
              }`}
            >
              Platform Moderator
            </button>
          </nav>

          {/* Zone 3: 1 Primary CTA Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenRegister}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 transition-colors shadow-sm whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Register College</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile secondary navigation rail */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-100 bg-slate-50 py-2 px-3 text-xs font-medium text-slate-600 overflow-x-auto">
        <button
          onClick={() => onNavigate('home')}
          className={`px-2 py-1 whitespace-nowrap ${currentTab === 'home' ? 'text-blue-700 font-bold' : ''}`}
        >
          Home
        </button>
        <button
          onClick={() => onNavigate('directory')}
          className={`px-2 py-1 whitespace-nowrap ${currentTab === 'directory' ? 'text-blue-700 font-bold' : ''}`}
        >
          Colleges
        </button>
        <button
          onClick={() => onNavigate('notices')}
          className={`px-2 py-1 whitespace-nowrap ${currentTab === 'notices' ? 'text-blue-700 font-bold' : ''}`}
        >
          Notices
        </button>
        <button
          onClick={onOpenAiAssistant}
          className="px-2 py-1 whitespace-nowrap text-blue-700 font-semibold flex items-center gap-1"
        >
          <Sparkles className="w-3 h-3" />
          AI
        </button>
        <button
          onClick={() => onNavigate('college-portal')}
          className={`px-2 py-1 whitespace-nowrap ${currentTab === 'college-portal' ? 'text-blue-700 font-bold' : ''}`}
        >
          Admin
        </button>
      </div>
    </header>
  );
};
