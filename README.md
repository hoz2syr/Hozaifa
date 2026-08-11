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
