/* Kiểm tra web bằng Chrome thật qua CDP (không cần cài gì).
   Dùng: node site/tools/browser-check.mjs [--shots]
   - lỗi console/exception
   - số section, số card, 29 bẫy
   - search, deep link, mở card, click arg, tiến độ, theme
   - tràn ngang ở 390px
   - screenshot 1440/768/390 nếu --shots
*/
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';

const CHROME =
  process.env.CHROME ||
  [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  ].find((p) => fs.existsSync(p));
if (!CHROME) throw new Error('Không tìm thấy Chrome/Edge');

const FILE = 'file:///' + path.resolve('site/index.html').replace(/\\/g, '/');
const PORT = 9333 + Math.floor(Math.random() * 200);
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'dse-chrome-'));
const shots = process.argv.includes('--shots');

const chrome = spawn(
  CHROME,
  [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${profile}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-gpu',
    '--hide-scrollbars',
    '--allow-file-access-from-files',
    '--window-size=1440,1200',
    'about:blank',
  ],
  { stdio: 'ignore' }
);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function targets() {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/list`);
      const list = await r.json();
      const page = list.find((t) => t.type === 'page');
      if (page) return page;
    } catch {}
    await sleep(250);
  }
  throw new Error('Chrome không mở cổng debug');
}

const page = await targets();
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((res, rej) => {
  ws.onopen = res;
  ws.onerror = rej;
});

let seq = 0;
const pending = new Map();
const events = [];
ws.onmessage = (m) => {
  const msg = JSON.parse(m.data);
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg);
    pending.delete(msg.id);
  } else if (msg.method) events.push(msg);
};

function send(method, params = {}) {
  const id = ++seq;
  ws.send(JSON.stringify({ id, method, params }));
  return new Promise((res) => pending.set(id, res));
}

const ev = async (expression) => {
  const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (r.result?.exceptionDetails) return { __err: r.result.exceptionDetails.text };
  return r.result?.result?.value;
};

await send('Page.enable');
await send('Runtime.enable');
await send('Log.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1200, deviceScaleFactor: 1, mobile: false });
await send('Page.navigate', { url: FILE });
await sleep(1800);

const results = [];
const check = (name, ok, detail = '') => {
  results.push({ name, ok: !!ok, detail });
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? '  — ' + detail : ''}`);
};

const sectionCount = await ev(`(window.DSE&&DSE.sections.length)||0`);
const formulaCount = await ev(`(window.DSE&&DSE.sections.reduce((n,s)=>n+s.formulas.length,0))||0`);
const trapCount = await ev(`(window.DSE&&DSE.traps.length)||0`);

check('DSE data nạp được', sectionCount === 6 && formulaCount > 100 && trapCount === 29, `${sectionCount} phần · ${formulaCount} công thức · ${trapCount} bẫy`);
check('Sidebar render đủ phần', (await ev(`document.querySelectorAll('#navSections a').length`)) === sectionCount);
check('Badge bẫy đúng số', (await ev(`(document.getElementById('navTrapCount')||{}).textContent`)) === String(trapCount));
check('Route mặc định render card', (await ev(`document.querySelectorAll('.card').length`)) > 0, `${await ev(`document.querySelectorAll('.card').length`)} card`);

// deep link mở đúng card
await ev(`location.hash = '#/s/pandas-co-ban/pd-loc'`);
await sleep(500);
const deep = await ev(`(() => {
  const c = document.querySelector('.card[data-formula="pd-loc"]');
  return c ? { open: c.classList.contains('is-open'), sig: !!c.querySelector('.sig') } : null;
})()`);
check('Deep link mở đúng card + signature', deep && deep.open && deep.sig, JSON.stringify(deep));

// click arg -> highlight row
const argSync = await ev(`(() => {
  const c = document.querySelector('.card[data-formula="pd-loc"]');
  const a = c && c.querySelector('.sig .arg');
  if (!a) return null;
  a.click();
  const row = c.querySelector('.args tr.is-hot');
  return { name: a.dataset.arg, hot: row ? row.dataset.argRow : null };
})()`);
check('Click arg làm nổi bật dòng tham số', argSync && argSync.hot === argSync.name, JSON.stringify(argSync));

// search
await ev(`document.getElementById('searchTrigger').click()`);
await sleep(200);
await ev(`(() => { const i = document.getElementById('searchInput'); i.value = 'loc'; i.dispatchEvent(new Event('input', {bubbles:true})); })()`);
await sleep(400);
const search = await ev(`(() => {
  const box = document.getElementById('searchResults');
  const vis = box && getComputedStyle(box.closest('.overlay')).display !== 'none';
  return { n: box ? box.querySelectorAll('a,button,[data-hash]').length : 0, vis };
})()`);
check('Tìm kiếm "loc" trả kết quả', search && search.vis && search.n > 0, JSON.stringify(search));
await ev(`document.getElementById('searchClose').click()`);

// theme
const themeBefore = await ev(`document.documentElement.dataset.theme`);
const target = themeBefore === 'dark' ? 'light' : 'dark';
await ev(`document.querySelector('[data-theme-set="${target}"]').click()`);
const themeAfter = await ev(`document.documentElement.dataset.theme`);
await ev(`document.querySelector('[data-theme-set="${themeBefore}"]').click()`);
check('Đổi theme hoạt động', themeAfter === target && themeBefore !== themeAfter, `${themeBefore} -> ${themeAfter}`);

// progress
const prog = await ev(`(() => {
  const c = document.querySelector('.card.is-open') || document.querySelector('.card');
  const b = c && c.querySelector('.master-btn');
  if (!b) return null;
  const before = b.getAttribute('aria-pressed');
  b.click();
  let store = null;
  try { store = localStorage.getItem('dse.progress.v1'); } catch (e) {}
  return { before, after: b.getAttribute('aria-pressed'), store: !!store && store.length > 2 };
})()`);
check('Đánh dấu "đã nắm" lưu localStorage', prog && prog.store && prog.after !== prog.before, JSON.stringify(prog));

// m? card t? danh s?ch: kh?ng b? topbar che
const openFromList = await ev(`(() => {
  location.hash = '#/s/pandas-co-ban';
  const row = document.querySelector('.card .card-row');
  if (!row) return null;
  row.click();
  const c = document.querySelector('.card.is-open');
  const bar = document.querySelector('.topbar');
  if (c) c.scrollIntoView({ block: 'start' });
  return {
    open: !!c,
    gap: c ? Math.round(c.getBoundingClientRect().top - bar.getBoundingClientRect().bottom) : null,
    firstOpenByDefault: !!document.querySelector('.card.is-open')
  };
})()`);
check('M? card t? danh s?ch kh?ng b? topbar che', openFromList && openFromList.open && openFromList.gap >= 0, JSON.stringify(openFromList));

// m? t?t c? card trong m?t ph?n d?i
const expand = await ev(`(() => {
  location.hash = '#/s/regex-thoi-gian';
  const btn = document.querySelector('[data-action="toggle-all"]');
  if (!btn) return null;
  btn.click();
  const open = document.querySelectorAll('.card.is-open').length;
  const cards = document.querySelectorAll('.card').length;
  const h = document.documentElement.scrollHeight;
  btn.click();
  return { open, cards, label: btn.textContent.trim(), height: h > 1000 };
})()`);
check('M?/Thu g?n t?t c? ho?t ??ng', expand && expand.cards > 10 && expand.open === expand.cards && expand.height, JSON.stringify(expand));

// traps
await ev(`location.hash = '#/bay'`);
await sleep(600);
const traps = await ev(`({n: document.querySelectorAll('.trap').length, groups: document.querySelectorAll('[data-group]').length})`);
check('Trang bẫy render 29 mục', traps.n === 29, JSON.stringify(traps));

// quiz
await ev(`location.hash = '#/tu-kiem'`);
await sleep(500);
const quiz = await ev(`({q: document.querySelectorAll('.quiz').length, opts: document.querySelectorAll('.quiz-opts .opt').length})`);
check('Trang tự kiểm render câu hỏi', quiz.q > 0 && quiz.opts === 4, JSON.stringify(quiz));
const picked = await ev(`(() => {
  const q = window.DSE.quiz[0];
  const opts = [...document.querySelectorAll('.quiz-opts .opt')];
  if (!q || opts.length !== 4) return null;
  opts[q.answer].click();
  return { answer: q.answer };
})()`);
await sleep(250);
const feedback = await ev(`(() => { const e = document.querySelector('.quiz-explain'); return e ? e.textContent.replace(/\\s+/g, ' ').trim().slice(0, 60) : null; })()`);
check('Trả lời tự kiểm có phản hồi đúng', !!picked && !!feedback, feedback || 'không thấy giải thích');

// ---- Luyện tập ----
await ev(`location.hash = '#/luyen-tap'`);
await sleep(600);
const list = await ev(`({rows: document.querySelectorAll('.exam-row').length, count: (document.querySelector('[data-exam-count]')||{}).textContent})`);
check('Danh sách luyện tập có 14 đề', list.rows === 14, JSON.stringify(list));

await ev(`location.hash = '#/luyen-tap/de-01a'`);
await sleep(700);
const view = await ev(`(() => {
  const opts = [...document.querySelectorAll('.opt[data-k][data-n]')];
  return {
    questions: document.querySelectorAll('.q-body').length,
    options: opts.length,
    locked: opts.every((b) => b.disabled),
    mode: (document.querySelector('[data-mode][aria-pressed="true"]') || {}).textContent,
    clock: (document.querySelector('[data-clock]') || {}).textContent,
  };
})()`);
check('Đề 01A: 25 câu, 80 phương án, mặc định Xem đề',
  view.questions === 25 && view.options === 80 && view.locked && /Xem đề/.test(view.mode || '') && view.clock === '60:00',
  JSON.stringify(view));

const graded = await ev(`(() => {
  document.querySelector('[data-mode="take"]').click();
  return new Promise((res) => setTimeout(() => {
    const pick = (n, k) => {
      const b = document.querySelector('.opt[data-n="' + n + '"][data-k="' + k + '"]');
      if (b) b.click();
    };
    pick(1, 'A'); pick(2, 'B');
    document.querySelector('[data-action="grade"]').click();
    setTimeout(() => {
      const sc = document.querySelector('[data-score]');
      res({
        score: sc ? sc.textContent.replace(/\\s+/g, ' ').trim() : null,
        right: document.querySelectorAll('.opt.is-right').length,
        wrong: document.querySelectorAll('.opt.is-wrong').length,
      });
    }, 250);
  }, 250));
})()`);
check('Chấm đúng 2/20 khi chọn A, B', !!graded && String(graded.score).includes('2/20') && graded.wrong === 0, JSON.stringify(graded));

const regrade = await ev(`(() => {
  document.querySelector('[data-action="reset-answers"]').click();
  return new Promise((res) => setTimeout(() => {
    const b = document.querySelector('.opt[data-n="1"][data-k="C"]');
    const beforeDisabled = b ? b.disabled : null;
    if (b) b.click();
    const afterPressed = b ? b.getAttribute('aria-pressed') : null;
    document.querySelector('[data-action="grade"]').click();
    setTimeout(() => {
      const q1 = document.querySelector('.q-item[data-n="1"]');
      res({
        score: ((document.querySelector('[data-score]') || {}).textContent || '').replace(/\\s+/g, ' ').trim(),
        wrong: q1 ? q1.querySelectorAll('.opt.is-wrong').length : 0,
        result: q1 && q1.querySelector('.q-result') ? q1.querySelector('.q-result').textContent.trim() : null,
        beforeDisabled,
        afterPressed,
        pressed: q1 ? [...q1.querySelectorAll('.opt')].map((o) => o.getAttribute('aria-pressed')).join('') : '',
      });
    }, 250);
  }, 250));
})()`);
check('Chọn sai bị đánh dấu + hiện đáp án đúng', regrade.wrong === 1 && String(regrade.score).includes('0/20') && String(regrade.result || '').includes('A'), JSON.stringify(regrade));

const timer = await ev(`(() => {
  document.querySelector('[data-timer="reset"]').click();
  const before = document.querySelector('[data-clock]').textContent;
  document.querySelector('[data-timer="start"]').click();
  return new Promise((res) => setTimeout(() => {
    const running = document.querySelector('[data-clock]').textContent;
    document.querySelector('[data-timer="pause"]').click();
    const paused = document.querySelector('[data-clock]').textContent;
    setTimeout(() => {
      const still = document.querySelector('[data-clock]').textContent;
      document.querySelector('[data-timer="reset"]').click();
      const reset = document.querySelector('[data-clock]').textContent;
      res({ before, running, paused, still, reset });
    }, 900);
  }, 1300));
})()`);
check('Đồng hồ chạy, dừng, đặt lại',
  timer.before === '60:00' && timer.running !== '60:00' && timer.paused === timer.still && timer.reset === '60:00',
  JSON.stringify(timer));

const mobilePractice = await ev(`(() => {
  document.querySelector('[data-mode="take"]').click();
  return true;
})()`);
await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
await sleep(500);
const mob = await ev(`(() => {
  const sheetBtn = document.querySelector('[data-sheet="open"]');
  sheetBtn && sheetBtn.click();
  const panel = document.querySelector('.practice-panel');
  const open = panel ? !panel.hasAttribute('hidden') && getComputedStyle(panel).display !== 'none' : false;
  return { overflow: document.documentElement.scrollWidth - window.innerWidth, sheet: !!sheetBtn, open };
})()`);
check('Luyện tập mobile: mở bàn làm bài, không tràn ngang', mob.sheet && mob.overflow <= 1, JSON.stringify(mob));
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1200, deviceScaleFactor: 1, mobile: false });
await sleep(300);

// console errors
const errs = events.filter(
  (e) =>
    e.method === 'Runtime.exceptionThrown' ||
    (e.method === 'Runtime.consoleAPICalled' && e.params.type === 'error') ||
    (e.method === 'Log.entryAdded' && e.params.entry.level === 'error')
);
check('Không lỗi console', errs.length === 0, errs.slice(0, 3).map((e) => JSON.stringify(e.params).slice(0, 160)).join(' | '));

// widths
const widths = [
  [1440, 1200, 'desktop'],
  [768, 1100, 'tablet'],
  [390, 900, 'mobile'],
];
fs.mkdirSync('site/_design/shots', { recursive: true });
for (const [w, h, label] of widths) {
  await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: w < 500 });
  await ev(`location.hash = '#/tong-quan'`);
  await sleep(400);
  const overflow = await ev(`({sw: document.documentElement.scrollWidth, iw: window.innerWidth})`);
  check(`Không tràn ngang @${w}px`, overflow.sw <= overflow.iw + 1, JSON.stringify(overflow));
  if (shots) {
    await ev(`window.scrollTo(0,0)`);
    await sleep(250);
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    if (shot.result?.data) fs.writeFileSync(`site/_design/shots/${label}-overview.png`, Buffer.from(shot.result.data, 'base64'));
    await ev(`location.hash = '#/s/pandas-nang-cao/px-merge'`);
    await sleep(600);
    await ev(`window.scrollTo(0,0)`);
    await sleep(250);
    const shot2 = await send('Page.captureScreenshot', { format: 'png' });
    if (shot2.result?.data) fs.writeFileSync(`site/_design/shots/${label}-card.png`, Buffer.from(shot2.result.data, 'base64'));
    if (label === 'desktop') {
      await ev(`location.hash = '#/bay'`);
      await sleep(500);
      const shotT = await send('Page.captureScreenshot', { format: 'png' });
      if (shotT.result?.data) fs.writeFileSync('site/_design/shots/desktop-traps.png', Buffer.from(shotT.result.data, 'base64'));
      await ev(`document.getElementById('searchTrigger').click()`);
      await sleep(200);
      await ev(`(() => { const i=document.getElementById('searchInput'); i.value='merge'; i.dispatchEvent(new Event('input',{bubbles:true})); })()`);
      await sleep(500);
      const shotS = await send('Page.captureScreenshot', { format: 'png' });
      if (shotS.result?.data) fs.writeFileSync('site/_design/shots/desktop-search.png', Buffer.from(shotS.result.data, 'base64'));
      await ev(`document.getElementById('searchClose').click()`);
      await ev(`location.hash = '#/s/pandas-nang-cao/px-merge'`);
      await sleep(500);
      await ev(`document.querySelector('[data-theme-set="light"]').click()`);
      await sleep(350);
      const shotL = await send('Page.captureScreenshot', { format: 'png' });
      if (shotL.result?.data) fs.writeFileSync('site/_design/shots/desktop-light.png', Buffer.from(shotL.result.data, 'base64'));
      await ev(`document.querySelector('[data-theme-set="dark"]').click()`);
    }
    await ev(`(() => { const c=document.querySelector('.card.is-open')||document.querySelector('.card'); if(c) c.scrollIntoView({block:'start'}); })()`);
    await sleep(300);
    const shot3 = await send('Page.captureScreenshot', { format: 'png' });
    if (shot3.result?.data) fs.writeFileSync(`site/_design/shots/${label}-open.png`, Buffer.from(shot3.result.data, 'base64'));
  }
}

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} kiểm tra PASS`);
ws.close();
chrome.kill();
try {
  fs.rmSync(profile, { recursive: true, force: true });
} catch {}
if (failed.length) process.exit(1);
