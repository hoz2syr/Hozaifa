// ============================================================
//  سكربت التطوير: يشغّل Vite (الواجهة) + server.js (الخادم) معاً
// ============================================================
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const viteBin = path.join(root, 'node_modules', 'vite', 'bin', 'vite.js');

const isWin = process.platform === 'win32';
const children = [];

function start(name, command, args, env) {
  console.log(`\n[dev] ↻ بدء تشغيل ${name} ...`);
  const child = spawn(command, args, {
    stdio: 'inherit',
    shell: isWin,
    env: env ? { ...process.env, ...env } : process.env,
  });
  children.push(child);
  return child;
}

// 1) الخادم الخلفي (Express) — يحتوي الـ API وصفحة /admin
//    يعمل على منفذ 3001 (يتلقى الطلبات من Vite عبر الـ proxy)
start('الخادم (server.js)', process.execPath, ['server.js'], { PORT: '3001' });

// 2) Vite dev server — يعمل على المنفذ 3000
if (fs.existsSync(viteBin)) {
  start('Vite', process.execPath, [viteBin, '--port=3000', '--host=0.0.0.0']);
} else {
  start('Vite', 'npx', ['vite', '--port=3000', '--host=0.0.0.0']);
}

function shutdown(signal) {
  console.log(`\n[dev] ${signal} — جارٍ الإيقاف...`);
  for (const child of children) {
    try { child.kill(); } catch { /* ignore */ }
  }
  process.exit(0);
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));