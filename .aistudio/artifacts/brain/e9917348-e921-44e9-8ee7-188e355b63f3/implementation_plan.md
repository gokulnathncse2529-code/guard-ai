# NoticeGuard AI – Tamil Nadu Unified College Notice Board

A centralized, responsive, multi-college public notices and circulars platform unifying institutions across Tamil Nadu districts into a single verified board. Enables students, parents, faculty, and recruiters to discover exam timetables, urgent bulletins, placement drives, technical symposiums, official holidays, and academic circulars with Gemini AI summarization and natural-language search.

### User Review & Critical Decisions

> [!IMPORTANT]
> **Key Architecture Decisions for Review:**
> - **Backend & Persistence**: Full-stack Express server (`server.ts`) combined with an authenticated persistent datastore (`server/data/store.json`) and server-side Gemini API proxy (`/api/ai/*`). This ensures instant persistence, scalable college onboarding, audit logs, and verified institutional records without external vendor lock-in or third-party blocking prompts.
> - **Initial College Coverage**: High-fidelity verified demonstration records for prominent institutions across Tamil Nadu:
>   - **Namakkal**: K.S.R. College of Engineering (Autonomous, Tiruchengode)
>   - **Chennai**: College of Engineering, Guindy (Anna University CEG) & Madras Christian College (MCC)
>   - **Coimbatore**: PSG College of Technology & Government College of Technology (GCT)
>   - **Madurai**: Thiagarajar College of Engineering (TCE)
>   - **Tiruchirappalli**: National Institute of Technology (NIT Trichy) / St. Joseph's College
> - **AI Integration**: Server-side Gemini 3.8 Flash (`gemini-3.8-flash`) endpoints providing:
>   1. Long notice circular summarization (key takeaways, deadlines, eligibility).
>   2. "Plain English / Student-Friendly" rephrase with key action items.
>   3. Natural-language notice discovery (e.g., "CSE symposium in Namakkal next month", "Semester exam timetables Anna University").
>   4. Duplicate notice check and automatic category classification for administrators before publishing.

---

### 1. Overview & Core Concept

- **What It Does**: NoticeGuard AI provides a single authoritative portal for Tamil Nadu colleges. Visitors can search colleges by district (Chennai, Coimbatore, Namakkal, Madurai, Salem, etc.) or type (Engineering, Arts & Science, Polytechnic, Medical, Management), open dedicated college notice boards, and read categorized announcements with official attachments. Authorized college administrators can log in to publish and maintain their notices with full audit trails, while a platform admin reviews pending registrations.
- **Target Audience & Personas**:
  - *Students & Parents*: Looking for upcoming exam schedules, semester results circulars, holiday announcements (Diwali, Pongal), and fee deadlines.
  - *Job Seekers & Final-Year Candidates*: Finding on-campus and inter-college placement drives, eligible CGPA requirements, and application links.
  - *Innovators & Event Participants*: Discovering inter-college symposiums, hackathons, and paper presentations across Tamil Nadu.
  - *College Administrators*: Authorized department heads and registrars needing a secure, tamper-proof notice broadcast engine.
  - *Platform Moderators*: Verifying genuine institutional emails (`.ac.in` / `.edu.in`) and managing directory records.
- **Key Value**: Replaces scattered WhatsApp forwards and fragmented college PDF archives with an indexed, searchable, AI-summarized official notice network.

---

### 2. User Experience & Visual Design

#### Visual Identity & Theme
- **Theme & Atmosphere**: Modern Academic Blue-and-White. Trustworthy, clean, and legible without generic AI tropes or garish gradient pills.
- **Color Palette (60-30-10 Rule)**:
  - *Canvas (60%)*: Crisp off-white `#F8FAFC` (Slate 50) and pure white `#FFFFFF` for content cards.
  - *Structural Surfaces (30%)*: Deep Navy `#0F172A` (Slate 900) for primary headings and top bar, muted borders `#E2E8F0` (Slate 200), and soft cool gray text `#64748B`.
  - *Intent Accents (10%)*: Official Tamil Nadu Academic Blue `#1D4ED8` (Blue 700) for primary actions and active states; Amber `#B45309` reserved for urgent bulletin markers; Emerald `#047857` for verified institution seals.
- **Typography & Scale**:
  - *Display / Brand*: `Plus Jakarta Sans` (weights 600, 700) with `text-wrap: balance` for titles and hero banners.
  - *Body / Reading*: `Public Sans` / System Sans for crystal-clear readability across dense circulars and tabular timetables.
  - *Data & Timetables*: Tabular numerals (`tabular-nums font-mono`) for dates, hall ticket numbers, exam slots, and batch years.
- **Anti-Slop Discipline**:
  - Zero static pill capsules. All notice metadata (category, date, author, attachments) rendered as clean unboxed text with typographic bullet separators (`·`).
  - No decorative pulsing dots or code comment headers (`// 01`).
  - Single-elevation card depth with clean 1px hairline borders (`border-slate-200`).

#### Top Bar Contract
Conforms to the 1-row, 3-zone standard:
```
[ NoticeGuard AI ]  ---  [ Directory | Notices | AI Assistant | College Portal ]  ---  [ Register College ]
```

#### Key User Flows & Views
1. **Public Homepage**:
   - Hero banner with quick district picker and live query search ("Search colleges, exams, symposiums...").
   - Quick Category Bar (Engineering, Arts & Science, Polytechnic, Medical, Management).
   - "Urgent Bulletins & State Announcements" spotlight strip.
   - Featured Tamil Nadu Colleges carousel/grid (K.S.R., CEG, PSG Tech, TCE, etc.).
   - Recently Published Notices stream with real-time filters (All, Examination, Urgent, Placement, Events/Symposium, Holidays, General).
2. **Tamil Nadu College Directory View**:
   - District filter (all 38 TN districts including Namakkal, Chennai, Coimbatore, Madurai, Tiruchirappalli, Salem, Erode, Tirunelveli).
   - College type filter & Affiliation filter (Anna University, Autonomous, Deemed, DOTE, Bharathiar, Madras University).
   - Institution cards clearly badged: *Verified Official Board*, *Demonstration Record*, or *Pending Verification*.
3. **Dedicated Individual College Notice Board**:
   - College header banner: Official name, district, address, autonomous/affiliation status, official website link, and verified institutional contact.
   - Notice Board Sections tabs (Examination, Urgent Bulletins, Placement & Careers, Events & Symposium, Holidays, General Notices).
   - Notice Detail Modal / Drawer with Gemini AI One-Click Explainer ("Simplify for Students"), official attachment viewer/downloader, and verified source link.
4. **AI-Powered Natural Search & Notice Summarizer**:
   - Interactive search modal answering natural language queries (e.g. "When is the Anna University 5th semester exam starting?").
   - Pre-publication AI checker for college administrators (checks for duplicate notices and suggests tags).
5. **College Administrator Portal**:
   - Institutional secure login with sample college admin switch for rapid demoing.
   - Notice composer: Title, Category, Urgency Level, Expiry Date, Target Departments, PDF Attachment URL/text, Markdown Body.
   - Notice management table with edit/archive/delete capabilities and audit history.
6. **Platform Administrator Dashboard**:
   - Review incoming college registration applications.
   - Approve, reject, or request additional proof from applicant institutions.
   - Directory import/export tool (JSON format) to scale college datasets.

---

### 3. Key Product Decisions & Trade-Offs

- **Server-Authoritative State & Express API Proxy**:
  - *Approach*: Built as a full-stack Node.js Express server + React client running on port 3000. All Gemini AI calls are proxied through `/api/ai/*` using `GEMINI_API_KEY` with zero client-side key leakage.
  - *Why*: Provides real persistence, prevents CORS blocks, satisfies AI Studio server-side security mandates, and enables immediate multi-user demonstration.
- **Seed Dataset Authenticity**:
  - *Approach*: Seed real, accurate public details for Tamil Nadu institutions (e.g. K.S.R. College of Engineering in Tiruchengode, Namakkal, Anna University CEG in Chennai, PSG Tech in Coimbatore) with realistic academic circulars, Anna University semester exam schedules, and inter-college symposiums (like Kurukshetra, Daksha, Festember).
  - *Why*: High domain fidelity builds immediate trust and showcases realistic academic workflows.
- **Verification Hierarchy**:
  - *Approach*: Explicitly display verification status on every college and notice card (*Verified Official Board*, *Demonstration Record*, *College Awaiting Verification*). Unregistered colleges do not have fake notices attributed to them.

---

### 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                          NoticeGuard AI Client                         │
│   (React 19 + Tailwind CSS + Lucide Icons + Motion)                   │
├─────────────────┬────────────────────┬────────────────┬────────────────┤
│  Homepage View  │ College Directory  │ Notice Board   │ Admin Portals  │
│  - Quick Search │ - 38 TN Districts  │ - 6 Categories │ - College Admin│
│  - Recent Feed  │ - Type Filters     │ - AI Summary   │ - Super Admin  │
│  - Urgent Strip │ - Profile Cards    │ - Attachments  │ - Verification │
└────────┬────────┴─────────┬──────────┴────────┬───────┴────────┬───────┘
         │                  │                   │                │
         ▼                  ▼                   ▼                ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        Express Full-Stack API                          │
│                          (server.ts :3000)                             │
├──────────────────────────────────────┬─────────────────────────────────┤
│         REST Endpoints               │          Gemini AI Proxy        │
│  GET/POST /api/colleges              │  POST /api/ai/summarize         │
│  GET/POST/PUT /api/notices           │  POST /api/ai/simplify          │
│  POST /api/colleges/register         │  POST /api/ai/search            │
│  POST /api/admin/verify              │  POST /api/ai/duplicate-check   │
└──────────────────┬───────────────────┴────────────────┬────────────────┘
                   │                                    │
                   ▼                                    ▼
       ┌───────────────────────┐            ┌───────────────────────┐
       │   Local File Store    │            │   @google/genai SDK   │
       │ (server/data/*.json)  │            │  (gemini-3.8-flash)   │
       │ Persistent Colleges,  │            │ Institutional Notice  │
       │ Notices, Audit Logs   │            │ NLP & Processing      │
       └───────────────────────┘            └───────────────────────┘
```

#### Core Data Entities
1. **College**: `id`, `name`, `shortName`, `code`, `district`, `type` (Engineering, Arts & Science, Polytechnic, Medical, Management), `affiliation` (Anna University, Autonomous, Deemed, etc.), `status` (`verified`, `demo`, `pending`), `logo`, `address`, `website`, `contactEmail`, `contactPhone`, `adminId`.
2. **Notice**: `id`, `collegeId`, `collegeName`, `district`, `title`, `summary`, `content`, `category` (`examination`, `urgent`, `placement`, `events_symposium`, `holidays`, `general`), `isUrgent`, `priority`, `publishedAt`, `expiresAt`, `authorDepartment`, `attachments` (`name`, `url`, `type`, `size`), `status` (`published`, `draft`, `archived`), `viewCount`.
3. **CollegeRegistrationRequest**: `id`, `collegeName`, `district`, `type`, `affiliation`, `website`, `institutionalEmail`, `adminName`, `adminRole`, `status` (`pending`, `approved`, `rejected`), `submittedAt`.
4. **AuditLog**: `id`, `timestamp`, `actorEmail`, `action`, `targetType`, `targetId`, `details`.

---

### Implementation Phases

1. **Phase 1: Project Setup & Full-Stack Backend Infrastructure**
   - Configure `server.ts` with Express, JSON body parser, and persistent storage engine in `server/data/store.json`.
   - Seed verified demonstration colleges (K.S.R. College of Engineering, CEG Anna University, PSG College of Technology, TCE Madurai, MCC Chennai) and rich notices across all 6 core categories.
   - Implement `@google/genai` server endpoints using `gemini-3.8-flash` for notice summarization, plain-English translation, and AI search.
2. **Phase 2: Core Directory & Notice Board Frontend**
   - Create Top Bar with unified navigation and search trigger.
   - Build Homepage with hero discovery, Tamil Nadu district dropdown selector, live notices feed, and urgent bulletin banner.
   - Build Tamil Nadu College Directory page with district, type, and affiliation filters.
   - Build Individual College Profile & Notice Board with 6 dedicated category tabs, search within college, and notice modal with PDF download links.
3. **Phase 3: AI Assistant & Smart Discovery Suite**
   - Integrate Gemini AI Notice Summarizer directly into notice cards and modals.
   - Add "Explain in Simple English" mode for complex circulars and university regulations.
   - Build Global Natural-Language AI Search drawer ("CSE symposiums in Namakkal", "Semester results Anna University").
4. **Phase 4: College Administration & Platform Moderator Portals**
   - Implement College Registration workflow for institutional applicants.
   - Build College Admin Portal: Notice authoring with instant AI duplicate detection and category suggestion, notice management, and audit logs.
   - Build Platform Admin Dashboard: Registration approval queue, directory import/export, and global notice oversight.
5. **Phase 5: Verification, Polish & Build Compilation**
   - Verify responsive design on mobile, tablet, and desktop (1440px wide).
   - Ensure WCAG AA contrast, unboxed metadata, and proper single-line controls.
   - Run `compile_applet` and test all interactive user flows end-to-end.
