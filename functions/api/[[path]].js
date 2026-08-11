// ============================================================
//  Cloudflare Pages Function — مسارات /api/*
//  يعمل على الاستضافة الثابتة لـ Cloudflare Pages (بدون Express)
//  التخزين: Cloudflare KV (الربط RESPONSES) مع احتياطي بالذاكرة
// ============================================================

// 🔑 كلمة سر صفحة الأدمن — غيّرها من هنا (بدون حماية حقيقية)
const ADMIN_PASSWORD = 'wedding2026';
const KEY = 'responses';

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

function checkPassword(request) {
  const url = new URL(request.url);
  const given = url.searchParams.get('password') || request.headers.get('x-admin-password');
  return !!given && String(given) === ADMIN_PASSWORD;
}

// قراءة الردود من KV (أو الذاكرة إن لم يُربط KV)
async function readAll(env) {
  try {
    if (env.RESPONSES) {
      const v = await env.RESPONSES.get(KEY, 'json');
      if (Array.isArray(v)) return v;
    }
  } catch { /* ignore */ }
  return globalThis.__responses || [];
}

// حفظ الردود في KV + الذاكرة
async function writeAll(env, list) {
  try {
    if (env.RESPONSES) {
      await env.RESPONSES.put(KEY, JSON.stringify(list));
    }
  } catch { /* ignore */ }
  globalThis.__responses = list;
}

export async function onRequest(context) {
  const { request, env, params } = context;
  const method = request.method;
  const segments = Array.isArray(params.path) ? params.path : [];
  const path = segments.join('/');

  // ---------- POST /api/rsvp : حفظ رد مدعو ----------
  if (path === 'rsvp' && method === 'POST') {
    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: 'بيانات غير صالحة' }, 400);
    }
    const { name, guests, presence } = body || {};
    const cleanName = String(name || '').trim();
    const guestCount = Number(guests);
    const isPresence = String(presence) === 'yes';

    if (!cleanName || !Number.isInteger(guestCount) || guestCount < 0 || guestCount > 20) {
      return json({ error: 'بيانات غير صالحة' }, 400);
    }

    const entries = await readAll(env);
    const entry = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      name: cleanName,
      guests: guestCount,
      presence: isPresence,
      createdAt: new Date().toISOString(),
    };
    entries.push(entry);
    await writeAll(env, entries);

    return json({ ok: true, id: entry.id }, 201);
  }

  // ---------- GET /api/responses : جلب كل الردود (الأدمن) ----------
  if (path === 'responses' && method === 'GET') {
    if (!checkPassword(request)) return json({ error: 'كلمة السر غير صحيحة' }, 401);
    const list = await readAll(env);
    return json(list.reverse()); // الأحدث أولاً
  }

  // ---------- DELETE /api/responses : حذف كل الردود (الأدمن) ----------
  if (path === 'responses' && method === 'DELETE') {
    if (!checkPassword(request)) return json({ error: 'كلمة السر غير صحيحة' }, 401);
    await writeAll(env, []);
    return json({ ok: true });
  }

  // ---------- DELETE /api/responses/:id : حذف رد واحد (الأدمن) ----------
  const idMatch = path.match(/^responses\/(.+)$/);
  if (idMatch && method === 'DELETE') {
    if (!checkPassword(request)) return json({ error: 'كلمة السر غير صحيحة' }, 401);
    const id = decodeURIComponent(idMatch[1]);
    const list = (await readAll(env)).filter((r) => r.id !== id);
    await writeAll(env, list);
    return json({ ok: true });
  }

  return json({ error: 'Not Found' }, 404);
}