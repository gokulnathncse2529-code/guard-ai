export type CollegeType =
  | 'Engineering'
  | 'Arts and Science'
  | 'Medical'
  | 'Polytechnic'
  | 'Management'
  | 'Other';

export type InstitutionCategory =
  | 'Government'
  | 'Government-Aided'
  | 'Private Autonomous'
  | 'Private Affiliated'
  | 'Deemed / Central';

export type CollegeStatus = 'verified' | 'demo' | 'pending';

export interface College {
  id: string;
  name: string;
  shortName: string;
  code: string;
  district: string;
  address: string;
  type: CollegeType;
  category: InstitutionCategory;
  affiliation: string;
  website: string;
  contactEmail: string;
  contactPhone: string;
  establishedYear: number;
  status: CollegeStatus;
  image: string;
  noticeCount: number;
  accreditation?: string;
}

export type NoticeCategory =
  | 'examination'
  | 'urgent'
  | 'placement'
  | 'events_symposium'
  | 'holidays'
  | 'general';

export interface NoticeAttachment {
  name: string;
  type: 'pdf' | 'doc' | 'sheet' | 'link';
  url: string;
  size?: string;
}

export interface Notice {
  id: string;
  collegeId: string;
  collegeName: string;
  district: string;
  title: string;
  summary: string;
  content: string;
  category: NoticeCategory;
  isUrgent: boolean;
  priority: 'high' | 'medium' | 'normal';
  publishedDate: string;
  validTill?: string;
  department: string;
  targetAudience: string;
  attachments: NoticeAttachment[];
  officialSource: string;
  status: 'published' | 'draft' | 'archived';
  aiSummary?: string;
  simplifiedEnglish?: string;
  viewCount: number;
}

export interface CollegeRegistrationRequest {
  id: string;
  collegeName: string;
  collegeType: CollegeType;
  district: string;
  address: string;
  affiliation: string;
  officialWebsite: string;
  institutionalEmail: string;
  contactPhone: string;
  adminName: string;
  adminDesignation: string;
  verificationProofUrl?: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewerNotes?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  collegeId?: string;
  collegeName?: string;
  details: string;
}

export const TN_DISTRICTS = [
  'Ariyalur',
  'Chengalpattu',
  'Chennai',
  'Coimbatore',
  'Cuddalore',
  'Dharmapuri',
  'Dindigul',
  'Erode',
  'Kallakurichi',
  'Kanchipuram',
  'Kanyakumari',
  'Karur',
  'Krishnagiri',
  'Madurai',
  'Mayiladuthurai',
  'Nagapattinam',
  'Namakkal',
  'Nilgiris',
  'Perambalur',
  'Pudukkottai',
  'Ramanathapuram',
  'Ranipet',
  'Salem',
  'Sivaganga',
  'Tenkasi',
  'Thanjavur',
  'Theni',
  'Thoothukudi',
  'Tiruchirappalli',
  'Tirunelveli',
  'Tirupathur',
  'Tiruppur',
  'Tiruvallur',
  'Tiruvannamalai',
  'Tiruvarur',
  'Vellore',
  'Viluppuram',
  'Virudhunagar',
] as const;

export const NOTICE_CATEGORIES_META: Record<
  NoticeCategory,
  { label: string; description: string; iconName: string }
> = {
  examination: {
    label: 'Examination',
    description: 'Timetables, internal schedules, circulars, and results',
    iconName: 'GraduationCap',
  },
  urgent: {
    label: 'Urgent Bulletins',
    description: 'Immediate advisories, deadlines, and state notifications',
    iconName: 'AlertCircle',
  },
  placement: {
    label: 'Placement & Careers',
    description: 'Recruitment schedules, eligible criteria, and internships',
    iconName: 'Briefcase',
  },
  events_symposium: {
    label: 'Events & Symposium',
    description: 'Technical fests, hackathons, paper presentations, and workshops',
    iconName: 'Sparkles',
  },
  holidays: {
    label: 'Holidays',
    description: 'Festival vacations, government holidays, and reopening dates',
    iconName: 'CalendarDays',
  },
  general: {
    label: 'General Notices',
    description: 'Department circulars, scholarship updates, and administrative notes',
    iconName: 'Bell',
  },
};
