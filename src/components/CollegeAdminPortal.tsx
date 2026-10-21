import React, { useState } from 'react';
import {
  Building2,
  Plus,
  Sparkles,
  AlertTriangle,
  CheckCircle,
  Clock,
  Trash2,
  Edit3,
  FileText,
  ShieldAlert,
  Loader2,
  Paperclip,
  Check,
  Calendar,
  AlertCircle,
  Eye,
} from 'lucide-react';
import {
  College,
  Notice,
  NoticeCategory,
  NOTICE_CATEGORIES_META,
  NoticeAttachment,
} from '../types/noticeguard';

interface CollegeAdminPortalProps {
  colleges: College[];
  notices: Notice[];
  onNoticeCreated: (notice: Notice) => void;
  onNoticeUpdated: (notice: Notice) => void;
  onNoticeDeleted: (noticeId: string) => void;
  onViewNotice: (notice: Notice) => void;
}

export const CollegeAdminPortal: React.FC<CollegeAdminPortalProps> = ({
  colleges,
  notices,
  onNoticeCreated,
  onNoticeUpdated,
  onNoticeDeleted,
  onViewNotice,
}) => {
  // Currently authenticated college admin context
  const [selectedCollegeId, setSelectedCollegeId] = useState<string>(
    colleges[0]?.id || 'ksrce-namakkal'
  );
  const currentCollege = colleges.find((c) => c.id === selectedCollegeId) || colleges[0];

  // Notice Editor State
  const [isEditing, setIsEditing] = useState(false);
  const [editingNoticeId, setEditingNoticeId] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<NoticeCategory>('examination');
  const [department, setDepartment] = useState('Controller of Examinations');
  const [isUrgent, setIsUrgent] = useState(false);
  const [priority, setPriority] = useState<'high' | 'medium' | 'normal'>('normal');
  const [validTill, setValidTill] = useState('');
  const [targetAudience, setTargetAudience] = useState('All UG & PG Students');
  const [content, setContent] = useState('');
  const [attachmentName, setAttachmentName] = useState('');
  const [attachmentUrl, setAttachmentUrl] = useState('');
  const [attachments, setAttachments] = useState<NoticeAttachment[]>([]);

  // AI assistant tools for notice authoring
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<any | null>(null);
  const [duplicateWarning, setDuplicateWarning] = useState<any | null>(null);
  const [savingNotice, setSavingNotice] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const collegeNotices = notices.filter((n) => n.collegeId === currentCollege.id);

  const resetForm = () => {
    setTitle('');
    setCategory('examination');
    setDepartment('Controller of Examinations');
    setIsUrgent(false);
    setPriority('normal');
    setValidTill('');
    setTargetAudience('All UG & PG Students');
    setContent('');
    setAttachmentName('');
    setAttachmentUrl('');
    setAttachments([]);
    setAiSuggestion(null);
    setDuplicateWarning(null);
    setIsEditing(false);
    setEditingNoticeId(null);
  };

  const handleStartEdit = (notice: Notice) => {
    setIsEditing(true);
    setEditingNoticeId(notice.id);
    setTitle(notice.title);
    setCategory(notice.category);
    setDepartment(notice.department);
    setIsUrgent(notice.isUrgent);
    setPriority(notice.priority);
    setValidTill(notice.validTill || '');
    setTargetAudience(notice.targetAudience);
    setContent(notice.content);
    setAttachments(notice.attachments || []);
    setAiSuggestion(null);
    setDuplicateWarning(null);
  };

  const handleAddAttachment = () => {
    if (!attachmentName.trim() || !attachmentUrl.trim()) return;
    setAttachments((prev) => [
      ...prev,
      {
        name: attachmentName,
        url: attachmentUrl,
        type: 'pdf',
        size: '1.2 MB',
      },
    ]);
    setAttachmentName('');
    setAttachmentUrl('');
  };

  const handleRemoveAttachment = (idx: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== idx));
  };

  // 1. AI Suggest Category & Urgency
  const handleAiClassify = async () => {
    if (!title && !content) return;
    setAiAnalyzing(true);
    setAiSuggestion(null);
    try {
      const res = await fetch('/api/ai/suggest-category', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });
      const data = await res.json();
      if (data.success) {
        setAiSuggestion(data);
        if (data.suggestedCategory) {
          setCategory(data.suggestedCategory as NoticeCategory);
        }
        if (typeof data.isUrgent === 'boolean') {
          setIsUrgent(data.isUrgent);
        }
        if (data.priority) {
          setPriority(data.priority);
        }
      }
    } catch (err) {
      console.error('Error suggesting category:', err);
    } finally {
      setAiAnalyzing(false);
    }
  };

  // 2. AI Duplicate Check
  const handleAiCheckDuplicate = async () => {
    if (!title && !content) return;
    setAiAnalyzing(true);
    setDuplicateWarning(null);
    try {
      const res = await fetch('/api/ai/check-duplicates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          collegeId: currentCollege.id,
          title,
          content,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setDuplicateWarning(data);
      }
    } catch (err) {
      console.error('Error checking duplicate:', err);
    } finally {
      setAiAnalyzing(false);
    }
  };

  const handleSubmitNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setFeedbackMessage({ type: 'error', text: 'Title and content are required.' });
      return;
    }

    setSavingNotice(true);
    setFeedbackMessage(null);

    try {
      if (isEditing && editingNoticeId) {
        // PUT update
        const res = await fetch(`/api/notices/${editingNoticeId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title,
            category,
            department,
            isUrgent,
            priority,
            validTill: validTill || undefined,
            targetAudience,
            content,
            attachments,
            authorEmail: `admin@${currentCollege.website.replace('https://', '')}`,
          }),
        });
        const data = await res.json();
        if (data.success && data.notice) {
          onNoticeUpdated(data.notice);
          setFeedbackMessage({ type: 'success', text: 'Notice updated successfully.' });
          resetForm();
        }
      } else {
        // POST create
        const res = await fetch('/api/notices', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            collegeId: currentCollege.id,
            title,
            category,
            department,
            isUrgent,
            priority,
            validTill: validTill || undefined,
            targetAudience,
            content,
            attachments,
            authorEmail: `admin@${currentCollege.website.replace('https://', '')}`,
          }),
        });
        const data = await res.json();
        if (data.success && data.notice) {
          onNoticeCreated(data.notice);
          setFeedbackMessage({ type: 'success', text: 'Official notice published successfully.' });
          resetForm();
        }
      }
    } catch (err: any) {
      setFeedbackMessage({ type: 'error', text: 'Failed to save notice. Please check connection.' });
    } finally {
      setSavingNotice(false);
    }
  };

  const handleDeleteNotice = async (id: string, noticeTitle: string) => {
    if (!confirm(`Are you sure you want to permanently delete: "${noticeTitle}"?`)) return;
    try {
      const res = await fetch(`/api/notices/${id}?actor=admin@${currentCollege.id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        onNoticeDeleted(id);
        setFeedbackMessage({ type: 'success', text: 'Notice removed and logged in audit trail.' });
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header & Role Badge */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
              <span>Authorized Institution Portal</span>
              <span aria-hidden="true">·</span>
              <span>Role-Based Access Control</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              College Notice Board Administration
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Publish semester exam timetables, urgent bulletins, placement schedules, and symposium circulars.
            </p>
          </div>

          {/* College Switcher (simulates logging into different institutions) */}
          <div className="bg-white border border-slate-200 rounded-xl p-2.5 flex items-center gap-2 shadow-xs">
            <Building2 className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
            <div className="text-xs">
              <span className="text-slate-400 block text-[10px] font-semibold uppercase">
                Active College Context
              </span>
              <select
                value={selectedCollegeId}
                onChange={(e) => {
                  setSelectedCollegeId(e.target.value);
                  resetForm();
                }}
                className="bg-transparent font-bold text-slate-900 focus:outline-none cursor-pointer pr-2"
              >
                {colleges.map((col) => (
                  <option key={col.id} value={col.id}>
                    {col.name} ({col.district})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Feedback message banner */}
        {feedbackMessage && (
          <div
            className={`p-3 rounded-lg text-xs font-medium mb-6 flex items-center justify-between ${
              feedbackMessage.type === 'success'
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}
          >
            <span>{feedbackMessage.text}</span>
            <button
              onClick={() => setFeedbackMessage(null)}
              className="font-bold underline ml-2"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Main 2-column layout: Left = Notice Composer, Right = Manage Existing */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Notice Composer (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-700" />
                <h3 className="font-bold text-base text-slate-900">
                  {isEditing ? 'Edit Official Circular' : 'Compose New Official Notice'}
                </h3>
              </div>

              {isEditing && (
                <button
                  onClick={resetForm}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            <form onSubmit={handleSubmitNotice} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Notice / Circular Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. End Semester Theory Examinations Nov/Dec 2026 Timetable"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as NoticeCategory)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                  >
                    <option value="examination">Examination</option>
                    <option value="urgent">Urgent Bulletins</option>
                    <option value="placement">Placement & Careers</option>
                    <option value="events_symposium">Events & Symposium</option>
                    <option value="holidays">Holidays</option>
                    <option value="general">General Notices</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Issuing Department *
                  </label>
                  <input
                    type="text"
                    required
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="e.g. Controller of Examinations / Placement Cell"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Priority Level
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                  >
                    <option value="normal">Normal</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Valid Till Date
                  </label>
                  <input
                    type="date"
                    value={validTill}
                    onChange={(e) => setValidTill(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white font-mono"
                  />
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-800">
                    <input
                      type="checkbox"
                      checked={isUrgent}
                      onChange={(e) => setIsUrgent(e.target.checked)}
                      className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
                    />
                    <span>Mark as Urgent Alert</span>
                  </label>
                </div>
              </div>

              {/* Full Content Textarea */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700">
                    Official Circular Text / Body *
                  </label>

                  {/* AI Assistance buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleAiClassify}
                      disabled={aiAnalyzing || (!title && !content)}
                      className="text-[11px] font-semibold text-blue-700 hover:text-blue-800 flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded border border-blue-200"
                    >
                      <Sparkles className="w-3 h-3 text-blue-600" />
                      <span>AI Suggest Tags</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleAiCheckDuplicate}
                      disabled={aiAnalyzing || (!title && !content)}
                      className="text-[11px] font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded border border-slate-200"
                    >
                      <ShieldAlert className="w-3 h-3 text-slate-600" />
                      <span>Check Duplicates</span>
                    </button>
                  </div>
                </div>

                <textarea
                  required
                  rows={8}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Paste or type official circular instructions, timetable schedule, eligible criteria, dates, and instructions..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                />
              </div>

              {/* AI Suggestion Box */}
              {aiSuggestion && (
                <div className="bg-blue-50/70 border border-blue-200 rounded-lg p-3 text-xs text-slate-700 space-y-1">
                  <div className="flex items-center gap-1 font-bold text-blue-900">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>Gemini Tag Recommendation</span>
                  </div>
                  <p className="text-slate-600">
                    {aiSuggestion.reasoning}
                  </p>
                  <div className="flex items-center gap-2 pt-1 font-mono text-[11px]">
                    <span>Suggested: <strong>{aiSuggestion.suggestedCategory}</strong></span>
                    <span>·</span>
                    <span>Urgent: <strong>{String(aiSuggestion.isUrgent)}</strong></span>
                  </div>
                </div>
              )}

              {/* AI Duplicate Warning Box */}
              {duplicateWarning && (
                <div
                  className={`border rounded-lg p-3 text-xs space-y-1 ${
                    duplicateWarning.isDuplicate
                      ? 'bg-amber-50 border-amber-300 text-amber-900'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  }`}
                >
                  <div className="flex items-center gap-1 font-bold">
                    {duplicateWarning.isDuplicate ? (
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    ) : (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    )}
                    <span>
                      {duplicateWarning.isDuplicate
                        ? 'Potential Duplicate Announcement Detected'
                        : 'No Duplicate Conflicts Found'}
                    </span>
                  </div>
                  <p>{duplicateWarning.notes || 'Notice content verified against active circulars.'}</p>
                </div>
              )}

              {/* Attachments Builder */}
              <div className="border border-slate-200 rounded-xl p-3 bg-slate-50 space-y-2">
                <label className="block text-xs font-semibold text-slate-700">
                  Attach Official Documents (PDF / URL)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                  <input
                    type="text"
                    value={attachmentName}
                    onChange={(e) => setAttachmentName(e.target.value)}
                    placeholder="Document Title (e.g. Schedule_Nov2026.pdf)"
                    className="sm:col-span-6 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                  />
                  <input
                    type="url"
                    value={attachmentUrl}
                    onChange={(e) => setAttachmentUrl(e.target.value)}
                    placeholder="https://ksrce.ac.in/circular.pdf"
                    className="sm:col-span-4 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddAttachment}
                    className="sm:col-span-2 px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs rounded-lg transition-colors"
                  >
                    Add
                  </button>
                </div>

                {attachments.length > 0 && (
                  <div className="pt-2 space-y-1">
                    {attachments.map((att, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between bg-white px-2.5 py-1.5 rounded border border-slate-200 text-xs"
                      >
                        <span className="font-medium text-slate-800 truncate mr-2">
                          {att.name} ({att.url})
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveAttachment(i)}
                          className="text-red-600 hover:text-red-800 font-bold text-xs"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit CTA */}
              <div className="flex items-center justify-end gap-2 pt-2">
                {isEditing && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  disabled={savingNotice}
                  className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  {savingNotice ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Check className="w-3.5 h-3.5" />
                  )}
                  <span>
                    {isEditing ? 'Save Changes' : 'Publish to College Board'}
                  </span>
                </button>
              </div>
            </form>
          </div>

          {/* Manage Existing Notices (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-slate-700" />
                <h3 className="font-bold text-base text-slate-900">
                  Published Notices ({collegeNotices.length})
                </h3>
              </div>
            </div>

            {collegeNotices.length > 0 ? (
              <div className="space-y-3 max-h-[640px] overflow-y-auto pr-1">
                {collegeNotices.map((n) => (
                  <div
                    key={n.id}
                    className="p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 text-[11px] text-slate-500 mb-1">
                        <span className="font-semibold text-blue-700">{n.category}</span>
                        <span className="font-mono">{n.publishedDate}</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-1 line-clamp-2">
                        {n.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-1 mb-2">
                        {n.department} · {n.viewCount} views
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-200/80 text-xs">
                      <button
                        onClick={() => onViewNotice(n)}
                        className="text-blue-700 font-semibold hover:underline flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Preview</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleStartEdit(n)}
                          className="p-1 text-slate-600 hover:text-blue-700 rounded hover:bg-slate-200 transition-colors"
                          title="Edit notice"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteNotice(n.id, n.title)}
                          className="p-1 text-slate-400 hover:text-red-700 rounded hover:bg-red-50 transition-colors"
                          title="Delete notice"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-slate-400">
                <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-xs">No notices published yet for {currentCollege.shortName}.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
