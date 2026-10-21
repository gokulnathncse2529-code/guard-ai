import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle,
  XCircle,
  Clock,
  Building2,
  FileText,
  Download,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import {
  College,
  CollegeRegistrationRequest,
  AuditLog,
  Notice,
} from '../types/noticeguard';

interface SuperAdminDashboardProps {
  colleges: College[];
  registrationRequests: CollegeRegistrationRequest[];
  auditLogs: AuditLog[];
  notices: Notice[];
  onRequestAction: (requestId: string, action: 'approve' | 'reject', notes?: string) => void;
  onRefreshData: () => void;
}

export const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({
  colleges,
  registrationRequests,
  auditLogs,
  notices,
  onRequestAction,
  onRefreshData,
}) => {
  const [activeTab, setActiveTab] = useState<'requests' | 'audit' | 'directory'>('requests');
  const [reviewNotes, setReviewNotes] = useState<Record<string, string>>({});
  const [processingId, setProcessingId] = useState<string | null>(null);

  const pendingRequests = registrationRequests.filter((r) => r.status === 'pending');

  const handleAction = async (id: string, action: 'approve' | 'reject') => {
    setProcessingId(id);
    const notes = reviewNotes[id] || (action === 'approve' ? 'Verified by Directorate' : 'Institutional proof rejected');
    await onRequestAction(id, action, notes);
    setProcessingId(null);
  };

  const exportDirectoryJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(colleges, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `noticeguard_tamilnadu_colleges_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700 mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>State Higher Education Moderation Console</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              NoticeGuard AI Platform Oversight
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Review institutional verification requests, inspect statewide audit logs, and govern directory compliance.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportDirectoryJson}
              className="px-3 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Directory (JSON)</span>
            </button>
            <button
              onClick={onRefreshData}
              className="p-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Metric Strips */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 mb-1">Registered Colleges</div>
            <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
              {colleges.length}
            </div>
            <div className="text-[11px] text-emerald-600 font-medium mt-1">
              {colleges.filter((c) => c.status === 'verified').length} Verified Official
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 mb-1">Verification Queue</div>
            <div className="text-2xl font-bold font-mono text-amber-600 tabular-nums">
              {pendingRequests.length}
            </div>
            <div className="text-[11px] text-amber-700 font-medium mt-1">
              Awaiting Document Approval
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 mb-1">Active Notices Published</div>
            <div className="text-2xl font-bold font-mono text-blue-700 tabular-nums">
              {notices.length}
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-1">
              {notices.filter((n) => n.isUrgent).length} Urgent Bulletins
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 mb-1">Audit Entries Logged</div>
            <div className="text-2xl font-bold font-mono text-slate-700 tabular-nums">
              {auditLogs.length}
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-1">
              Tamper-Evident History
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-b border-slate-200 mb-6">
          <button
            onClick={() => setActiveTab('requests')}
            className={`pb-3 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 border-b-2 -mb-px ${
              activeTab === 'requests'
                ? 'border-blue-700 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>Registration Requests</span>
            {pendingRequests.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-100 text-amber-800 font-bold">
                {pendingRequests.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`pb-3 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 border-b-2 -mb-px ${
              activeTab === 'audit'
                ? 'border-blue-700 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>System Audit Trail</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-100 text-slate-600 font-bold">
              {auditLogs.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('directory')}
            className={`pb-3 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 border-b-2 -mb-px ${
              activeTab === 'directory'
                ? 'border-blue-700 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>Directory Compliance</span>
          </button>
        </div>

        {/* Tab 1: Registration Requests */}
        {activeTab === 'requests' && (
          <div className="space-y-4">
            {registrationRequests.length > 0 ? (
              registrationRequests.map((req) => (
                <div
                  key={req.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-1.5">
                      <span className="font-semibold text-blue-700">{req.district} District</span>
                      <span aria-hidden="true">·</span>
                      <span>{req.collegeType}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono">{new Date(req.submittedAt).toLocaleDateString()}</span>
                      <span aria-hidden="true">·</span>
                      <span
                        className={`font-semibold capitalize ${
                          req.status === 'approved'
                            ? 'text-emerald-700'
                            : req.status === 'rejected'
                            ? 'text-red-700'
                            : 'text-amber-700'
                        }`}
                      >
                        Status: {req.status}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
                      {req.collegeName}
                    </h3>

                    <p className="text-xs text-slate-600 mb-2">
                      Affiliation: <strong>{req.affiliation}</strong> · Address: {req.address}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span>Administrator: <strong className="text-slate-800">{req.adminName}</strong> ({req.adminDesignation})</span>
                      <span aria-hidden="true">·</span>
                      <span>Email: <strong className="text-slate-800">{req.institutionalEmail}</strong></span>
                      {req.officialWebsite && (
                        <>
                          <span aria-hidden="true">·</span>
                          <a
                            href={req.officialWebsite}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-700 underline flex items-center gap-0.5"
                          >
                            <span>Website</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </>
                      )}
                    </div>

                    {req.reviewerNotes && (
                      <div className="mt-2 text-xs text-slate-500 bg-slate-50 p-2 rounded border border-slate-100">
                        Reviewer Note: {req.reviewerNotes}
                      </div>
                    )}
                  </div>

                  {/* Actions for pending requests */}
                  {req.status === 'pending' ? (
                    <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 shrink-0">
                      <input
                        type="text"
                        placeholder="Optional review notes..."
                        value={reviewNotes[req.id] || ''}
                        onChange={(e) =>
                          setReviewNotes({ ...reviewNotes, [req.id]: e.target.value })
                        }
                        className="px-2.5 py-1.5 text-xs border border-slate-200 rounded bg-slate-50 focus:bg-white w-48"
                      />

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleAction(req.id, 'approve')}
                          disabled={processingId === req.id}
                          className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Approve & Activate</span>
                        </button>

                        <button
                          onClick={() => handleAction(req.id, 'reject')}
                          disabled={processingId === req.id}
                          className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Reject</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 font-mono">Completed</span>
                  )}
                </div>
              ))
            ) : (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-400">
                <ShieldCheck className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                <p className="text-xs">No registration applications in the pipeline.</p>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Audit Logs */}
        {activeTab === 'audit' && (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
              <span>Timestamp & Action</span>
              <span>Details & College</span>
            </div>

            <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-4 hover:bg-slate-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-slate-500 font-medium">
                        {new Date(log.timestamp).toLocaleString()}
                      </span>
                      <span className="font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded text-[11px] font-mono">
                        {log.action}
                      </span>
                    </div>
                    <p className="text-slate-800 font-medium">
                      {log.details}
                    </p>
                  </div>

                  <div className="text-right sm:text-right shrink-0">
                    <span className="text-slate-400 text-[11px] block font-mono">
                      Actor: {log.actor}
                    </span>
                    {log.collegeName && (
                      <span className="text-slate-600 font-semibold block text-[11px]">
                        {log.collegeName}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Directory Compliance */}
        {activeTab === 'directory' && (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600">
              <span>Total Indexed Colleges: <strong className="text-slate-900">{colleges.length}</strong></span>
              <span>Demonstration Records: <strong className="text-slate-900">{colleges.filter(c => c.status === 'demo').length}</strong></span>
            </div>

            <div className="divide-y divide-slate-100">
              {colleges.map((c) => (
                <div key={c.id} className="p-4 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{c.name}</div>
                    <div className="text-slate-500 mt-0.5">
                      Code: {c.code} · {c.district} · {c.affiliation}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 rounded font-semibold text-[11px] ${
                      c.status === 'verified' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {c.status === 'verified' ? 'Verified' : 'Demonstration'}
                    </span>
                    <span className="font-mono tabular-nums text-slate-500">
                      {c.noticeCount} notices
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
