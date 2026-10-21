import {
  College,
  Notice,
  CollegeRegistrationRequest,
  AuditLog,
} from '../types/noticeguard';

export const INITIAL_COLLEGES: College[] = [
  {
    id: 'ksrce-namakkal',
    name: 'K.S.R. College of Engineering (Autonomous)',
    shortName: 'KSRCE',
    code: '2607',
    district: 'Namakkal',
    address: 'K.S.R. Kalvi Nagar, Tiruchengode, Namakkal District, Tamil Nadu 637215',
    type: 'Engineering',
    category: 'Private Autonomous',
    affiliation: 'Autonomous (Affiliated to Anna University, Chennai)',
    website: 'https://ksrce.ac.in',
    contactEmail: 'principal@ksrce.ac.in',
    contactPhone: '+91 4288 274741',
    establishedYear: 2001,
    status: 'verified',
    image: '/src/assets/images/ksr_college_campus_1792599213443.jpg',
    noticeCount: 6,
    accreditation: 'NAAC A++ Grade · NBA Accredited · Approved by AICTE',
  },
  {
    id: 'ceg-anna-univ',
    name: 'College of Engineering, Guindy (CEG), Anna University',
    shortName: 'Anna Univ CEG',
    code: '0001',
    district: 'Chennai',
    address: '12, Sardar Patel Road, Guindy, Chennai, Tamil Nadu 600025',
    type: 'Engineering',
    category: 'Government',
    affiliation: 'Anna University Campus (Established 1794)',
    website: 'https://ceg.annauniv.edu',
    contactEmail: 'dean@ceg.annauniv.edu',
    contactPhone: '+91 44 2235 8491',
    establishedYear: 1794,
    status: 'verified',
    image: '/src/assets/images/ceg_anna_campus_1792599213443.jpg',
    noticeCount: 5,
    accreditation: 'NIRF Top 10 University · NAAC A++ · UGC Recognized',
  },
  {
    id: 'psg-tech-cbe',
    name: 'PSG College of Technology',
    shortName: 'PSG Tech',
    code: '2006',
    district: 'Coimbatore',
    address: 'Post Box No. 1611, Peelamedu, Coimbatore, Tamil Nadu 641004',
    type: 'Engineering',
    category: 'Government-Aided',
    affiliation: 'Autonomous (Affiliated to Anna University)',
    website: 'https://psgtech.edu',
    contactEmail: 'principal@psgtech.ac.in',
    contactPhone: '+91 422 2572177',
    establishedYear: 1951,
    status: 'verified',
    image: '/src/assets/images/psg_tech_campus_1792599213720.jpg',
    noticeCount: 5,
    accreditation: 'NIRF Engineering Rank 50 · NAAC A Grade · NBA Tier-1',
  },
  {
    id: 'tce-madurai',
    name: 'Thiagarajar College of Engineering',
    shortName: 'TCE Madurai',
    code: '5008',
    district: 'Madurai',
    address: 'GST Road, Thiruparankundram, Madurai, Tamil Nadu 625015',
    type: 'Engineering',
    category: 'Government-Aided',
    affiliation: 'Autonomous (Affiliated to Anna University)',
    website: 'https://tce.edu',
    contactEmail: 'principal@tce.edu',
    contactPhone: '+91 452 2482240',
    establishedYear: 1957,
    status: 'verified',
    image: '/src/assets/images/hero_tn_campus_1792599212724.jpg',
    noticeCount: 4,
    accreditation: 'NAAC A+ Grade · NBA Accredited · DST-FIST Supported',
  },
  {
    id: 'mcc-chennai',
    name: 'Madras Christian College (Autonomous)',
    shortName: 'MCC Chennai',
    code: '1004',
    district: 'Chennai',
    address: 'Tambaram East, Chennai, Tamil Nadu 600059',
    type: 'Arts and Science',
    category: 'Government-Aided',
    affiliation: 'Autonomous (Affiliated to University of Madras)',
    website: 'https://mcc.edu.in',
    contactEmail: 'principal@mcc.edu.in',
    contactPhone: '+91 44 2239 0675',
    establishedYear: 1837,
    status: 'verified',
    image: '/src/assets/images/hero_tn_campus_1792599212724.jpg',
    noticeCount: 4,
    accreditation: 'NAAC A+ Grade (CGPA 3.27) · College with Potential for Excellence',
  },
  {
    id: 'sjc-trichy',
    name: "St. Joseph's College (Autonomous), Tiruchirappalli",
    shortName: 'St. Joseph Trichy',
    code: '3002',
    district: 'Tiruchirappalli',
    address: 'Chatram Bus Stand, Tiruchirappalli, Tamil Nadu 620002',
    type: 'Arts and Science',
    category: 'Government-Aided',
    affiliation: 'Autonomous (Affiliated to Bharathidasan University)',
    website: 'https://sjctni.edu',
    contactEmail: 'college@sjctni.edu',
    contactPhone: '+91 431 4226436',
    establishedYear: 1844,
    status: 'demo',
    image: '/src/assets/images/hero_tn_campus_1792599212724.jpg',
    noticeCount: 3,
    accreditation: 'NAAC A++ Grade (Cycle 4) · Heritage Status by UGC',
  },
  {
    id: 'gpc-salem',
    name: 'Government Polytechnic College, Salem',
    shortName: 'GPTC Salem',
    code: '2101',
    district: 'Salem',
    address: 'Near Collectorate, Salem, Tamil Nadu 636007',
    type: 'Polytechnic',
    category: 'Government',
    affiliation: 'Directorate of Technical Education (DOTE, Tamil Nadu)',
    website: 'https://gptcsalem.org',
    contactEmail: 'principal.gptcsalem@gmail.com',
    contactPhone: '+91 427 2415112',
    establishedYear: 1961,
    status: 'demo',
    image: '/src/assets/images/ksr_college_campus_1792599213443.jpg',
    noticeCount: 2,
    accreditation: 'AICTE Approved · DOTE Affiliated',
  },
];

export const INITIAL_NOTICES: Notice[] = [
  // KSRCE Notices
  {
    id: 'ksr-exam-01',
    collegeId: 'ksrce-namakkal',
    collegeName: 'K.S.R. College of Engineering (Autonomous)',
    district: 'Namakkal',
    title: 'Autonomous End Semester Examinations Nov/Dec 2026 – Final Timetable Released',
    summary:
      'The Controller of Examinations has officially published the final schedule for all B.E./B.Tech/M.E. Regulation 2020 & 2022 regular and arrear examinations.',
    content: `OFFICE OF THE CONTROLLER OF EXAMINATIONS
K.S.R. COLLEGE OF ENGINEERING (AUTONOMOUS), TIRUCHENGODE

CIRCULAR No.: KSRCE/COE/ESE-NOV-2026/04

Sub: Schedule of End Semester Theory Examinations - November / December 2026 - Reg.

1. The final timetable for the End Semester Theory Examinations (Regular & Arrear) for all UG (B.E./B.Tech - Semesters III, V, VII) and PG (M.E./MBA/MCA) under Autonomous Regulations is released on the college portal.
2. Examination Sessions:
   - Forenoon (FN): 10:00 AM to 01:00 PM
   - Afternoon (AN): 02:00 PM to 05:00 PM
3. Hall tickets will be issued through Faculty Advisors from November 04, 2026, subject to fee clearance and minimum 75% attendance compliance.
4. Candidates are strictly advised to carry their valid institutional Identity Card and Hall Ticket to the examination hall. Electronic gadgets, smart watches, and unauthorized materials are strictly prohibited.

Sd/-
Controller of Examinations`,
    category: 'examination',
    isUrgent: true,
    priority: 'high',
    publishedDate: '2026-10-18',
    validTill: '2026-12-15',
    department: 'Controller of Examinations',
    targetAudience: 'All UG & PG Students',
    attachments: [
      {
        name: 'KSRCE_Nov_Dec_2026_Final_Timetable.pdf',
        type: 'pdf',
        url: 'https://ksrce.ac.in/circulars/timetables/ese-nov-2026.pdf',
        size: '1.4 MB',
      },
      {
        name: 'Hall_Ticket_Distribution_Schedule.pdf',
        type: 'pdf',
        url: 'https://ksrce.ac.in/circulars/coe/hall-tickets.pdf',
        size: '420 KB',
      },
    ],
    officialSource: 'KSRCE Autonomous COE Portal',
    status: 'published',
    aiSummary:
      'Final Autonomous End-Sem Exam timetable is released for UG/PG (Semesters 3, 5, 7). FN session: 10 AM-1 PM; AN session: 2-5 PM. Hall ticket distribution starts Nov 4 via Faculty Advisors (requires 75% attendance).',
    simplifiedEnglish:
      'Your semester exams schedule is out! Check the PDF for your subject dates. Collect your hall ticket from your Faculty Advisor starting November 4. Make sure your attendance is at least 75% and college fees are paid.',
    viewCount: 1240,
  },
  {
    id: 'ksr-symposium-01',
    collegeId: 'ksrce-namakkal',
    collegeName: 'K.S.R. College of Engineering (Autonomous)',
    district: 'Namakkal',
    title: 'DAKSHA 2026: National Level Technical Symposium by Department of CSE & IT',
    summary:
      'Annual national inter-college symposium featuring Hack-A-Thon, Paper Presentation, Web Craft, and AI Prompt Engineering with ₹1,00,000 in cash awards.',
    content: `DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING & INFORMATION TECHNOLOGY
IN ASSOCIATION WITH CSI & ISTE STUDENT CHAPTERS
PRESENTS
"DAKSHA 2026" - NATIONAL LEVEL INTER-COLLEGIATE TECHNICAL SYMPOSIUM

Event Date: November 14, 2026
Venue: Silver Jubilee Convention Centre, K.S.R. Educational Institutions, Tiruchengode

Highlighted Tracks:
- Technovate: National Paper & Poster Presentation (AI, Edge Computing, Cyber Defense)
- ByteCode Blitz: 6-Hour Live Web & Mobile Hackathon
- Bug Hunt & Reverse Engineering Challenge
- WebCraft: Full-stack rapid UI prototyping
- PromptX: Generative AI workflow battle

Eligibility: Open to all engineering students from Tamil Nadu and neighboring states. Free accommodation for outstation participants on prior registration.
Registration Deadline: November 08, 2026.
Cash Prizes: ₹1,00,000 overall prize pool + Certificate of Participation to all attendees.

Convenor: Dr. A. Rajiv, Head of CSE
Faculty Coordinators: Prof. S. Karthik / Prof. M. Priya
Official portal: https://daksha.ksrce.ac.in`,
    category: 'events_symposium',
    isUrgent: false,
    priority: 'normal',
    publishedDate: '2026-10-15',
    validTill: '2026-11-14',
    department: 'Computer Science and Engineering',
    targetAudience: 'Engineering Students across Tamil Nadu',
    attachments: [
      {
        name: 'DAKSHA_2026_Brochure_Rules.pdf',
        type: 'pdf',
        url: 'https://ksrce.ac.in/events/daksha2026/brochure.pdf',
        size: '2.8 MB',
      },
      {
        name: 'Online_Registration_Portal',
        type: 'link',
        url: 'https://daksha.ksrce.ac.in',
      },
    ],
    officialSource: 'Department of CSE, KSRCE',
    status: 'published',
    aiSummary:
      'DAKSHA 2026 national technical symposium on November 14 at KSRCE Tiruchengode. Events include Hackathon, Paper Presentation, Bug Hunt, and PromptX with ₹1 Lakh prize pool. Registrations close November 8.',
    simplifiedEnglish:
      'Engineering students can register for KSRCE’s big tech fest "DAKSHA 2026" happening on November 14. Compete in hackathons or paper presentations to win from a ₹1,00,000 cash pool. Last date to register is November 8.',
    viewCount: 890,
  },
  {
    id: 'ksr-placement-01',
    collegeId: 'ksrce-namakkal',
    collegeName: 'K.S.R. College of Engineering (Autonomous)',
    district: 'Namakkal',
    title: 'Zoho Corporation – On-Campus Core Recruitment Drive for 2027 Passing Out Batch',
    summary:
      'Software Developer and Quality Analyst openings with CTC ranging from ₹6.0 LPA to ₹10.5 LPA. Online assessment scheduled for October 29, 2026.',
    content: `CENTRE FOR PLACEMENT AND CAREER ENHANCEMENT (CPCE)
K.S.R. COLLEGE OF ENGINEERING

NOTICE: CPCE/2026-27/CR-014
Date: 19-10-2026

Sub: Zoho Corporation Campus Recruitment Drive 2026-27 – Reg.

We are pleased to inform that Zoho Corporation is visiting our campus for hiring the 2027 passing out batch (Current final year UG - CSE, IT, ECE, EEE, MECH & AIDS).

Role 1: Software Development Engineer (SDE)
- CTC: ₹8.4 LPA - ₹10.5 LPA
Role 2: Quality Assurance & Automation Engineer
- CTC: ₹6.0 LPA - ₹7.5 LPA

Eligibility Criteria:
- B.E. / B.Tech in circuit or computational branches
- Minimum 6.5 CGPA in current semester with no standing arrears at the time of final onboarding
- Strong fundamentals in C/C++/Java/Python and Data Structures

Selection Process:
1. Round 1: Online Technical Aptitude & Code Screening (Lab 1 & Lab 2, 29th Oct 2026, 9:00 AM)
2. Round 2: Basic Level Hands-on Coding
3. Round 3: Advanced Problem Solving & Application Logic
4. Round 4: Technical & HR Interviews (In-person at KSRCE Campus)

Students must register on the CPCE internal portal on or before 26th October 2026, 5:00 PM.`,
    category: 'placement',
    isUrgent: true,
    priority: 'high',
    publishedDate: '2026-10-19',
    validTill: '2026-10-26',
    department: 'Placement & Training Cell',
    targetAudience: 'Final Year B.E. / B.Tech Candidates',
    attachments: [
      {
        name: 'Zoho_Campus_Drive_Job_Description.pdf',
        type: 'pdf',
        url: 'https://ksrce.ac.in/placements/drives/zoho-jd-2026.pdf',
        size: '560 KB',
      },
    ],
    officialSource: 'KSRCE CPCE Office',
    status: 'published',
    aiSummary:
      'Zoho on-campus drive for 2027 batch offering SDE & QA roles (₹6.0 - ₹10.5 LPA). Requires ≥6.5 CGPA with no standing arrears. Round 1 screening on Oct 29. Mandatory registration deadline: Oct 26, 5 PM.',
    simplifiedEnglish:
      'Zoho is hiring final years for software developer and QA roles paying up to ₹10.5 LPA! You need a 6.5 CGPA and no backlogs. Register on the placement portal by October 26, 5 PM to take the test on October 29.',
    viewCount: 1650,
  },
  {
    id: 'ksr-holiday-01',
    collegeId: 'ksrce-namakkal',
    collegeName: 'K.S.R. College of Engineering (Autonomous)',
    district: 'Namakkal',
    title: 'Government of Tamil Nadu Deepavali Holidays & College Reopening Notification',
    summary:
      'College will remain closed from October 31 to November 03, 2026. Normal academic classes will resume on Monday, November 04, 2026.',
    content: `PRINCIPAL’S OFFICE
K.S.R. COLLEGE OF ENGINEERING (AUTONOMOUS)

CIRCULAR No.: KSRCE/PRN/HOLIDAY/2026/08
Date: 20-10-2026

Sub: Deepavali Festival Holidays and Reopening Date - Announcement - Reg.

In accordance with the State Government notification and the academic calendar approved by the Academic Council:

1. The college (all academic departments, laboratories, administrative sections, and library) will remain closed from 31.10.2026 (Saturday) to 03.11.2026 (Tuesday) on account of Deepavali festival.
2. Hostel inmates are permitted to leave the campus from 30.10.2026 (Friday) afternoon 04:30 PM after submitting standard gate passes to respective wardens.
3. College buses will depart campus at 04:45 PM on 30.10.2026 on all scheduled routes.
4. The college will reopen on 04.11.2026 (Wednesday) as per Day Order 1 timetable. Attendance on reopening day is mandatory for all students.

The Management, Principal, and Faculty fraternity wish all students and parents a happy and safe Deepavali.

Dr. P. Senthilkumar
Principal`,
    category: 'holidays',
    isUrgent: false,
    priority: 'normal',
    publishedDate: '2026-10-20',
    validTill: '2026-11-04',
    department: 'Principal’s Office',
    targetAudience: 'All Staff and Students',
    attachments: [
      {
        name: 'TN_Govt_Deepavali_Gazette_Extract.pdf',
        type: 'pdf',
        url: 'https://ksrce.ac.in/circulars/holidays/deepavali-2026.pdf',
        size: '310 KB',
      },
    ],
    officialSource: 'Principal, K.S.R. College of Engineering',
    status: 'published',
    aiSummary:
      'Deepavali holidays declared from October 31 to November 03, 2026. College reopens on Wednesday, November 04, 2026 with Day Order 1. Hostels allow exit starting Friday Oct 30 afternoon.',
    simplifiedEnglish:
      'College will be closed for Deepavali from Oct 31 to Nov 3. Classes resume on Wednesday, Nov 4 (Day Order 1). Attendance on reopening day is strictly compulsory.',
    viewCount: 2100,
  },
  {
    id: 'ksr-urgent-01',
    collegeId: 'ksrce-namakkal',
    collegeName: 'K.S.R. College of Engineering (Autonomous)',
    district: 'Namakkal',
    title: 'URGENT: Mandatory Submission of Post-Matric and State First Graduate Scholarship Forms',
    summary:
      'Last date for verification and biometric authentication at the Scholarship Cell is October 28, 2026.',
    content: `ACADEMIC SECTION (SCHOLARSHIPS)
K.S.R. COLLEGE OF ENGINEERING

URGENT CIRCULAR: SCH/TN-GOVT/2026-27/02
Date: 17-10-2026

All BC/MBC/DNC and SC/ST/SCC scholarship recipients and First Graduate concession holders are hereby instructed to complete biometric authentication and submit Aadhaar-seeded bank account copies to Counter 4 of the Administrative Block before 28.10.2026, 04:00 PM.

Failure to verify in the state portal (e-District / Umang TN) will result in automatic de-linking of tuition fee reimbursement for the current academic year 2026-27.

Bring:
1. Aadhaar Card & Original Income Certificate (valid 2026)
2. Bank Passbook copy with active NPCI mapping
3. Community Certificate copy`,
    category: 'urgent',
    isUrgent: true,
    priority: 'high',
    publishedDate: '2026-10-17',
    validTill: '2026-10-28',
    department: 'Scholarship Section',
    targetAudience: 'BC/MBC/SC/ST & First Graduate Students',
    attachments: [
      {
        name: 'TN_Scholarship_Checklist_2026.pdf',
        type: 'pdf',
        url: 'https://ksrce.ac.in/scholarships/checklist-2026.pdf',
        size: '480 KB',
      },
    ],
    officialSource: 'Scholarship Section, KSRCE',
    status: 'published',
    aiSummary:
      'Urgent scholarship verification for BC/MBC/SC/ST and First Graduate students. Biometric authentication and NPCI bank passbook submission mandatory before Oct 28 at Counter 4 to prevent tuition reimbursement cancellation.',
    simplifiedEnglish:
      'Important scholarship notice: If you receive Tamil Nadu government or First Graduate fee concessions, submit your Aadhaar, bank passbook, and do biometric verification at Counter 4 before October 28.',
    viewCount: 1420,
  },
  {
    id: 'ksr-general-01',
    collegeId: 'ksrce-namakkal',
    collegeName: 'K.S.R. College of Engineering (Autonomous)',
    district: 'Namakkal',
    title: 'Central Library Extended Study Hours for Nov/Dec Examination Period',
    summary:
      'Central digital and reference library will operate from 08:00 AM to 09:30 PM with high-speed Wi-Fi and air-conditioned reading halls.',
    content: `OFFICE OF THE CHIEF LIBRARIAN
CENTRAL LIBRARY - KSRCE

Circular: LIB/ESE/2026/05
Date: 16-10-2026

To facilitate undisturbed preparation for the upcoming Autonomous End Semester Examinations, the Central Library reading halls, digital repository, and reference section will observe extended working hours starting Monday, 20th October 2026.

New Timings:
- Monday to Saturday: 08:00 AM to 09:30 PM
- Sundays & Holidays: 09:00 AM to 05:00 PM

Students can access previous year Anna University / KSRCE autonomous question banks and IEEE/Springer digital journals via the campus intranet.`,
    category: 'general',
    isUrgent: false,
    priority: 'normal',
    publishedDate: '2026-10-16',
    validTill: '2026-12-20',
    department: 'Central Library',
    targetAudience: 'All Students & Research Scholars',
    attachments: [
      {
        name: 'Digital_Library_Remote_Access_Guide.pdf',
        type: 'pdf',
        url: 'https://ksrce.ac.in/library/access-guide.pdf',
        size: '620 KB',
      },
    ],
    officialSource: 'Chief Librarian, KSRCE',
    status: 'published',
    aiSummary:
      'Central Library hours extended from 8 AM to 9:30 PM on weekdays and 9 AM to 5 PM on Sundays during exam preparation season starting Oct 20.',
    simplifiedEnglish:
      'Good news for exam revision: The Central Library will now stay open until 9:30 PM every day and until 5 PM on Sundays with digital question papers available.',
    viewCount: 780,
  },

  // Anna University CEG Notices
  {
    id: 'ceg-exam-01',
    collegeId: 'ceg-anna-univ',
    collegeName: 'College of Engineering, Guindy (CEG), Anna University',
    district: 'Chennai',
    title: 'Anna University Affiliated & Autonomous Colleges Nov/Dec 2026 Theory Exam Schedule',
    summary:
      'Controller of Examinations Anna University Chennai has released the comprehensive phase-wise schedule for UG (Full Time & Part Time) Regulations 2017 & 2021.',
    content: `ANNA UNIVERSITY : : CHENNAI - 600 025
OFFICE OF THE CONTROLLER OF EXAMINATIONS

Notification No. COE/NOV-DEC-2026/UG-PG/01
Date: 18.10.2026

Subject: Conduct of Theory Examinations for Nov/Dec 2026 - Phase 1 & Phase 2 Timetables - Reg.

The detailed time table for the Under Graduate Degree Examinations (Semester 3, 5, 7) of Anna University affiliated colleges and university departments is hereby published on the university examination portal (coe1.annauniv.edu).

Schedule Highlights:
1. Commencement of Practical Examinations: 28th October 2026
2. Commencement of Theory Examinations (Sem 7 & 5): 11th November 2026
3. Commencement of Theory Examinations (Sem 3): 18th November 2026
4. Last date for dispatch of internal assessment marks by colleges: 25th October 2026

Sd/-
Controller of Examinations, Anna University`,
    category: 'examination',
    isUrgent: true,
    priority: 'high',
    publishedDate: '2026-10-18',
    validTill: '2026-12-10',
    department: 'Controller of Examinations, Anna University',
    targetAudience: 'Anna University Students Across Tamil Nadu',
    attachments: [
      {
        name: 'Anna_University_NovDec_2026_Schedule.pdf',
        type: 'pdf',
        url: 'https://coe1.annauniv.edu/timetables/novdec2026.pdf',
        size: '2.1 MB',
      },
    ],
    officialSource: 'Anna University COE Portal (coe1.annauniv.edu)',
    status: 'published',
    aiSummary:
      'Anna University Nov/Dec 2026 exam schedule: Practical exams commence Oct 28; Theory exams for semesters 5 & 7 begin Nov 11; Semester 3 theory begins Nov 18. Internal marks deadline is Oct 25.',
    simplifiedEnglish:
      'Anna University has announced the November/December exam dates. Practical exams start on October 28. Theory exams for 5th and 7th semesters begin November 11, and 3rd semester begins November 18.',
    viewCount: 4890,
  },
  {
    id: 'ceg-events-01',
    collegeId: 'ceg-anna-univ',
    collegeName: 'College of Engineering, Guindy (CEG), Anna University',
    district: 'Chennai',
    title: 'Kurukshetra 2027: International Techno-Management Fest – Student Committee Call',
    summary:
      'UNESCO patronized fest invites applications for design, logistics, sponsorship, and technical event coordinators for the upcoming edition.',
    content: `CEG TECH FORUM (CTF)
COLLEGE OF ENGINEERING GUINDY, ANNA UNIVERSITY

CIRCULAR: K!2027/CORE/CALL-01

Applications are invited from 2nd and 3rd year undergraduate engineering students of CEG, ACT, and SAP campuses for induction into the organizing teams of Kurukshetra 2027.

Domains Open:
- Events & Workshops (AI/ML, Robotics, Aero, FinTech)
- Web Operations & Systems Architecture
- Sponsorship, PR & Media Relations
- Hospitality & Logistics

Interviews will be held at Tag Auditorium on October 24 and 25 from 5:00 PM.`,
    category: 'events_symposium',
    isUrgent: false,
    priority: 'normal',
    publishedDate: '2026-10-14',
    validTill: '2026-10-25',
    department: 'CEG Tech Forum',
    targetAudience: 'CEG Students',
    attachments: [
      {
        name: 'Kurukshetra_Core_Application_Guidelines.pdf',
        type: 'pdf',
        url: 'https://cegtechforum.in/join-k27.pdf',
        size: '1.1 MB',
      },
    ],
    officialSource: 'CEG Tech Forum',
    status: 'published',
    aiSummary:
      'Kurukshetra 2027 organizing committee interviews on October 24-25 at Tag Auditorium for Events, Web, PR, and Logistics domains.',
    simplifiedEnglish:
      'Interested in organizing Kurukshetra, the biggest tech fest in Chennai? Auditions and interviews take place at Tag Auditorium on Oct 24 & 25 from 5 PM.',
    viewCount: 1950,
  },
  {
    id: 'ceg-placement-01',
    collegeId: 'ceg-anna-univ',
    collegeName: 'College of Engineering, Guindy (CEG), Anna University',
    district: 'Chennai',
    title: 'Cisco Systems – Global Internship & FTE Campus Drive Notification 2026',
    summary:
      'Technical Consulting Engineer and Software Engineer roles with stipend of ₹85,000/month during internship and FTE package of ₹18 LPA.',
    content: `CENTRE FOR UNIVERSITY-INDUSTRY COLLABORATION (CUIC)
ANNA UNIVERSITY, CHENNAI

CIRCULAR: CUIC/PLACEMENT/2026-27/CISCO-01
Date: 19.10.2026

Cisco Systems is conducting its on-campus drive for graduating students of batch 2027.

Eligibility:
- B.E. / B.Tech in CSE, IT, ECE, EEE (CEG & MIT campuses)
- CGPA: 7.50 and above with no current standing arrears
- History of max 1 cleared arrear permitted

Assessment Date: Saturday, 31st October 2026
Format: Virtual Proctoring on HackerRank (Networking, Algorithms, OS, Problem Solving).`,
    category: 'placement',
    isUrgent: true,
    priority: 'high',
    publishedDate: '2026-10-19',
    validTill: '2026-10-28',
    department: 'CUIC Anna University',
    targetAudience: 'Pre-final and Final Year Circuit Branches',
    attachments: [
      {
        name: 'Cisco_Campus_Eligibility_Detailed.pdf',
        type: 'pdf',
        url: 'https://annauniv.edu/cuic/cisco-2026.pdf',
        size: '780 KB',
      },
    ],
    officialSource: 'CUIC Anna University',
    status: 'published',
    aiSummary:
      'Cisco Systems internship & FTE drive offering ₹85k/mo stipend and ₹18 LPA CTC. Minimum 7.5 CGPA required. Online assessment on Oct 31.',
    simplifiedEnglish:
      'Cisco is visiting Anna University offering ₹18 LPA jobs and ₹85,000/month internships for students with 7.5+ CGPA. The test is on October 31.',
    viewCount: 3410,
  },
  {
    id: 'ceg-urgent-01',
    collegeId: 'ceg-anna-univ',
    collegeName: 'College of Engineering, Guindy (CEG), Anna University',
    district: 'Chennai',
    title: 'URGENT: Revaluation & Answer Script Photocopy Portal Closure for April/May 2026 Exams',
    summary:
      'The web portal for applying for photocopy of answer scripts for UG/PG examinations will permanently close on October 23, 2026, 11:59 PM.',
    content: `ANNA UNIVERSITY CHENNAI
OFFICE OF THE CONTROLLER OF EXAMINATIONS

URGENT NOTIFICATION
The web portal for applying for photocopy of answer scripts for the April/May 2026 examinations (Semesters 2, 4, 6, 8) will be strictly closed on 23-10-2026 at 23:59 hrs.

Principals of all affiliated colleges are requested to instruct their students to pay the requisite fee through the online portal and download transaction slips. No manual applications or late requests will be entertained under any circumstances.`,
    category: 'urgent',
    isUrgent: true,
    priority: 'high',
    publishedDate: '2026-10-16',
    validTill: '2026-10-23',
    department: 'Controller of Examinations',
    targetAudience: 'All Affiliated Colleges Students',
    attachments: [
      {
        name: 'Revaluation_Procedure_Circular.pdf',
        type: 'pdf',
        url: 'https://coe1.annauniv.edu/notices/reval-procedure.pdf',
        size: '340 KB',
      },
    ],
    officialSource: 'Anna University COE Portal',
    status: 'published',
    aiSummary:
      'Deadline alert: Anna University answer script photocopy applications close on October 23, 11:59 PM. Apply online via coe1.annauniv.edu before midnight.',
    simplifiedEnglish:
      'Urgent: If you want to check your April/May semester exam answer papers or apply for revaluation, you must apply before October 23 at 11:59 PM.',
    viewCount: 5200,
  },
  {
    id: 'ceg-holiday-01',
    collegeId: 'ceg-anna-univ',
    collegeName: 'College of Engineering, Guindy (CEG), Anna University',
    district: 'Chennai',
    title: 'Official Notification: Deepavali Holidays for University Departments & Affiliated Colleges',
    summary:
      'Anna University announces holidays from October 31 to November 03, 2026. All academic and administrative activities resume on November 04, 2026.',
    content: `ANNA UNIVERSITY : : CHENNAI - 25
REGISTRAR’S OFFICE

Notification: AU/REG/HOLIDAY/2026/19
Date: 19.10.2026

The Vice-Chancellor has approved that Anna University Departments (CEG, ACT, SAP, MIT) and constituent/affiliated engineering colleges across Tamil Nadu will observe holidays for Deepavali from 31.10.2026 to 03.11.2026.

All classes and examinations will resume on Wednesday, 04.11.2026.`,
    category: 'holidays',
    isUrgent: false,
    priority: 'normal',
    publishedDate: '2026-10-19',
    validTill: '2026-11-04',
    department: 'Registrar Office',
    targetAudience: 'All Colleges in Tamil Nadu',
    attachments: [],
    officialSource: 'Anna University Registrar',
    status: 'published',
    aiSummary:
      'Anna University declares Deepavali holidays from Oct 31 to Nov 3 for all constituent and affiliated colleges across Tamil Nadu. Reopens Nov 4.',
    simplifiedEnglish:
      'Anna University confirms all affiliated engineering colleges will get Deepavali holidays from October 31 to November 3. Reopens November 4.',
    viewCount: 4120,
  },

  // PSG Tech Notices
  {
    id: 'psg-exam-01',
    collegeId: 'psg-tech-cbe',
    collegeName: 'PSG College of Technology',
    district: 'Coimbatore',
    title: 'Autonomous Odd Semester Examinations Schedule – Dec 2026 Timetable',
    summary:
      'Autonomous examination schedule for all branches of B.E., B.Tech, and M.Tech programs with hall seating allocations.',
    content: `PSG COLLEGE OF TECHNOLOGY, COIMBATORE - 641 004
AUTONOMOUS EXAMINATION DIVISION

The time table for the Semester End Examinations - December 2026 is published on the student portal.
Key Dates:
- Laboratory Exams: November 18 - 25, 2026
- Theory Exams: December 01 - 22, 2026
- Publication of Results: January 15, 2027

Students with shortage of attendance (<75%) must report to the Dean of Academic Affairs before November 02.`,
    category: 'examination',
    isUrgent: false,
    priority: 'high',
    publishedDate: '2026-10-17',
    validTill: '2026-12-22',
    department: 'Autonomous Examinations Division',
    targetAudience: 'PSG Tech Students',
    attachments: [
      {
        name: 'PSGTech_Dec_2026_Exam_Timetable.pdf',
        type: 'pdf',
        url: 'https://psgtech.edu/exams/dec-2026.pdf',
        size: '1.7 MB',
      },
    ],
    officialSource: 'PSG Tech Autonomous Office',
    status: 'published',
    aiSummary:
      'PSG Tech odd semester exams: Lab exams from Nov 18-25; Theory exams from Dec 1-22. Results expected Jan 15, 2027.',
    simplifiedEnglish:
      'PSG Tech semester exam dates are out: Lab tests run from Nov 18-25 and written theory papers run from Dec 1-22.',
    viewCount: 1530,
  },
  {
    id: 'psg-placement-01',
    collegeId: 'psg-tech-cbe',
    collegeName: 'PSG College of Technology',
    district: 'Coimbatore',
    title: 'Robert Bosch India – Core Engineering & R&D Campus Hiring 2026-27',
    summary:
      'Recruitment for Embedded Systems, Automotive Electronics, and Robotics specialists with CTC of ₹9.5 LPA to ₹14 LPA.',
    content: `PSG TECH PLACEMENT CELL
NOTICE: PL-BOSCH-2026/08

Robert Bosch India will conduct campus recruitment on 3rd & 4th November 2026 for final year Mechanical, ECE, EEE, Production, and Robotics students.

Online screening test will be held on Oct 27, 2026 at the CAD/CAM Computer Centre.
Registrations close on Oct 25, 6 PM on the PSG Tech Placement Portal.`,
    category: 'placement',
    isUrgent: true,
    priority: 'high',
    publishedDate: '2026-10-18',
    validTill: '2026-10-25',
    department: 'Placement Office',
    targetAudience: 'Core Engineering Branches',
    attachments: [
      {
        name: 'Bosch_R&D_Job_Profiles.pdf',
        type: 'pdf',
        url: 'https://psgtech.edu/placements/bosch.pdf',
        size: '640 KB',
      },
    ],
    officialSource: 'Placement Officer, PSG Tech',
    status: 'published',
    aiSummary:
      'Robert Bosch recruitment for core engineering branches (Mech, ECE, EEE, Robotics) with ₹9.5 - ₹14 LPA CTC. Test on Oct 27; register by Oct 25.',
    simplifiedEnglish:
      'Robert Bosch is hiring core engineering students for up to ₹14 LPA. Register on the college placement portal by October 25 to sit for the Oct 27 exam.',
    viewCount: 2200,
  },
  {
    id: 'psg-events-01',
    collegeId: 'psg-tech-cbe',
    collegeName: 'PSG College of Technology',
    district: 'Coimbatore',
    title: 'Kriya 2027: International Student Technical Conclave – Call for Papers',
    summary:
      'South India’s premier techno-management fest opens paper submissions for Sustainable Energy, Quantum Computing, and Advanced Mobility.',
    content: `STUDENTS UNION - PSG COLLEGE OF TECHNOLOGY
KRIYA 2027

Call for Research Papers & Project Demonstrations.
Submission deadline: December 10, 2026.
Selected papers will be indexed in Scopus/Springer proceedings. Overall cash reward pool: ₹3,50,000.
Open to students across India.`,
    category: 'events_symposium',
    isUrgent: false,
    priority: 'normal',
    publishedDate: '2026-10-15',
    validTill: '2026-12-10',
    department: 'Students Union',
    targetAudience: 'All College Students',
    attachments: [
      {
        name: 'Kriya_Call_For_Papers.pdf',
        type: 'pdf',
        url: 'https://kriya.psgtech.ac.in/cfp.pdf',
        size: '1.2 MB',
      },
    ],
    officialSource: 'PSG Tech Students Union',
    status: 'published',
    aiSummary:
      'Kriya 2027 opens call for research papers in Sustainable Energy, Quantum Computing, and Mobility. Papers indexed in Scopus; ₹3.5 Lakhs in prizes.',
    simplifiedEnglish:
      'Submit your technical paper to PSG Tech’s Kriya 2027 before Dec 10 for a chance to win from a ₹3,50,000 cash prize pool.',
    viewCount: 1120,
  },

  // TCE Madurai Notices
  {
    id: 'tce-urgent-01',
    collegeId: 'tce-madurai',
    collegeName: 'Thiagarajar College of Engineering',
    district: 'Madurai',
    title: 'Tamil Nadu State Post-Doctoral & PG Research Fellowship Applications 2026-27',
    summary:
      'DST and TNSCST sponsored scholarship applications invited from full-time M.E. and Ph.D. scholars before October 30, 2026.',
    content: `OFFICE OF DEAN RESEARCH & CONSULTANCY
THIAGARAJAR COLLEGE OF ENGINEERING, MADURAI

Notification: TCE/R&C/FELLOWSHIP/2026/12
Eligible full-time PG and Research scholars are informed to submit their applications for the Tamil Nadu State Council for Science and Technology (TNSCST) fellowship.
Monthly stipend: ₹25,000 + contingency grant.
Applications to be submitted through research supervisors before 30.10.2026.`,
    category: 'urgent',
    isUrgent: true,
    priority: 'high',
    publishedDate: '2026-10-17',
    validTill: '2026-10-30',
    department: 'Dean Research',
    targetAudience: 'M.E. & Ph.D. Scholars',
    attachments: [
      {
        name: 'TNSCST_Fellowship_Form.pdf',
        type: 'pdf',
        url: 'https://tce.edu/research/tnscst-form.pdf',
        size: '520 KB',
      },
    ],
    officialSource: 'Dean R&C, TCE',
    status: 'published',
    aiSummary:
      'TNSCST PG & Research fellowship applications open with ₹25,000 monthly stipend. Deadline for submission is Oct 30, 2026.',
    simplifiedEnglish:
      'PG and Ph.D. students can apply for the Tamil Nadu state research fellowship giving ₹25,000 per month. Apply before October 30.',
    viewCount: 940,
  },
  {
    id: 'tce-holiday-01',
    collegeId: 'tce-madurai',
    collegeName: 'Thiagarajar College of Engineering',
    district: 'Madurai',
    title: 'Local Holiday Notification: Madurai District Chithirai / Karthigai Observance',
    summary:
      'TCE announces compensatory working day schedule following official district administration holiday circular.',
    content: `TCE MADURAI - REGISTRAR CIRCULAR
In accordance with the Madurai District Collectorate circular, the institution will observe holidays as per official gazette. Compensatory classes will follow on scheduled Saturdays.`,
    category: 'holidays',
    isUrgent: false,
    priority: 'normal',
    publishedDate: '2026-10-12',
    validTill: '2026-11-15',
    department: 'Registrar Office',
    targetAudience: 'All Faculty & Students',
    attachments: [],
    officialSource: 'TCE Registrar',
    status: 'published',
    aiSummary:
      'Local holiday circular and compensatory working day schedule released for Madurai campus.',
    simplifiedEnglish:
      'Official district holiday update and Saturday compensatory class schedule for TCE students.',
    viewCount: 880,
  },

  // MCC Chennai Notices
  {
    id: 'mcc-general-01',
    collegeId: 'mcc-chennai',
    collegeName: 'Madras Christian College (Autonomous)',
    district: 'Chennai',
    title: 'Autonomous Continuous Internal Assessment (CIA-2) Dates for UG & PG',
    summary:
      'Second internal assessment tests will be conducted across all Arts, Science, and Commerce departments from November 09 to 14, 2026.',
    content: `MADRAS CHRISTIAN COLLEGE (AUTONOMOUS)
OFFICE OF THE DEAN OF ACADEMICS

The second Continuous Internal Assessment (CIA-II) for all undergraduate and postgraduate streams will take place between 09-11-2026 and 14-11-2026.
Attendance during CIA tests is compulsory. No re-tests will be permitted except on verified medical grounds.`,
    category: 'examination',
    isUrgent: false,
    priority: 'normal',
    publishedDate: '2026-10-16',
    validTill: '2026-11-14',
    department: 'Dean of Academics',
    targetAudience: 'All MCC Students',
    attachments: [
      {
        name: 'MCC_CIA2_Schedule.pdf',
        type: 'pdf',
        url: 'https://mcc.edu.in/academics/cia2.pdf',
        size: '410 KB',
      },
    ],
    officialSource: 'Dean Academics, MCC',
    status: 'published',
    aiSummary:
      'MCC Continuous Internal Assessment 2 (CIA-II) scheduled from Nov 9 to 14, 2026 for all UG and PG programs. Compulsory attendance.',
    simplifiedEnglish:
      'Second internal exams at MCC will take place from November 9 to 14. Attendance is mandatory.',
    viewCount: 1100,
  },
  {
    id: 'mcc-events-01',
    collegeId: 'mcc-chennai',
    collegeName: 'Madras Christian College (Autonomous)',
    district: 'Chennai',
    title: 'Deepwoods 2027: Inter-Collegiate Cultural Festival – Dates Announced',
    summary:
      'The prestigious cultural festival of MCC is slated for February 18–20, 2027. Registration for state-wide college contingents will open in December.',
    content: `MCC CULTURAL UNION
Deepwoods 2027 dates have been finalized by the College Council. The annual inter-collegiate cultural fest will be staged across the scrub forest campus from February 18 to 20, 2027. More details on band auditions and choreo night to follow.`,
    category: 'events_symposium',
    isUrgent: false,
    priority: 'normal',
    publishedDate: '2026-10-10',
    validTill: '2027-02-20',
    department: 'Cultural Committee',
    targetAudience: 'College Students across India',
    attachments: [],
    officialSource: 'MCC Cultural Union',
    status: 'published',
    aiSummary:
      'Deepwoods 2027 cultural festival announced for February 18-20, 2027 at MCC Tambaram campus.',
    simplifiedEnglish:
      'MCC’s famous Deepwoods cultural fest is officially happening on February 18-20, 2027. Registrations open this December.',
    viewCount: 2300,
  },
];

export const INITIAL_REGISTRATION_REQUESTS: CollegeRegistrationRequest[] = [
  {
    id: 'req-srm-kattankulathur',
    collegeName: 'SRM Institute of Science and Technology',
    collegeType: 'Engineering',
    district: 'Chengalpattu',
    address: 'SRM Nagar, Kattankulathur, Chengalpattu District, Tamil Nadu 603203',
    affiliation: 'Deemed University (UGC Approved)',
    officialWebsite: 'https://www.srmist.edu.in',
    institutionalEmail: 'registrar@srmist.edu.in',
    contactPhone: '+91 44 2741 7000',
    adminName: 'Dr. C. Muthuvel',
    adminDesignation: 'Joint Registrar (Academic Communications)',
    status: 'pending',
    submittedAt: '2026-10-20T10:30:00Z',
    verificationProofUrl: 'https://www.srmist.edu.in/authorization-letter-noticeguard.pdf',
  },
  {
    id: 'req-loyola-chennai',
    collegeName: 'Loyola College (Autonomous)',
    collegeType: 'Arts and Science',
    district: 'Chennai',
    address: 'Sterling Road, Nungambakkam, Chennai, Tamil Nadu 600034',
    affiliation: 'Autonomous (Affiliated to University of Madras)',
    officialWebsite: 'https://www.loyolacollege.edu',
    institutionalEmail: 'viceprincipal@loyolacollege.edu',
    contactPhone: '+91 44 2817 8200',
    adminName: 'Rev. Dr. Francis P. Xavier SJ',
    adminDesignation: 'Vice Principal & Public Information Officer',
    status: 'pending',
    submittedAt: '2026-10-19T14:15:00Z',
    verificationProofUrl: 'https://www.loyolacollege.edu/docs/verification_portal.pdf',
  },
  {
    id: 'req-nec-kovilpatti',
    collegeName: 'National Engineering College (Autonomous)',
    collegeType: 'Engineering',
    district: 'Thoothukudi',
    address: 'K.R. Nagar, Kovilpatti, Thoothukudi District, Tamil Nadu 628503',
    affiliation: 'Autonomous (Affiliated to Anna University)',
    officialWebsite: 'https://nec.edu.in',
    institutionalEmail: 'principal@nec.edu.in',
    contactPhone: '+91 4632 222502',
    adminName: 'Dr. K. Kalidasa Murugavel',
    adminDesignation: 'Principal',
    status: 'approved',
    submittedAt: '2026-10-15T09:00:00Z',
    reviewerNotes: 'Institutional domain verified with Anna University affiliation registry.',
  },
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'audit-001',
    timestamp: '2026-10-18T10:14:22Z',
    actor: 'coe@ksrce.ac.in (KSRCE COE)',
    action: 'PUBLISH_NOTICE',
    collegeId: 'ksrce-namakkal',
    collegeName: 'K.S.R. College of Engineering (Autonomous)',
    details: 'Published End Semester Theory Exam Schedule with 2 PDF attachments.',
  },
  {
    id: 'audit-002',
    timestamp: '2026-10-19T11:45:00Z',
    actor: 'cuic@annauniv.edu (Anna University)',
    action: 'PUBLISH_NOTICE',
    collegeId: 'ceg-anna-univ',
    collegeName: 'College of Engineering, Guindy (CEG), Anna University',
    details: 'Published Cisco Systems on-campus hiring drive notice.',
  },
  {
    id: 'audit-003',
    timestamp: '2026-10-19T16:30:10Z',
    actor: 'placement@ksrce.ac.in (KSRCE Placement)',
    action: 'PUBLISH_NOTICE',
    collegeId: 'ksrce-namakkal',
    collegeName: 'K.S.R. College of Engineering (Autonomous)',
    details: 'Published Zoho Corporation recruitment drive notification.',
  },
  {
    id: 'audit-004',
    timestamp: '2026-10-20T08:00:00Z',
    actor: 'admin@noticeguard.tn.gov.in (Platform Super Admin)',
    action: 'APPROVE_COLLEGE_REGISTRATION',
    collegeId: 'nec-kovilpatti',
    collegeName: 'National Engineering College',
    details: 'Approved institutional registration after verifying DOTE/Anna University affiliation.',
  },
];
