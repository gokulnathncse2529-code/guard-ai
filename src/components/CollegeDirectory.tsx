import React, { useState } from 'react';
import {
  Search,
  MapPin,
  Building,
  ExternalLink,
  ShieldCheck,
  Phone,
  Mail,
  ArrowRight,
  Filter,
  Check,
} from 'lucide-react';
import { College, TN_DISTRICTS, CollegeType, InstitutionCategory } from '../types/noticeguard';

interface CollegeDirectoryProps {
  colleges: College[];
  onSelectCollege: (collegeId: string) => void;
  onOpenRegister: () => void;
}

export const CollegeDirectory: React.FC<CollegeDirectoryProps> = ({
  colleges,
  onSelectCollege,
  onOpenRegister,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedAffiliation, setSelectedAffiliation] = useState<string>('All');

  const collegeTypes: (CollegeType | 'All')[] = [
    'All',
    'Engineering',
    'Arts and Science',
    'Polytechnic',
    'Medical',
    'Management',
  ];

  const institutionCategories: (InstitutionCategory | 'All')[] = [
    'All',
    'Government',
    'Government-Aided',
    'Private Autonomous',
    'Private Affiliated',
    'Deemed / Central',
  ];

  // Filter colleges
  const filteredColleges = colleges.filter((c) => {
    if (selectedDistrict !== 'All' && c.district.toLowerCase() !== selectedDistrict.toLowerCase()) {
      return false;
    }
    if (selectedType !== 'All' && c.type !== selectedType) {
      return false;
    }
    if (selectedCategory !== 'All' && c.category !== selectedCategory) {
      return false;
    }
    if (selectedAffiliation !== 'All') {
      if (selectedAffiliation === 'Anna University' && !c.affiliation.includes('Anna University')) return false;
      if (selectedAffiliation === 'Autonomous' && !c.affiliation.includes('Autonomous')) return false;
      if (selectedAffiliation === 'DOTE' && !c.affiliation.includes('DOTE')) return false;
    }
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const match =
        c.name.toLowerCase().includes(q) ||
        c.shortName.toLowerCase().includes(q) ||
        c.code.includes(q) ||
        c.district.toLowerCase().includes(q) ||
        c.address.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-700 mb-1">
            Directory & Accreditation
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Tamil Nadu College Directory
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl">
            Explore verified universities, engineering institutes, arts & science colleges, and polytechnics
            across all 38 districts of Tamil Nadu.
          </p>
        </div>

        {/* Filters and Search Bar Container */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs mb-8 space-y-4">
          {/* Top row: search + district */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-8 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search college by name, TNEA code (e.g. 2607), or location..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
              />
            </div>

            <div className="md:col-span-4 relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white appearance-none"
              >
                <option value="All">All Tamil Nadu Districts</option>
                {TN_DISTRICTS.map((d) => (
                  <option key={d} value={d}>
                    {d} District
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Secondary filter chips row */}
          <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100 text-xs">
            <span className="font-semibold text-slate-500 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              Type:
            </span>
            <div className="flex flex-wrap gap-1">
              {collegeTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    selectedType === type
                      ? 'bg-blue-700 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <span className="text-slate-300">|</span>

            <span className="font-semibold text-slate-500">Category:</span>
            <div className="flex flex-wrap gap-1">
              {institutionCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-blue-700 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Directory Results Header */}
        <div className="flex items-center justify-between mb-4 text-xs text-slate-500">
          <div>
            Showing <strong className="text-slate-900">{filteredColleges.length}</strong> institutions
            {selectedDistrict !== 'All' && <span> in {selectedDistrict}</span>}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedDistrict('All');
                setSelectedType('All');
                setSelectedCategory('All');
                setSelectedAffiliation('All');
              }}
              className="text-blue-700 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* College Cards Grid */}
        {filteredColleges.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredColleges.map((col) => (
              <div
                key={col.id}
                className="bg-white rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all p-5 flex flex-col justify-between"
              >
                <div>
                  {/* Top unboxed metadata line */}
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 mb-2">
                    <span className="font-semibold text-blue-700 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {col.district}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{col.type}</span>
                    <span aria-hidden="true">·</span>
                    <span>{col.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono">Code: {col.code}</span>
                  </div>

                  {/* College Title */}
                  <h3
                    onClick={() => onSelectCollege(col.id)}
                    className="text-lg font-bold text-slate-900 hover:text-blue-700 transition-colors cursor-pointer mb-2 leading-snug"
                  >
                    {col.name}
                  </h3>

                  {/* Affiliation & Accreditation */}
                  <p className="text-xs text-slate-700 mb-2 font-medium">
                    {col.affiliation}
                  </p>
                  {col.accreditation && (
                    <p className="text-xs text-slate-500 mb-3">
                      {col.accreditation}
                    </p>
                  )}

                  {/* Address */}
                  <p className="text-xs text-slate-500 mb-4 line-clamp-2">
                    {col.address}
                  </p>
                </div>

                {/* Footer Strip */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-4 text-slate-600">
                    <a
                      href={col.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:text-blue-700 transition-colors"
                      title="Visit official website"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span className="underline">Official Portal</span>
                    </a>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1 text-emerald-700 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {col.status === 'verified' ? 'Verified' : 'Demonstration'}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectCollege(col.id)}
                    className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors flex items-center justify-center gap-1 shadow-xs"
                  >
                    <span>View Notice Board ({col.noticeCount})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center max-w-xl mx-auto my-8">
            <Building className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900 mb-1">No colleges match your filters</h3>
            <p className="text-xs text-slate-600 mb-4">
              We did not find any registered college in the selected district or category.
              Are you an administrator of this institution? Register your college today.
            </p>
            <button
              onClick={onOpenRegister}
              className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              Submit College Registration
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
