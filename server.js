// ============================================================
//  خادم دعوة عقد القران - بسيط بدون حماية حقيقية
//  - يحفظ ردود المدعويين في ملف data/responses.json
//  - صفحة الأدمن على الرابط /admin
// ============================================================
import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import 'dotenv/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ============================================================
// 🔑 كلمة سر صفحة الأدمن — غيّرها من هنا (بدون حماية حقيقية)
//    أو ضعها في متغير البيئة ADMIN_PASSWORD
// ============================================================
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'wedding2026';

const PORT = Number(process.env.PORT) || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'responses.json');
const DIST_DIR = path.join(__dirname, 'dist');
const ADMIN_FILE = path.join(__dirname, 'admin.html');

const app = express();
app.use(express.json({ limit: '200kb' }));

// ---------- قراءة وكتابة الردود ----------
function readResponses() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  } catch {
    return [];
  }
}

function writeResponses(list) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2), 'utf-8');
}

// ---------- التحقق من كلمة السر (بسيطة) ----------
function checkPassword(req, res, next) {
  const given = req.query.password || req.headers['x-admin-password'];
  if (given && String(given) === ADMIN_PASSWORD) return next();
  return res.status(401).json({ error: 'كلمة السر غير صحيحة' });
}

// ============================================================
//  حفظ رد مدعو  POST /api/rsvp
// ============================================================
app.post('/api/rsvp', (req, res) => {
  const { name, guests, presence } = req.body || {};
  const cleanName = String(name || '').trim();
  const guestCount = Number(guests);
  const isPresence = String(presence) === 'yes';

  if (!cleanName || !Number.isInteger(guestCount) || guestCount < 0 || guestCount > 20) {
    return res.status(400).json({ error: 'بيانات غير صالحة' });
  }

  const entries = readResponses();
  const entry = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    name: cleanName,
    guests: guestCount,
    presence: isPresence,
    createdAt: new Date().toISOString(),
  };
  entries.push(entry);
  writeResponses(entries);

  res.status(201).json({ ok: true, id: entry.id });
});

// ============================================================
//  صفحة الأدمن  GET /admin
// ============================================================
app.get(['/admin', '/admin/'], (req, res) => {
  if (fs.existsSync(ADMIN_FILE)) return res.sendFile(ADMIN_FILE);
  res.status(500).send('<h1 style="font-family:sans-serif;text-align:center;margin-top:80px">ملف admin.html مفقود</h1>');
});

// ============================================================
//  واجهات برمجية خاصة بالأدمن (خلف كلمة السر)
// ============================================================
//  جلب كل الردود
app.get('/api/responses', checkPassword, (req, res) => {
  res.json(readResponses().reverse()); // الأحدث أولاً
});

//  حذف رد واحد
app.delete('/api/responses/:id', checkPassword, (req, res) => {
  const list = readResponses().filter((r) => r.id !== req.params.id);
  writeResponses(list);
  res.json({ ok: true });
});

//  حذف كل الردود
app.delete('/api/responses', checkPassword, (req, res) => {
  writeResponses([]);
  res.json({ ok: true });
});

// ---------- تقديم البناء النهائي (dist) عند توفّره ----------
if (fs.existsSync(path.join(DIST_DIR, 'index.html'))) {
  app.use(express.static(DIST_DIR, { index: 'index.html', maxAge: '1d' }));
  // دعم المتصفح لصفحات SPA (عدا /api و /admin)
  app.get(/^\/(?!api(\/|$)|admin(\/|$)).*/, (req, res) =>
    res.sendFile(path.join(DIST_DIR, 'index.html'))
  );
}

// أي مسار /api غير معروف
app.use('/api', (req, res) => res.status(404).json({ error: 'Not Found' }));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n  ✅ الخادم يعمل على http://localhost:${PORT}`);
  console.log(`  🛡️  صفحة الأدمن:  http://localhost:${PORT}/admin\n`);
});