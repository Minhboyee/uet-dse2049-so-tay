/* Đo xem tên phần trong sidebar còn bị cắt ellipsis không (dùng 1 lần khi chỉnh sidebar). */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';

const CHROME = ['C:/Program Files/Google/Chrome/Application/chrome.exe'].find((p) => fs.existsSync(p));
const FILE = 'file:///' + path.resolve('site/index.html').replace(/\\/g, '/');
const PORT = 9800 + Math.floor(Math.random() * 100);
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'dse-nav-'));
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`, '--no-first-run', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files', 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let page = null;
for (let i = 0; i < 60 && !page; i++) {
  try {
    const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
    page = list.find((t) => t.type === 'page');
  } catch {}
  await sleep(250);
}
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = () => rej(new Error('ws')); });
let seq = 0;
const pend = new Map();
ws.onmessage = (m) => { const j = JSON.parse(m.data); if (j.id && pend.has(j.id)) { pend.get(j.id)(j); pend.delete(j.id); } };
const send = (method, params = {}) => { const id = ++seq; ws.send(JSON.stringify({ id, method, params })); return new Promise((r) => pend.set(id, r)); };
const ev = async (e) => { const r = await send('Runtime.evaluate', { expression: e, returnByValue: true }); return r.result?.result?.value; };

await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
await send('Page.navigate', { url: FILE + '#/s/du-lieu-sql' });
await sleep(2000);

const out = await ev(`(() => {
  const sb = document.querySelector('.sidebar');
  const rows = [...document.querySelectorAll('.nav-sec-name')].map((el) => ({
    text: el.textContent,
    w: Math.round(el.getBoundingClientRect().width),
    scroll: el.scrollWidth,
    cut: el.scrollWidth > Math.ceil(el.getBoundingClientRect().width) + 1
  }));
  const main = [...document.querySelectorAll('.nav-item .nav-lead span:last-child')].map((el) => ({
    text: el.textContent, cut: el.scrollWidth > Math.ceil(el.getBoundingClientRect().width) + 1
  }));
  const search = document.querySelector('.search-label');
  const searchInfo = search
    ? { text: search.textContent, cut: search.scrollWidth > Math.ceil(search.getBoundingClientRect().width) + 1, w: Math.round(search.getBoundingClientRect().width) }
    : null;
  return { sidebarW: sb ? Math.round(sb.getBoundingClientRect().width) : 0, docSW: document.documentElement.scrollWidth, rows, main, search: searchInfo };
})()`);
console.log('sidebar:', out.sidebarW, 'px · doc scrollWidth:', out.docSW);
console.log('ô tìm kiếm:', JSON.stringify(out.search), out.search && out.search.cut ? '← CẮT' : '(đủ chữ)');
console.log('mục chính:', JSON.stringify(out.main));
let bad = 0;
for (const r of out.rows) { if (r.cut) bad++; console.log(`  ${r.cut ? 'CẮT ' : 'đủ '} ${String(r.w).padStart(3)}(cần ${String(r.scroll).padStart(3)})  ${r.text}`); }
if (out.search && out.search.cut) bad++;
console.log(bad ? `\n${bad} chỗ vẫn bị cắt` : '\nKhông chỗ nào bị cắt');
ws.close();
chrome.kill();
try { fs.rmSync(profile, { recursive: true, force: true }); } catch {}
process.exit(bad ? 1 : 0);
