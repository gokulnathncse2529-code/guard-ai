import React, { useState } from 'react';
import {
  X,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Loader2,
  AlertCircle,
  FileText,
  Mail,
  MapPin,
  Globe,
} from 'lucide-react';
import { TN_DISTRICTS, CollegeType, CollegeRegistrationRequest } from '../types/noticeguard';

interface CollegeRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestSubmitted: (request: CollegeRegistrationRequest) => void;
}

export const CollegeRegisterModal: React.FC<CollegeRegisterModalProps> = ({
  isOpen,
  onClose,
  onRequestSubmitted,
}) => {
  const [collegeName, setCollegeName] = useState('');
  const [collegeType, setCollegeType] = useState<CollegeType>('Engineering');
  const [district, setDistrict] = useState<string>(TN_DISTRICTS[0]);
  const [address, setAddress] = useState('');
  const [affiliation, setAffiliation] = useState('Anna University, Chennai');
  const [officialWebsite, setOfficialWebsite] = useState('');
  const [institutionalEmail, setInstitutionalEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [adminName, setAdminName] = useState('');
  const [adminDesignation, setAdminDesignation] = useState('');
  const [verificationProofUrl, setVerificationProofUrl] = useState('');

  const [loading, setLoading] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState<CollegeRegistrationRequest | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!collegeName.trim() || !institutionalEmail.trim() || !adminName.trim()) {
      setErrorMessage('Please fill in all mandatory institutional details.');
      return;
    }

    // Email validation
    if (!institutionalEmail.includes('@')) {
      setErrorMessage('Please provide a valid institutional email address.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/colleges/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          collegeName,
          collegeType,
          district,
          address,
          affiliation,
          officialWebsite,
          institutionalEmail,
          contactPhone,
          adminName,
          adminDesignation,
          verificationProofUrl,
        }),
      });

      const data = await res.json();
      if (data.success && data.request) {
        setSubmittedRequest(data.request);
        onRequestSubmitted(data.request);
      } else {
        setErrorMessage(data.error || 'Failed to submit registration request.');
      }
    } catch (err: any) {
      setErrorMessage('Network error while submitting registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-700 text-white flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Institutional Notice Board Registration
              </h3>
              <p className="text-xs text-slate-500">
                Join the Tamil Nadu Unified College Notice Board network
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-md hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {submittedRequest ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div>
                <h4 className="text-xl font-bold text-slate-900">
                  Registration Application Received
                </h4>
                <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
                  Your application for <strong className="text-slate-900">{submittedRequest.collegeName}</strong> has been assigned reference ID:
                </p>
                <div className="font-mono text-sm font-bold text-blue-700 bg-blue-50 py-1.5 px-3 rounded-md inline-block mt-2">
                  {submittedRequest.id}
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-600 max-w-md mx-auto text-left space-y-2">
                <div className="font-bold text-slate-800">Verification Process:</div>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  <li>Our administrative desk validates university affiliation and institutional email.</li>
                  <li>An authorization code is dispatched to <strong className="text-slate-800">{submittedRequest.institutionalEmail}</strong>.</li>
                  <li>Once approved by the Platform Moderator, your official college notice board goes live.</li>
                </ul>
              </div>

              <button
                onClick={onClose}
                className="px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="bg-blue-50/60 border border-blue-100 rounded-lg p-3 text-xs text-blue-900 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <span>
                  NoticeGuard AI verifies institutional authority before activating notice boards to
                  guarantee zero forged announcements or unverified circulars.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Official College Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={collegeName}
                    onChange={(e) => setCollegeName(e.target.value)}
                    placeholder="e.g. Government College of Engineering, Salem"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    College Type *
                  </label>
                  <select
                    value={collegeType}
                    onChange={(e) => setCollegeType(e.target.value as CollegeType)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Arts and Science">Arts and Science</option>
                    <option value="Polytechnic">Polytechnic</option>
                    <option value="Medical">Medical</option>
                    <option value="Management">Management</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tamil Nadu District *
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                  >
                    {TN_DISTRICTS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Campus Address & Pincode
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. NH-47, Salem-Bangalore Highway, Salem 636011"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Affiliation / University *
                  </label>
                  <input
                    type="text"
                    required
                    value={affiliation}
                    onChange={(e) => setAffiliation(e.target.value)}
                    placeholder="e.g. Anna University (Autonomous)"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Official College Website *
                  </label>
                  <input
                    type="url"
                    required
                    value={officialWebsite}
                    onChange={(e) => setOfficialWebsite(e.target.value)}
                    placeholder="https://gcesalem.edu.in"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Institutional Email (.ac.in / .edu.in) *
                  </label>
                  <input
                    type="email"
                    required
                    value={institutionalEmail}
                    onChange={(e) => setInstitutionalEmail(e.target.value)}
                    placeholder="principal@gcesalem.edu.in"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Official Contact Phone
                  </label>
                  <input
                    type="tel"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="+91 427 2346157"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Authorized Administrator Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                    placeholder="Dr. R. Vijayakumar"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Administrator Designation
                  </label>
                  <input
                    type="text"
                    value={adminDesignation}
                    onChange={(e) => setAdminDesignation(e.target.value)}
                    placeholder="Principal / Controller of Examinations"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Authorization Document / Letter URL
                  </label>
                  <input
                    type="url"
                    value={verificationProofUrl}
                    onChange={(e) => setVerificationProofUrl(e.target.value)}
                    placeholder="https://yourcollege.edu.in/noticeguard-auth.pdf"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                  />
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Link to scanned letterhead authorization signed by Head of Institution.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Submit Institutional Registration</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
