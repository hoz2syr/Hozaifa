<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/42434682-2695-44b3-92e6-5885a26cf599

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## 🛡️ صفحة الأدمن (ردود المدعويين)

بدأ تشغيل الخادم مع الواجهة سويًا:

- **وضع التطوير:** `npm run dev` ← الواجهة على `http://localhost:3000`
- **وضع الإنتاج:**
  1. `npm run build`
  2. `npm start` ← يخدم التطبيق وصفحة الأدمن على `http://localhost:3000`

### ادخل إلى صفحة الأدمن

- الرابط: `https://<رابط التطبيق>/admin`  (أو `http://localhost:3000/admin` محليًا)
- كلمة السر الافتراضية: **`wedding2026`**

> 🔑 غيّر كلمة السر من ملف **`server.js`** — في السطر:
> `const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'wedding2026';`
> (أو ضعها في متغير البيئة `ADMIN_PASSWORD`).

### ماذا تفعل صفحة الأدمن؟

- تعرض جدولًا بكل ردود المدعويين (الاسم، عدد المرافقين، تأكيد الحضور، التاريخ).
- إحصاءات: إجمالي الردود، من سيحضر، من اعتذر، عدد الضيوف المتوقع.
- زر تحديث، حذف رد واحد، وحذف كل الردود.

> ملاحظة: الردود تُحفظ في ملف **`data/responses.json`** محليًا. هذه حماية بسيطة **ليست آمنة** للبيانات الحساسة.

---

## ☁️ النشر على Cloudflare Pages

المشروع مهيأ للعمل على Cloudflare Pages (استضافة ثابتة) عبر **Cloudflare Pages Functions** — لا حاجة لخادم Express عند النشر.

### 1) الإعدادات الصحيحة في لوحة Cloudflare Pages

| الحقل | القيمة |
|-------|--------|
| Framework preset | **Vite** (أو None) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | (فارغ — جذر المستودع) |

> ❌ لا تستخدم `npx run build` ولا `/` كمسار الإخراج.

### 2) إنشاء ربط KV (التخزين الدائم للردود)

تخزين الردود يتم عبر **Cloudflare KV namespace**:

1. من لوحة Cloudflare: **Workers & Pages → KV → Create a namespace** (مثال اسمه `responses_kv`).
2. افتح مشروعك: **Settings → Functions → KV namespace bindings → Add binding**.
3. **Variable name**: `RESPONSES`
4. **KV namespace**: اختر `responses_kv`.

> ⚠️ بدون ربط KV سيعمل الموقع لكن الردود تُحفظ مؤقتًا في الذاكرة وتُفقد عند إعادة تشغيل الـ Worker.

### 3) رفع التعديلات إلى المستودع

تأكد من رفع الملفات الجديدة إلى GitHub:
- `functions/api/[[path]].js` ← واجهات `/api/*`
- `public/admin/index.html` ← صفحة الأدمن (تُخدم مباشرة على `/admin`)
- باقي ملفات المشروع

### 4) بعد النشر

- رابط الدعوة: `https://hozaifa.pages.dev`
- صفحة الأدمن: `https://hozaifa.pages.dev/admin`
- كلمة السر: **`wedding2026`** (غيّرها من السطر أعلى كل من: ملف `functions/api/[[path]].js` و `server.js`)

> كلمة السر مكتوبة في الكود = حماية بسيطة وليست أمانًا حقيقيًا.
