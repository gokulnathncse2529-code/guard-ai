import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import {
  INITIAL_COLLEGES,
  INITIAL_NOTICES,
  INITIAL_REGISTRATION_REQUESTS,
  INITIAL_AUDIT_LOGS,
} from './src/data/initialData';
import {
  College,
  Notice,
  CollegeRegistrationRequest,
  AuditLog,
} from './src/types/noticeguard';

dotenv.config();

const app = express();
const PORT = 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '10mb' }));

// Persistence file location
const DATA_DIR = path.resolve(process.cwd(), 'server', 'data');
const DATA_FILE = path.join(DATA_DIR, 'store.json');

interface StoreData {
  colleges: College[];
  notices: Notice[];
  registrationRequests: CollegeRegistrationRequest[];
  auditLogs: AuditLog[];
}

// In-memory data store with disk synchronization
let store: StoreData = {
  colleges: [...INITIAL_COLLEGES],
  notices: [...INITIAL_NOTICES],
  registrationRequests: [...INITIAL_REGISTRATION_REQUESTS],
  auditLogs: [...INITIAL_AUDIT_LOGS],
};

function initStore() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      if (parsed.colleges && parsed.notices) {
        store = parsed;
        console.log(`Loaded store from ${DATA_FILE}`);
        return;
      }
    }
    // If not exists, save default store
    saveStore();
  } catch (err) {
    console.error('Error initializing store:', err);
  }
}

function saveStore() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving store to disk:', err);
  }
}

initStore();

// Initialize Gemini Client
const geminiApiKey = process.env.GEMINI_API_KEY || '';
let aiClient: GoogleGenAI | null = null;
if (geminiApiKey) {
  aiClient = new GoogleGenAI({ apiKey: geminiApiKey });
}

// Helper to create audit logs
function logAudit(actor: string, action: string, details: string, collegeId?: string, collegeName?: string) {
  const log: AuditLog = {
    id: `audit-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    timestamp: new Date().toISOString(),
    actor,
    action,
    collegeId,
    collegeName,
    details,
  };
  store.auditLogs.unshift(log);
  if (store.auditLogs.length > 200) {
    store.auditLogs.pop();
  }
  saveStore();
}

// ======================== API ROUTES ======================== //

// Colleges
app.get('/api/colleges', (req: Request, res: Response) => {
  const { district, type, status, search } = req.query;
  let results = [...store.colleges];

  if (district && typeof district === 'string' && district !== 'All') {
    results = results.filter((c) => c.district.toLowerCase() === district.toLowerCase());
  }

  if (type && typeof type === 'string' && type !== 'All') {
    results = results.filter((c) => c.type.toLowerCase() === type.toLowerCase());
  }

  if (status && typeof status === 'string' && status !== 'All') {
    results = results.filter((c) => c.status === status);
  }

  if (search && typeof search === 'string' && search.trim()) {
    const q = search.toLowerCase();
    results = results.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.shortName.toLowerCase().includes(q) ||
        c.code.includes(q) ||
        c.district.toLowerCase().includes(q) ||
        c.affiliation.toLowerCase().includes(q)
    );
  }

  // Update noticeCount dynamically
  results = results.map((col) => {
    const count = store.notices.filter((n) => n.collegeId === col.id).length;
    return { ...col, noticeCount: count };
  });

  res.json({ success: true, colleges: results });
});

app.get('/api/colleges/:id', (req: Request, res: Response) => {
  const col = store.colleges.find((c) => c.id === req.params.id);
  if (!col) {
    return res.status(404).json({ success: false, error: 'College not found' });
  }
  const count = store.notices.filter((n) => n.collegeId === col.id).length;
  res.json({ success: true, college: { ...col, noticeCount: count } });
});

app.post('/api/colleges/register', (req: Request, res: Response) => {
  const {
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
  } = req.body;

  if (!collegeName || !district || !institutionalEmail || !adminName) {
    return res.status(400).json({ success: false, error: 'Missing required registration fields' });
  }

  const newRequest: CollegeRegistrationRequest = {
    id: `req-${Date.now()}`,
    collegeName,
    collegeType: collegeType || 'Engineering',
    district,
    address: address || '',
    affiliation: affiliation || 'Anna University',
    officialWebsite: officialWebsite || '',
    institutionalEmail,
    contactPhone: contactPhone || '',
    adminName,
    adminDesignation: adminDesignation || 'Authorized Administrator',
    verificationProofUrl: verificationProofUrl || '',
    status: 'pending',
    submittedAt: new Date().toISOString(),
  };

  store.registrationRequests.unshift(newRequest);
  logAudit(
    adminName,
    'SUBMIT_REGISTRATION',
    `New college registration submitted for ${collegeName} (${district})`
  );
  saveStore();

  res.json({ success: true, request: newRequest });
});

// Notices
app.get('/api/notices', (req: Request, res: Response) => {
  const { collegeId, category, district, search, urgent } = req.query;
  let results = [...store.notices];

  if (collegeId && typeof collegeId === 'string' && collegeId !== 'All') {
    results = results.filter((n) => n.collegeId === collegeId);
  }

  if (category && typeof category === 'string' && category !== 'All') {
    results = results.filter((n) => n.category === category);
  }

  if (district && typeof district === 'string' && district !== 'All') {
    results = results.filter((n) => n.district.toLowerCase() === district.toLowerCase());
  }

  if (urgent === 'true') {
    results = results.filter((n) => n.isUrgent);
  }

  if (search && typeof search === 'string' && search.trim()) {
    const q = search.toLowerCase();
    results = results.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.summary.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q) ||
        n.collegeName.toLowerCase().includes(q) ||
        n.department.toLowerCase().includes(q)
    );
  }

  // Sort: High priority & Urgent first, then by published date descending
  results.sort((a, b) => {
    if (a.isUrgent && !b.isUrgent) return -1;
    if (!a.isUrgent && b.isUrgent) return 1;
    return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
  });

  res.json({ success: true, count: results.length, notices: results });
});

app.get('/api/notices/:id', (req: Request, res: Response) => {
  const notice = store.notices.find((n) => n.id === req.params.id);
  if (!notice) {
    return res.status(404).json({ success: false, error: 'Notice not found' });
  }
  notice.viewCount = (notice.viewCount || 0) + 1;
  saveStore();
  res.json({ success: true, notice });
});

app.post('/api/notices', (req: Request, res: Response) => {
  const {
    collegeId,
    title,
    summary,
    content,
    category,
    isUrgent,
    priority,
    validTill,
    department,
    targetAudience,
    attachments,
    officialSource,
    authorEmail,
  } = req.body;

  const college = store.colleges.find((c) => c.id === collegeId);
  if (!college) {
    return res.status(400).json({ success: false, error: 'Valid collegeId is required' });
  }

  if (!title || !content || !category) {
    return res.status(400).json({ success: false, error: 'Title, content, and category are required' });
  }

  const newNotice: Notice = {
    id: `not-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    collegeId,
    collegeName: college.name,
    district: college.district,
    title,
    summary: summary || title,
    content,
    category,
    isUrgent: Boolean(isUrgent),
    priority: priority || (isUrgent ? 'high' : 'normal'),
    publishedDate: new Date().toISOString().split('T')[0],
    validTill: validTill || undefined,
    department: department || 'Principal Office',
    targetAudience: targetAudience || 'All Students & Faculty',
    attachments: Array.isArray(attachments) ? attachments : [],
    officialSource: officialSource || `${college.shortName} Official Notice Board`,
    status: 'published',
    viewCount: 1,
  };

  store.notices.unshift(newNotice);
  logAudit(
    authorEmail || 'college_admin@' + college.website.replace('https://', ''),
    'CREATE_NOTICE',
    `Published notice: "${title}" under [${category}]`,
    college.id,
    college.name
  );
  saveStore();

  res.json({ success: true, notice: newNotice });
});

app.put('/api/notices/:id', (req: Request, res: Response) => {
  const index = store.notices.findIndex((n) => n.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, error: 'Notice not found' });
  }

  const existing = store.notices[index];
  const updated: Notice = {
    ...existing,
    ...req.body,
    id: existing.id,
    collegeId: existing.collegeId,
    collegeName: existing.collegeName,
    district: existing.district,
  };

  store.notices[index] = updated;
  logAudit(
    req.body.authorEmail || 'college_admin',
    'UPDATE_NOTICE',
    `Updated notice: "${updated.title}"`,
    updated.collegeId,
    updated.collegeName
  );
  saveStore();

  res.json({ success: true, notice: updated });
});

app.delete('/api/notices/:id', (req: Request, res: Response) => {
  const index = store.notices.findIndex((n) => n.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, error: 'Notice not found' });
  }

  const deleted = store.notices.splice(index, 1)[0];
  logAudit(
    (req.query.actor as string) || 'college_admin',
    'DELETE_NOTICE',
    `Deleted notice: "${deleted.title}"`,
    deleted.collegeId,
    deleted.collegeName
  );
  saveStore();

  res.json({ success: true, message: 'Notice deleted successfully' });
});

// Admin verification requests
app.get('/api/admin/requests', (req: Request, res: Response) => {
  res.json({ success: true, requests: store.registrationRequests });
});

app.post('/api/admin/requests/:id/action', (req: Request, res: Response) => {
  const { action, reviewerNotes, actorEmail } = req.body;
  const request = store.registrationRequests.find((r) => r.id === req.params.id);

  if (!request) {
    return res.status(404).json({ success: false, error: 'Request not found' });
  }

  if (action === 'approve') {
    request.status = 'approved';
    request.reviewerNotes = reviewerNotes || 'Verified institutional credentials';

    // Add college to directory
    const newCollegeId = `col-${Date.now()}`;
    const newCollege: College = {
      id: newCollegeId,
      name: request.collegeName,
      shortName: request.collegeName.split(' ')[0],
      code: `${Math.floor(1000 + Math.random() * 9000)}`,
      district: request.district,
      address: request.address,
      type: request.collegeType,
      category: 'Private Affiliated',
      affiliation: request.affiliation,
      website: request.officialWebsite,
      contactEmail: request.institutionalEmail,
      contactPhone: request.contactPhone,
      establishedYear: 2010,
      status: 'verified',
      image: '/src/assets/images/ksr_college_campus_1792599213443.jpg',
      noticeCount: 0,
      accreditation: 'Approved by State Higher Education Department',
    };

    store.colleges.unshift(newCollege);
    logAudit(
      actorEmail || 'platform_admin@noticeguard.tn.gov.in',
      'APPROVE_COLLEGE',
      `Approved institutional registration for ${request.collegeName} (${request.district})`,
      newCollege.id,
      newCollege.name
    );
  } else if (action === 'reject') {
    request.status = 'rejected';
    request.reviewerNotes = reviewerNotes || 'Rejected during administrative review';
    logAudit(
      actorEmail || 'platform_admin@noticeguard.tn.gov.in',
      'REJECT_COLLEGE',
      `Rejected registration for ${request.collegeName}: ${reviewerNotes}`
    );
  } else {
    return res.status(400).json({ success: false, error: 'Invalid action. Must be approve or reject' });
  }

  saveStore();
  res.json({ success: true, request });
});

app.get('/api/admin/audit-logs', (req: Request, res: Response) => {
  res.json({ success: true, logs: store.auditLogs });
});

// ======================== AI FEATURES (GEMINI) ======================== //

// 1. Summarize Notice
app.post('/api/ai/summarize', async (req: Request, res: Response) => {
  const { title, content } = req.body;
  if (!content) {
    return res.status(400).json({ success: false, error: 'Notice content is required' });
  }

  if (!aiClient) {
    // Graceful fallback if no key
    const lines = content.split('\n').filter((l: string) => l.trim().length > 10).slice(0, 3);
    return res.json({
      success: true,
      summary: lines.join(' ') || 'Official announcement issued by the college administration.',
    });
  }

  try {
    const prompt = `You are NoticeGuard AI, an official Tamil Nadu higher education assistant.
Summarize the following official college circular into a concise, accurate 2-sentence summary highlighting key dates, eligibility, and action items for students. Do NOT invent any facts.

Title: ${title || 'Official Circular'}
Content:
${content}`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    res.json({ success: true, summary: response.text?.trim() });
  } catch (error: any) {
    console.error('Gemini summarize error:', error);
    res.status(500).json({ success: false, error: error.message || 'Failed to generate AI summary' });
  }
});

// 2. Simplify into student-friendly plain English
app.post('/api/ai/simplify', async (req: Request, res: Response) => {
  const { title, content } = req.body;
  if (!content) {
    return res.status(400).json({ success: false, error: 'Notice content is required' });
  }

  if (!aiClient) {
    return res.json({
      success: true,
      simplified: `Key takeaways for students: Check official timetable or requirements. Verify dates and deadlines with your department advisor.`,
    });
  }

  try {
    const prompt = `You are NoticeGuard AI. College circulars often contain bureaucratic jargon that students find hard to decipher.
Convert the following circular into 3 clear, student-friendly bullet points with simple everyday English:
1. What is this about?
2. Who does it affect?
3. What should students do before what deadline?

Title: ${title}
Content:
${content}`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    res.json({ success: true, simplified: response.text?.trim() });
  } catch (error: any) {
    console.error('Gemini simplify error:', error);
    res.status(500).json({ success: false, error: error.message || 'Failed to simplify notice' });
  }
});

// 3. Category & Urgency Suggestion for Notice Authors
app.post('/api/ai/suggest-category', async (req: Request, res: Response) => {
  const { title, content } = req.body;
  if (!title && !content) {
    return res.status(400).json({ success: false, error: 'Title or content required' });
  }

  if (!aiClient) {
    return res.json({
      success: true,
      suggestedCategory: 'general',
      isUrgent: false,
      reasoning: 'Default category assignment.',
    });
  }

  try {
    const prompt = `Analyze this college announcement draft.
Allowed Categories:
- examination (Timetables, internal schedules, circulars, results)
- urgent (Immediate advisories, deadlines, state closures)
- placement (Recruitment, drives, interviews, internships)
- events_symposium (Technical symposium, fests, hackathons, workshops)
- holidays (Festival vacations, Pongal, Diwali, government holidays)
- general (Administrative circulars, scholarships, library notices)

Return a JSON object with:
{
  "suggestedCategory": "<one of the 6 allowed keys above>",
  "isUrgent": <true or false>,
  "priority": "<high | medium | normal>",
  "reasoning": "<1 brief sentence explanation>"
}

Draft Title: ${title}
Draft Content: ${content}

Reply ONLY with the JSON object.`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    let cleaned = response.text?.trim() || '{}';
    if (cleaned.startsWith('```json')) {
      cleaned = cleaned.replace(/^```json/, '').replace(/```$/, '').trim();
    } else if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```/, '').replace(/```$/, '').trim();
    }
    const result = JSON.parse(cleaned);
    res.json({ success: true, ...result });
  } catch (error: any) {
    console.error('Gemini suggest-category error:', error);
    res.json({
      success: true,
      suggestedCategory: 'general',
      isUrgent: false,
      priority: 'normal',
      reasoning: 'Automated fallback',
    });
  }
});

// 4. Duplicate Check
app.post('/api/ai/check-duplicates', async (req: Request, res: Response) => {
  const { collegeId, title, content } = req.body;
  const existingNotices = store.notices
    .filter((n) => n.collegeId === collegeId)
    .slice(0, 8)
    .map((n) => ({ id: n.id, title: n.title, date: n.publishedDate }));

  if (existingNotices.length === 0 || !aiClient) {
    return res.json({ success: true, isDuplicate: false, duplicates: [] });
  }

  try {
    const prompt = `You are a moderation AI for a college notice board.
Check if the new notice draft is a duplicate or contradictory update of any recently published notices from the same institution.

Existing Recent Notices:
${JSON.stringify(existingNotices, null, 2)}

New Draft Notice:
Title: ${title}
Content: ${content}

Return JSON:
{
  "isDuplicate": <true if identical or almost identical subject and date, false otherwise>,
  "confidence": <percentage 0 to 100>,
  "matchingNoticeId": "<id of matching notice if any, or null>",
  "notes": "<short explanation>"
}
Reply ONLY with the JSON object.`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    let cleaned = response.text?.trim() || '{}';
    if (cleaned.startsWith('```json')) {
      cleaned = cleaned.replace(/^```json/, '').replace(/```$/, '').trim();
    }
    const result = JSON.parse(cleaned);
    res.json({ success: true, ...result });
  } catch (error: any) {
    console.error('Gemini duplicate-check error:', error);
    res.json({ success: true, isDuplicate: false, duplicates: [] });
  }
});

// 5. Natural Language Discovery & Search
app.post('/api/ai/natural-search', async (req: Request, res: Response) => {
  const { query } = req.body;
  if (!query || typeof query !== 'string') {
    return res.status(400).json({ success: false, error: 'Query is required' });
  }

  // Pre-filter candidate notices
  const candidates = store.notices.slice(0, 15).map((n) => ({
    id: n.id,
    college: n.collegeName,
    district: n.district,
    category: n.category,
    title: n.title,
    date: n.publishedDate,
    summary: n.summary,
  }));

  if (!aiClient) {
    // Keyword fallback
    const q = query.toLowerCase();
    const matched = store.notices.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.collegeName.toLowerCase().includes(q) ||
        n.district.toLowerCase().includes(q) ||
        n.category.toLowerCase().includes(q)
    );
    return res.json({
      success: true,
      answer: `Found ${matched.length} notices matching your keyword search.`,
      matchedNoticeIds: matched.map((m) => m.id),
    });
  }

  try {
    const prompt = `You are NoticeGuard AI Search Assistant for Tamil Nadu Colleges.
A student is asking: "${query}".

Analyze these currently published official notices:
${JSON.stringify(candidates, null, 2)}

Provide:
1. A direct, friendly 2-3 sentence answer addressing the student's question based on the official notices.
2. An array of matching notice IDs from the provided list that are directly relevant.

Return JSON:
{
  "answer": "<direct helpful response>",
  "matchedNoticeIds": ["<id1>", "<id2>"]
}
Reply ONLY with the JSON object.`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    let cleaned = response.text?.trim() || '{}';
    if (cleaned.startsWith('```json')) {
      cleaned = cleaned.replace(/^```json/, '').replace(/```$/, '').trim();
    }
    const result = JSON.parse(cleaned);
    res.json({ success: true, ...result });
  } catch (error: any) {
    console.error('Gemini natural-search error:', error);
    res.json({
      success: true,
      answer: 'Showing search results matching your search terms.',
      matchedNoticeIds: store.notices
        .filter((n) => n.title.toLowerCase().includes(query.toLowerCase()))
        .map((n) => n.id),
    });
  }
});

// ======================== VITE MIDDLEWARE / STATIC ======================== //

async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite development middleware mounted');
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log(`Serving static production build from ${distPath}`);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`NoticeGuard AI server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal server startup error:', err);
});
