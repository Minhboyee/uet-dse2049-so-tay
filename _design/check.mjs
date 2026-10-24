/* Kiểm bằng Chrome CDP: chủ đề SÁNG (Chrome headless mặc định tối nên phải ép),
   bàn phím tìm kiếm, giữ trạng thái sau khi tải lại, và tràn ngang ở 360px.
   Chạy: node site/_design/check.mjs        (ảnh -> site/_design/shots/)
*/
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';

const CHROME = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
].find((p) => fs.existsSync(p));
if (!CHROME) throw new Error('Không tìm thấy Chrome/Edge');

const FILE = 'file:///' + path.resolve('site/index.html').replace(/\\/g, '/');
const PORT = 9700 + Math.floor(Math.random() * 200);
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'dse-light-'));
const OUT = 'site/_design/shots';
fs.mkdirSync(OUT, { recursive: true });

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
    '--window-size=1440,1000',
    'about:blank'
  ],
  { stdio: 'ignore' }
);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function target() {
  for (let i = 0; i < 60; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
      const p = list.find((t) => t.type === 'page');
      if (p) return p;
    } catch {}
    await sleep(250);
  }
  throw new Error('Chrome không mở cổng debug');
}

const page = await target();
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((res, rej) => {
  ws.onopen = res;
  ws.onerror = () => rej(new Error('WebSocket lỗi'));
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
const send = (method, params = {}) => {
  const id = ++seq;
  ws.send(JSON.stringify({ id, method, params }));
  return new Promise((r) => pending.set(id, r));
};
const ev = async (expression) => {
  const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (r.result && r.result.exceptionDetails) return { __err: r.result.exceptionDetails.text };
  return r.result && r.result.result ? r.result.result.value : null;
};
const shot = async (name) => {
  const s = await send('Page.captureScreenshot', { format: 'png' });
  if (s.result && s.result.data) fs.writeFileSync(path.join(OUT, name), Buffer.from(s.result.data, 'base64'));
  return !!(s.result && s.result.data);
};

const results = [];
const check = (name, ok, detail = '') => {
  results.push({ name, ok: !!ok });
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? '  — ' + detail : ''}`);
};

await send('Page.enable');
await send('Runtime.enable');
await send('Log.enable');
// Chrome headless không nhận lệnh giả lập prefers-color-scheme ở bản này,
// nên ghi chủ đề người dùng chọn TRƯỚC khi bất kỳ script nào của trang chạy.
await send('Page.addScriptToEvaluateOnNewDocument', {
  source: "try { localStorage.setItem('dse.theme.v1', 'light'); } catch (e) {}"
});
await send('Emulation.setEmulatedMediaFeatures', {
  features: [{ name: 'prefers-color-scheme', value: 'light' }]
});
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
await send('Page.navigate', { url: FILE });
await sleep(1800);

const prefersDark = await ev(`matchMedia('(prefers-color-scheme: dark)').matches`);
const theme = await ev(`document.documentElement.dataset.theme`);
check('Mở trang ra đúng chủ đề SÁNG', theme === 'light', `data-theme=${theme} · hệ thống báo tối=${prefersDark}`);

// --- tổng quan, phần, bẫy, tìm kiếm ở chủ đề sáng
await ev(`location.hash = '#/tong-quan'`);
await sleep(450);
await shot('light-desktop-overview.png');

await ev(`location.hash = '#/s/pandas-co-ban'`);
await sleep(500);
await shot('light-desktop-section.png');

await ev(`location.hash = '#/bay'`);
await sleep(500);
await shot('light-desktop-traps.png');

await ev(`document.getElementById('searchTrigger').click()`);
await sleep(250);
await ev(`(() => { const i = document.getElementById('searchInput'); i.value = 'loc'; i.dispatchEvent(new Event('input', {bubbles:true})); })()`);
await sleep(450);
await shot('light-desktop-search.png');

// --- điều hướng bàn phím: ArrowDown -> Enter mở kết quả
await ev(`document.getElementById('searchInput').focus()`);
const activeBefore = await ev(`document.querySelectorAll('.res').length`);
await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'ArrowDown', code: 'ArrowDown', windowsVirtualKeyCode: 40 });
await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'ArrowDown', code: 'ArrowDown', windowsVirtualKeyCode: 40 });
await sleep(150);
const activeIdx = await ev(`[...document.querySelectorAll('.res')].findIndex(r => r.classList.contains('is-active'))`);
await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 });
await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 });
await sleep(450);
const afterEnter = await ev(`({ hash: location.hash, overlayHidden: document.getElementById('overlay').hidden })`);
check(
  'Bàn phím ↑↓ chọn và Enter mở kết quả',
  activeBefore > 0 && activeIdx >= 0 && afterEnter.overlayHidden && afterEnter.hash.startsWith('#/s/'),
  `kết quả=${activeBefore} · đang chọn=${activeIdx} · ${afterEnter.hash}`
);

// --- deep link phải mở đúng card và cuộn ngay dưới thanh trên
await ev(`location.hash = '#/s/pandas-nang-cao/px-merge'`);
await sleep(700);
const deep = await ev(`(() => {
  const c = document.querySelector('.card[data-formula="px-merge"]');
  const bar = document.querySelector('.topbar');
  if (!c) return { found: false };
  return {
    found: true,
    open: c.classList.contains('is-open'),
    gap: Math.round(c.getBoundingClientRect().top - bar.getBoundingClientRect().bottom),
    titleTop: Math.round(c.querySelector('.card-name').getBoundingClientRect().top)
  };
})()`);
check(
  'Deep link cuộn card ngay dưới thanh trên',
  deep.found && deep.open && deep.gap >= 8 && deep.gap <= 48 && deep.titleTop > 48 && deep.titleTop < 240,
  JSON.stringify(deep)
);
await shot('light-desktop-open.png');

// --- đổi theme, bật lại vẫn được, không mất trạng thái
await ev(`document.querySelector('[data-theme-set="dark"]').click()`);
const darkOn = await ev(`document.documentElement.dataset.theme`);
await ev(`document.querySelector('[data-theme-set="light"]').click()`);
const lightBack = await ev(`document.documentElement.dataset.theme`);
check('Đổi theme sáng/tối và bật lại được', darkOn === 'dark' && lightBack === 'light', `${darkOn} -> ${lightBack}`);

// --- 360px không tràn ngang (cả hai chủ đề)
await send('Emulation.setDeviceMetricsOverride', { width: 360, height: 800, deviceScaleFactor: 1, mobile: true });
await ev(`location.hash = '#/tong-quan'`);
await sleep(450);
const ov1 = await ev(`({ sw: document.documentElement.scrollWidth, iw: window.innerWidth })`);
await ev(`location.hash = '#/s/pandas-co-ban'`);
await sleep(500);
const ov2 = await ev(`({ sw: document.documentElement.scrollWidth, iw: window.innerWidth })`);
await ev(`location.hash = '#/bay'`);
await sleep(450);
const ov3 = await ev(`({ sw: document.documentElement.scrollWidth, iw: window.innerWidth })`);
await ev(`location.hash = '#/luyen-tap/de-01a'`);
await sleep(600);
const ov4 = await ev(`({ sw: document.documentElement.scrollWidth, iw: window.innerWidth })`);
check(
  '360px không tràn ngang (tổng quan · phần · bẫy · làm đề)',
  ov1.sw <= ov1.iw + 1 && ov2.sw <= ov2.iw + 1 && ov3.sw <= ov3.iw + 1 && ov4.sw <= ov4.iw + 1,
  JSON.stringify([ov1, ov2, ov3, ov4])
);
await ev(`location.hash = '#/s/pandas-co-ban'`);
await sleep(500);
await shot('light-360-section.png');
await ev(`(() => { const c = document.querySelector('.card.is-open') || document.querySelector('.card'); if (c) c.scrollIntoView({ block: 'start' }); })()`);
await sleep(350);
await shot('light-360-open.png');

await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
await ev(`location.hash = '#/tong-quan'`);
await sleep(450);
await shot('light-mobile-overview.png');
await ev(`location.hash = '#/s/pandas-co-ban'`);
await sleep(500);
await shot('light-mobile-section.png');

// --- bảng tham số ở điện thoại: cột "Ý nghĩa" phải nằm trong màn hình
const argBox = await ev(`(() => {
  const td = document.querySelector('.args td.p-desc');
  const wrap = document.querySelector('.table-wrap');
  if (!td || !wrap) return null;
  const r = td.getBoundingClientRect();
  return {
    right: Math.round(r.right),
    iw: window.innerWidth,
    wrapScroll: wrap.scrollWidth,
    wrapClient: wrap.clientWidth
  };
})()`);
check(
  'Bảng tham số 390px: cột "Ý nghĩa" trong màn, .table-wrap không cuộn ngang',
  argBox && argBox.right <= argBox.iw && argBox.wrapScroll <= argBox.wrapClient + 1,
  JSON.stringify(argBox)
);

await ev(`(() => { const c = document.querySelector('.card.is-open') || document.querySelector('.card'); if (c) c.scrollIntoView({ block: 'start' }); })()`);
await sleep(350);
await shot('light-mobile-open.png');

// --- trạng thái card trên một trang phần
const printCards = await ev(`(() => {
  const rows = document.querySelectorAll('.card-row:not([hidden])').length;
  const bodies = document.querySelectorAll('.card-body:not([hidden])').length;
  return { rows, bodies };
})()`);
check('Mỗi trang phần có card đang mở và card đang thu gọn', printCards.rows > 0 && printCards.bodies > 0, JSON.stringify(printCards));

/* ===================== LUYỆN TẬP ===================== */
const secs = (s) => {
  const m = /^(\d+):(\d{2})$/.exec(String(s).trim());
  return m ? Number(m[1]) * 60 + Number(m[2]) : -1;
};
const clockOf = () => ev(`(document.querySelector('[data-clock]')||{textContent:''}).textContent`);

await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });

await ev(`location.hash = '#/luyen-tap'`);
await sleep(700);
const listInfo = await ev(`(() => ({
  rows: document.querySelectorAll('.exam-row').length,
  groups: document.querySelectorAll('[data-group-block]').length,
  nav: (document.getElementById('navExamCount') || {}).textContent,
  chips: document.querySelectorAll('.exam-ans').length
}))()`);
check(
  'Luyện tập: 14 đề, 9 cụm, sidebar đếm 14',
  listInfo.rows === 14 && listInfo.groups === 9 && listInfo.nav === '14' && listInfo.chips === 14,
  JSON.stringify(listInfo)
);
await shot('light-practice-list.png');

// --- mở đề 01A: mặc định Xem đề, phương án khoá, đồng hồ tắt ở 60:00
await ev(`location.hash = '#/luyen-tap/de-01a'`);
await sleep(700);
const view0 = await ev(`(() => {
  const opts = document.querySelectorAll('.opt').length;
  const locked = document.querySelectorAll('.mc-locked .opt:disabled').length;
  const gradeHidden = getComputedStyle(document.querySelector('.pp-grade')).display === 'none';
  return {
    h1: (document.querySelector('h1') || {}).textContent,
    opts,
    locked,
    gradeHidden,
    clock: (document.querySelector('[data-clock]') || {}).textContent,
    parts: document.querySelectorAll('.exam-part').length,
    nav: document.querySelectorAll('.q-nav button').length,
    sw: document.documentElement.scrollWidth,
    iw: window.innerWidth
  };
})()`);
check(
  'Đề 01A: Xem đề là mặc định (phương án khoá, ẩn bàn chấm), đồng hồ 60:00, không tràn 1440px',
  view0.opts > 0 && view0.locked === view0.opts && view0.gradeHidden && view0.clock === '60:00' && view0.nav === 25 && view0.parts === 2 && view0.sw <= view0.iw + 1,
  JSON.stringify(view0)
);
await shot('light-practice-view.png');

// --- Làm bài: chọn A câu 1, B câu 2 -> chấm 2/20
const graded = await ev(`(() => {
  document.querySelector('[data-mode="take"]').click();
  const q = (n) => [...document.querySelectorAll('.q-item')].find((x) => x.dataset.n === String(n));
  const pick = (n, k) => {
    const o = q(n) && q(n).querySelector('.opt[data-k="' + k + '"]');
    if (o) o.click();
    return !!(o && o.getAttribute('aria-pressed') === 'true');
  };
  const ok1 = pick(1, 'A');
  const ok2 = pick(2, 'B');
  document.querySelector('[data-action="grade"]').click();
  return {
    ok1,
    ok2,
    taking: document.querySelector('[data-exam]').classList.contains('is-taking'),
    score: (document.querySelector('[data-score]') || {}).textContent || '',
    rightQ: [...document.querySelectorAll('.q-result')].filter((r) => r.textContent.indexOf('Đúng') === 0).length,
    tl: [...document.querySelectorAll('.q-result')].filter((r) => r.textContent.indexOf('Tự luận') === 0).length
  };
})()`);
check(
  'Làm bài: chọn A (câu 1) + B (câu 2) rồi chấm ra 2/20',
  graded.ok1 && graded.ok2 && graded.taking && graded.score.indexOf('2/20') === 0 && graded.rightQ === 2 && graded.tl === 5,
  JSON.stringify(graded)
);
await shot('light-practice-graded.png');

// --- chọn sai, chấm lại -> đánh dấu sai
const wrong = await ev(`(() => {
  const q = [...document.querySelectorAll('.q-item')].find((x) => x.dataset.n === '1');
  q.querySelector('.opt[data-k="C"]').click();
  document.querySelector('[data-action="grade"]').click();
  const bad = q.querySelector('.opt.is-wrong');
  const res = q.querySelector('.q-result');
  return { key: bad && bad.dataset.k, text: (res && res.textContent) || '', score: (document.querySelector('[data-score]') || {}).textContent };
})()`);
check(
  'Chọn sai rồi chấm lại: câu 1 (chọn C, đúng A) bị đánh dấu sai',
  wrong.key === 'C' && wrong.text.indexOf('Sai') === 0 && wrong.score.indexOf('1/20') === 0,
  JSON.stringify(wrong)
);

// --- Làm lại xoá lựa chọn
const reset = await ev(`(() => {
  document.querySelector('[data-note-toggle="1"]').click();
  const nt = document.querySelector('[data-note-for="1"]');
  nt.value = 'câu 1 nhớ truthiness';
  nt.dispatchEvent(new Event('input', { bubbles: true }));
  document.querySelector('[data-action="reset-answers"]').click();
  let store = null;
  try { store = JSON.parse(localStorage.getItem('dse.practice.v1') || '{}'); } catch (e) {}
  return {
    pressed: document.querySelectorAll('.opt[aria-pressed="true"]').length,
    chosenDots: document.querySelectorAll('.q-nav .is-chosen').length,
    scoreHidden: (document.querySelector('[data-score]') || {}).hidden,
    noteKept: ((store && store.notes && store.notes['de-01a'] || {})['1'] || '') === 'câu 1 nhớ truthiness'
  };
})()`);
check(
  'Làm lại xoá lựa chọn nhưng giữ ghi chú câu',
  reset.pressed === 0 && reset.chosenDots === 0 && reset.scoreHidden === true && reset.noteKept,
  JSON.stringify(reset)
);

// --- đề mẫu: câu 1 = B
await ev(`location.hash = '#/luyen-tap/de-mau'`);
await sleep(700);
const mau = await ev(`(() => {
  document.querySelector('[data-mode="take"]').click();
  const q = [...document.querySelectorAll('.q-item')].find((x) => x.dataset.n === '1');
  q.querySelector('.opt[data-k="B"]').click();
  document.querySelector('[data-action="grade"]').click();
  const right = q.querySelector('.opt.is-right');
  return { score: (document.querySelector('[data-score]') || {}).textContent || '', key: right && right.dataset.k };
})()`);
check('Đề mẫu: câu 1 đáp án B -> chấm 1/20', mau.score.indexOf('1/20') === 0 && mau.key === 'B', JSON.stringify(mau));

// --- đồng hồ: chạy, tạm dừng, đặt lại
const t1 = await ev(`(() => { document.querySelector('[data-timer="start"]').click(); return document.querySelector('[data-clock]').textContent; })()`);
await sleep(2200);
const t2 = await ev(`(() => { document.querySelector('[data-timer="pause"]').click(); return document.querySelector('[data-clock]').textContent; })()`);
await sleep(700);
const t3 = await clockOf();
const t4 = await ev(`(() => { document.querySelector('[data-timer="reset"]').click(); return document.querySelector('[data-clock]').textContent; })()`);
check(
  'Đồng hồ: chạy thì giảm, tạm dừng đứng yên, đặt lại về 60:00',
  t1 === '60:00' && secs(t2) >= 0 && secs(t2) < 3600 && t3 === t2 && t4 === '60:00',
  JSON.stringify({ t1, t2, t3, t4 })
);

// --- ghi chú đề + highlight còn sau khi tải lại
await ev(`location.hash = '#/luyen-tap/de-01a'`);
await sleep(700);
const persist0 = await ev(`(() => {
  const ta = document.querySelector('[data-exam-note]');
  ta.value = 'Ôm phần regex trước 10 phút';
  ta.dispatchEvent(new Event('input', { bubbles: true }));
  const body = document.querySelector('.q-item[data-n="1"] .q-body');
  const walker = document.createTreeWalker(body, NodeFilter.SHOW_TEXT);
  const first = walker.nextNode();
  const r = document.createRange();
  r.setStart(first, 0);
  r.setEnd(first, Math.min(12, first.nodeValue.length));
  const sel = getSelection();
  sel.removeAllRanges();
  sel.addRange(r);
  body.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
  const bar = document.querySelector('.hl-bar');
  const shown = !!(bar && !bar.hidden);
  const sw = bar && bar.querySelector('[data-hl="1"]');
  if (sw) sw.click();
  return { shown, marks: document.querySelectorAll('.q-body mark.hl').length };
})()`);
check('Bôi đen câu 1 hiện thanh 3 màu + lưu highlight', persist0.shown && persist0.marks > 0, JSON.stringify(persist0));

await send('Page.reload', { ignoreCache: true });
await sleep(2000);
const persist1 = await ev(`(() => ({
  route: location.hash,
  note: (document.querySelector('[data-exam-note]') || {}).value || '',
  qnote: (document.querySelector('[data-note-for="1"]') || {}).value || '',
  marks: document.querySelectorAll('.q-body mark.hl').length,
  theme: document.documentElement.dataset.theme
}))()`);
check(
  'Ghi chú đề + ghi chú câu + highlight còn sau khi tải lại',
  persist1.route.indexOf('#/luyen-tap/de-01a') === 0 &&
    persist1.note.indexOf('Ôm phần regex') === 0 &&
    persist1.qnote.length > 0 &&
    persist1.marks > 0 &&
    persist1.theme === 'light',
  JSON.stringify(persist1)
);

// --- trang làm đề trên điện thoại
await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
await ev(`location.hash = '#/luyen-tap/de-01a'`);
await sleep(700);
const practiceMobile = await ev(`(() => ({
  sw: document.documentElement.scrollWidth,
  iw: window.innerWidth,
  bar: !!document.querySelector('.practice-bar') && getComputedStyle(document.querySelector('.practice-bar')).display !== 'none',
  barBtn: !!document.querySelector('.practice-bar [data-sheet="open"]')
}))()`);
check(
  '390px: trang làm đề không tràn ngang, có thanh dưới mở Bàn làm bài',
  practiceMobile.sw <= practiceMobile.iw + 1 && practiceMobile.bar && practiceMobile.barBtn,
  JSON.stringify(practiceMobile)
);
await ev(`(() => { const b = document.querySelector('.practice-bar [data-sheet="open"]'); if (b) b.click(); })()`);
await sleep(400);
const sheetOpen = await ev(`(() => ({
  open: document.body.classList.contains('practice-sheet'),
  visible: getComputedStyle(document.querySelector('.practice-panel')).visibility === 'visible'
}))()`);
check('390px: bấm mở được Bàn làm bài dạng sheet', sheetOpen.open && sheetOpen.visible, JSON.stringify(sheetOpen));
await ev(`(() => { const b = document.querySelector('.pp-close'); if (b) b.click(); })()`);
await sleep(350);
await shot('light-practice-mobile.png');

const errs = events.filter(
  (e) =>
    e.method === 'Runtime.exceptionThrown' ||
    (e.method === 'Runtime.consoleAPICalled' && e.params.type === 'error') ||
    (e.method === 'Log.entryAdded' && e.params.entry.level === 'error')
);
check('Không lỗi console', errs.length === 0, errs.slice(0, 3).map((e) => JSON.stringify(e.params).slice(0, 140)).join(' | '));

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} kiểm tra PASS (chủ đề sáng + 360px)`);
ws.close();
chrome.kill();
try {
  fs.rmSync(profile, { recursive: true, force: true });
} catch {}
process.exit(failed.length ? 1 : 0);
