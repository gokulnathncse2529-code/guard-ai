/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  College,
  Notice,
  NoticeCategory,
  CollegeRegistrationRequest,
  AuditLog,
  NOTICE_CATEGORIES_META,
  TN_DISTRICTS,
} from './types/noticeguard';
import {
  INITIAL_COLLEGES,
  INITIAL_NOTICES,
  INITIAL_REGISTRATION_REQUESTS,
  INITIAL_AUDIT_LOGS,
} from './data/initialData';

import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { UrgentStrip } from './components/UrgentStrip';
import { FeaturedColleges } from './components/FeaturedColleges';
import { NoticeCard } from './components/NoticeCard';
import { NoticeDetailModal } from './components/NoticeDetailModal';
import { CollegeDirectory } from './components/CollegeDirectory';
import { CollegeNoticeBoard } from './components/CollegeNoticeBoard';
import { AiAssistantModal } from './components/AiAssistantModal';
import { CollegeRegisterModal } from './components/CollegeRegisterModal';
import { CollegeAdminPortal } from './components/CollegeAdminPortal';
import { SuperAdminDashboard } from './components/SuperAdminDashboard';
import { Footer } from './components/Footer';

import {
  Search,
  Filter,
  GraduationCap,
  Sparkles,
  Calendar,
  AlertCircle,
  Briefcase,
  CalendarDays,
  Bell,
  ArrowRight,
  MapPin,
  Building2,
} from 'lucide-react';

export default function App() {
  // Global Data State
  const [colleges, setColleges] = useState<College[]>(INITIAL_COLLEGES);
  const [notices, setNotices] = useState<Notice[]>(INITIAL_NOTICES);
  const [registrationRequests, setRegistrationRequests] = useState<
    CollegeRegistrationRequest[]
  >(INITIAL_REGISTRATION_REQUESTS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);

  // Navigation State
  const [currentTab, setCurrentTab] = useState<
    'home' | 'directory' | 'notices' | 'admin' | 'college-portal'
  >('home');
  const [selectedCollegeId, setSelectedCollegeId] = useState<string | null>(null);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  // Modals
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  // Homepage Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');

  // Notices Feed Filters
  const [feedCategory, setFeedCategory] = useState<NoticeCategory | 'all'>('all');
  const [feedSearch, setFeedSearch] = useState('');
  const [feedDistrict, setFeedDistrict] = useState<string>('All');
  const [feedCollegeFilter, setFeedCollegeFilter] = useState<string>('All');

  // Fetch initial data from server API
  const refreshData = async () => {
    try {
      const [colRes, notRes, reqRes, logRes] = await Promise.all([
        fetch('/api/colleges'),
        fetch('/api/notices'),
        fetch('/api/admin/requests'),
        fetch('/api/admin/audit-logs'),
      ]);

      if (colRes.ok) {
        const d = await colRes.json();
        if (d.success && Array.isArray(d.colleges)) setColleges(d.colleges);
      }
      if (notRes.ok) {
        const d = await notRes.json();
        if (d.success && Array.isArray(d.notices)) setNotices(d.notices);
      }
      if (reqRes.ok) {
        const d = await reqRes.json();
        if (d.success && Array.isArray(d.requests)) setRegistrationRequests(d.requests);
      }
      if (logRes.ok) {
        const d = await logRes.json();
        if (d.success && Array.isArray(d.logs)) setAuditLogs(d.logs);
      }
    } catch (err) {
      console.log('Using seeded static records fallback:', err);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Handlers
  const handleOpenCollege = (collegeId: string) => {
    setSelectedCollegeId(collegeId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExecuteHomeSearch = () => {
    // If user searched for something, go to notices tab with filters preset
    if (searchQuery.trim() || selectedDistrict !== 'All' || selectedType !== 'All') {
      setFeedSearch(searchQuery);
      setFeedDistrict(selectedDistrict);
      setCurrentTab('notices');
      setSelectedCollegeId(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRequestAction = async (
    requestId: string,
    action: 'approve' | 'reject',
    notes?: string
  ) => {
    try {
      const res = await fetch(`/api/admin/requests/${requestId}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, reviewerNotes: notes }),
      });
      const data = await res.json();
      if (data.success) {
        refreshData();
      }
    } catch (err) {
      console.error('Request action error:', err);
    }
  };

  const handleNoticeCreated = (newNotice: Notice) => {
    setNotices((prev) => [newNotice, ...prev]);
    refreshData();
  };

  const handleNoticeUpdated = (updatedNotice: Notice) => {
    setNotices((prev) =>
      prev.map((n) => (n.id === updatedNotice.id ? updatedNotice : n))
    );
    refreshData();
  };

  const handleNoticeDeleted = (deletedId: string) => {
    setNotices((prev) => prev.filter((n) => n.id !== deletedId));
    refreshData();
  };

  // Urgent notices for the breaking strip
  const urgentNotices = notices.filter((n) => n.isUrgent);

  // Filtered notices feed for homepage and notices tab
  const filteredFeedNotices = notices.filter((n) => {
    if (feedCategory !== 'all' && n.category !== feedCategory) return false;
    if (feedDistrict !== 'All' && n.district.toLowerCase() !== feedDistrict.toLowerCase())
      return false;
    if (feedCollegeFilter !== 'All' && n.collegeId !== feedCollegeFilter) return false;
    if (feedSearch.trim()) {
      const q = feedSearch.toLowerCase();
      const match =
        n.title.toLowerCase().includes(q) ||
        n.summary.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q) ||
        n.collegeName.toLowerCase().includes(q) ||
        n.department.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const selectedCollege = colleges.find((c) => c.id === selectedCollegeId);

  const noticeCategoryTabs: { key: NoticeCategory | 'all'; label: string; icon: any }[] = [
    { key: 'all', label: 'All Notices', icon: Bell },
    { key: 'examination', label: 'Examination', icon: GraduationCap },
    { key: 'urgent', label: 'Urgent Bulletins', icon: AlertCircle },
    { key: 'placement', label: 'Placement & Careers', icon: Briefcase },
    { key: 'events_symposium', label: 'Events & Symposium', icon: Sparkles },
    { key: 'holidays', label: 'Holidays', icon: CalendarDays },
    { key: 'general', label: 'General', icon: Bell },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Top Bar Contract */}
      <Navbar
        currentTab={currentTab}
        onNavigate={(tab) => {
          setCurrentTab(tab);
          setSelectedCollegeId(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAiAssistant={() => setIsAiModalOpen(true)}
        onOpenRegister={() => setIsRegisterModalOpen(true)}
      />

      {/* Urgent Bulletins & State Advisories Banner */}
      <UrgentStrip
        urgentNotices={urgentNotices}
        onSelectNotice={(n) => setSelectedNotice(n)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {/* VIEW 1: Dedicated Individual College Notice Board */}
        {selectedCollegeId && selectedCollege ? (
          <CollegeNoticeBoard
            college={selectedCollege}
            notices={notices}
            onBack={() => setSelectedCollegeId(null)}
            onOpenNotice={(n) => setSelectedNotice(n)}
          />
        ) : currentTab === 'directory' ? (
          /* VIEW 2: Tamil Nadu College Directory */
          <CollegeDirectory
            colleges={colleges}
            onSelectCollege={handleOpenCollege}
            onOpenRegister={() => setIsRegisterModalOpen(true)}
          />
        ) : currentTab === 'college-portal' ? (
          /* VIEW 3: College Admin Portal */
          <CollegeAdminPortal
            colleges={colleges}
            notices={notices}
            onNoticeCreated={handleNoticeCreated}
            onNoticeUpdated={handleNoticeUpdated}
            onNoticeDeleted={handleNoticeDeleted}
            onViewNotice={(n) => setSelectedNotice(n)}
          />
        ) : currentTab === 'admin' ? (
          /* VIEW 4: Platform Super Admin Dashboard */
          <SuperAdminDashboard
            colleges={colleges}
            registrationRequests={registrationRequests}
            auditLogs={auditLogs}
            notices={notices}
            onRequestAction={handleRequestAction}
            onRefreshData={refreshData}
          />
        ) : currentTab === 'notices' ? (
          /* VIEW 5: All Notices Stream */
          <div className="py-8 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-8">
                <div className="text-xs font-semibold uppercase tracking-wider text-blue-700 mb-1">
                  Public Circulars Stream
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                  Tamil Nadu College Public Notices
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Filter verified exam timetables, urgent updates, placement announcements, and symposium circulars.
                </p>
              </div>

              {/* Feed Controls */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs mb-8 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                  <div className="md:col-span-6 relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={feedSearch}
                      onChange={(e) => setFeedSearch(e.target.value)}
                      placeholder="Search notices by keyword, subject, or college..."
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                    />
                  </div>

                  <div className="md:col-span-3 relative">
                    <select
                      value={feedDistrict}
                      onChange={(e) => setFeedDistrict(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                    >
                      <option value="All">All Districts</option>
                      {TN_DISTRICTS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-3 relative">
                    <select
                      value={feedCollegeFilter}
                      onChange={(e) => setFeedCollegeFilter(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white truncate"
                    >
                      <option value="All">All Institutions</option>
                      {colleges.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.shortName} ({c.district})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Categories */}
                <div className="flex items-center gap-1 overflow-x-auto pt-2 border-t border-slate-100 text-xs">
                  {noticeCategoryTabs.map((tab) => {
                    const count =
                      tab.key === 'all'
                        ? notices.length
                        : notices.filter((n) => n.category === tab.key).length;
                    return (
                      <button
                        key={tab.key}
                        onClick={() => setFeedCategory(tab.key)}
                        className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                          feedCategory === tab.key
                            ? 'bg-blue-700 text-white shadow-xs'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        <span>{tab.label}</span>
                        <span className="font-mono text-[10px] opacity-80">({count})</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Notices List */}
              {filteredFeedNotices.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredFeedNotices.map((n) => (
                    <NoticeCard
                      key={n.id}
                      notice={n}
                      onOpenDetail={(not) => setSelectedNotice(not)}
                      onOpenCollege={handleOpenCollege}
                      showCollegeName={true}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-slate-200 p-12 text-center max-w-lg mx-auto">
                  <Bell className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <h4 className="text-base font-bold text-slate-900 mb-1">No notices match your criteria</h4>
                  <p className="text-xs text-slate-500 mb-4">
                    Try broadening your district filter or search query.
                  </p>
                  <button
                    onClick={() => {
                      setFeedSearch('');
                      setFeedDistrict('All');
                      setFeedCategory('all');
                      setFeedCollegeFilter('All');
                    }}
                    className="text-xs font-semibold text-blue-700 underline"
                  >
                    Reset all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* VIEW 6: Complete Responsive Homepage */
          <div>
            {/* Hero Section */}
            <HeroSection
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedDistrict={selectedDistrict}
              onDistrictChange={setSelectedDistrict}
              selectedType={selectedType}
              onTypeChange={setSelectedType}
              onExecuteSearch={handleExecuteHomeSearch}
              onOpenAiAssistant={() => setIsAiModalOpen(true)}
            />

            {/* Featured Tamil Nadu Colleges Section */}
            <FeaturedColleges
              colleges={colleges}
              onSelectCollege={handleOpenCollege}
              onViewDirectory={() => {
                setCurrentTab('directory');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Recently Published Notices Section on Homepage */}
            <section className="py-12 bg-slate-50 border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-blue-700 mb-1">
                      Live Notice Stream
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                      Recently Published Announcements
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      Real-time updates from universities and colleges across Tamil Nadu.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setCurrentTab('notices');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs sm:text-sm font-semibold text-blue-700 hover:text-blue-800 flex items-center gap-1.5 self-start sm:self-auto hover:gap-2 transition-all"
                  >
                    <span>View All {notices.length} Notices</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Category Bar for Homepage Feed */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-6 text-xs font-medium">
                  {noticeCategoryTabs.map((tab) => {
                    const count =
                      tab.key === 'all'
                        ? notices.length
                        : notices.filter((n) => n.category === tab.key).length;
                    return (
                      <button
                        key={tab.key}
                        onClick={() => setFeedCategory(tab.key)}
                        className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                          feedCategory === tab.key
                            ? 'bg-blue-700 text-white font-semibold shadow-xs'
                            : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                        }`}
                      >
                        <span>{tab.label}</span>
                        <span className="font-mono text-[10px] opacity-80">({count})</span>
                      </button>
                    );
                  })}
                </div>

                {/* Notices Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredFeedNotices.slice(0, 6).map((n) => (
                    <NoticeCard
                      key={n.id}
                      notice={n}
                      onOpenDetail={(not) => setSelectedNotice(not)}
                      onOpenCollege={handleOpenCollege}
                      showCollegeName={true}
                    />
                  ))}
                </div>

                {filteredFeedNotices.length > 6 && (
                  <div className="mt-8 text-center">
                    <button
                      onClick={() => {
                        setCurrentTab('notices');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-6 py-2.5 bg-white border border-slate-300 hover:border-blue-400 text-blue-700 text-xs font-semibold rounded-lg shadow-xs transition-colors inline-flex items-center gap-2"
                    >
                      <span>Browse More Notices</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Notice Detail Modal */}
      <NoticeDetailModal
        notice={selectedNotice}
        onClose={() => setSelectedNotice(null)}
        onOpenCollege={handleOpenCollege}
      />

      {/* AI Assistant Modal */}
      <AiAssistantModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        notices={notices}
        onSelectNotice={(n) => setSelectedNotice(n)}
      />

      {/* College Registration Modal */}
      <CollegeRegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onRequestSubmitted={(req) => {
          setRegistrationRequests((prev) => [req, ...prev]);
        }}
      />

      {/* Academic Institutional Footer */}
      <Footer
        onNavigate={(tab) => {
          setCurrentTab(tab);
          setSelectedCollegeId(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenRegister={() => setIsRegisterModalOpen(true)}
      />
    </div>
  );
}
